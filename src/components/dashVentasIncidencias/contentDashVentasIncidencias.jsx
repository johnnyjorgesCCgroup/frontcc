import React, { useEffect, useState, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Typography, Button, Box, TextField, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material';
import { Chart } from 'react-google-charts';

export default function contentInventory() {
    const [incidentes, setIncidentes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [switchOn, setSwitchOn] = useState(false);
    const [orderCountMonthVendedor1, SetorderCountMonthVendedor1] = useState(0);
    const [orderCountMonthVendedor2, SetorderCountMonthVendedor2] = useState(0);
    const [orderPriceMonthVendedor1, SetorderPriceMonthVendedor1] = useState(0);
    const [orderPriceMonthVendedor2, SetorderPriceMonthVendedor2] = useState(0);

    const obtenerIncidentes = async () => {
        try {
            const response = await fetch("https://api.cvimport.com/api/cut");
            if (response.ok) {
                const data = await response.json();
                const incidentesFiltrados = data.data.filter(incidente => incidente.origin === "VENTA");
                setIncidentes(incidentesFiltrados);

                //semanal y mensual
                const today = new Date();
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

                //countMensualVendedor
                const orderCountMonthVendedor1 = incidentesFiltrados.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthVendedor1(orderCountMonthVendedor1);

                const orderPriceMonthVendedor1 = incidentesFiltrados.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.user_id === 20) {
                        return count + parseFloat(item.price);
                    } else {
                        return count;
                    }
                }, 0);
                SetorderPriceMonthVendedor1(orderPriceMonthVendedor1);

                const orderCountMonthVendedor2 = incidentesFiltrados.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthVendedor2(orderCountMonthVendedor2);

                const orderPriceMonthVendedor2 = incidentesFiltrados.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.user_id === 15) {
                        return count + parseFloat(item.price);
                    } else {
                        return count;
                    }
                }, 0);
                SetorderPriceMonthVendedor2(orderPriceMonthVendedor2);

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
        setSelectedIncident(incident);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleSwitchChange = () => {
        setSwitchOn(!switchOn);
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0 },
        { field: 'oc', headerName: 'Orden', flex: 0 },
        { field: 'date', headerName: 'Fecha', flex: 0 },
        {
            field: 'user_id', headerName: 'Asesor', flex: 1, renderCell: (params) => (
                <>{params.row.user_id === 20 ? "Sheyla Ramirez Cruz" : params.row.user_id === 21 ? "Rodrigo" : params.row.user_id === 15 ? "Daniel Lama" : params.row.user_id === 11 ? "Francis" : params.row.user_id === 15 ? "Daniel Lama" : params.row.user_id === 5 ? "Julio Soporte" : params.row.user_id === 15 ? "Daniel Lama" : params.row.user_id === 18 ? "Johnny Soporte" : "Usuario No registrado"}</>
            ),
        },
        { field: 'price', headerName: 'Precio', flex: 0 },
        {
            field: 'status', headerName: 'Estado', flex: 0, renderCell: (params) => (
                <>{params.row.status === 0 ? "Etiqueta" : params.row.status === 1 ? "Etiqueta" : params.row.status === 2 ? "En Ruta" : params.row.status === 3 ? "Entregado" : params.row.status === 4 ? "Anulado" : params.row.status === 5 ? "Devolución" : "N/A"}
                </>
            )
        },
        { field: 'client', headerName: 'Cliente', flex: 1 },
        { field: 'product', headerName: 'Producto', flex: 1 },
        {
            field: 'action',
            headerName: 'Acción',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    style={{ backgroundColor: switchOn ? "#9C27B0" : "#1A5276", color: switchOn ? "white" : "white" }}
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
                    <div style={{ width: "22%", justifyContent: "center", textAlign: "center" }}>
                        <div className="card card-outline" style={{ padding: "10px", display: "block" }}>
                            <b><i className='fas fa-cash-register' style={{ fontSize: "28px", color: "#1A5276", margin: "5px" }} /></b>
                            <span className='info-box-text' style={{ margin: "5px" }}>Sheyla {orderCountMonthVendedor1}</span>
                            <b><span className='info-box-number' style={{ fontSize: "15px", margin: "5px" }}> S/{orderPriceMonthVendedor1.toFixed(1)}{" "}{orderPriceMonthVendedor1 > orderPriceMonthVendedor2 ? "😁" : "😢"}</span></b>
                        </div>
                        <div className="card card-outline" style={{ padding: "10px", display: "block" }}>
                            <b><i className='fas fa-cash-register' style={{ fontSize: "28px", color: "#1A5276", margin: "5px" }} /></b>
                            <span className='info-box-text' style={{ margin: "5px" }}>Daniel {orderCountMonthVendedor2}</span>
                            <b><span className='info-box-number' style={{ fontSize: "15px", margin: "5px" }}>S/{orderPriceMonthVendedor2.toFixed(1)}{" "}{orderPriceMonthVendedor2 > orderPriceMonthVendedor1 ? "😁" : "😢"}</span></b>
                        </div>
                        <div className="card card-outline" style={{ padding: "10px", display: "block" }}>
                            <b><i className='fas fa-cash-register' style={{ fontSize: "28px", color: "#1A5276", margin: "5px" }} /></b>
                            <span className='info-box-text' style={{ margin: "5px" }}>Francis  0</span>
                            <b><span className='info-box-number' style={{ fontSize: "15px", margin: "5px" }}>S/0</span></b>
                        </div>
                        <div className="card card-outline" style={{ padding: "10px", display: "block" }}>
                            <b><i className='fas fa-cash-register' style={{ fontSize: "28px", color: "#1A5276", margin: "5px" }} /></b>
                            <span className='info-box-text' style={{ margin: "5px" }}>Rodrigo  0</span>
                            <b><span className='info-box-number' style={{ fontSize: "15px", margin: "5px" }}>S/0</span></b>
                        </div>
                    </div>
                    <div className="card card-outline" style={{ width: "15%", marginLeft: "10px", justifyContent: "center", textAlign: "center" }}>
                        <div style={{ height: "15%", display: "inline-block", width: "fit-content", backgroundColor: "#1A5276", borderRadius: "10px", padding: "10px", margin: "0 auto", textAlign: "center", marginBottom: "5px", color: "white" }}>
                            <p>
                                <i className='fas fa-bullseye'></i>{" "}Objetivo del mes</p></div>
                        <div style={{ height: "65%", display: "flex", fontSize: "30px", alignItems: "center", justifyContent: "center" }}><b>S/5000.00</b></div>
                    </div>
                    <div className='card card-outline' style={{ width: "63%", marginLeft: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Month', 'Sheyla', 'Daniel'],
                                ['Enero', 0, 0],
                                ['Febrero', 0, 0],
                                ['Marzo', 0, 0],
                                ['Abril', 40, 35],
                                ['Mayo', 46, 46],
                                ['Junio', 0, 0],
                                ['Julio', 0, 0],
                                ['Agosto', 0, 0],
                                ['Septiembre', 0, 0],
                                ['Octubre', 0, 0],
                                ['Noviembre', 0, 0],
                                ['Diciembre', 0, 0],
                            ]}
                            options={{
                                title: 'Ventas Mensuales',
                                curveType: 'function',
                                legend: { position: 'top' },
                                hAxis: { title: 'Month', titleTextStyle: { color: '#333' } },
                                vAxis: { minValue: 0 },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
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
                                            {selectedIncident.oc} {" "}<Button
                                                variant="contained"
                                                style={{
                                                    backgroundColor: switchOn ? "#9C27B0" :
                                                        (selectedIncident.status === 1 || selectedIncident.status === 4 || selectedIncident.status === 5) ? "red" :
                                                            "#22FF94",
                                                    color: switchOn || selectedIncident.status === 1 || selectedIncident.status === 4 || selectedIncident.status === 5 ? "white" : "black"
                                                }}
                                                size="small"
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
                                                    <Button /*onClick={() => handleOpenImageModal(selectedIncident.photo)}*/>Ver</Button>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    No hay imagen 🥹
                                                </React.Fragment>
                                            )}
                                            <br />
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
