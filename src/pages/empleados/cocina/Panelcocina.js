import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillControl } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdRestaurant } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import './Panelcocina.css';

function Panelcocina() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000); // Actualizar cada 3 segundos
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/chef/all-orders');
      const allOrders = response.data.orders;

      // Filtrar las órdenes que tienen al menos un detalle
      const ordersWithDetails = allOrders.filter(order => order.orderDetails.length > 0);

      // Limitar la cantidad de órdenes a mostrar a 10 órdenes
      const limitedOrders = ordersWithDetails.slice(0, 10);

      setOrders(limitedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/chef/update-order-status/${orderId}`, { status: newStatus });
      fetchOrders(); // Actualizar la lista de órdenes después de cambiar el estado
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/chef/delete-order/${orderId}`);
      fetchOrders(); // Actualizar la lista de órdenes después de eliminar la orden
    } catch (error) {
      console.error('Error deleting order:', error);
    }
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
        <div className="content">
          <div className="iconos">
            <span className="icon">
              <AiFillControl />
            </span>
            <h2>Listado de Últimas Órdenes Recibidas</h2>
          </div>
          <div className="table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Menú</th>
                  <th>Item de Menú</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  order.orderDetails.map(detail => (
                    <tr key={detail['ID de orden']}>
                      <td>{detail['ID de orden']}</td>
                      <td>{detail.menu}</td>
                      <td>{detail.menuItemName}</td>
                      <td>{detail.cantidad}</td>
                      <td>{detail.estado}</td>
                      <td>
                        {detail.estado === 'esperando' && (
                          <>
                            <button className="preparando-btn" onClick={() => handleUpdateStatus(detail['ID de orden'], 'preparando')}>Preparando</button>
                            <button className="cancelar-btn" onClick={() => handleUpdateStatus(detail['ID de orden'], 'cancelado')}>Cancelar</button>
                          </>
                        )}
                        {detail.estado === 'preparando' && (
                          <button className="listo-btn" onClick={() => handleUpdateStatus(detail['ID de orden'], 'listo')}>Listo</button>
                        )}
                        {detail.estado === 'listo' && (
                          <button className="cancelar-btn" onClick={() => handleUpdateStatus(detail['ID de orden'], 'cancelado')}>Cancelar</button>
                        )}
                        <button className="limpiar-btn" onClick={() => handleDeleteOrder(detail['ID de orden'])}>Limpiar</button>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panelcocina;
