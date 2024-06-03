import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import copa_oro from '../../assets/images/copa_oro.webp';
import medalla_bronce from '../../assets/images/medalla_bronce.webp';
import TBD_logo from '../../assets/images/TBD_icon.webp';
import BIM_logo from '../../assets/images/BIM_icon.webp';
import NOT_logo from '../../assets/images/NOT_icon.webp';
import MAL_logo from '../../assets/images/MAL_icon.webp';
import MUC_logo from '../../assets/images/MUC_icon.webp';
import DES_logo from '../../assets/images/DES_icon.webp';

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 32px;
  color: white;
  line-height: 35px;
  margin-bottom: 20px;
  text-align: center;

  @media (min-width: 1280px) {
    font-size: 50px;
    line-height: 75px;
  }

  .text-gradient {    
  }
`;

const CuadroContainer = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto; 
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const CopaContainerORO = styled.div`
  padding: 0.5rem;
  margin: 1rem;
  border-radius: 8px;
  display: inline-block;
  width: 60%;
  box-sizing: border-box;
  background: linear-gradient(40deg, #F7DC6F, #977E1D, #F1C40F);
  background-size: 400% 400%;
  animation: verticalGradientAnimation 5s ease infinite;
  max-height: 300px; // Ajusta este valor según tus necesidades

  @media (max-width: 767px) {
    border-radius: 8px;
    width: 100%;
  }

  @keyframes verticalGradientAnimation {
    0% {
      background-position: 50% 0%;
    }
    50% {
      background-position: 50% 100%;
    }
    100% {
      background-position: 50% 0%;
    }
  }
`;

const CopaContainerBRONCE = styled.div`
  padding: 0.5rem;
  margin: 1rem;
  border-radius: 8px;
  display: inline-block;
  width: 60%;
  box-sizing: border-box;
  background: linear-gradient(40deg, #E67E22, #784212, #CA6F1E);
  background-size: 400% 400%;
  animation: gradientAnimation 5s ease infinite;
  max-height: 300px; // Ajusta este valor según tus necesidades

  @media (max-width: 767px) {
    border-radius: 8;
    width: 100%;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Fase = styled.div`
  text-align: center;
  dislplay: flex;
  h2 {
    margin-bottom: 1rem;
  }
`;

const Etapa = styled.div`
  color: #666;
  font-size: 1.5rem;
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const Partido = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  position: relative;
  margin-left: 1rem; 
  margin-right: 1rem; 
  
  &:last-child {
    margin-bottom: 1rem;
  }
  &:nth-child(3n + 1) {
    background-color: #c0c0c0;
  }
  &:nth-child(3n + 2) {
    background-color: #d5d5d5;
  }
  &:nth-child(3n + 3) {
    background-color: #d5d5d5;
  }

  .equipo {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      max-width: 50px;
      max-height: 50px;
      margin-bottom: 0.5rem;
    }
  }
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

const CuadroDeEliminatorias = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingFem, setPendingFem] = useState(true);

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
            const data = results.data;
            const filteredData = data.filter(
              (partido) => partido.Partido >= 11 && partido.Partido <= 12
            );
            const partidos = {};
            filteredData.forEach((partido) => {
              const partidoId = `Partido${partido.Partido}`;
              partidos[`${partidoId}_ID`] = partido.Partido;
              partidos[`${partidoId}_Descripcion`] = partido.Descripcion;
              partidos[`${partidoId}_Equipo1`] = partido.Equipo1;
              partidos[`${partidoId}_Equipo2`] = partido.Equipo2;
              partidos[`${partidoId}_Fecha`] = partido.Fecha;
              partidos[`${partidoId}_Hora`] = partido.Hora;
              partidos[`${partidoId}_Resultado`] = partido.Resultado;
            });

            setData(partidos);
            setIsLoading(false);
          },
          error: (error) => {
            console.error('Error al parsear el CSV:', error);
            setError('Error al parsear el archivo CSV');
            setIsLoading(false);
          },
        });
      } catch (error) {
        console.error('Error al cargar el archivo CSV:', error);
        setError('Error al cargar el archivo CSV');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPendingFem(false);
    }, 1100);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const displayResultOrDateTime = (resultado, fecha, hora) => {
    if (resultado !== null && resultado !== undefined && resultado !== '') {
      return <span style={{ fontSize: 'x-large', fontWeight: 'bold' }}>{resultado}</span>;
    } else {
      const dateTime = fecha && hora ? `${fecha}\n${hora}` : (fecha || hora || 'Fecha y hora por definir');
      return dateTime.split('\n').map((line, i) => (
        <span key={i} className="date-time">{line}<br /></span>
      ));
    }
  };

  return (
    <>
      {pendingFem ? (
        <>
          <Title>
            <span className="text-gradient">Cuadro de eliminatorias</span>
          </Title>
          <CuadroContainer style={{ height: '80vh' }} className='text-black'>
            <div className="copa-wrapper">
              <CopaContainerORO>
                <Fase>
                  <div className="header" style={{ textAlign: 'center' }}>
                    <img src={copa_oro} alt="Copa de oro" style={{ width: '50px', height: 'auto', display: 'block', margin: 'auto' }} />
                    <h2 style={{ fontSize: '20px' }}><strong>COPA DE ORO</strong></h2>
                  </div>
                  <div class="w-full gap-x-2 flex justify-center items-center">
                    <div
                      class="w-5 bg-gray-800 h-5 rounded-full animate-bounce"
                    ></div>
                    <div
                      class="w-5 h-5 bg-gray-800 rounded-full animate-bounce"
                    ></div>
                    <div
                      class="w-5 h-5 bg-gray-800 rounded-full animate-bounce"
                    ></div>
                  </div>
                </Fase>
              </CopaContainerORO>
            </div>
            <div className="copa-wrapper">
              <CopaContainerBRONCE>
                <Fase>
                  <div className="header" style={{ textAlign: 'center' }}>
                    <img src={medalla_bronce} alt="Medalla de bronce" style={{ width: '50px', height: 'auto', display: 'block', margin: 'auto' }} />
                    <h2 style={{ fontSize: '20px' }}><strong>MEDALLA DE BRONCE</strong></h2>
                  </div>
                  <div class="w-full gap-x-2 flex justify-center items-center">
                    <div
                      class="w-5 bg-gray-800 h-5 rounded-full animate-bounce"
                    ></div>
                    <div
                      class="w-5 h-5 bg-gray-800 rounded-full animate-bounce"
                    ></div>
                    <div
                      class="w-5 h-5 bg-gray-800 rounded-full animate-bounce"
                    ></div>
                  </div>
                </Fase>
              </CopaContainerBRONCE>
            </div>
          </CuadroContainer>
        </>
      ) : (
        <div className="" style={{ height: '91vh' }}>
          <Title>
            <span className="text-gradient">Cuadro de eliminatorias</span>
          </Title>
          <CuadroContainer className='text-black'>
            <div className="copa-wrapper">
              <CopaContainerORO>
                <Fase>
                  <div className="header" style={{ textAlign: 'center' }}>
                    <img src={copa_oro} alt="Copa de oro" style={{ width: '50px', height: 'auto', display: 'block', margin: 'auto' }} />
                    <h2 style={{ fontSize: '20px' }}><strong>COPA DE ORO</strong></h2>
                  </div>
                  <Partido>
                    <Etapa>Final</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido12_Equipo1)} alt="Equipo 3" />
                      <span><strong>{data.Partido12_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado" style={{ fontWeight: 'normal' }}>{displayResultOrDateTime(data.Partido12_Resultado, data.Partido12_Fecha, data.Partido12_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido12_Equipo2)} alt="Equipo 4" />
                      <span><strong>{data.Partido12_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                </Fase>
              </CopaContainerORO>
            </div>
            <div className="copa-wrapper">
              <CopaContainerBRONCE>
                <Fase>
                  <div className="header" style={{ textAlign: 'center' }}>
                    <img src={medalla_bronce} alt="Medalla de bronce" style={{ width: '50px', height: 'auto', display: 'block', margin: 'auto' }} />
                    <h2 style={{ fontSize: '20px' }}><strong>MEDALLA DE BRONCE</strong></h2>
                  </div>
                  <Partido>
                    <Etapa>Final</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido11_Equipo1)} alt="Equipo 3" />
                      <span><strong>{data.Partido11_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado" style={{ fontWeight: 'normal' }}>{displayResultOrDateTime(data.Partido11_Resultado, data.Partido11_Fecha, data.Partido11_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido11_Equipo2)} alt="Equipo 4" />
                      <span><strong>{data.Partido11_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                </Fase>
              </CopaContainerBRONCE>
            </div>
          </CuadroContainer>
        </div>
      )}
    </>
  );
};

export default CuadroDeEliminatorias;