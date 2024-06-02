import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';
import BIM_logo from '../../assets/images/BIM_logo.webp';
import NOT_logo from '../../assets/images/NOT_logo.webp';
import MAL_logo from '../../assets/images/MAL_logo.webp';
import MUC_logo from '../../assets/images/MUC_logo.webp';
import DES_logo from '../../assets/images/DES_logo.webp';
import TBD_logo from '../../assets/images/TBD_icon.webp';

const PartidoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  position: relative;
  margin: 0.5rem 1rem 0.5rem 0rem;
  background-color: #d5d5d5;
  width: 100%;
  min-width: 300px;
  max-width: 90vw;

  @media (min-width: 1200px) {  
    width: 400px; 
  }

  .equipo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    margin: 0;

    img {
      max-width: 70px;
      max-height: 75px;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
    }

    span {
      color: black;
      text-align: center;
      font-weight: 500;
    }
  }

  .resultado {
    font-size: 2rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1.2;
    min-height: 80px;
    color: black;
    font-weight: 500; 
  }
`;

const Etapa = styled.div`
  font-size: 1.2rem;
  position: absolute;
  top: 1rem;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
  ${props => {
    if (props.descripcion.includes('Jornada')) {
      return 'color: #008000; font-weight: bold;';
    } else if (props.descripcion.includes('oro')) {
      return 'color: #D4AC0D; font-weight: bold;';
    } else if (props.descripcion.includes('bronce')) {
      return 'color: #BA4A00; font-weight: bold;';
    } else {
      return 'color: #ff0000; font-weight: bold;';
    }
  }}
`;

const getLogoForTeam = (teamName) => {
  switch (teamName) {
    case 'BIM': return BIM_logo;
    case 'NOT': return NOT_logo;
    case 'MAL': return MAL_logo;
    case 'MUC': return MUC_logo;
    case 'DES': return DES_logo;
    default: return TBD_logo;
  }
};

const Partido = ({ descripcion, equipo1, equipo2, fecha, hora, resultado, estado }) => {
  const logo1 = getLogoForTeam(equipo1);
  const logo2 = getLogoForTeam(equipo2);

  const displayResultOrDateTime = () => {
    if (resultado !== null && resultado !== undefined && resultado !== '') {
      return resultado;
    } else {
      const dateTime = fecha && hora ? `${fecha}\n${hora}` : (fecha || hora || 'Fecha y hora por definir');
      return dateTime.split('\n').map((line, i) => (
        <span key={i} className="date-time">{line}<br /></span>
      ));
    }
  };

  return (
    <PartidoCard>
      <Etapa descripcion={descripcion || 'TBD'}>{descripcion || 'TBD'}</Etapa>
      <div className="equipo">
        <img src={logo1} alt={equipo1 || '???'} />
        <span><strong style={{ fontSize: '2rem' }}>{equipo1 || '???'}</strong></span>
      </div>
      <div className="resultado">
        {displayResultOrDateTime()}
      </div>
      <div className="equipo">
        <img src={logo2} alt={equipo2 || '???'} />
        <span><strong style={{ fontSize: '2rem' }}>{equipo2 || '???'}</strong></span>
      </div>
    </PartidoCard>
  );
};

const PartidoGroup = ({ title, matches }) => (
  <div className="flex flex-col items-center text-white">
    <h2 className="text-4xl xl:text-5xl font-semibold text-white mt-12 mb-4">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {matches.map((match, index) => (
        <Partido
          key={index}
          descripcion={match.Descripcion}
          equipo1={match.Equipo1}
          equipo2={match.Equipo2}
          fecha={match.Fecha}
          hora={match.Hora}
          resultado={match.Resultado}
          estado={match.Estado}
        />
      ))}
    </div>
  </div>
);

const Partidos = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/partidos_fem.csv');
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo CSV');
        }
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            setIsLoading(false);
          },
          error: (error) => {
            console.error('Error al parsear el CSV:', error);
            setError('Error al parsear el archivo CSV');
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error('Error al cargar el archivo CSV:', error);
        setError('Error al cargar el archivo CSV');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return null;
  if (error) return <p>Error: {error}</p>;

  const groupedMatches = [
    {
      title: "Jornada 1 - Fase de grupos",
      matches: data.slice(0, 5)
    },
    {
      title: "Jornada 2 - Fase de grupos",
      matches: data.slice(5, 10)
    },
    {
      title: "Jornada 3 - Eliminatorias",
      matches: data.slice(10)
    }
  ];

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="flex-1 font-poppins font-semibold text-[32px] text-white leading-[35px] xl:text-[50px] xl:leading-[75px] mb-5">
        <span className="text-gradient">Partidos</span>
      </h1>

      {groupedMatches.map((group, index) => (
        <PartidoGroup
          key={index}
          title={group.title}
          matches={group.matches}
        />
      ))}
    </div>
  );
};

export default Partidos;