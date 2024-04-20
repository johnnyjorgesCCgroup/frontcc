import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Typography, Button, Box, TextField, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCopy } from '@fortawesome/free-solid-svg-icons';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function contentInventory() {
    const [incidentes, setIncidentes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [switchOn, setSwitchOn] = useState(false);
    const [today, setToday] = useState(new Date());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const obtenerIncidentes = async () => {
        try {
            const response = await fetch("https://api.cvimport.com/api/cut");
            if (response.ok) {
                const data = await response.json();
                setIncidentes(data.data);
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

    const handleTodayClick = () => {
        const todayIncidents = incidentes.filter(incident => {
            const incidentDate = new Date(incident.date_cut);
            const todayDate = new Date();
            todayDate.setDate(todayDate.getDate() - 1);
            return incidentDate.toDateString() === todayDate.toDateString();
        });
        setIncidentes(todayIncidents);
    }

    const handleYesterdayClick = () => {
        const yesterdayIncidents = incidentes.filter(incident => {
            const incidentDate = new Date(incident.date_cut);
            const yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 2);
            return incidentDate.toDateString() === yesterdayDate.toDateString();
        });
        setIncidentes(yesterdayIncidents);
    }

    const handleAllDatesClick = () => {
        obtenerIncidentes(); // Recargar todos los incidentes
    }

    const handlePlatformFilter = (platform) => {
        const platformIncidents = incidentes.filter(incident => incident.origin.toLowerCase() === platform.toLowerCase());
        setIncidentes(platformIncidents);
    }

    const copyToClipboard = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };

    const buttonBackgroundColor = switchOn ? "#22FF94" : "#9C27B0";

    const columns = [
        { field: 'id', headerName: 'Id', flex: 0 },
        { field: 'date_cut', headerName: 'Fecha de Corte', flex: 0 },
        { field: 'date', headerName: 'Fecha de Subida', flex: 0 },
        { field: 'origin', headerName: 'Plataforma', flex: 0 },
        { field: 'oc', headerName: 'Orden', flex: 0.5 },
        { field: 'code', headerName: 'Sku', flex: 0 },
        { field: 'document_number', headerName: 'Dni', flex: 0 },
        { field: 'product', headerName: 'Producto', flex: 0.8 },
        {
            field: 'other',
            headerName: 'Estado',
            flex: 1.5,
            renderCell: (params) => {
                const hasMove = params.row.whatMove === true ? "Tiene movimiento" : "No tiene movimiento";
                const hasIncident = params.row.whatIncident === true ? "Tiene incidencia" : "No tiene incidencia";
                const moveVariant = params.row.whatMove === true ? "success" : "error";
                const incidentVariant = params.row.whatIncident === true ? "success" : "error";
        
                return (
                    <div className='Resultado_IDincidenciaInventoryMoves' style={{ display: "flex" }}>
                        <Alert variant="outlined" severity={moveVariant}>
                            {hasMove}
                        </Alert>
                        <Alert variant="outlined" severity={incidentVariant}>
                            {hasIncident}
                        </Alert>
                    </div>
                );
            },
        },        
        {
            field: 'action',
            headerName: 'Acción',
            flex: 1,
            renderCell: (params) => (
                <ButtonGroup aria-label="Basic button group" >
                    <Button
                        variant="contained"
                        style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                        size="small"
                        onClick={() => {
                            copyToClipboard(params.row.oc);
                        }}
                        startIcon={<FontAwesomeIcon icon={faCopy} />}
                    >
                    </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                        size="small"
                        onClick={() => handleRowClick(params.row.id)}
                    >
                        Ver Detalles
                    </Button>
                </ButtonGroup>
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
                                    <b>Fechas Rapidas</b>
                                </h3>
                                <Switch id="switch1" {...label} checked={switchOn} onChange={handleSwitchChange} color="secondary" size="small" />
                            </div>
                            <div className="col-sm-6">
                                <div className='justify-content-end float-sm-right'>
                                    <Button
                                        href='https://cvimport.com/incident'
                                        target="_blank"
                                        variant="contained"
                                        style={{ backgroundColor: switchOn ? "#55CD49" : "#DAF7A6", color: switchOn ? "white" : "black" }}
                                        startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                                    >

                                        Incidencia
                                    </Button>
                                    <Button
                                        href='https://cvimport.com/output'
                                        target="_blank"
                                        variant="contained"
                                        style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black", marginLeft: "4px" }}
                                        startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                                        onClick={handleOpenCrearModal}
                                    >
                                        Salida
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card card-outline">
                    <div className="card-header border-0">
                        <div className="row mb-2" style={{ display: 'flex', justifyContent: 'center' }}>
                            <ButtonGroup aria-label="Basic button group" >
                                <Button onClick={() => handlePlatformFilter('Vtex')} variant="contained" style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}>Vtex</Button>
                                <Button onClick={() => handlePlatformFilter('Saga')} variant="contained" style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}>Saga</Button>
                                <Button onClick={() => handlePlatformFilter('Intercorp')} variant="contained" style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}>Intercorp</Button>
                                <Button onClick={() => handlePlatformFilter('Ripley')} variant="contained" style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}>Ripley</Button>
                                <Button onClick={() => handlePlatformFilter('VENTA')} variant="contained" style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}>RRSS</Button>
                                <Button onClick={handleTodayClick} variant="contained" style={{ backgroundColor: switchOn ? "#55CD49" : "#DAF7A6", color: switchOn ? "white" : "black" }}>Hoy</Button>
                                <Button onClick={handleYesterdayClick} variant="contained" style={{ backgroundColor: switchOn ? "#55CD49" : "#DAF7A6", color: switchOn ? "white" : "black" }}>Ayer</Button>
                                <Button onClick={handleAllDatesClick} variant="contained" style={{ backgroundColor: switchOn ? "#55CD49" : "#DAF7A6", color: switchOn ? "white" : "black" }}>All Fechas</Button>
                            </ButtonGroup>
                        </div>
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
                                            pageSize: 15,
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
                                            {selectedIncident.oc} <Button
                                                variant="contained"
                                                style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                                                size="small"
                                                onClick={() => {
                                                    copyToClipboard(selectedIncident.oc);
                                                }}
                                                startIcon={<FontAwesomeIcon icon={faCopy} />}
                                            >
                                                Copiar
                                            </Button>
                                        </Typography>
                                        <Typography>
                                            Plataforma: {selectedIncident.origin} <br />
                                            Fecha de ingreso: {selectedIncident.date}<br />
                                            Fecha del corte: {selectedIncident.date_cut}<br />
                                            Cliente: {selectedIncident.client}<br />
                                            Documento: {selectedIncident.document_type}, {selectedIncident.document_number}<br />
                                            Celular: {selectedIncident.phone}<br />
                                            Direccion: {selectedIncident.address}, {selectedIncident.distrito}<br />
                                            Producto: {selectedIncident.code} - {selectedIncident.product}<br />
                                            Cantidad y Precio: {selectedIncident.quantity} - {selectedIncident.price}<br />
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
