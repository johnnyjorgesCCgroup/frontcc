import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Typography, Button, Box, TextField, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function contentInventory() {
    const [incidentes, setIncidentes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [switchOn, setSwitchOn] = useState(false);
    const [nuevaIncidencia, setNuevaIncidencia] = useState({});
    const [crearModalOpen, setCrearModalOpen] = useState(false);

    const obtenerIncidentes = async () => {
        try {
            const response = await fetch("https://api.cvimport.com/api/cut");
            if (response.ok) {
                const data = await response.json();
                const incidentesFiltrados = data.data.filter(incidente => incidente.origin === "VENTA");
                setIncidentes(incidentesFiltrados);
            } else {
                console.error("Error de fetch", response.statusText);
            }
        } catch (error) {
            console.error("Error de bd", error);
        }
    }

    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    useEffect(() => {
        obtenerIncidentes();
    }, []);

    const handleRowClick = (id) => {
        const incident = incidentes.find(incidente => incidente.id === id);
        setSelectedIncident(incident); // Corregir el nombre de la función setSelectedIncident
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleOpenCrearModal = () => {
        setCrearModalOpen(true);
    }

    const handleSwitchChange = () => {
        setSwitchOn(!switchOn);
    }

    const handleNuevaIncidenciaChange = (e) => {
        const { name, value } = e.target;
        setNuevaIncidencia({ ...nuevaIncidencia, [name]: value });
    }

    const handleEstadoChange = (e) => {
        const { value } = e.target;
        setNuevaIncidencia({ ...nuevaIncidencia, estado: value });
    }

    const buttonBackgroundColor = switchOn ? "#22FF94" : "#9C27B0";

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0 },
        { field: 'oc', headerName: 'Orden', flex: 0 },
        { field: 'date', headerName: 'Fecha', flex: 0 },
        {
            field: 'user_id', headerName: 'Asesor', flex: 1, renderCell: (params) => (
                <>{params.row.user_id === 20 ? "Sheyla Ramirez Cruz" : params.row.user_id === 21 ? "Rodrigo" : params.row.user_id === 15 ? "Daniel Lama" : params.row.user_id === 11 ? "Francis" : params.row.user_id === 15 ? "Daniel Lama" : params.row.user_id === 5 ? "Julio Soporte" : params.row.user_id === 15 ? "Daniel Lama" : params.row.user_id === 18 ? "Johnny Soporte": "Usuario No registrado"}</>
        ),
        },
        { field: 'price', headerName: 'Precio', flex: 0 },
        { field: 'status', headerName: 'Estado', flex: 0, renderCell: (params) => (
            <>{params.row.status === 0 ? "Etiqueta" : params.row.status === 1 ? "Etiqueta" : params.row.status === 2 ? "En Ruta" : params.row.status === 3 ? "Entregado" : params.row.status === 4 ? "Anulado" : params.row.status === 5 ? "Devolución" : "N/A"}
            </>
        )},
        { field: 'client', headerName: 'Cliente', flex: 1 },
        { field: 'product', headerName: 'Producto', flex: 1 },
        {
            field: 'action',
            headerName: 'Acción',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                    size="small"
                    onClick={() => handleRowClick(params.row.id)}
                >
                    Ver Detalles
                </Button>
            ),
        },
    ];

    const options = {
        filterType: 'checkbox',
        print: false,
        search: true,
    };

    return (
        <div className="content-wrapper">
            <div className="card" style={{ padding: 20 }}>
                <div className="card card-outline">
                    <div className="card-header border-0">
                        <div className="row mb-2" style={{ alignItems: "center" }}>
                            <div className="col-sm-6">
                                <h3 className="card-title">
                                    <b>Dashboard Ventas y Incidencias</b>
                                </h3>
                                <Switch id="switch1" {...label} checked={switchOn} onChange={handleSwitchChange} color="secondary" size="small" />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "15%", justifyContent: "center", textAlign: "center" }}>
                        <div className="card card-outline" style={{ padding: "10px", display: "block" }}>
                            <b><i className='fas fa-cash-register' style={{ fontSize: "28px", color: "#1A5276", margin: "5px" }} /></b>
                            <span className='info-box-text' style={{ margin: "5px" }}>Sheyla</span>
                            <b><span className='info-box-number' style={{ fontSize: "15px", margin: "5px" }}>S/0</span></b>
                        </div>
                        <div className="card card-outline" style={{ padding: "10px", display: "block" }}>
                            <b><i className='fas fa-cash-register' style={{ fontSize: "28px", color: "#1A5276", margin: "5px" }} /></b>
                            <span className='info-box-text' style={{ margin: "5px" }}>Daniel</span>
                            <b><span className='info-box-number' style={{ fontSize: "15px", margin: "5px" }}>S/0</span></b>
                        </div>
                        <div className="card card-outline" style={{ padding: "10px", display: "block" }}>
                            <b><i className='fas fa-cash-register' style={{ fontSize: "28px", color: "#1A5276", margin: "5px" }} /></b>
                            <span className='info-box-text' style={{ margin: "5px" }}>Francis</span>
                            <b><span className='info-box-number' style={{ fontSize: "15px", margin: "5px" }}>S/0</span></b>
                        </div>
                        <div className="card card-outline" style={{ padding: "10px", display: "block" }}>
                            <b><i className='fas fa-cash-register' style={{ fontSize: "28px", color: "#1A5276", margin: "5px" }} /></b>
                            <span className='info-box-text' style={{ margin: "5px" }}>Rodrigo</span>
                            <b><span className='info-box-number' style={{ fontSize: "15px", margin: "5px" }}>S/0</span></b>
                        </div>
                    </div>
                    <div className="card card-outline" style={{ width: "15%", marginLeft: "10px", justifyContent: "center", textAlign: "center" }}>
                        <div style={{ height: "15%", display: "inline-block", width: "fit-content", backgroundColor: "#1A5276", borderRadius: "10px", padding: "10px", margin: "0 auto", textAlign: "center", marginBottom: "5px", color: "white" }}>
                            <p>
                                <i className='fas fa-bullseye'></i>{" "}Objetivo del mes</p></div>
                        <div style={{ height: "65%", display: "flex", fontSize: "30px", alignItems: "center", justifyContent: "center" }}><b>S/0.00</b></div>
                    </div>
                    <div className='card card-outline' style={{ width: "70%", marginLeft: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <o style={{ fontSize: "50px" }}>Aca va la linea de tendencia</o>
                    </div>
                </div>
                <div className="card-body table-responsive p-0 table-bordered table-hover">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', width: '100%' }}>
                            <DataGrid
                                rows={incidentes}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 7,
                                        },
                                    },
                                }}
                                pageSize={5}
                                pageSizeOptions={[7, 10, 15]}
                                autoHeight
                                checkboxSelection
                                {...options}
                            />
                        </div>
                        <Modal open={modalOpen} onClose={handleCloseModal}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                {selectedIncident && (
                                    <>
                                        <Typography variant="h6" gutterBottom component="div">
                                            {selectedIncident.nombre}
                                        </Typography>
                                        <Typography>
                                            Empleado: {selectedIncident.empleado}<br />
                                            Area: {selectedIncident.area}<br />
                                            Observaciones: {selectedIncident.detalles}<br />
                                        </Typography>
                                    </>
                                )}
                            </div>
                        </Modal>
                    </Box>
                </div>
            </div>
        </div>
    );
}
