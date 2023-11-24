import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import axios from "axios";

function NuevaRifaComponent({ setSelectedOption }) {
  const [loading, setLoading] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_inicio, setFecha_inicio] = useState("");
  const [fecha_fin, setFecha_fin] = useState("");
  const [costo, setCosto] = useState("");
  const [num_boletos, setNum_boletos] = useState("");
  const [activa, setActiva] = useState("");

  // Estados de error
  const [nombreError, setNombreError] = useState("");
  const [descripcionError, setDescripcionError] = useState("");
  const [fechaInicioError, setFechaInicioError] = useState("");
  const [fechaFinError, setFechaFinError] = useState("");
  const [costoError, setCostoError] = useState("");
  const [numBoletosError, setNumBoletosError] = useState("");
  const [activaError, setActivaError] = useState("");
  const [error, setError] = useState(null);

  const handleGuardar = async () => {
    setLoading(true);

    const validationErrors = {};

    const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    const numeroRegex = /^\d+$/;
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!nombre.trim()) {
      validationErrors.nombre = "El campo Nombre es requerido";
    } else if (!textoRegex.test(nombre)) {
      validationErrors.nombre = "El campo Nombre solo puede contener letras y espacios";
    }

    if (!descripcion.trim()) {
      validationErrors.descripcion = "El campo Descripción es requerido";
    } else if (!textoRegex.test(descripcion)) {
      validationErrors.descripcion = "El campo Descripción solo puede contener letras y espacios";
    }

    if (!fecha_inicio.trim()) {
      validationErrors.fechaInicio = "El campo Fecha de Inicio es requerido";
    } else if (!fechaRegex.test(fecha_inicio)) {
      validationErrors.fechaInicio = "Formato de fecha incorrecto. Utiliza el formato YYYY-MM-DD";
    }

    if (!fecha_fin.trim()) {
      validationErrors.fechaFin = "El campo Fecha de Fin es requerido";
    } else if (!fechaRegex.test(fecha_fin)) {
      validationErrors.fechaFin = "Formato de fecha incorrecto. Utiliza el formato YYYY-MM-DD";
    }

    if (!costo.trim()) {
      validationErrors.costo = "El campo Costo es requerido";
    } else if (!numeroRegex.test(costo)) {
      validationErrors.costo = "El campo Costo solo puede contener números";
    }

    if (!num_boletos.trim()) {
      validationErrors.numBoletos = "El campo Número de Boletos es requerido";
    } else if (!numeroRegex.test(num_boletos)) {
      validationErrors.numBoletos = "El campo Número de Boletos solo puede contener números";
    }

    if (!activa.trim()) {
      validationErrors.activa = "El campo Activa es requerido";
    } else if (!textoRegex.test(activa)) {
      validationErrors.activa = "El campo Activa solo puede contener letras y espacios";
    }

    // Actualizar estados de error
    setNombreError(validationErrors.nombre || "");
    setDescripcionError(validationErrors.descripcion || "");
    setFechaInicioError(validationErrors.fechaInicio || "");
    setFechaFinError(validationErrors.fechaFin || "");
    setCostoError(validationErrors.costo || "");
    setNumBoletosError(validationErrors.numBoletos || "");
    setActivaError(validationErrors.activa || "");

    if (Object.keys(validationErrors).length === 0) {
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
        if (response.data === "ok") {
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
    }
  };

  return (
    <div className="form-r">
      <div className="row">
        <div className={`input-field ${nombreError && 'error'}`}>
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onFocus={() => setNombreError("")}
            onBlur={() => !nombre.trim() && setNombreError("El campo Nombre es requerido")}
          />
          {nombreError && <p className="error-message" style={{position: 'absolute', top: '-15px', fontSize: '12px', color: 'red'}} >{nombreError}</p>}
        </div>
        <div className={`input-field ${descripcionError && 'error'}`}>
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            onFocus={() => setDescripcionError("")}
            onBlur={() => !descripcion.trim() && setDescripcionError("El campo Descripción es requerido")}
          />
          {descripcionError && <p className="error-message" style={{ position: 'absolute', top: '-15px', fontSize: '12px', color: 'red'}}>{descripcionError}</p>}
        </div>
        <div className={`input-field ${fechaInicioError && 'error'}`}>
          <i className="fas fa-user"></i>
          <input
            type="date"
            value={fecha_inicio}
            onChange={(e) => setFecha_inicio(e.target.value)}
            onFocus={() => setFechaInicioError("")}
            onBlur={() => !fecha_inicio.trim() && setFechaInicioError("El campo Fecha de Inicio es requerido")}
          />
          {fechaInicioError && <p className="error-message" style={{ position: 'absolute', top: '-15px', fontSize: '12px', color: 'red'}} >{fechaInicioError}</p>}
        </div>
      </div>
      <div className="row">
        <div className={`input-field ${fechaFinError && 'error'}`}>
          <i className="fas fa-user"></i>
          <input
            type="date"
            value={fecha_fin}
            onChange={(e) => setFecha_fin(e.target.value)}
            onFocus={() => setFechaFinError("")}
            onBlur={() => !fecha_fin.trim() && setFechaFinError("El campo Fecha de Fin es requerido")}
          />
          {fechaFinError && <p className="error-message" style={{ position: 'absolute', top: '-15px', fontSize: '12px', color: 'red'}} >{fechaFinError}</p>}
        </div>
        <div className={`input-field ${costoError && 'error'}`}>
          <i className="fas fa-user"></i>
          <input
            type="number"
            placeholder="Costo"
            value={costo}
            onChange={(e) => setCosto(e.target.value)}
            onFocus={() => setCostoError("")}
            onBlur={() => !costo.trim() && setCostoError("El campo Costo es requerido")}
          />
          {costoError && <p className="error-message" style={{ position: 'absolute', top: '-15px', fontSize: '12px', color: 'red'}}>{costoError}</p>}
        </div>
        <div className={`input-field ${numBoletosError && 'error'}`}>
          <i className="fas fa-user"></i>
          <input
            type="number"
            placeholder="Número de Boletos"
            value={num_boletos}
            onChange={(e) => setNum_boletos(e.target.value)}
            onFocus={() => setNumBoletosError("")}
            onBlur={() => !num_boletos.trim() && setNumBoletosError("El campo Número de Boletos es requerido")}
          />
          {numBoletosError && <p className="error-message" style={{ position: 'absolute', top: '-15px', fontSize: '12px', color: 'red'}}>{numBoletosError}</p>}
        </div>
      </div>
      <div className="row">
        <div className={`input-field ${activaError && 'error'}`}>
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Activa"
            value={activa}
            onChange={(e) => setActiva(e.target.value)}
            onFocus={() => setActivaError("")}
            onBlur={() => !activa.trim() && setActivaError("El campo Activa es requerido")}
          />
          {activaError && <p className="error-message"  style={{ position: 'absolute', top: '-15px', fontSize: '12px', color: 'red'}}>{activaError}</p>}
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
