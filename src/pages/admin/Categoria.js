import React, { useState, useEffect } from "react";
import axios from "axios";
import './Categoria.css';
import { AiFillControl } from "react-icons/ai";
import { MdOutlineRestaurant } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { MdTableRestaurant } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Button, Alert, FormControl, InputGroup, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Categoria() {
  const [categorias, setCategorias] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [filteredPlatos, setFilteredPlatos] = useState([]);
  const [menus, setMenus] = useState([]);
  
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [categoriaIdToUpdate, setCategoriaIdToUpdate] = useState(null);
  const [showCategoryAlert, setShowCategoryAlert] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [nombrePlato, setNombrePlato] = useState("");
  const [precioPlato, setPrecioPlato] = useState("");
  const [menuIdPlato, setMenuIdPlato] = useState("");
  const [platoEditando, setPlatoEditando] = useState(null);
  const [showDishAlert, setShowDishAlert] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);

  const [searchTermCategoria, setSearchTermCategoria] = useState("");
  const [searchTermPlato, setSearchTermPlato] = useState("");

  const [currentPageCategorias, setCurrentPageCategorias] = useState(1);
  const [currentPagePlatos, setCurrentPagePlatos] = useState(1);
  const itemsPerPage = 10;

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/menu-categories");
      setCategorias(response.data);
      setFilteredCategorias(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const obtenerPlatos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/menu-platos");
      const platosConEstado = response.data.map(plato => {
        if (!('activate' in plato)) {
          return { ...plato, activate: true };
        }
        return plato;
      });
      setPlatos(platosConEstado);
      setFilteredPlatos(platosConEstado);
    } catch (error) {
      console.error("Error al obtener los platos:", error);
    }
  };

  const obtenerMenus = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/menu-categories");
      setMenus(response.data);
    } catch (error) {
      console.error("Error al obtener los menús:", error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
    obtenerPlatos();
    obtenerMenus();
  }, []);

  const handleAgregarCategoria = async () => {
    try {
      if (categoriaIdToUpdate) {
        await axios.put(`http://127.0.0.1:8000/api/menu-categories/${categoriaIdToUpdate}`, {
          nombre: nombreCategoria,
        });
        setCategoriaIdToUpdate(null);
      } else {
        await axios.post("http://127.0.0.1:8000/api/menu-categories", {
          nombre: nombreCategoria,
          activate: true,
        });
      }
      obtenerCategorias();
      setNombreCategoria("");
    } catch (error) {
      console.error("Error al agregar o actualizar categoría:", error);
    }
  };

  const handleAgregarPlato = async () => {
    try {
      if (platoEditando) {
        const platoActualizado = {
          menuItemName: nombrePlato,
          price: precioPlato,
          menuID: menuIdPlato,
        };
        await axios.put(`http://127.0.0.1:8000/api/menu-platos/${platoEditando.itemID}`, platoActualizado);
        setPlatoEditando(null);
      } else {
        await axios.post("http://127.0.0.1:8000/api/menu-platos", {
          menuItemName: nombrePlato,
          price: precioPlato,
          menuID: menuIdPlato,
          activate: true,
        });
      }
      obtenerPlatos();
      setNombrePlato("");
      setPrecioPlato("");
      setMenuIdPlato("");
    } catch (error) {
      console.error("Error al agregar o actualizar plato:", error);
    }
  };

  const handleEliminarCategoria = async (id) => {
    try {
      setShowCategoryAlert(true);
      setCategoryToDelete(id);
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  const handleEliminarPlato = async (id) => {
    try {
      setShowDishAlert(true);
      setDishToDelete(id);
    } catch (error) {
      console.error("Error al eliminar plato:", error);
    }
  };

  const handleConfirmDeleteCategory = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/menu-categories/${categoryToDelete}`);
      obtenerCategorias();
      setShowCategoryAlert(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  const handleConfirmDeleteDish = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/menu-platos/${dishToDelete}`);
      obtenerPlatos();
      setShowDishAlert(false);
      setDishToDelete(null);
    } catch (error) {
      console.error("Error al eliminar plato:", error);
    }
  };

  const handleEditarCategoria = (id, nombre) => {
    setCategoriaIdToUpdate(id);
    setNombreCategoria(nombre);
  };

  const handleCambiarEstadoCategoria = async (id, nuevoEstado) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/menu-categories/${id}/cambiar-estado`, {
        activate: nuevoEstado,
      });
      obtenerCategorias();
    } catch (error) {
      console.error("Error al cambiar estado de la categoría:", error);
    }
  };

  const handleEditarClick = (plato) => {
    setPlatoEditando(plato);
    setNombrePlato(plato.menuItemName);
    setPrecioPlato(plato.price);
    setMenuIdPlato(plato.menuID);
  };

  const handleCambiarEstadoPlato = async (itemID, nuevoEstado) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/menu-platos/${itemID}/estado`, {
        activate: nuevoEstado ? 1 : 0,
      });
      setPlatos(platos.map(plato => {
        if (plato.itemID === itemID) {
          return { ...plato, activate: response.data.activate };
        }
        return plato;
      }));
    } catch (error) {
      console.error("Error al cambiar estado del plato:", error);
    }
  };

  const handleSearchCategoria = (e) => {
    setSearchTermCategoria(e.target.value);
    if (e.target.value === "") {
      setFilteredCategorias(categorias);
    } else {
      setFilteredCategorias(
        categorias.filter(categoria =>
          categoria.menuName.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const handleSearchPlato = (e) => {
    setSearchTermPlato(e.target.value);
    if (e.target.value === "") {
      setFilteredPlatos(platos);
    } else {
      setFilteredPlatos(
        platos.filter(plato =>
          plato.menuItemName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          plato.price.toString().includes(e.target.value) ||
          (plato.menu && plato.menu.toLowerCase().includes(e.target.value.toLowerCase()))
        )
      );
    }
  };

  const handlePageChangeCategoria = (pageNumber) => {
    setCurrentPageCategorias(pageNumber);
  };

  const handlePageChangePlato = (pageNumber) => {
    setCurrentPagePlatos(pageNumber);
  };

  const renderCategorias = () => {
    const indexOfLastItem = currentPageCategorias * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCategorias.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems.map((categoria) => (
      <div className="categoria-card" key={categoria.menuID}>
        <p>{categoria.menuName}</p>
        <div>
          <Button variant="secondary" onClick={() => handleEditarCategoria(categoria.menuID, categoria.menuName)}>Editar</Button>
          <Button variant="danger" onClick={() => handleEliminarCategoria(categoria.menuID)}>Eliminar</Button>
          <Button onClick={() => handleCambiarEstadoCategoria(categoria.menuID, !categoria.activate)}>
            {categoria.activate ? 'Desactivar' : 'Activar'}
          </Button>
        </div>
      </div>
    ));
  };

  const renderPlatos = () => {
    const indexOfLastItem = currentPagePlatos * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPlatos.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems.map((plato) => (
      <tr key={plato.itemID}>
        <td>{plato.itemID}</td>
        <td>{plato.menuItemName}</td>
        <td>{plato.price}</td>
        <td>{plato.menu ? plato.menu : "N/A"}</td>
        <td>{plato.activate ? 'Activo' : 'Inactivo'}</td>
        <td>
          <div className="d-flex">
            <Button variant="danger" onClick={() => handleEliminarPlato(plato.itemID)}>Eliminar</Button>
            <Button variant="secondary" onClick={() => handleEditarClick(plato)}>Editar</Button>
            <Button onClick={() => handleCambiarEstadoPlato(plato.itemID, !plato.activate)}>
              {plato.activate ? 'Desactivar' : 'Activar'}
            </Button>
          </div>
        </td>
      </tr>
    ));
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
        <div className="content">
          <div className="card">
            <div className="card-header">
              <h2>Lista de Categorías</h2>
              <input
                type="text"
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}
                placeholder="Nombre de la categoría"
              />
              <Button variant="primary" onClick={handleAgregarCategoria}>{categoriaIdToUpdate ? 'Actualizar Categoría' : 'Agregar Categoría'}</Button>
              <InputGroup className="mb-3 mt-3">
                <FormControl
                  placeholder="Buscar Categoría"
                  aria-label="Buscar Categoría"
                  aria-describedby="basic-addon2"
                  value={searchTermCategoria}
                  onChange={handleSearchCategoria}
                />
              </InputGroup>
            </div>
            <div className="card-body">
              {renderCategorias()}
              <Pagination>
                {[...Array(Math.ceil(filteredCategorias.length / itemsPerPage)).keys()].map(number => (
                  <Pagination.Item key={number + 1} active={number + 1 === currentPageCategorias} onClick={() => handlePageChangeCategoria(number + 1)}>
                    {number + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h1>Lista de Platos</h1>
              <input
                type="text"
                value={nombrePlato}
                onChange={(e) => setNombrePlato(e.target.value)}
                placeholder="Nombre del plato"
              />
              <input
                type="text"
                value={precioPlato}
                onChange={(e) => setPrecioPlato(e.target.value)}
                placeholder="Precio (COP)"
              />
              <select value={menuIdPlato} onChange={(e) => setMenuIdPlato(e.target.value)}>
                <option value="">Seleccione un menú</option>
                {menus.map((menu) => (
                  <option key={menu.menuID} value={menu.menuID}>{menu.menuName}</option>
                ))}
              </select>
              <Button variant="primary" onClick={handleAgregarPlato}>{platoEditando ? "Actualizar Plato" : "Agregar Plato"}</Button>
              <InputGroup className="mb-3 mt-3">
                <FormControl
                  placeholder="Buscar Plato"
                  aria-label="Buscar Plato"
                  aria-describedby="basic-addon2"
                  value={searchTermPlato}
                  onChange={handleSearchPlato}
                />
              </InputGroup>
            </div>
            <div className="card-body">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre del Plato</th>
                    <th>Precio (COP)</th>
                    <th>Menú</th>
                    <th>Estado</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {renderPlatos()}
                </tbody>
              </table>
              <Pagination>
                {[...Array(Math.ceil(filteredPlatos.length / itemsPerPage)).keys()].map(number => (
                  <Pagination.Item key={number + 1} active={number + 1 === currentPagePlatos} onClick={() => handlePageChangePlato(number + 1)}>
                    {number + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      <Alert show={showCategoryAlert} variant="danger" className="alert-fixed">
        <Alert.Heading>¡Atención!</Alert.Heading>
        <p>
          ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se podrá deshacer y podría afectar tus consultas o los datos del sistema recomendamos "Desactivar" Antes que borrar.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleConfirmDeleteCategory} variant="danger">
            Sí, eliminar
          </Button>
          <Button onClick={() => setShowCategoryAlert(false)} variant="success">
            Cancelar
          </Button>
        </div>
      </Alert>

      <Alert show={showDishAlert} variant="danger" className="alert-fixed">
        <Alert.Heading>¡Atención!</Alert.Heading>
        <p>
          ¿Estás seguro de que deseas eliminar este plato? Esta acción no se podrá deshacer y podría afectar tus consultas.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleConfirmDeleteDish} variant="danger">
            Sí, eliminar
          </Button>
          <Button onClick={() => setShowDishAlert(false)} variant="success">
            Cancelar
          </Button>
        </div>
      </Alert>
    </div>
  );
}

export default Categoria;
