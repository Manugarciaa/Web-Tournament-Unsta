import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from 'react';

import styles from "./style";

import Header from "./components/Header";
import Home from "./pages/Home";
import EncabezadoM from "./components/EncabezadoM";
import EncabezadoF from "./components/EncabezadoF";
import Footer from "./components/Footer";
import EquiposM from './pages/masculino/Equipos';
import EquiposF from './pages/femenino/Equipos';

const SCH = lazy(() => import('./pages/masculino/equipos/SCH'));
const PAB = lazy(() => import('./pages/masculino/equipos/PAB'));
const DX1 = lazy(() => import('./pages/masculino/equipos/DX1'));
const QUE = lazy(() => import('./pages/masculino/equipos/QUE'));
const SSO = lazy(() => import('./pages/masculino/equipos/SSO'));
const ANT = lazy(() => import('./pages/masculino/equipos/ANT'));
const EXP = lazy(() => import('./pages/masculino/equipos/EXP'));
const TAR = lazy(() => import('./pages/masculino/equipos/TAR'));
const GHO = lazy(() => import('./pages/masculino/equipos/GHO'));
const BAS = lazy(() => import('./pages/masculino/equipos/BAS'));
const ARQ = lazy(() => import('./pages/masculino/equipos/ARQ'));
const HDV = lazy(() => import('./pages/masculino/equipos/HDV'));
const RAM = lazy(() => import('./pages/masculino/equipos/RAM'));
const EVS = lazy(() => import('./pages/masculino/equipos/EVS'));
const ADO = lazy(() => import('./pages/masculino/equipos/ADO'));
const PMA = lazy(() => import('./pages/masculino/equipos/PMA'));
const PartidosM = lazy(() => import('./pages/masculino/Partidos'));
const FaseDeGruposM = lazy(() => import('./pages/masculino/FaseDeGrupos'));
const CuadroDeEliminatoriasM = lazy(() => import('./pages/masculino/CuadroDeEliminatorias'));
const EstadisticasM = lazy(() => import('./pages/masculino/Estadisticas'));
const BIM = lazy(() => import('./pages/femenino/equipos/BIM'));
const NOT = lazy(() => import('./pages/femenino/equipos/NOT'));
const MAL = lazy(() => import('./pages/femenino/equipos/MAL'));
const MUC = lazy(() => import('./pages/femenino/equipos/MUC'));
const DES = lazy(() => import('./pages/femenino/equipos/DES'));
const PartidosF = lazy(() => import('./pages/femenino/Partidos'));
const FaseDeGruposF = lazy(() => import('./pages/femenino/FaseDeGrupos'));
const CuadroDeEliminatoriasF = lazy(() => import('./pages/femenino/CuadroDeEliminatorias'));
const EstadisticasF = lazy(() => import('./pages/femenino/Estadisticas'));

const App = () => {
  useEffect(() => {
    const preventZoom = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    document.addEventListener('wheel', preventZoom, { passive: false });

    return () => {
      document.removeEventListener('wheel', preventZoom);
    };
  }, []);

  return (
    <div className={`${styles.backgroundColor} w-full overflow-hidden animated-gradient-background`}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <BrowserRouter>
            <Suspense fallback={<div></div>}>
              <Routes>
                <Route path="/" element={<> <Header /> <Home /> <Footer /> </>} />
                <Route path="/masculino/partidos" element={<> <EncabezadoM /> <PartidosM /> </>} />
                <Route path="/masculino/equipos" element={<> <EncabezadoM /> <EquiposM /> </>} />
                <Route path="/masculino/equipos/SCH" element={<> <EncabezadoM /> <SCH /> </>} />
                <Route path="/masculino/equipos/PAB" element={<> <EncabezadoM /> <PAB /> </>} />
                <Route path="/masculino/equipos/DX1" element={<> <EncabezadoM /> <DX1 /> </>} />
                <Route path="/masculino/equipos/QUE" element={<> <EncabezadoM /> <QUE /> </>} />
                <Route path="/masculino/equipos/SSO" element={<> <EncabezadoM /> <SSO /> </>} />
                <Route path="/masculino/equipos/ANT" element={<> <EncabezadoM /> <ANT /> </>} />
                <Route path="/masculino/equipos/EXP" element={<> <EncabezadoM /> <EXP /> </>} />
                <Route path="/masculino/equipos/TAR" element={<> <EncabezadoM /> <TAR /> </>} />
                <Route path="/masculino/equipos/GHO" element={<> <EncabezadoM /> <GHO /> </>} />
                <Route path="/masculino/equipos/BAS" element={<> <EncabezadoM /> <BAS /> </>} />
                <Route path="/masculino/equipos/ARQ" element={<> <EncabezadoM /> <ARQ /> </>} />
                <Route path="/masculino/equipos/HDV" element={<> <EncabezadoM /> <HDV /> </>} />
                <Route path="/masculino/equipos/RAM" element={<> <EncabezadoM /> <RAM /> </>} />
                <Route path="/masculino/equipos/EVS" element={<> <EncabezadoM /> <EVS /> </>} />
                <Route path="/masculino/equipos/ADO" element={<> <EncabezadoM /> <ADO /> </>} />
                <Route path="/masculino/equipos/PMA" element={<> <EncabezadoM /> <PMA /> </>} />
                <Route path="/masculino/fase_de_grupos" element={<> <EncabezadoM /> <FaseDeGruposM /> </>} />
                <Route path="/masculino/cuadro_de_eliminatorias" element={<> <EncabezadoM /> <CuadroDeEliminatoriasM /> </>} />
                <Route path="/masculino/estadisticas" element={<> <EncabezadoM /> <EstadisticasM /> </>} />
                <Route path="/femenino/partidos" element={<> <EncabezadoF /> <PartidosF /> </>} />
                <Route path="/femenino/equipos" element={<> <EncabezadoF /> <EquiposF /> </>} />
                <Route path="/femenino/equipos/BIM" element={<> <EncabezadoF /> <BIM /> </>} />
                <Route path="/femenino/equipos/NOT" element={<> <EncabezadoF /> <NOT /> </>} />
                <Route path="/femenino/equipos/MAL" element={<> <EncabezadoF /> <MAL /> </>} />
                <Route path="/femenino/equipos/MUC" element={<> <EncabezadoF /> <MUC /> </>} />
                <Route path="/femenino/equipos/DES" element={<> <EncabezadoF /> <DES /> </>} />
                <Route path="/femenino/fase_de_grupos" element={<> <EncabezadoF /> <FaseDeGruposF /> </>} />
                <Route path="/femenino/cuadro_de_eliminatorias" element={<> <EncabezadoF /> <CuadroDeEliminatoriasF /> </>} />
                <Route path="/femenino/estadisticas" element={<> <EncabezadoF /> <EstadisticasF /> </>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;