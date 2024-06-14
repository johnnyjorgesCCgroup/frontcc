import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Typography, Button, Box, Switch, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCopy, faEye, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import './contentFechasRapidas.css';
import Select from 'react-select';

export default function contentInventory() {
    const [image, setImage] = useState(null);
    const [orderNumber, setOrderNumber] = useState('');
    const [idImg, setIDImg] = useState('');
    const [incidentes, setIncidentes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOutputOpen, setModalOutputOpen] = useState(false);
    const [modalUpOpen, setModalUpOpen] = useState(false);
    const [modalHistoryOpen, setModalHistoryOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [client, setClient] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [product, setProduct] = useState('');
    const [documentos, setDocumentos] = useState(null);
    const [switchOn, setSwitchOn] = useState(false);
    const [today, setToday] = useState(new Date());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const matches = useMediaQuery('(min-width:600px)');
    const [filterVisible, setFilterVisible] = useState(false);
    const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);

    const handleOpenImageModal = (imageName) => {
        setSelectedImage(`https://api.cvimport.com/storage/${imageName}`);
    };
    const handleChange = (selectedOption) => {
        setSelectedDocument(selectedOption);
    };
    const handleCloseImageModal = () => {
        setSelectedImage(null);
    };
    const handleToggleFilter = () => {
        setFilterVisible(!filterVisible);
    };
    const obtenerIncidentes = async () => {
        try {
            setLoadingOrderDetails(true);
            const response = await fetch("https://api.cvimport.com/api/cut");
            if (response.ok) {
                const data = await response.json();
                setIncidentes(data.data);
                setLoadingOrderDetails(false);
                const opciones = data.data.flatMap(incidente => {
                    return [
                        { label: incidente.document_number, value: incidente.document_number },
                        { label: incidente.oc, value: incidente.oc },
                        { label: incidente.client, value: incidente.client }
                    ];
                });
                const opcionesUnicas = Array.from(new Set(opciones.map(opcion => opcion.label)))
                    .map(label => opciones.find(opcion => opcion.label === label));
                const opcionesFiltradas = selectedDocument === '' ? opcionesUnicas.slice(0, 4) : opcionesUnicas;
                setDocumentos(opcionesFiltradas);

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
        formData.append('photo', image); // Asegúrate de que 'photo' sea el nombre correcto del campo de imagen en el backend
        formData.append('id_corte', idImg); // Asumiendo que 'client' es el ID del corte que necesita el backend

        try {
            const response = await fetch('https://api.cvimport.com/api/updaloadImage', {
                method: 'POST',
                body: formData,
            });
            const data = await response.text();
            console.log(data);
            alert("Tu imagen fue subida 🤭")
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        }
        handleCloseUpModal();
    };

    const handleSubmitSelect = async () => {
        if (!selectedDocument) {
            obtenerIncidentes();
            return;
        }
        const incidentesFiltrados = incidentes.filter(incidente => {
            return (
                incidente.document_number === selectedDocument.label ||
                incidente.oc === selectedDocument.label ||
                incidente.client === selectedDocument.label
            );
        });
        setIncidentes(incidentesFiltrados);
    };
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    useEffect(() => {
        obtenerIncidentes();
    }, []);

    useEffect(() => {
    }, [selectedIncident]);

    const handleRowClick = (id) => {
        const incident = incidentes.find(incidente => incidente.id === id);
        setSelectedIncident(incident);
        setClient(incident.client);
        setDocumentNumber(incident.document_number);
        setProduct(incident.product);
        setModalOpen(true);
    }
    const handleCloseModal = () => {
        setModalOpen(false);
    }
    const handleOutputCloseModal = () => {
        setModalOutputOpen(false);
    }
    const handleOpenUploadModal = () => {
        setIDImg(selectedIncident ? selectedIncident.id : '');
        setModalUpOpen(true);
    };
    const handleCloseUpModal = () => {
        setModalUpOpen(false);
    };
    const handleOpenCrearModal = () => {
        setCrearModalOpen(true);
    };
    const handleOpenHistoryModal = () => {
        setModalHistoryOpen(true);
    }
    const handleCloseHistoryModal = () => {
        setModalHistoryOpen(false);
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
        obtenerIncidentes();
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
    let columns = [
        { field: 'date_cut', headerName: 'Fecha de Corte', flex: 0 },
        { field: 'origin', headerName: 'Plataforma', flex: 0 },
        {
            field: 'oc', headerName: 'Orden', flex: matches ? 1 : undefined,
            width: matches ? undefined : 200,
        },
        {
            field: 'action',
            headerName: 'Acción',
            flex: matches ? 1 : undefined,
            width: matches ? undefined : 200,
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
                </ButtonGroup>
            ),
        },
    ];

    if (matches) {
        const ocIndex = columns.findIndex(column => column.field === 'oc');
        columns.splice(ocIndex + 1, 0, { field: 'product', headerName: 'Producto', flex: 0.5 });
        columns.splice(ocIndex + 0, 0, { field: 'product_id', headerName: 'ID del producto', flex: 0.5 });
        columns = [
            { field: 'id', headerName: 'Id', width: 30 },
            { field: 'date', headerName: 'Fecha de Subida', flex: 0 },
            { field: 'client', headerName: 'Cliente', flex: 0.5 },
            {
                field: 'Estado',
                headerName: 'Estado',
                flex: 0.8,
                filter: 'agSetColumnFilter', // Habilitar filtro de conjunto de valores
                valueGetter: (params) => params.row.status === 1 ? "etiqueta" : params.row.status === 0 ? "pendiente" : params.row.status === 2 ? "en ruta" : params.row.status === 3 ? "entregado" : params.row.status === 4 ? "anulado" : params.row.status === 5 ? "devolucion" || "cambio" : params.row.status === 12 ? "regularizar" : params.row.status === 7 ? "empaquetado" : "0", // Obtener el valor para el filtro
                renderCell: (params) => {
                    return (
                        <div className='Resultado_IDincidenciaInventoryMoves' style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                style={{
                                    width: "190px",
                                    height: "25px",
                                    backgroundColor: switchOn ? "#9C27B0" :
                                        params.row.status === 0 || params.row.status === 4 || params.row.status === 5 ? "red" :
                                            params.row.status === 2 ? "#FFD848" : params.row.status === 1 ? "#0083CA" :
                                                "#22FF94",
                                    color: switchOn || params.row.status === 0 || params.row.status === 4 || params.row.status === 5 || params.row.status === 1 ? "white" : "black"
                                }}
                                disabled={true}
                            >
                                {params.row.status === 1 ? "Etiqueta" :
                                    params.row.status === 0 ? "Pendiente" :
                                        params.row.status === 2 ? "En Ruta" :
                                            params.row.status === 3 ? "Entregado" :
                                                params.row.status === 4 ? "Anulado" :
                                                    params.row.status === 5 ? "Devolución / Cambio" :
                                                        params.row.status === 12 ? "Regularizar" :
                                                            params.row.status === 7 ? "Empaquetado" : "Desconocido"}
                            </Button>
                        </div>
                    );
                },
            },

            ...columns,
        ];
    }

    if (!matches) { // Utiliza !matches para mostrar estas columnas cuando matches sea false
        const clientIndex = columns.findIndex(column => column.field === 'client');
        const documentNumberIndex = columns.findIndex(column => column.field === 'document_number');

        // Insertar las columnas en el índice correspondiente
        columns.splice(clientIndex + 1, 0, { field: 'client', headerName: 'Cliente', width: 150 });
        columns.splice(documentNumberIndex + 2, 0, { field: 'document_number', headerName: 'Documento', width: 100 });
    }

    const options = {
        print: false,
        search: true,
    };
    if (!matches) {
        options.filterType = 'checkbox';
    }

    return (
        <div className="content-wrapper">
            <div className="card" style={{ padding: 20 }}>
                <div className="card card-outline">
                    <div className="card-header border-0">
                        <div className="row mb-2" style={{ alignItems: "center" }}>
                            <div className="col-sm-6">
                                <h3 className="card-title">
                                    <b>Registro de Motorizados</b>
                                </h3>
                                <Switch id="switch1" {...label} checked={switchOn} onChange={handleSwitchChange} color="secondary" size="small" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card card-outline">
                    <div className="card-header border-0">
                        <a href="#" onClick={() => handleToggleFilter()}><i className="fas fa-filter"></i> Filtrar</a>
                        <div className="row mb-2" style={{ display: filterVisible ? 'flex' : 'none', justifyContent: 'center', padding: "8px" }}>
                            <ButtonGroup aria-label="Basic button group" className='botonesFilter' data-tooltip="Solo seleccionar una opción o refresh para borrar filtro">
                                <div className="tooltip-container">
                                    <Button onClick={() => handlePlatformFilter('Vtex')} variant="contained" style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }} >Vtex</Button>
                                    <Button onClick={() => handlePlatformFilter('Saga')} variant="contained" style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}>Saga</Button>
                                    <Button onClick={() => handlePlatformFilter('Intercorp')} variant="contained" style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}>Intercorp</Button>
                                </div>
                                <div>
                                    <Button onClick={() => handlePlatformFilter('Ripley')} variant="contained" style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}>Ripley</Button>
                                    <Button onClick={() => handlePlatformFilter('VENTA')} variant="contained" style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}>RRSS</Button>
                                </div>
                                <div>
                                    <Button onClick={handleTodayClick} variant="contained" style={{ backgroundColor: switchOn ? "#55CD49" : "#DAF7A6", color: switchOn ? "white" : "black" }}>Hoy</Button>
                                    <Button onClick={handleYesterdayClick} variant="contained" style={{ backgroundColor: switchOn ? "#55CD49" : "#DAF7A6", color: switchOn ? "white" : "black" }}>Ayer</Button>
                                    <Button onClick={handleAllDatesClick} variant="contained" style={{ backgroundColor: switchOn ? "#55CD49" : "#DAF7A6", color: switchOn ? "white" : "black" }} startIcon={<FontAwesomeIcon icon={faRefresh} />}>Refresh</Button>
                                </div>
                            </ButtonGroup>
                        </div>
                        <div style={{ display: filterVisible ? 'flex' : 'none', alignItems: "center", justifyContent: "center", padding: "14px" }}>
                            <Select
                                value={selectedDocument}
                                onChange={handleChange}
                                options={documentos}
                                placeholder="Busqueda DNI OC Nombre"
                                isClearable={true}
                            /><span />
                            <Button onClick={handleSubmitSelect}>Buscar</Button>
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
                                checkboxSelection={matches}
                                loading={loadingOrderDetails}
                                {...options}
                            />
                        </div>
                        <Modal open={modalHistoryOpen} onClose={handleCloseHistoryModal}>
                            <div className="modalDetalle" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'auto', maxHeight: '80vh' }}>
                                <h3 className="card-title">
                                    <b>Historial del corte:</b>
                                </h3>
                                <br />
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Usuario</th>
                                            <th>Fecha</th>
                                            <th>Movimiento</th>
                                            <th>Detalle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Fabian</td>
                                            <td>2024-04-25</td>
                                            <td>subida de Corte</td>
                                            <td>Corte de prueba</td>
                                        </tr>
                                        <tr>
                                            <td>Johnny Jorges</td>
                                            <td>2024-04-26</td>
                                            <td>realizo salida</td>
                                            <td>Detalle de la salida</td>
                                        </tr>
                                        <tr>
                                            <td>Johnny Jorges</td>
                                            <td>2024-04-27</td>
                                            <td>confirma entrega</td>
                                            <td>Detalle de la entrada</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Modal>
                        <Modal open={modalOpen} onClose={handleCloseModal}>
                            <div className="modalDetalle">
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
                                                    {selectedIncident.status === 0 ? "PENDIENTE" :
                                                        selectedIncident.status === 1 ? "ETIQUETA" :
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
                                            {" "}<Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => {
                                                    copyToClipboard(selectedIncident.oc);
                                                }}
                                                disabled={true}
                                                style={{
                                                    backgroundColor: selectedIncident.origin === "Vtex" || selectedIncident.origin === "Saga" ? "#FFA500" :
                                                        selectedIncident.origin === "InterCorp" ? "#87CEEB" : selectedIncident.origin === "Ripley" ? "#2D0C9E" :
                                                            selectedIncident.origin === "VENTA" ? "#8B4513" : "inherit", color: "white"
                                                }}
                                            >
                                                <b>
                                                    <i className="fa-solid fa-truck-fast"></i>{" "}
                                                    {selectedIncident.origin === "Vtex" ? "Home Delivery" :
                                                        selectedIncident.origin === "Ripley" ? "OPL Ripley" :
                                                            selectedIncident.origin === "InterCorp" ? "OPL Intercorp" :
                                                                selectedIncident.origin === "Saga" ? "Home Delivery" :
                                                                    selectedIncident.origin === "VENTA" ? "Propio" : "Estado Desconocido"}
                                                </b>
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
                                            {selectedIncident.photo !== null ? (
                                                <React.Fragment>
                                                    Imagen: {selectedIncident.photo}
                                                    <Button onClick={() => handleOpenImageModal(selectedIncident.photo)}>Ver</Button>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    No hay imagen:
                                                    <Button onClick={handleOpenUploadModal}>Subir</Button>
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
                                            )}<br />
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                                                    size="small"
                                                    onClick={handleOpenHistoryModal}
                                                >
                                                    Historial
                                                </Button>
                                            </div>
                                        </Typography>
                                    </>
                                )}
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
                                        label="ID"
                                        variant="outlined"
                                        value={idImg}
                                        onChange={(e) => setIdImg(e.target.value)}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <br />
                                    <TextField
                                        label="Orden"
                                        variant="outlined"
                                        value={selectedIncident ? selectedIncident.oc : ''}
                                        disabled
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <br />
                                    <TextField
                                        label="Cliente"
                                        variant="outlined"
                                        value={selectedIncident ? selectedIncident.client : ''}
                                        disabled
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <br />
                                    <TextField
                                        label="Número de Documento"
                                        variant="outlined"
                                        value={selectedIncident ? selectedIncident.document_number : ''}
                                        disabled
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <br />
                                    <TextField
                                        label="Producto"
                                        variant="outlined"
                                        value={selectedIncident ? selectedIncident.product : ''}
                                        disabled
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
                        <Modal open={!!selectedImage} onClose={handleCloseImageModal}>
                            <div className='divImage'>
                                <div className='textFieldImg'>
                                    <TextField label="client" value={selectedIncident ? selectedIncident.client : ''} size="small" sx={{ '& input': { fontSize: '0.75rem' } }}></TextField>
                                    <TextField label="document_number" value={selectedIncident ? selectedIncident.document_number : ''} size="small" sx={{ '& input': { fontSize: '0.75rem' } }}></TextField>
                                    <TextField label="product" value={selectedIncident ? selectedIncident.product : ''} size="small" sx={{ '& input': { fontSize: '0.75rem' } }}></TextField>
                                </div>
                                {selectedImage && <img className='viewImage'
                                    src={selectedImage}
                                    alt="Selected Incident"
                                />}
                            </div>
                        </Modal>
                    </Box>
                </div>
            </div>
        </div>
    );
}