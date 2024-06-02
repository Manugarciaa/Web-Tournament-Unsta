import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
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

const logos = {
  BIM: BIM_logo,
  NOT: NOT_logo,
  MAL: MAL_logo,
  MUC: MUC_logo,
  DES: DES_logo,
};

const getLogo = (id) => {
  return logos[id] || null;
};

const circleColors = ['bg-yellow-500', 'bg-gray-400', 'bg-orange-800'];

const Estadisticas = () => {
  const [topGoleadores, setTopGoleadores] = useState([]);
  const [topEquiposGoleadores, setTopEquiposGoleadores] = useState([]);
  const [equiposMenosGoleados, setEquiposMenosGoleados] = useState([]);

  useEffect(() => {
    Papa.parse('/jugadoras_fem.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        calcularTopGoleadores(data);
      },
    });

    Papa.parse('/equipos_fem.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        calcularTopEquipos(data);
      },
    });
  }, []);

  const calcularTopGoleadores = (data) => {
    // Filtrar jugadores con goles válidos
    const jugadoresConGoles = data.filter(jugador => jugador.Goles && jugador.Goles !== "null");

    // Calcular top goleadores
    const goleadores = [...jugadoresConGoles].sort((a, b) => b.Goles - a.Goles).slice(0, 10);
    setTopGoleadores(goleadores);
  };

  const calcularTopEquipos = (data) => {
    // Filtrar equipos con goles válidos
    const equiposConGoles = data.filter(equipo => equipo.GF && equipo.GF !== "null" && equipo.GF > 0);
    const equiposConGC = data.filter(equipo => equipo.GC && equipo.GC !== "null" && equipo.GC >= 0);

    // Calcular top equipos goleadores
    const equiposGF = [...equiposConGoles].sort((a, b) => b.GF - a.GF).slice(0, 10);
    setTopEquiposGoleadores(equiposGF);

    // Calcular equipos menos goleados
    const equiposGC = [...equiposConGC].sort((a, b) => a.GC - b.GC).slice(0, 10);
    setEquiposMenosGoleados(equiposGC);
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-50">
      <Title>
        <span className="text-gradient">Estadísticas</span>
      </Title>
      <main className="flex-1 py-8 px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Goleadoras */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-4xl font-bold mb-4">Goleadoras</h2>
            <div className="space-y-6">
              {topGoleadores.map((jugador, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${circleColors[index] || 'bg-gray-800'}`}>
                      {index + 1}
                    </div>
                    <img src={getLogo(jugador.ID)} className="w-10 h-10"/>
                    <div>
                      <p className="font-medium">{jugador.Nombre} {jugador.Apellido}</p>
                      <p className="text-gray-400">{jugador.Equipo}</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-300">{jugador.Goles}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipos más goleadores */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-4xl font-bold mb-8">Equipos más goleadores</h2>
            <div className="space-y-10">
              {topEquiposGoleadores.map((equipo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${circleColors[index] || 'bg-gray-800'}`}>
                      {index + 1}
                    </div>
                    <img src={getLogo(equipo.ID)} className="w-10 h-10"/>
                    <p className="font-medium">{equipo.Equipo}</p>
                  </div>
                  <p className="font-bold text-gray-300">{equipo.GF}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipos menos goleados */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-4xl font-bold mb-8">Equipos menos goleados</h2>
            <div className="space-y-10">
              {equiposMenosGoleados.map((equipo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${circleColors[index] || 'bg-gray-800'}`}>
                      {index + 1}
                    </div>
                    <img src={getLogo(equipo.ID)} className="w-10 h-10"/>
                    <p className="font-medium">{equipo.Equipo}</p>
                  </div>
                  <p className="font-bold text-gray-300">{equipo.GC}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Estadisticas;