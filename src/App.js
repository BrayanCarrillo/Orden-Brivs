import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Inicio from './pages/inicio';
import Login from './pages/Login';
import Panel from './pages/admin/panel';
import AdminUsuarios from './pages/admin/adminusuarios';
import Ajustes from './pages/admin/Ajustes';
import Categoria from './pages/admin/Categoria';
import Mesa from './pages/admin/Mesa';
import Ventas from './pages/admin/Ventas';
import Paneljuan from './pages/empleados/cocina/Paneljuan';
import Panelcocina from './pages/empleados/cocina/Panelcocina';
import Ajustesjuan from './pages/empleados/cocina/Ajustesjuan';
import PanelPedro from './pages/empleados/mesero/PanelPedro';
import Orden from './pages/empleados/mesero/Orden';
import AjustesPedro from './pages/empleados/mesero/AjustesPedro';
import Avanzado from './pages/admin/avanzado'; 


function App() {
  return (
    <Router>
      <Suspense fallback={<div className="loading">Loading...</div>}>
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
          <Route path="/avanzado" element={<Avanzado />} /> 

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
