import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Typography, Button, Box, Switch } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import './contentDashboardEstados.css';

export default function ContentInventory() {
    const [incidentes, setIncidentes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [showTodayOnly, setShowTodayOnly] = useState(false); // Estado para controlar si se muestran solo los incidentes de hoy
    const matches = useMediaQuery('(min-width:1200px)');

    const obtenerIncidentes = async () => {
        try {
            const response = await fetch("http://cc.cvimport.com:3000/procesarDatos");
            if (response.ok) {
                const data = await response.json();
                setIncidentes(data);
            } else {
                console.error("Error de fetch", response.statusText);
            }
        } catch (error) {
            console.error("Error de bd", error);
        }
    }

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

    let columns = [
        { field: 'date_cut', headerName: 'Fecha de Corte', flex: 0 },
        { field: 'date', headerName: 'Fecha de Subida', flex: 0 },
        { field: 'origin', headerName: 'Plataforma', flex: 0 },
        { field: 'oc', headerName: 'Orden', flex: 0 },
        {
            field: 'status',
            headerName: 'Estado de Atención',
            flex: 0.5,
            renderCell: (params) => {
                let statusText;
                let statusVariant;
                switch (params.row.status) {
                    case 0:
                        statusText = 'ETIQUETA';
                        break;
                    case 1:
                        statusText = 'PENDIENTE';
                        break;
                    case 2:
                        statusText = 'EN RUTA';
                        statusVariant = 'success'; // Alerta verde para EN RUTA
                        break;
                    case 3:
                        statusText = 'ENTREGADO';
                        statusVariant = 'success'; // Alerta verde para ENTREGADO
                        break;
                    case 4:
                        statusText = 'ANULADO';
                        break;
                    case 5:
                        statusText = 'DEVOLUCION';
                        break;
                    default:
                        statusText = 'Desconocido';
                }
                return (
                    <div className='Resultado_IDincidenciaInventoryMoves' style={{ display: "flex" }}>
                        <Alert variant="outlined" severity={statusVariant || 'error'}>
                            {statusText}
                        </Alert>
                    </div>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Acción',
            flex: 0.5,
            renderCell: (params) => (
                <ButtonGroup aria-label="Basic button group" >
                    <Button
                        variant="outlined"
                        style={{ backgroundColor: "#28A745", color: "white" }}
                        size="small"
                        onClick={() => {
                            copyToClipboard(params.row.oc);
                        }}
                        startIcon={<FontAwesomeIcon icon={faCopy} />}
                    >
                    </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#28A745", color: "white" }}
                        size="small"
                        onClick={() => handleRowClick(params.row.id)}
                    >
                        Ver Detalles
                    </Button>
                </ButtonGroup>
            ),
        },
    ];

    if (matches) {
        // Find the index of the column with field 'oc'
        const ocIndex = columns.findIndex(column => column.field === 'oc');
        // Insert the 'product' column after 'oc'
        columns.splice(ocIndex + 1, 0, { field: 'product', headerName: 'Producto', flex: 0.5 });
        columns = [
            { field: 'id', headerName: 'Id', flex: 0 },
            ...columns,
        ];
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filteredIncidents = incidentes;
    if (showTodayOnly) {
        filteredIncidents = incidentes.filter(incident => {
            const incidentDate = new Date(incident.date_cut);
            const todayDateString = today.toDateString();
            const incidentDateString = incidentDate.toDateString();
            return incidentDateString === todayDateString;
        });
    }    

    const options = {
        filterType: 'checkbox',
        print: false,
        search: true,
        localeText: {
            noRowsLabel: 'Cargando...',
        },
    };

    return (
        <div className="content-wrapper">
            <div className="card" style={{ padding: 20 }}>
                <div className="card card-outline">
                    <div className="card-header border-0">
                        <div className="row mb-2" style={{ alignItems: "center" }}>
                            <div className="col-sm-6">
                                <h3 className="card-title">
                                    <b>Cortes Atendidos</b>
                                </h3>
                                <Switch
                                    id="switch1"
                                    color="secondary"
                                    size="small"
                                    checked={showTodayOnly}
                                    onChange={() => setShowTodayOnly(!showTodayOnly)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="boxPrincipal">
                    <div className="card-body table-responsive p-0 table-bordered table-hover">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', width: '100%' }}>
                                <DataGrid
                                    rows={filteredIncidents}
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
                                                <b>Orden: {selectedIncident.oc}</b>
                                                
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
                                                ID de Movimiento: {selectedIncident.idMove ? selectedIncident.idMove : "No se registró Movimiento"}<br />
                                                ID de Incidente: {selectedIncident.idIncident ? selectedIncident.idIncident : "No se registró Incidente"}<br />
                                            </Typography>
                                        </>
                                    )}
                                </div>
                            </Modal>
                        </Box>
                    </div>
                    <div className="dashPrincipal">
                        <div className='info-box mb-3 bg-secondary' style={{ height: "5%" }}>
                            <span className='info-box-icon'>
                                <i className='fas fa-boxes-stacked' />
                            </span>
                            <div className='info-box-content'>
                                <span className='info-box-text'>Etiqueta</span>
                                <span className='info-box-number' style={{ fontSize: "20px" }}>{incidentes.filter(incidente => incidente.status === 0 && (!showTodayOnly || new Date(incidente.date_cut).getTime() === today.getTime())).length}</span>
                            </div>
                        </div>
                        <div className='info-box mb-3 bg-warning' style={{ height: "5%" }}>
                            <span className='info-box-icon'>
                                <i className='fas fa-truck-ramp-box' />
                            </span>
                            <div className='info-box-content'>
                                <span className='info-box-text'>Pendiente</span>
                                <span className='info-box-number' style={{ fontSize: "20px" }}>{incidentes.filter(incidente => incidente.status === 1 && (!showTodayOnly || new Date(incidente.date_cut).getTime() === today.getTime())).length}</span>
                            </div>
                        </div>
                        <div className='info-box mb-3 bg-info' style={{ height: "5%" }}>
                            <span className='info-box-icon'>
                                <i className='fas fa-motorcycle' />
                            </span>
                            <div className='info-box-content'>
                                <span className='info-box-text'>En ruta</span>
                                <span className='info-box-number' style={{ fontSize: "20px" }}>{incidentes.filter(incidente => incidente.status === 2 && (!showTodayOnly || new Date(incidente.date_cut).getTime() === today.getTime())).length}</span>
                            </div>
                        </div>
                        <div className='info-box mb-3 bg-success' style={{ height: "5%" }}>
                            <span className='info-box-icon'>
                                <i className='fas fa-people-carry-box' />
                            </span>
                            <div className='info-box-content'>
                                <span className='info-box-text'>Entregado</span>
                                <span className='info-box-number' style={{ fontSize: "20px" }}>{incidentes.filter(incidente => incidente.status === 3 && (!showTodayOnly || new Date(incidente.date_cut).getTime() === today.getTime())).length}</span>
                            </div>
                        </div>
                        <div className='info-box mb-3 bg-danger' style={{ height: "5%" }}>
                            <span className='info-box-icon'>
                                <i className='fas fa-boxes-packing' />
                            </span>
                            <div className='info-box-content'>
                                <span className='info-box-text'>Anulado</span>
                                <span className='info-box-number' style={{ fontSize: "20px" }}>{incidentes.filter(incidente => incidente.status === 4 && (!showTodayOnly || new Date(incidente.date_cut).getTime() === today.getTime())).length}</span>
                            </div>
                        </div>
                        <div className='info-box mb-3 bg-danger' style={{ height: "5%" }}>
                            <span className='info-box-icon'>
                                <i className='fas fa-truck-ramp-box' />
                            </span>
                            <div className='info-box-content'>
                                <span className='info-box-text'>Devolución / Cambio</span>
                                <span className='info-box-number' style={{ fontSize: "20px" }}>{incidentes.filter(incidente => incidente.status === 5 && (!showTodayOnly || new Date(incidente.date_cut).getTime() === today.getTime())).length}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
