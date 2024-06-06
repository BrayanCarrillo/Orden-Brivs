import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// Importar componentes con lazy loading
const Inicio = lazy(() => import('./pages/inicio'));
const Login = lazy(() => import('./pages/Login'));
const Panel = lazy(() => import('./pages/admin/panel'));
const AdminUsuarios = lazy(() => import('./pages/admin/adminusuarios'));
const Ajustes = lazy(() => import('./pages/admin/Ajustes'));
const Categoria = lazy(() => import('./pages/admin/Categoria'));
const Mesa = lazy(() => import('./pages/admin/Mesa'));
const Ventas = lazy(() => import('./pages/admin/Ventas'));
const Paneljuan = lazy(() => import('./pages/empleados/cocina/Paneljuan'));
const Panelcocina = lazy(() => import('./pages/empleados/cocina/Panelcocina'));
const Ajustesjuan = lazy(() => import('./pages/empleados/cocina/Ajustesjuan'));
const PanelPedro = lazy(() => import('./pages/empleados/mesero/PanelPedro'));
const Orden = lazy(() => import('./pages/empleados/mesero/Orden'));
const AjustesPedro = lazy(() => import('./pages/empleados/mesero/AjustesPedro'));

function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="loading">
          <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
            <div className="wheel"></div>
            <div className="hamster">
              <div className="hamster__body">
                <div className="hamster__head">
                  <div className="hamster__ear"></div>
                  <div className="hamster__eye"></div>
                  <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
              </div>
            </div>
            <div className="spoke"></div>
          </div>
        </div>
      }>
        <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/adminusuarios" element={<AdminUsuarios />} />
          <Route path="/Ajustes" element={<Ajustes />} />
          <Route path="/Categoria" element={<Categoria />} />
          <Route path="/Mesa" element={<Mesa />} />
          <Route path="/Ventas" element={<Ventas />} />
          <Route path="/Paneljuan" element={<Paneljuan />} />
          <Route path="/Panelcocina" element={<Panelcocina />} />
          <Route path="/Ajustesjuan" element={<Ajustesjuan />} />
          <Route path="/PanelPedro" element={<PanelPedro />} />
          <Route path="/Orden" element={<Orden />} />
          <Route path="/AjustesPedro" element={<AjustesPedro />} />
          <Route path="/inicio" element={<Inicio />} />
          {/* Agrega otras rutas */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
