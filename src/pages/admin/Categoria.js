import React, { useState, useEffect } from "react";
import axios from "axios";
import './Categoria.css'; // Importa tus estilos CSS aquí
import { AiFillControl } from "react-icons/ai";
import { MdOutlineRestaurant } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { MdTableRestaurant } from "react-icons/md";
import { Link } from 'react-router-dom';

function Categoria() {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [categoriaIdToUpdate, setCategoriaIdToUpdate] = useState(null);

  const [platos, setPlatos] = useState([]);
  const [nombrePlato, setNombrePlato] = useState("");
  const [precioPlato, setPrecioPlato] = useState("");
  const [menuIdPlato, setMenuIdPlato] = useState("");
  const [menus, setMenus] = useState([]);
  const [platoEditando, setPlatoEditando] = useState(null);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/menu-categories");
      setCategorias(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const obtenerPlatos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/menu-platos");
      console.log("Platos recibidos:", response.data);
  
      // Verifica si cada plato tiene el estado 'activate' definido, si no, establece 'activate' como true
      const platosConEstado = response.data.map(plato => {
        if (!('activate' in plato)) {
          return { ...plato, activate: true };
        }
        return plato;
      });
  
      setPlatos(platosConEstado);
    } catch (error) {
      console.error("Error al obtener los platos:", error);
    }
  };
  
  const obtenerMenus = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/menu-categories");
      console.log("Menús recibidos:", response.data);
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
          activate: true, // Valor predeterminado para activate
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
        const response = await axios.post("http://127.0.0.1:8000/api/menu-platos", {
          menuItemName: nombrePlato,
          price: precioPlato,
          menuID: menuIdPlato,
          activate: true, // Asegúrate de enviar el campo activate
        });
        console.log("Plato agregado:", response.data);
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
      await axios.delete(`http://127.0.0.1:8000/api/menu-categories/${id}`);
      obtenerCategorias();
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  const handleEliminarPlato = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/menu-platos/${id}`);
      console.log("Plato eliminado:", id);
      obtenerPlatos();
    } catch (error) {
      console.error("Error al eliminar plato:", error);
    }
  };

  const handleEditarCategoria = (id, nombre) => {
    setCategoriaIdToUpdate(id);
    setNombreCategoria(nombre);
  };

  const handleEditarClick = (plato) => {
    setNombrePlato(plato.menuItemName);
    setPrecioPlato(plato.price);
    setMenuIdPlato(plato.menuID);
    setPlatoEditando(plato);
  };

  const handleCambiarEstadoCategoria = async (id, nuevoEstado) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/menu-categorias/${id}/cambiar-estado`, {
        activate: nuevoEstado,
      });
      console.log("Estado de la categoría cambiado:", response.data);
      obtenerCategorias();
    } catch (error) {
      console.error("Error al cambiar estado de la categoría:", error);
    }
  };

  const handleCambiarEstadoPlato = async (itemID, nuevoEstado) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/platos/${itemID}/estado`, {
        activate: nuevoEstado ? 1 : 0,
      });
      console.log("Estado del plato cambiado:", response.data);
  
      // Actualiza el estado del plato con el nuevo valor de activate
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
            {/* Resto de los elementos de la barra lateral */}
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
              <button onClick={handleAgregarCategoria}>{categoriaIdToUpdate ? 'Actualizar Categoría' : 'Agregar Categoría'}</button>
            </div>
            <div className="card-body">
              {categorias.map((categoria) => (
                <div className="categoria-card" key={categoria.menuID}>
                  <p>{categoria.menuName}</p>
                  <div>
                    <button className="edit-btn" onClick={() => handleEditarCategoria(categoria.menuID, categoria.menuName)}>Editar</button>
                    <button className="delete-btn" onClick={() => handleEliminarCategoria(categoria.menuID)}>Eliminar</button>
                    {/* Botón para cambiar estado */}
                    <button onClick={() => handleCambiarEstadoCategoria(categoria.menuID, !categoria.activate)}>
                      {categoria.activate ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>
              ))}
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
              <button onClick={handleAgregarPlato}>{platoEditando ? "Actualizar Plato" : "Agregar Plato"}</button>
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
                  {platos.map((plato) => (
                    <tr key={plato.itemID}>
                      <td>{plato.itemID}</td>
                      <td>{plato.menuItemName}</td>
                      <td>{plato.price}</td>
                      <td>{plato.menu ? plato.menu : "N/A"}</td>
                      <td>{plato.activate ? 'Activo' : 'Inactivo'}</td>
                      <td>
                        <button onClick={() => handleEliminarPlato(plato.itemID)}>Eliminar</button>
                        <button onClick={() => handleEditarClick(plato)}>Editar</button>
                        <button onClick={() => handleCambiarEstadoPlato(plato.itemID, !plato.activate)}>
                          {plato.activate ? 'Desactivar' : 'Activar'}
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
  );
}

export default Categoria;
