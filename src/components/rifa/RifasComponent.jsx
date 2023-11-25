import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate, Link } from "react-router-dom";
import exit from '../../assets/exit.png';
import { Slide, Zoom, Bounce, Flip, Rotate, JackInTheBox } from "react-awesome-reveal";
import AvisoPrivacidadComponent from '../AvisoPrivacidadComponent';
import logout from '../../assets/cerrar-sesion.png';
import LoadingScreenComponent from "../LoadingScreenComponent";

function RifasComponent() {
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [avisoPrivacidadOpen, setAvisoPrivacidadOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedRifaId, setSelectedRifaId] = React.useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const [selectedRifaData, setSelectedRifaData] = React.useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleShowConfirmationModal = () => setShowConfirmationModal(true);

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    console.log("ID: " + params.row.id);
    console.log("Nombre: " + params.row.nombre); //se toman de colums - fields
    console.log("Descripción: " + params.row.descripcion);
    console.log("Fecha inicio: " + params.row.fecha_inicio);
    console.log("Fecha fin: " + params.row.fecha_fin);
    console.log("Costo: " + params.row.costo);
    console.log("Número de boletos: " + params.row.num_boletos);
    console.log("Activa: " + params.row.activa);
    navigate("/boletos", {
      state: {
        id: params.row.id,
      },
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 110,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fecha_inicio",
      headerName: "Fecha de Inicio",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fecha_fin",
      headerName: "Fecha de Termino",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "costo",
      headerName: "Costo",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "num_boletos",
      headerName: "Número de Boletos",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "activa",
      headerName: "Rifa Activa",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "acciones",
      headerName: "Operaciones",
      width: 160,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" startIcon={<EditIcon style={{ color: 'black' }} />}
              onClick={(event) => handleUpdate(params.id, event)}
              style={{backgroundColor: '#FFC107', paddingRight: '5px', marginRight: '5px' }}
            ></Button>

            <Button variant="contained" startIcon={<DeleteIcon />}
              onClick={(event) => handleOpenDeleteDialog(params.id, event)}
              style={{backgroundColor:'#C82333', paddingRight:'5px'}}
            ></Button>
          </div>
        </div>
      ),
    },
  ];

  const fnRifas = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/rifas', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('secure_token')}`,
        },
      });
      setRows(response.data);
    } catch (error) {
      console.error("Error al obtener las rifas: ", error);
      setError("Error al obtener las rifas. ");
    }
  };

  const handleShowAvisoPrivacidad = () => {
    setAvisoPrivacidadOpen(true);
  };

  const handleCloseAvisoPrivacidad = () => {
    setAvisoPrivacidadOpen(false);
  };

  const handleUpdate = (id, event) => {
    event.stopPropagation();
    const selectedRifa = rows.find((row) => row.id === id);
    setSelectedRifaData(selectedRifa);
    setUpdateDialogOpen(true);
  };

  const handleUpdateRifa = async () => {
    try {
      const updatedRifa = selectedRifaData;
      await axios.post('http://localhost:8000/api/rifas/guardar', updatedRifa);
      const updatedRows = rows.map((row) =>
        row.id === updatedRifa.id ? updatedRifa : row
      );
      setRows(updatedRows);

      handleShowConfirmationModal();
      setUpdateDialogOpen(false);
    } catch (error) {
      console.error('Error al actualizar la rifa:', error);
    }
  };

  const handleDelete = async () => {
    const id = selectedRifaId;
    try {
      await axios.delete(`http://localhost:8000/api/rifas/borrar?id=${id}`);

      const updatedRows = rows.filter((row) => row.id !== id);

      setRows(updatedRows);
      handleShowConfirmationModal();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
    }
  };
  
  const handleOpenDeleteDialog = (id, event) => {
    event.stopPropagation();
    setSelectedRifaId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  React.useEffect(() => {
    fnRifas();
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);

    // Simula un tiempo de carga para mostrar el Loading Screen
    setTimeout(() => {
      // Limpia el token y redirige a la página de inicio
      localStorage.removeItem("secure_token");
      navigate("/");
    }, 2000); // Ajusta el tiempo según tus necesidades
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
              {isLoading && <LoadingScreenComponent/>}

      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} onRowClick={handleRowClick} />
      
      <Dialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        TransitionComponent={Slide}
        fullWidth={true}
        maxWidth={'md'}
        PaperProps={{
          style: {
            marginTop: '10%',
          }
        }}
      >
        <DialogContent>
          {selectedRifaData && (
              <div className="form-r">
                <div className="row">
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={selectedRifaData.nombre}
                      onChange={(e) =>
                        setSelectedRifaData({ ...selectedRifaData, nombre: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      placeholder="Descripción"
                      value={selectedRifaData.descripcion}
                      onChange={(e) =>
                        setSelectedRifaData({ ...selectedRifaData, descripcion: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="date"
                      value={selectedRifaData.fecha_inicio}
                      onChange={(e) => setSelectedRifaData({ ...selectedRifaData, fecha_inicio: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="date"
                      value={selectedRifaData.fecha_fin}
                      onChange={(e) => setSelectedRifaData({ ...selectedRifaData, fecha_fin: e.target.value })}
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="number"
                      placeholder="Costo"
                      value={selectedRifaData.costo}
                      onChange={(e) => setSelectedRifaData({ ...selectedRifaData, costo: e.target.value })}
                    />
                  </div>
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="number"
                      placeholder="Número de Boletos"
                      value={selectedRifaData.num_boletos}
                      onChange={(e) => setSelectedRifaData({ ...selectedRifaData, num_boletos: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      placeholder="Activa"
                      value={selectedRifaData.activa}
                      onChange={(e) => setSelectedRifaData({ ...selectedRifaData, activa: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                </div>
              </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={() => setUpdateDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleUpdateRifa} style={{backgroundColor: '#FFC107', color: 'black'}}>
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog} TransitionComponent={JackInTheBox}
      PaperProps={{
        style: {
          marginTop: '20%',
        }
      }}>
        <DialogTitle>Espera...</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar esta rifa?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleCloseDeleteDialog}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleDelete} style={{backgroundColor:'#C82333'}}>
          Eliminar
        </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showConfirmationModal} onClose={handleCloseConfirmationModal} TransitionComponent={Bounce}
      PaperProps={{
        style: {
          marginTop: '15.5%',
        }
      }}>
      <DialogContent style={{ textAlign: 'center' }}>
        <img src={exit} alt="Éxito" style={{ width: '100px', height: '100px', marginTop: '20px' }} />
        <p style={{ fontSize: '20px', paddingTop: '20px', paddingBottom: '20px' }}>¡Operación realizada con éxito!</p>
        <Button variant="contained" color="primary" onClick={handleCloseConfirmationModal}>
          OK
        </Button>
      </DialogContent>
    </Dialog>

    <Button variant="contained" style={{marginTop: '10px'}} onClick={handleShowAvisoPrivacidad}>
        Mostrar Aviso de Privacidad
      </Button>

      <div>
        <IconButton style={{marginTop: '-40px', marginLeft: '1200px'}} onClick={handleLogout}>
          <img src={logout} alt="Cerrar Sesión" style={{width: '50px'}} />
        </IconButton>
      </div>

      <Dialog
        open={avisoPrivacidadOpen}
        onClose={handleCloseAvisoPrivacidad}
      >
        <DialogTitle>Aviso de Privacidad</DialogTitle>
        <DialogContent>
          <AvisoPrivacidadComponent handleClose={handleCloseAvisoPrivacidad} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseAvisoPrivacidad} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RifasComponent;
