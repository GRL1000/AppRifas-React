import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import axios from "axios";
import {useLocation, useNavigate } from "react-router-dom";

function NuevaRifaComponent(setSelectedOption) {

  const [loading, setLoading] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_inicio, setFecha_inicio] = useState("");
  const [fecha_fin, setFecha_fin] = useState("");
  const [costo, setCosto] = useState("");
  const [num_boletos, setNum_boletos] = useState("");
  const [activa, setActiva] = useState("");
  const [error, setError] = useState(null);

  const handleGuardar = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/rifas/guardar',
        {
          nombre: nombre,
          descripcion: descripcion,
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
          costo: costo,
          num_boletos: num_boletos,
          activa: activa,
        }
      );

      setRegistroExitoso(true);
      console.log(response.data);
      if (response.data == "ok") {
        setSelectedOption("rifas");
      } else {
        setError("Error al guardar. Por favor inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error al guardar rifa: ", error);
      setError("Ocurrió un error. ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-r">
      <div className="row">
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="date"
            value={fecha_inicio}
            onChange={(e) => setFecha_inicio(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="date"
            value={fecha_fin}
            onChange={(e) => setFecha_fin(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="number"
            placeholder="Costo"
            value={costo}
            onChange={(e) => setCosto(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="number"
            placeholder="Número de Boletos"
            value={num_boletos}
            onChange={(e) => setNum_boletos(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Activa"
            value={activa}
            onChange={(e) => setActiva(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          className={`btn ${registroExitoso ? 'success' : 'solid'}`}
          style={{ backgroundColor: registroExitoso ? green[500] : '' }}
          onClick={handleGuardar}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : registroExitoso ? (
            '¡Registrado!'
          ) : (
            'Registrar'
          )}
        </button>
      </div>
    </div>
  );
}

export default NuevaRifaComponent;
