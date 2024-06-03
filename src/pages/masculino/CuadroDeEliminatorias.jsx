import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import copa_oro from '../../assets/images/copa_oro.webp';
import medalla_plata from '../../assets/images/medalla_plata.webp';
import medalla_bronce from '../../assets/images/medalla_bronce.webp';
import copa_aluminio from '../../assets/images/copa_aluminio.webp';
import TBD_logo from '../../assets/images/TBD_icon.webp';
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

const CopaContainerPLATA = styled.div`
  padding: 0.5rem;
  margin: 1rem;
  border-radius: 8px;
  display: inline-block;
  width: 60%;
  box-sizing: border-box;
  background: linear-gradient(70deg, #CACFD2, #424949, #D7DBDD);
  background-size: 400% 400%;
  animation: gradientAnimation 5s ease infinite;

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

const CopaContainerLECHE = styled.div`
  padding: 0.5rem;
  margin: 1rem;
  border-radius: 8px;
  display: inline-block;
  width: 60%;
  box-sizing: border-box;
  background: linear-gradient(45deg, #E8F8F5, #7F8C8D, #F2F3F4);
  background-size: 400% 400%;
  animation: gradientAnimation 5s ease infinite;

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
    case 'SCH': return SCH_logo;
    case 'PAB': return PAB_logo;
    case 'DX1': return DX1_logo;
    case 'QUE': return QUE_logo;
    case 'SSO': return SSO_logo;
    case 'ANT': return ANT_logo;
    case 'EXP': return EXP_logo;
    case 'TAR': return TAR_logo;
    case 'GHO': return GHO_logo;
    case 'BAS': return BAS_logo;
    case 'ARQ': return ARQ_logo;
    case 'HDV': return HDV_logo;
    case 'RAM': return RAM_logo;
    case 'EVS': return EVS_logo;
    case 'ADO': return ADO_logo;
    case 'PMA': return PMA_logo;
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
            const data = results.data;
            const filteredData = data.filter(
              (partido) => partido.Partido >= 25 && partido.Partido <= 36
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

  const [pending, setPending] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPending(false);
    }, 1100);
  }, []);

  return (
    <>
      {pending ? (
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
              <CopaContainerPLATA>
                <Fase>
                  <div className="header" style={{ textAlign: 'center' }}>
                    <img src={medalla_plata} alt="Medalla de plata" style={{ width: '50px', height: 'auto', display: 'block', margin: 'auto' }} />
                    <h2 style={{ fontSize: '20px' }}><strong>MEDALLA DE PLATA</strong></h2>
                  </div>
                  <div class="w-full gap-x-2 flex justify-center items-center">
                    <div
                      class="w-5 bg-gray-800 h-5 rounded-full "
                    ></div>
                    <div
                      class="w-5 h-5 bg-gray-800 rounded-full "
                    ></div>
                    <div
                      class="w-5 h-5 bg-gray-800 rounded-full"
                    ></div>
                  </div>
                </Fase>
              </CopaContainerPLATA>
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
            <div className="copa-wrapper">
              <CopaContainerLECHE>
                <Fase>
                  <div className="header" style={{ textAlign: 'center' }}>
                    <img src={copa_aluminio} alt="Copa de aluminio" style={{ width: '50px', height: 'auto', display: 'block', margin: 'auto' }} />
                    <h2 style={{ fontSize: '20px' }}><strong>COPA DE ALUMINIO</strong></h2>
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
              </CopaContainerLECHE>
            </div>
          </CuadroContainer>
        </>
      ) : (
        <>
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
                    <Etapa>Semifinal</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido31_Equipo1)} alt="Equipo 1" />
                      <span><strong>{data.Partido31_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado">{displayResultOrDateTime(data.Partido31_Resultado, data.Partido31_Fecha, data.Partido31_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido31_Equipo2)} alt="Equipo 2" />
                      <span><strong>{data.Partido31_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                  <div style={{ borderLeft: '3px solid gray', height: '20px', marginLeft: '50%' }}></div>
                  <Partido>
                    <Etapa>Final</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido36_Equipo1)} alt="Equipo 3" />
                      <span><strong>{data.Partido36_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado" style={{ fontWeight: 'normal' }}>{displayResultOrDateTime(data.Partido36_Resultado, data.Partido36_Fecha, data.Partido36_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido36_Equipo2)} alt="Equipo 4" />
                      <span><strong>{data.Partido36_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                  <div style={{ borderLeft: '3px solid gray', height: '20px', marginLeft: '50%' }}></div>
                  <Partido>
                    <Etapa>Semifinal</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido32_Equipo1)} alt="Equipo 5" />
                      <span><strong>{data.Partido32_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado">{displayResultOrDateTime(data.Partido32_Resultado, data.Partido32_Fecha, data.Partido32_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido32_Equipo2)} alt="Equipo 6" />
                      <span><strong>{data.Partido32_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                </Fase>
              </CopaContainerORO>
            </div>
            <div className="copa-wrapper">
              <CopaContainerPLATA>
                <Fase>
                  <div className="header" style={{ textAlign: 'center' }}>
                    <img src={medalla_plata} alt="Medalla de plata" style={{ width: '50px', height: 'auto', display: 'block', margin: 'auto' }} />
                    <h2 style={{ fontSize: '20px' }}><strong>MEDALLA DE PLATA</strong></h2>
                  </div>
                  <Partido>
                    <Etapa>Semifinal</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido27_Equipo1)} alt="Equipo 1" />
                      <span><strong>{data.Partido27_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado">{displayResultOrDateTime(data.Partido27_Resultado, data.Partido27_Fecha, data.Partido27_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido27_Equipo2)} alt="Equipo 2" />
                      <span><strong>{data.Partido27_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                  <div style={{ borderLeft: '3px solid gray', height: '20px', marginLeft: '50%' }}></div>
                  <Partido>
                    <Etapa>Final</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido34_Equipo1)} alt="Equipo 3" />
                      <span><strong>{data.Partido34_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado" style={{ fontWeight: 'normal' }}>{displayResultOrDateTime(data.Partido34_Resultado, data.Partido34_Fecha, data.Partido34_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido34_Equipo2)} alt="Equipo 4" />
                      <span><strong>{data.Partido34_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                  <div style={{ borderLeft: '3px solid gray', height: '20px', marginLeft: '50%' }}></div>
                  <Partido>
                    <Etapa>Semifinal</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido28_Equipo1)} alt="Equipo 5" />
                      <span><strong>{data.Partido28_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado">{displayResultOrDateTime(data.Partido28_Resultado, data.Partido28_Fecha, data.Partido28_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido28_Equipo2)} alt="Equipo 6" />
                      <span><strong>{data.Partido28_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                </Fase>
              </CopaContainerPLATA>
            </div>
            <div className="copa-wrapper">
              <CopaContainerBRONCE>
                <Fase>
                  <div className="header" style={{ textAlign: 'center' }}>
                    <img src={medalla_bronce} alt="Medalla de bronce" style={{ width: '50px', height: 'auto', display: 'block', margin: 'auto' }} />
                    <h2 style={{ fontSize: '20px' }}><strong>MEDALLA DE BRONCE</strong></h2>
                  </div>
                  <Partido>
                    <Etapa>Semifinal</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido29_Equipo1)} alt="Equipo 1" />
                      <span><strong>{data.Partido29_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado">{displayResultOrDateTime(data.Partido29_Resultado, data.Partido29_Fecha, data.Partido29_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido29_Equipo2)} alt="Equipo 2" />
                      <span><strong>{data.Partido29_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                  <div style={{ borderLeft: '3px solid gray', height: '20px', marginLeft: '50%' }}></div>
                  <Partido>
                    <Etapa>Final</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido35_Equipo1)} alt="Equipo 3" />
                      <span><strong>{data.Partido35_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado" style={{ fontWeight: 'normal' }}>{displayResultOrDateTime(data.Partido35_Resultado, data.Partido35_Fecha, data.Partido35_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido35_Equipo2)} alt="Equipo 4" />
                      <span><strong>{data.Partido35_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                  <div style={{ borderLeft: '3px solid gray', height: '20px', marginLeft: '50%' }}></div>
                  <Partido>
                    <Etapa>Semifinal</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido30_Equipo1)} alt="Equipo 5" />
                      <span><strong>{data.Partido30_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado">{displayResultOrDateTime(data.Partido30_Resultado, data.Partido30_Fecha, data.Partido30_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido30_Equipo2)} alt="Equipo 6" />
                      <span><strong>{data.Partido30_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                </Fase>
              </CopaContainerBRONCE>
            </div>
            <div className="copa-wrapper">
              <CopaContainerLECHE>
                <Fase>
                  <div className="header" style={{ textAlign: 'center' }}>
                    <img src={copa_aluminio} alt="Copa de aluminio" style={{ width: '50px', height: 'auto', display: 'block', margin: 'auto' }} />
                    <h2 style={{ fontSize: '20px' }}><strong>COPA DE ALUMINIO</strong></h2>
                  </div>
                  <Partido>
                    <Etapa>Semifinal</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido25_Equipo1)} alt="Equipo 1" />
                      <span><strong>{data.Partido25_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado">{displayResultOrDateTime(data.Partido25_Resultado, data.Partido25_Fecha, data.Partido25_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido25_Equipo2)} alt="Equipo 2" />
                      <span><strong>{data.Partido25_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                  <div style={{ borderLeft: '3px solid gray', height: '20px', marginLeft: '50%' }}></div>
                  <Partido>
                    <Etapa>Final</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido33_Equipo1)} alt="Equipo 3" />
                      <span><strong>{data.Partido33_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado" style={{ fontWeight: 'normal' }}>{displayResultOrDateTime(data.Partido33_Resultado, data.Partido33_Fecha, data.Partido33_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido33_Equipo2)} alt="Equipo 4" />
                      <span><strong>{data.Partido33_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                  <div style={{ borderLeft: '3px solid gray', height: '20px', marginLeft: '50%' }}></div>
                  <Partido>
                    <Etapa>Semifinal</Etapa>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido26_Equipo1)} alt="Equipo 5" />
                      <span><strong>{data.Partido26_Equipo1 || '???'}</strong></span>
                    </div>
                    <div className="resultado">{displayResultOrDateTime(data.Partido26_Resultado, data.Partido26_Fecha, data.Partido26_Hora)}</div>
                    <div className="equipo">
                      <img src={getLogoForTeam(data.Partido26_Equipo2)} alt="Equipo 6" />
                      <span><strong>{data.Partido26_Equipo2 || '???'}</strong></span>
                    </div>
                  </Partido>
                </Fase>
              </CopaContainerLECHE>
            </div>
          </CuadroContainer>
        </>
      )}
    </>
  );
};

export default CuadroDeEliminatorias;