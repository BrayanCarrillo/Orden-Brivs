import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillControl } from "react-icons/ai";
import { MdOutlineRestaurant } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { MdTableRestaurant } from "react-icons/md";
import { Link } from "react-router-dom";
import { Table, Form, Button, Container, Row, Col, Pagination } from 'react-bootstrap';

function Ajustes() {
  const [users, setUsers] = useState([]);
  const [newPasswords, setNewPasswords] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/empleados")
      .then((response) => {
        const { empleados } = response.data;
        const newPasswordsObj = {};
        empleados.forEach((user) => {
          newPasswordsObj[user.staffID] = "";
        });
        setNewPasswords(newPasswordsObj);
        setUsers(empleados);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  }, []);

  const handleInputChange = (e, id) => {
    const value = e.target.value;
    setNewPasswords((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const newPassword = newPasswords[id];
    if (!id || !newPassword) {
      alert("Por favor proporciona una nueva contraseña.");
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/api/empleados/${id}/cambiar-contrasena`, {
        password: newPassword,
      })
      .then((response) => {
        console.log(response.data);
        alert("Contraseña cambiada correctamente.");
      })
      .catch((error) => {
        console.error("Error al cambiar contraseña:", error);
        alert("Error al cambiar la contraseña. Consulta la consola para más detalles.");
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container-fluid">
      <header className="navbar">
        <h1>Placeres del mar | OrdenBrivs</h1>
      </header>
      <div className="wrapper">
        <div className="sidebar">
          <ul>
            <SidebarItem icon={<AiFillControl size={20} />} to="/panel" text="Panel de Control" />
            <SidebarItem icon={<MdOutlineRestaurant size={20} />} to="/Categoria" text="Menú" />
            <SidebarItem icon={<MdEventAvailable size={20} />} to="/Ventas" text="Ventas" />
            <SidebarItem icon={<IoPersonCircle size={20} />} to="/adminusuarios" text="Empleados" />
            <SidebarItem icon={<MdTableRestaurant size={20} />} to="/Mesa" text="Mesas" />
            <SidebarItem icon={<IoMdSettings size={20} />} to="/Ajustes" text="Ajustes" />
            <SidebarItem icon={<FaPowerOff size={20} />} to="/inicio" text="Cerrar sesión" />
          </ul>
        </div>
        <div className="content">
          <Container fluid className="mt-4">
            <Row className="mb-3">
              <Col md={6}>
                <h2>Usuarios</h2>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Buscar usuario"
                  value={search}
                  onChange={handleSearch}
                />
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Nombre de Usuario</th>
                  <th>Rol</th>
                  <th>Nueva Contraseña</th>
                  <th>Cambiar Contraseña</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.staffID}>
                    <td>{user.staffID}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <Form.Control
                        type="password"
                        placeholder="Escribe la nueva contraseña"
                        value={newPasswords[user.staffID]}
                        onChange={(e) => handleInputChange(e, user.staffID)}
                      />
                    </td>
                    <td>
                      <Button variant="primary" onClick={(e) => handleSubmit(e, user.staffID)}>
                        Cambiar Contraseña
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {pageNumbers.map(number => (
                <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
          </Container>
        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, to, text }) => (
  <li>
    <div className="iconosbarra">
      {icon}
      <Link to={to} className="nav-link">
        {text}
      </Link>
    </div>
  </li>
);

export default Ajustes;
