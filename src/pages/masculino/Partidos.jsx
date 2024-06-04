import React, { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';
import SCH_logo from '../../assets/images/SCH_icon.webp';
import PAB_logo from '../../assets/images/PAB_icon.webp';
import DX1_logo from '../../assets/images/DX1_icon.webp';
import QUE_logo from '../../assets/images/QUE_icon.webp';
import SSO_logo from '../../assets/images/SSO_icon.webp';
import ANT_logo from '../../assets/images/ANT_icon.webp';
import EXP_logo from '../../assets/images/EXP_icon.webp';
import TAR_logo from '../../assets/images/TAR_icon.webp';
import GHO_logo from '../../assets/images/GHO_icon.webp';
import BAS_logo from '../../assets/images/BAS_icon.webp';
import ARQ_logo from '../../assets/images/ARQ_icon.webp';
import HDV_logo from '../../assets/images/HDV_icon.webp';
import RAM_logo from '../../assets/images/RAM_icon.webp';
import EVS_logo from '../../assets/images/EVS_icon.webp';
import ADO_logo from '../../assets/images/ADO_icon.webp';
import PMA_logo from '../../assets/images/PMA_icon.webp';
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  ${props => {
    if (props.descripcion.includes('Grupo A')) {
      return 'color: #16a34a; font-weight: bold;';
    } else if (props.descripcion.includes('Grupo B')) {
      return 'color: #ef4444; font-weight: bold;';
    } else if (props.descripcion.includes('Grupo C')) {
      return 'color: #3b82f6; font-weight: bold;';
    } else if (props.descripcion.includes('Grupo D')) {
      return 'color: #d97706; font-weight: bold;';
    } else if (props.descripcion.includes('oro')) {
      return 'color: #D4AC0D; font-weight: bold;';
    }else if (props.descripcion.includes('oro')) {
      return 'color: #D4AC0D; font-weight: bold;';
    } else if (props.descripcion.includes('plata')) {
      return 'color: #515A5A; font-weight: bold;';
    } else if (props.descripcion.includes('bronce')) {
      return 'color: #BA4A00; font-weight: bold;';
    } else if (props.descripcion.includes('aluminio')) {
      return 'color: #888888; font-weight: bold;';
    } else {
      return 'color: #ff0000; font-weight: bold;';
    }
  }}
`;

const getLogoForTeam = (teamName) => {
  const logos = {
    SCH: SCH_logo,
    PAB: PAB_logo,
    DX1: DX1_logo,
    QUE: QUE_logo,
    SSO: SSO_logo,
    ANT: ANT_logo,
    EXP: EXP_logo,
    TAR: TAR_logo,
    GHO: GHO_logo,
    BAS: BAS_logo,
    ARQ: ARQ_logo,
    HDV: HDV_logo,
    RAM: RAM_logo,
    EVS: EVS_logo,
    ADO: ADO_logo,
    PMA: PMA_logo,
    TBD: TBD_logo,
  };
  return logos[teamName] || TBD_logo;
};

const Partido = ({ descripcion, equipo1, equipo2, fecha, hora, resultado }) => {
  const logo1 = useMemo(() => getLogoForTeam(equipo1), [equipo1]);
  const logo2 = useMemo(() => getLogoForTeam(equipo2), [equipo2]);

  const displayResultOrDateTime = useMemo(() => {
    if (resultado) {
      return <strong>{resultado}</strong>;
    } else {
      const dateTime = fecha && hora ? `${fecha}\n${hora}` : (fecha || hora || 'Fecha y hora por definir');
      return dateTime.split('\n').map((line, i) => (
        <span key={i} className="date-time">{line}<br /></span>
      ));
    }
  }, [fecha, hora, resultado]);

  return (
    <PartidoCard>
      <Etapa descripcion={descripcion || 'TBD'}>{descripcion || 'TBD'}</Etapa>
      <div className="equipo">
        <img src={logo1} alt={equipo1 || '???'} width="100" height="100"/>
        <span><strong style={{ fontSize: '2rem' }}>{equipo1 || '???'}</strong></span>
      </div>
      <div className="resultado">
        {displayResultOrDateTime}
      </div>
      <div className="equipo">
        <img src={logo2} alt={equipo2 || '???'} width="100" height="100"/>
        <span><strong style={{ fontSize: '2rem' }}>{equipo2 || '???'}</strong></span>
      </div>
    </PartidoCard>
  );
};

const PartidoGroup = ({ title, matches }) => (
  <div className="flex flex-col items-center text-white w-full">
    <h2 
      className="
        text-white mt-12 mb-4 
        whitespace-nowrap overflow-hidden text-ellipsis 
        w-full text-center 
        transition-all duration-300 ease-in-out
        px-4
      " 
      style={{ 
        fontSize: 'clamp(1rem, 6vw, 3rem)',
        fontWeight: 600
      }}
    >
      {title}
    </h2>
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
        const response = await fetch('/partidos_masc.csv');
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo CSV');
        }
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data;
            const jornada1 = parsedData.slice(0, 12);
            const jornada2 = parsedData.slice(12, 24);
            const eliminatorias = parsedData.slice(24);

            setData([...jornada1, ...jornada2, ...eliminatorias]);
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


  const groupedMatches = useMemo(() => [
    {
      title: "Jornada 1 - Fase de grupos",
      matches: data.slice(0, 12)
    },
    {
      title: "Jornada 2 - Fase de grupos",
      matches: data.slice(12, 24)
    },
    {
      title: "Jornada 3 - Eliminatorias",
      matches: data.slice(24)
    }
  ], [data]);

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="flex-1 font-poppins font-semibold text-[32px] text-white leading-[35px] xl:text-[50px] xl:leading-[75px] mb-5">
        <span className="text-gradient">Partidos</span>
      </h1>
      {showContent ? (
        groupedMatches.map((group, index) => (
          <PartidoGroup
            key={index}
            title={group.title}
            matches={group.matches}
          />
        ))
      ) : (
        <div style={{
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#23282D'
        }} className="flex justify-center items-center">
          <div className="flex gap-x-2">
            <div className="w-5 bg-white h-5 rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-white rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partidos;