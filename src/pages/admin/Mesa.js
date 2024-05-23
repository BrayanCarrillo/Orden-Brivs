import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillControl } from "react-icons/ai";
import { MdOutlineRestaurant } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { MdTableRestaurant } from "react-icons/md";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import "./Mesa.css"; // Archivo de estilos CSS

function Mesa() {
  const [mesas, setMesas] = useState([]);
  const [nuevaMesaNumero, setNuevaMesaNumero] = useState("");

  useEffect(() => {
    obtenerMesas();
  }, []);

  const obtenerMesas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/mesas");
      console.log("Mesas obtenidas:", response.data);
      setMesas(response.data);
    } catch (error) {
      console.error("Error al obtener las mesas:", error);
    }
  };

  const agregarMesa = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/mesas", {
        mesaID: parseInt(nuevaMesaNumero),
      });
      console.log("Mesa agregada:", response.data);
      obtenerMesas();
      setNuevaMesaNumero("");
    } catch (error) {
      console.error("Error al agregar mesa:", error);
    }
  };

  const cambiarEstadoMesa = async (mesaID, activate) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/mesas/${mesaID}/cambiar-estado`, {
        activate: activate,
      });
      console.log("Estado de la mesa cambiado:", response.data);
      obtenerMesas();
    } catch (error) {
      console.error("Error al cambiar estado de la mesa:", error);
    }
  };

  const eliminarMesa = async (mesaID) => {
    try {
      await axios.delete(`http://localhost:8000/api/mesas/${mesaID}`);
      console.log("Mesa eliminada:", mesaID);
      obtenerMesas();
    } catch (error) {
      console.error("Error al eliminar mesa:", error);
    }
  };

  return (
    <Container>
      <header className="navbar">
        <h1>Placeres del mar | OrdenBrivs</h1>
      </header>
      <Row className="justify-content-start">
        <Col sm={3} className="pl-0">
          <div className="contenedor">
            <div className="sidebar">
              <ul>
                <li>
                  <div className="iconosbarra">
                    <AiFillControl size={20} />
                    <Link to="/panel" className="nav-link">Panel de Control</Link>
                  </div>
                </li>
                <li>
                  <div className="iconosbarra">
                    <MdOutlineRestaurant size={20} />
                    <Link to="/Categoria" className="nav-link">Menú</Link>
                  </div>
                </li>
                <li>
                  <div className="iconosbarra">
                    <MdEventAvailable size={20} />
                    <Link to="/Ventas" className="nav-link">Ventas</Link>
                  </div>
                </li>
                <li>
                  <div className="iconosbarra">
                    <IoPersonCircle size={20} />
                    <Link to="/adminusuarios" className="nav-link">Empleados</Link>
                  </div>
                </li>
                <li>
                  <div className="iconosbarra">
                    <MdTableRestaurant size={20} />
                    <Link to="/Mesa" className="nav-link">Mesas</Link>
                  </div>
                </li>
                <li>
                  <div className="iconosbarra">
                    <IoMdSettings size={20} />
                    <Link to="/Ajustes" className="nav-link">Ajustes</Link>
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
          </div>
        </Col>
        <Col sm={9}>
          <div className="contenido">
            <h1>Mesas</h1>
            <div className="mesas-container">
              <Row>
                {mesas.map((mesa) => (
                  <Col key={mesa.mesaID} sm={4}>
                    <Card className="mb-3">
                      <Card.Body>
                        <Card.Title>Mesa {mesa.mesaID}</Card.Title>
                        <Button variant="danger" className="mr-2" onClick={() => eliminarMesa(mesa.mesaID)}>Eliminar</Button>
                        <Button variant="primary" onClick={() => cambiarEstadoMesa(mesa.mesaID, !mesa.activate)}>
                          {mesa.activate ? "Desactivar" : "Activar"}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                <Col sm={4}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Agregar Mesa</Card.Title>
                      <Form>
                        <Form.Group controlId="formNumeroMesa">
                          <Form.Control type="text" value={nuevaMesaNumero} onChange={(e) => setNuevaMesaNumero(e.target.value)} placeholder="Número de Mesa" />
                        </Form.Group>
                        <Button variant="success" onClick={agregarMesa}>Agregar Mesa</Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Mesa;
