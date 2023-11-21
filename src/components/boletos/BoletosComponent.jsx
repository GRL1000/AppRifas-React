import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Bounce } from "react-awesome-reveal";
import exit from '../../assets/exit.png';
import Button from '@mui/material/Button';

function BoletosComponent() {
  const location = useLocation();
  const [mostrarBoletos, setMostrarBoletos] = useState(false);
  const [boletos, setBoletos] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleShowConfirmationModal = () => setShowConfirmationModal(true);

  const handleMostrarBoletosClick = () => {
    setMostrarBoletos(!mostrarBoletos);
  };

  const [rifa, setRifa] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    costo: 0,
    num_boletos: 0,
    activa: "",
  });

  const handleBoletoClick = (numeroBoleto) => {
    setBoletos((prevBoletos) => {
      const boletoIndex = prevBoletos.indexOf(numeroBoleto);
      if (boletoIndex !== -1) {
        // Si el boleto ya está marcado, lo desmarcamos
        return [...prevBoletos.slice(0, boletoIndex), ...prevBoletos.slice(boletoIndex + 1)];
      } else {
        // Si el boleto no está marcado, lo marcamos
        return [...prevBoletos, numeroBoleto];
      }
    });
  };

  const fnObtenerDatos = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/rifa", {
        params: {
          id: location.state.id,
        },
      })
      .then((response) => {
        console.log(response.data);
        setRifa(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    console.log("Render");
    if (location.state.id !== 0) {
      fnObtenerDatos();
    }
  }, []);

  const renderBotonesBoletos = () => {
    const botones = [];

    for (let i = 1; i <= rifa.num_boletos; i++) {
      const isBoletoMarcado = boletos.includes(i);
      botones.push(
        <button
        className={`bg-blue-500 hover:bg-green-700 focus:outline-none text-white font-bold py-2 px-4 rounded-full mr-2 mb-2 ${isBoletoMarcado ? 'bg-green-500' : ''}`}
        key={i}
        onClick={() => handleBoletoClick(i)}
      >
        {i}
      </button>
      );
    }

    return botones;
  };

  return (
    <div className="mx-auto w-4/5 p-8 bg-gray-100 rounded-lg shadow-md mt-10">
      <div className="mb-4 text-center grid grid-cols-2 gap-4">
        <div>
          <label className="text-lg font-bold">Descripción</label>
          <h1 className="text-2xl font-bold">{rifa.descripcion}</h1>
        </div>
        <div>
          <label className="text-lg font-bold">Fecha de Inicio</label>
          <h1 className="text-2xl font-bold">{rifa.fecha_inicio}</h1>
        </div>
        <div>
          <label className="text-lg font-bold">Fecha de Fin</label>
          <h1 className="text-2xl font-bold">{rifa.fecha_fin}</h1>
        </div>
        <div>
          <label className="text-lg font-bold">Costo de Boletos</label>
          <h1 className="text-2xl font-bold">{rifa.costo}</h1>
        </div>
        <div>
          <label className="text-lg font-bold">Boletos Disponibles</label>
          <h1 className="text-2xl font-bold">{rifa.num_boletos}</h1>
        </div>
      </div>

      <button
        className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
        onClick={() => handleMostrarBoletosClick()}
      >
        Mostrar Boletos
      </button>

      {mostrarBoletos && (
        <div className="flex flex-wrap justify-center mt-4">
          {renderBotonesBoletos()}
      </div>
      )}
      <div className="flex flex-wrap justify-center mt-4">
      {boletos.length > 0 && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mx-2 my-2"
            onClick={() => handleShowConfirmationModal()}
          >
            Apartar Boletos
          </button>
        )}
      </div>
      <Dialog open={showConfirmationModal} onClose={handleCloseConfirmationModal} TransitionComponent={Bounce}
      PaperProps={{
        style: {
          marginTop: '15.5%',
        }
      }}>
      <DialogContent style={{ textAlign: 'center' }}>
        <img src={exit} alt="Éxito" style={{ width: '100px', height: '100px', marginTop: '20px' }} />
        <p style={{ fontSize: '20px', paddingTop: '20px', paddingBottom: '20px' }}>¡Operación realizada con éxito!</p>
        <ul>
          {boletos.map((boleto) => (
            <li key={boleto}>{boleto}</li>
          ))}
        </ul>
        <Button variant="contained" color="primary" onClick={handleCloseConfirmationModal}>
          OK
        </Button>
      </DialogContent>
    </Dialog>
    </div>
  );
}

export default BoletosComponent;
