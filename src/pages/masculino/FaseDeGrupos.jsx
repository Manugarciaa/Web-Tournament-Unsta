import React, { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
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

const logos = {
  TBD: TBD_logo,
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
};

const getLogo = (id) => {
  return logos[id] || null;
};

const GroupTable = ({ groupName, teams }) => {
  const sortedTeams = useMemo(() => {
    return teams.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      } else if (b.goalDifference !== a.goalDifference) {
        return b.goalDifference - a.goalDifference;
      } else {
        return b.goalsFor - a.goalsFor; 
      }
    });
  }, [teams]);

  return (
    <div className="flex flex-col items-center mb-10 sm:mb-16">
      <div className="w-full flex justify-center mb-5">
        <b className="text-white text-4xl sm:text-4xl">{groupName}</b>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-white">
              <th className="px-2 py-1 text-xl">#</th>
              <th className="px-2 py-1 text-xl">Equipo</th>
              <th className="px-2 py-1 text-xl">Pts</th>
              <th className="sm:table-cell px-2 py-1 text-xl">PJ</th>
              <th className="hidden sm:table-cell px-2 py-1 text-xl">PG</th>
              <th className="hidden sm:table-cell px-2 py-1 text-xl">PE</th>
              <th className="hidden sm:table-cell px-2 py-1 text-xl">PP</th>
              <th className="hidden sm:table-cell px-2 py-1 text-xl">GF</th>
              <th className="hidden sm:table-cell px-2 py-1 text-xl">GC</th>
              <th className="sm:table-cell px-2 py-1 text-xl">Dif</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr className="text-white border-b-2 border-gray-300" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.1)' }} key={index}>
                <td className="px-2 py-2 sm:px-4 sm:py-4 flex justify-center items-center">
                  {index < 2 ? (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-200 shadow-md">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                  ) : index < 4 ? (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-00 shadow-md">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                  ) : index < 6 ? (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-00 shadow-md">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-400 shadow-md">
                      <span className="flex items-center justify-center h-full text-black font-bold text-lg">{index + 1}</span>
                    </div>
                  )}
                </td>
                <td className="px-2 py-1 sm:px-4 sm:py-3" colSpan={1}>
                  <div className="flex items-center">
                    {team.logo && (
                      <img src={team.logo} className="h-12 sm:h-12 mr-3 sm:mr-3" alt={`Logo ${team.name}`} />
                    )}
                    <span className="text-3xl">{team.name}</span>
                  </div>
                </td>
                <td className="px-2 py-1 sm:px-3 sm:py-2 font-bold text-center text-xl">{team.points}</td>
                <td className="sm:table-cell px-2 py-1 sm:px-3 sm:py-2 text-center text-xl">{team.played}</td>
                <td className="hidden sm:table-cell px-2 py-1 sm:px-3 sm:py-2 text-center text-xl">{team.won}</td>
                <td className="hidden sm:table-cell px-2 py-1 sm:px-3 sm:py-2 text-center text-xl">{team.drawn}</td>
                <td className="hidden sm:table-cell px-2 py-1 sm:px-3 sm:py-2 text-center text-xl">{team.lost}</td>
                <td className="hidden sm:table-cell px-2 py-1 sm:px-3 sm:py-2 text-center text-xl">{team.goalsFor}</td>
                <td className="hidden sm:table-cell px-2 py-1 sm:px-3 sm:py-2 text-center text-xl">{team.goalsAgainst}</td>
                <td className="sm:table-cell px-2 py-1 sm:px-3 sm:py-2 text-center text-xl">{team.goalDifference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FaseDeGrupos = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/fase_grupos_masc.csv');
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
          },
          error: (error) => {
            console.error('Error al parsear el CSV:', error);
            setError('Error al parsear el archivo CSV');
          }
        });
      } catch (error) {
        console.error('Error al cargar el archivo CSV:', error);
        setError('Error al cargar el archivo CSV');
      }
    };

    fetchData();
  }, []);

  const groups = useMemo(() => {
    const grupoA = data.filter(item => item.Grupo === 'Grupo A');
    const grupoB = data.filter(item => item.Grupo === 'Grupo B');
    
    return [
      {
        groupName: 'Grupo A',
        teams: grupoA.map((item) => ({
          name: item.Equipo,
          points: item.Pts,
          played: item.PJ,
          won: item.PG,
          drawn: item.PE,
          lost: item.PP,
          goalsFor: item.GF,
          goalsAgainst: item.GC,
          goalDifference: item['Dif'],
          logo: getLogo(item.ID)
        })),
      },
      {
        groupName: 'Grupo B',
        teams: grupoB.map((item) => ({
          name: item.Equipo,
          points: item.Pts,
          played: item.PJ,
          won: item.PG,
          drawn: item.PE,
          lost: item.PP,
          goalsFor: item.GF,
          goalsAgainst: item.GC,
          goalDifference: item['Dif'],
          logo: getLogo(item.ID)
        })),
      },
    ];
  }, [data]);

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="flex-1 font-poppins font-semibold text-[32px] text-white leading-[35px] xl:text-[50px] xl:leading-[75px] mb-5">
        <span className="text-gradient">Fase de grupos</span>
      </h1>
      {groups.map((group, index) => (
        <GroupTable key={index} groupName={group.groupName} teams={group.teams} />
      ))}
    </div>
  );
};

export default FaseDeGrupos;