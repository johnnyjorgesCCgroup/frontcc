import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Typography, Button, Box, Switch, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCopy, faEye, faPlus, faWarning } from '@fortawesome/free-solid-svg-icons';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';
import ContentOutput from './ContentOutput';
import useMediaQuery from '@mui/material/useMediaQuery';
import html2canvas from 'html2canvas';


export default function contentInventory() {
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [orderNumber, setOrderNumber] = useState('');
    const [incidentes, setIncidentes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOutputOpen, setModalOutputOpen] = useState(false);
    const [modalUpOpen, setModalUpOpen] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [modalImageUploadOpen, setModalImageUploadOpen] = useState(false);
    const [switchOn, setSwitchOn] = useState(false);
    const [today, setToday] = useState(new Date());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const matches = useMediaQuery('(min-width:1200px)');

    const handleOpenImageModal = (imageName) => {
        setSelectedImage(`http://api2.cvimport.com:3000/uploads/images/${imageName}`);
    };

    // Función para cerrar el modal
    const handleCloseImageModal = () => {
        setSelectedImage(null);
    };

    const obtenerIncidentes = async () => {
        try {
            const response = await fetch("http://api2.cvimport.com:3000/procesarDatos");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('imagenEvidencia', image);

        try {
            const response = await fetch(`http://api2.cvimport.com:3000/uploads/images/single?orderNumber=${orderNumber}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.text();
            console.log(data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        handleCloseUpModal();
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    useEffect(() => {
        obtenerIncidentes();
    }, []);

    const handleRowClick = (id) => {
        const incident = incidentes.find(incidente => incidente.id === id);
        setSelectedIncident(incident); // Corregir el nombre de la función setSelectedIncident
        setModalOpen(true);
    }

    const handleRowClickOutput = (oc) => {
        const incident = incidentes.find(incidente => incidente.oc === oc);
        setSelectedIncident(incident); // Corregir el nombre de la función setSelectedIncident
        setModalOutputOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleOutputCloseModal = () => {
        setModalOutputOpen(false);
    }

    const handleOpenUploadModal = () => {
        setOrderNumber(selectedIncident ? selectedIncident.oc : '');
        setModalUpOpen(true);
    };

    const handleCloseUpModal = () => {
        setModalUpOpen(false); // Corregido el nombre de la función
    };

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

    const handleAnullCut = async (id) => {
        const confirmed = await confirmDelivery();
        if (confirmed) {
            try {
                await fetch(`https://api.cvimport.com/api/delivery/${id}`, {
                    method: 'GET',
                });

                showAlert('Producto Entregado!', 'success');
                obtenerIncidentes(); // Llamar a la función para obtener los incidentes
            } catch (error) {
                console.error('Error deleting provedor:', error);
                showAlert('An error occurred while deleting!', 'error');
            }
        }
    };

    const confirmDelivery = async () => {
        return confirm('Desea Confirmar la entrega?\nLos campos pueden estar asociados a OC');
    };

    const showAlert = (message, type) => {
        alert(message);
    };

    const handleCaptureScreenshot = () => {
        const htmlElement = document.querySelector('.content-wrapper');

        html2canvas(htmlElement)
            .then(canvas => {
                const capturaCVcortes = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                const link = document.createElement('a');
                link.href = capturaCVcortes;
                link.download = 'capturaCVcortes.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error al capturar la pantalla:', error);
            });
    };



    const buttonBackgroundColor = switchOn ? "#22FF94" : "#9C27B0";

    let columns = [
        { field: 'date_cut', headerName: 'Fecha de Corte', flex: 0 },
        { field: 'date', headerName: 'Fecha de Subida', flex: 0 },
        { field: 'origin', headerName: 'Plataforma', flex: 0 },
        { field: 'oc', headerName: 'Orden', flex: 0 },
        {
            field: 'move',
            headerName: 'Estado de Movimiento',
            flex: 0.8,
            filter: 'agSetColumnFilter', // Habilitar filtro de conjunto de valores
            valueGetter: (params) => params.row.whatMove ? "Hay un movimiento" : "No tiene movimiento", // Obtener el valor para el filtro
            renderCell: (params) => {
                const hasMove = params.row.whatMove === true ? "Hay un movimiento" : "No tiene movimiento";
                const moveVariant = params.row.whatMove === true ? "success" : "error";

                return (
                    <div className='Resultado_IDincidenciaInventoryMoves' style={{ display: "flex" }}>
                        <Alert variant="outlined" severity={moveVariant}>
                            {hasMove}
                        </Alert>
                    </div>
                );
            },
        },
        {
            field: 'incidente',
            headerName: 'Estado de Incidente',
            flex: 0.8,
            filter: 'agSetColumnFilter', // Habilitar filtro de conjunto de valores
            valueGetter: (params) => params.row.whatIncident ? "Hay una incidencia" : "No tiene incidencia", // Obtener el valor para el filtro
            renderCell: (params) => {
                const hasIncident = params.row.whatIncident === true ? "Hay una incidencia" : "No tiene incidencia";
                const incidentVariant = params.row.whatIncident === true ? "success" : "error";

                return (
                    <div className='Resultado_IDincidenciaInventoryMoves' style={{ display: "flex" }}>
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

                    {matches && (
                        <Button
                            variant="contained"
                            style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                            size="small"
                            onClick={() => handleRowClick(params.row.id)}
                        >
                            Ver Detalles
                        </Button>
                    )}
                    {!matches && (
                        <Button
                            variant="contained"
                            style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                            size="small"
                            onClick={() => handleRowClick(params.row.id)}
                            startIcon={<FontAwesomeIcon icon={faEye} />}
                        >
                        </Button>
                    )}

                    {matches && (
                        <Button
                            variant="contained"
                            style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                            size="small"
                            onClick={() => handleRowClickOutput(params.row.oc)}
                            className='realizarSalida'
                        >
                            Salida
                        </Button>
                    )}
                    {!matches && (
                        <Button
                            variant="contained"
                            style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                            size="small"
                            onClick={() => handleRowClickOutput(params.row.oc)}
                            className='realizarSalida'
                            startIcon={<FontAwesomeIcon icon={faPlus} />}
                        >
                        </Button>
                    )}

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
                            <div className="modalDetalle" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'auto', maxHeight: '80vh' }}>
                                {selectedIncident && (
                                    <>
                                        <Typography variant="h6" gutterBottom component="div">
                                            {selectedIncident.oc} {" "}<Button
                                                variant="contained"
                                                style={{
                                                    backgroundColor: switchOn ? "#9C27B0" :
                                                        (selectedIncident.status === 1 || selectedIncident.status === 4 || selectedIncident.status === 5) ? "red" :
                                                            "#22FF94",
                                                    color: switchOn || selectedIncident.status === 1 || selectedIncident.status === 4 || selectedIncident.status === 5 ? "white" : "black"
                                                }}
                                                size="small"
                                                onClick={() => {
                                                    copyToClipboard(selectedIncident.oc);
                                                }}
                                                disabled={true}
                                            >
                                                <b>
                                                    <i className='fas fa-box'></i>{" "}
                                                    {selectedIncident.status === 0 ? "ETIQUETA" :
                                                        selectedIncident.status === 1 ? "PENDIENTE" :
                                                            selectedIncident.status === 2 ? "EN RUTA" :
                                                                selectedIncident.status === 3 ? "ENTREGADO" :
                                                                    selectedIncident.status === 4 ? "ANULADO" :
                                                                        selectedIncident.status === 5 ? "DEVOLUCION / CAMBIO" : "Estado Desconocido"}
                                                </b>
                                            </Button>
                                            {" "}<Button
                                                variant="contained"
                                                style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                                                size="small"
                                                onClick={() => {
                                                    copyToClipboard(selectedIncident.oc);
                                                }}
                                                disabled={true}
                                            ><b>
                                                    <i className='fas fa-motorcycle'></i>{" "}
                                                    {selectedIncident.isdeliveryccg === 0 ? "No motorizado" :
                                                        selectedIncident.isdeliveryccg === 1 ? "Motorizado" : "Estado Desconocido"}</b>
                                            </Button>
                                            {" "}<a className="registrarCaptura" onClick={handleCaptureScreenshot} style={{ color: "black" }}><i className='fas fa-camera'></i></a>
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
                                            {selectedIncident.imageArchive !== null ? (
                                                <React.Fragment>
                                                    Imagen: {selectedIncident.imageArchive}
                                                    <Button onClick={() => handleOpenImageModal(selectedIncident.imageArchive)}>Ver</Button>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    No hay imagen:
                                                    <Button onClick={handleOpenUploadModal} >Subir</Button>
                                                </React.Fragment>
                                            )}
                                            <br />
                                            ID de Movimiento: {selectedIncident.idMove ? selectedIncident.idMove : "No se registró Movimiento"}<br />
                                            ID de Incidente: {selectedIncident.idIncident ? selectedIncident.idIncident : "No se registró Incidente"}<br />
                                            <br />
                                            {selectedIncident.isdeliveryccg === 1 && selectedIncident.status === 2 && (
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        style={{ backgroundColor: switchOn ? "#9C27B0" : "#9C27B0", color: switchOn ? "white" : "white" }}
                                                        size="small"
                                                        onClick={() => handleAnullCut(selectedIncident.id)}
                                                    >
                                                        Confirmar Entrega Motorizado
                                                    </Button>
                                                </div>
                                            )}
                                        </Typography>
                                    </>
                                )}
                            </div>
                        </Modal>
                        <Modal open={modalOutputOpen} onClose={handleOutputCloseModal}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'auto', maxHeight: '80vh' }}>
                                {selectedIncident && (
                                    <>
                                        {selectedIncident && <ContentOutput incident={selectedIncident} />}
                                    </>
                                )}
                            </div>
                        </Modal>
                        <Modal open={!!selectedImage} onClose={handleCloseImageModal}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'auto', maxWidth: '40vw', maxHeight: '100vh', textAlign: 'center' }}>
                                {/* Imagen */}
                                {selectedImage && <img
                                    src={selectedImage}
                                    alt="Selected Incident"
                                    style={{
                                        maxWidth: '50%',
                                        maxHeight: '100%',
                                        width: 'auto',
                                        height: 'auto'
                                    }}
                                />}
                            </div>
                        </Modal>
                        <Modal open={modalUpOpen} onClose={handleCloseUpModal}>
                            <div className="modalDetalle" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'auto', maxHeight: '80vh' }}>
                                <h3 className="card-title">
                                    <b>Subir Imagen de evidencia</b>
                                </h3>
                                <br />
                                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                                    <TextField
                                        label="Número de Orden"
                                        variant="outlined"
                                        value={orderNumber}
                                        onChange={(e) => setOrderNumber(e.target.value)}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <br />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <br />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                                    >
                                        Enviar
                                    </Button>
                                </form>
                            </div>
                        </Modal>
                    </Box>
                </div>
            </div>
        </div>
    );
}
