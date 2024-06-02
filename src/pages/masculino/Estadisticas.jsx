import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import SCH_logo from '../../assets/images/SCH_icon.webp';
import PAB_logo from '../../assets/images/PAB_icon.webp';
import DX1_logo from '../../assets/images/DX1_icon.webp';
import QUE_logo from '../../assets/images/QUE_icon.webp';
import SZO_logo from '../../assets/images/SZO_icon.webp';
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

const logos = {
  SCH: SCH_logo,
  PAB: PAB_logo,
  DX1: DX1_logo,
  QUE: QUE_logo,
  SZO: SZO_logo,
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
};

const getLogo = (id) => {
  return logos[id] || null;
};

const circleColors = ['bg-yellow-500', 'bg-gray-400', 'bg-yellow-300'];

const Estadisticas = () => {
  const [topGoleadores, setTopGoleadores] = useState([]);
  const [topEquiposGoleadores, setTopEquiposGoleadores] = useState([]);
  const [equiposMenosGoleados, setEquiposMenosGoleados] = useState([]);

  useEffect(() => {
    Papa.parse('/jugadores.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        calcularTopGoleadores(data);
      },
    });

    Papa.parse('/equipos_masc.csv', {
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
      <main className="flex-1 py-8 px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Goleadores */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-4xl font-bold mb-4">Goleadores</h2>
            <div className="space-y-4">
              {topGoleadores.map((jugador, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-400 font-bold ${circleColors[index] || 'bg-gray-800'}`}>
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

          {/* Top Equipos Goleadores */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-4xl font-bold mb-4">Equipos más goleadores</h2>
            <div className="space-y-4">
              {topEquiposGoleadores.map((equipo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-400 font-bold ${circleColors[index] || 'bg-gray-800'}`}>
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

          {/* Equipos Menos Goleados */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-4xl font-bold mb-4">Equipos menos goleados</h2>
            <div className="space-y-4">
              {equiposMenosGoleados.map((equipo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-400 font-bold ${circleColors[index] || 'bg-gray-800'}`}>
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