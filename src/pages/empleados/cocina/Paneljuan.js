import React, { useState, useEffect } from "react";
import { AiFillControl } from "react-icons/ai";
import { MdRestaurant } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './Paneljuan.css'; // Importa tu archivo CSS

function Paneljuan() {
  const [ordenes, setOrdenes] = useState([]);
  const [empleados, setEmpleados] = useState([
    { nombre: "Juan", cargo: "Chef", estado: "Online" },
    // Agrega más empleados según sea necesario
  ]);

  useEffect(() => {
    fetchOrdenesListas();
  }, []);

  const fetchOrdenesListas = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/ordenes/listas');
      const data = await response.json();
      setOrdenes(data.ordenes.slice(0, 5)); // Mostrar como máximo 5 órdenes
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  };

  const toggleEstado = (index) => {
    const updatedEmpleados = [...empleados];
    updatedEmpleados[index].estado = updatedEmpleados[index].estado === "Online" ? "Offline" : "Online";
    setEmpleados(updatedEmpleados);
  };

  return (
    <div>
      <header className="navbar">
        <h1>Placeres del mar | OrdenBrivs</h1>
      </header>
      <div className="wrapper">
        <div className="sidebar">
          <ul>
            <li>
              <div className="iconosbarra">
                <AiFillControl size={20} /> {/* Icono de cubiertos */}
                <Link to="/Paneljuan" className="nav-link">Panel de control</Link>
              </div>
            </li>
            <li>
              <div className="iconosbarra">
                <MdRestaurant size={20} /> {/* Icono de restaurante */}
                <Link to="/Panelcocina" className="nav-link">Cocina</Link>
              </div>
            </li>
            <li>
              <div className="iconosbarra">
                <FaPowerOff size={20} />
                <Link to="/inicio" className="nav-link">Cerrar sesión</Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="container">
          <div className="content">
            <div className="page-title">
              <h1 className="text-center mt-4">Panel de empleado</h1>
              <p className="lead text-center">Las más recientes órdenes listas</p>
              <div className="table-container">
                <table className="table table1">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Estado</th>
                      <th>Total</th>
                      <th>Fecha</th>
                      <th>Mesa</th>
                      <th>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenes.map((orden) => (
                      <tr key={orden.orderID}>
                        <td>{orden.orderID}</td>
                        <td>{orden.estado}</td>
                        <td>{orden.total}</td>
                        <td>{orden.fecha_orden}</td>
                        <td>{orden.mesaID}</td>
                        <td>{orden.menuItemName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Tabla de personal */}
            <div className="card">
              <div className="card-header">
                Estado
              </div>
              <div className="card-body">
                <table className="table table2">
                  <thead>
                    <tr>
                      <th>Personal</th>
                      <th>Cargo</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empleados.map((empleado, index) => (
                      <tr key={index}>
                        <td>{empleado.nombre}</td>
                        <td>{empleado.cargo}</td>
                        <td>
                          <button 
                            onClick={() => toggleEstado(index)} 
                            style={{ backgroundColor: empleado.estado === "Online" ? "green" : "red", color: "white" }}
                          >
                            {empleado.estado}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paneljuan;
