import React, { useEffect, useState, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Typography, Button, Box, TextField, FormControl, InputLabel, Select, MenuItem, Switch } from '@mui/material';
import { Chart } from 'react-google-charts';
import productsData from './products.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCopy, faEye, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import ContentSocial from './ContentSocial.jsx';

export default function contentInventory() {
    const [incidentes, setIncidentes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [switchOn, setSwitchOn] = useState(false);
    const [productMap, setProductMap] = useState({});
    const [productMapSku, setProductMapSku] = useState({});
    const [modalHistoryOpen, setModalHistoryOpen] = useState(false);
    const [orderCountMonthVendedor1, SetorderCountMonthVendedor1] = useState(0);
    const [orderCountMonthVendedor2, SetorderCountMonthVendedor2] = useState(0);
    const [orderPriceMonthVendedor1, SetorderPriceMonthVendedor1] = useState(0);
    const [orderPriceMonthVendedor2, SetorderPriceMonthVendedor2] = useState(0);
    const [orderCountEneroVendedor1, setorderCountEneroVendedor1] = useState(0);
    const [orderCountFebreroVendedor1, setorderCountFebreroVendedor1] = useState(0);
    const [orderCountMarzoVendedor1, setorderCountMarzoVendedor1] = useState(0);
    const [orderCountAbrilVendedor1, setorderCountAbrilVendedor1] = useState(0);
    const [orderCountMayoVendedor1, setorderCountMayoVendedor1] = useState(0);
    const [orderCountJunioVendedor1, setorderCountJunioVendedor1] = useState(0);
    const [orderCountJulioVendedor1, setorderCountJulioVendedor1] = useState(0);
    const [orderCountAgostoVendedor1, setorderCountAgostoVendedor1] = useState(0);
    const [orderCountSeptiembreVendedor1, setorderCountSeptiembreVendedor1] = useState(0);
    const [orderCountOctubreVendedor1, setorderCountOctubreVendedor1] = useState(0);
    const [orderCountNoviembreVendedor1, setorderCountNoviembreVendedor1] = useState(0);
    const [orderCountDiciembreVendedor1, setorderCountDiciembreVendedor1] = useState(0);
    const [orderCountEneroVendedor2, setorderCountEneroVendedor2] = useState(0);
    const [orderCountFebreroVendedor2, setorderCountFebreroVendedor2] = useState(0);
    const [orderCountMarzoVendedor2, setorderCountMarzoVendedor2] = useState(0);
    const [orderCountAbrilVendedor2, setorderCountAbrilVendedor2] = useState(0);
    const [orderCountMayoVendedor2, setorderCountMayoVendedor2] = useState(0);
    const [orderCountJunioVendedor2, setorderCountJunioVendedor2] = useState(0);
    const [orderCountJulioVendedor2, setorderCountJulioVendedor2] = useState(0);
    const [orderCountAgostoVendedor2, setorderCountAgostoVendedor2] = useState(0);
    const [orderCountSeptiembreVendedor2, setorderCountSeptiembreVendedor2] = useState(0);
    const [orderCountOctubreVendedor2, setorderCountOctubreVendedor2] = useState(0);
    const [orderCountNoviembreVendedor2, setorderCountNoviembreVendedor2] = useState(0);
    const [orderCountDiciembreVendedor2, setorderCountDiciembreVendedor2] = useState(0);

    const obtenerIncidentes = async () => {
        try {
            const response = await fetch("https://api.cvimport.com/api/social");
            if (response.ok) {
                const data = await response.json();

                const responseData = data.data;
                const filteredData = responseData.map(item => {

                    const primerProductoRRSS = item.social_line[0];

                    return {
                        id: item.id,
                        serie: item.serie,
                        platform: item.platform,
                        total: item.total,
                        status: item.status,
                        date: item.date,
                        origin: item.origin,
                        client: item.person.name,
                        user_id: item.user_id,
                        document_number: item.document_number,
                        document_type: item.document_type,
                        phone: item.person.phone_number,
                        productosRRSS: item.social_line,
                        client_type: item.client_type,
                        address: item.person.address,
                        reference: item.person.reference,
                        departament: item.person.departament,
                        province: item.person.province,
                        district: item.person.district,
                        status_text: item.status_text,
                        obs: item.obs,
                        product_id: primerProductoRRSS ? primerProductoRRSS.product_id : null,
                    };
                });

                setIncidentes(filteredData)

                //semanal y mensual
                const today = new Date();
                const year = today.getFullYear();
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

                //countMensualVendedor
                const orderCountMonthVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthVendedor1(orderCountMonthVendedor1);

                const orderPriceMonthVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.user_id === 20) {
                        return count + parseFloat(item.total);
                    } else {
                        return count;
                    }
                }, 0);
                SetorderPriceMonthVendedor1(orderPriceMonthVendedor1);

                const orderCountMonthVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthVendedor2(orderCountMonthVendedor2);

                const orderPriceMonthVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.user_id === 15) {
                        return count + parseFloat(item.total);
                    } else {
                        return count;
                    }
                }, 0);
                SetorderPriceMonthVendedor2(orderPriceMonthVendedor2);

                //countAnualMensualEneroVendedor
                const startOfMonthEnero = new Date(year, 0, 1);
                const endOfMonthEnero = new Date(year, 0, 31);

                const orderCountEneroVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthEnero && itemDate <= endOfMonthEnero && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountEneroVendedor1(orderCountEneroVendedor1);

                const orderCountEneroVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthEnero && itemDate <= endOfMonthEnero && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountEneroVendedor2(orderCountEneroVendedor2);

                //countAnualMensualFebreroVendedor
                const isLeapYear = (year) => {
                    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
                };

                const startOfMonthFebrero = new Date(year, 1, 1);
                const endOfMonthFebrero = new Date(year, 1, isLeapYear(year) ? 29 : 28);

                const orderCountFebreroVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthFebrero && itemDate <= endOfMonthFebrero && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountFebreroVendedor1(orderCountFebreroVendedor1);

                const orderCountFebreroVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthFebrero && itemDate <= endOfMonthFebrero && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountFebreroVendedor2(orderCountFebreroVendedor2);

                //countAnualMensualMarzo
                const startOfMonthMarzo = new Date(year, 2, 1);
                const endOfMonthMarzo = new Date(year, 2, 31);

                const orderCountMarzoVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthMarzo && itemDate <= endOfMonthMarzo && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountMarzoVendedor1(orderCountMarzoVendedor1);

                const orderCountMarzoVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthMarzo && itemDate <= endOfMonthMarzo && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountMarzoVendedor2(orderCountMarzoVendedor2);

                //countAnualMensualAbril
                const startOfMonthAbril = new Date(year, 3, 1);
                const endOfMonthAbril = new Date(year, 3, 30); // 30 días en abril

                const orderCountAbrilVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthAbril && itemDate <= endOfMonthAbril && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountAbrilVendedor1(orderCountAbrilVendedor1);

                const orderCountAbrilVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthAbril && itemDate <= endOfMonthAbril && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountAbrilVendedor2(orderCountAbrilVendedor2);

                //countAnualMensualMayo
                const startOfMonthMayo = new Date(year, 4, 1);
                const endOfMonthMayo = new Date(year, 4, 31); // Mayo tiene 31 días

                const orderCountMayoVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthMayo && itemDate <= endOfMonthMayo && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountMayoVendedor1(orderCountMayoVendedor1);

                const orderCountMayoVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthMayo && itemDate <= endOfMonthMayo && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountMayoVendedor2(orderCountMayoVendedor2);

                //countAnualMensualJunio
                const startOfMonthJunio = new Date(year, 5, 1);
                const endOfMonthJunio = new Date(year, 5, 30); // Junio tiene 30 días

                const orderCountJunioVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthJunio && itemDate <= endOfMonthJunio && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountJunioVendedor1(orderCountJunioVendedor1);

                const orderCountJunioVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthJunio && itemDate <= endOfMonthJunio && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountJunioVendedor2(orderCountJunioVendedor2);

                //countAnualMensualJulio
                const startOfMonthJulio = new Date(year, 6, 1);
                const endOfMonthJulio = new Date(year, 6, 31); // Julio tiene 31 días

                const orderCountJulioVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthJulio && itemDate <= endOfMonthJulio && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountJulioVendedor1(orderCountJulioVendedor1);

                const orderCountJulioVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthJulio && itemDate <= endOfMonthJulio && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountJulioVendedor2(orderCountJulioVendedor2);

                //countAnualMensualAgosto
                const startOfMonthAgosto = new Date(year, 7, 1);
                const endOfMonthAgosto = new Date(year, 7, 31); // Agosto tiene 31 días

                const orderCountAgostoVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthAgosto && itemDate <= endOfMonthAgosto && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountAgostoVendedor1(orderCountAgostoVendedor1);

                const orderCountAgostoVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthAgosto && itemDate <= endOfMonthAgosto && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountAgostoVendedor2(orderCountAgostoVendedor2);

                //countAnualMensualSeptiembre
                const startOfMonthSeptiembre = new Date(year, 8, 1);
                const endOfMonthSeptiembre = new Date(year, 8, 30); // Septiembre tiene 30 días

                const orderCountSeptiembreVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthSeptiembre && itemDate <= endOfMonthSeptiembre && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountSeptiembreVendedor1(orderCountSeptiembreVendedor1);

                const orderCountSeptiembreVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthSeptiembre && itemDate <= endOfMonthSeptiembre && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountSeptiembreVendedor2(orderCountSeptiembreVendedor2);

                //countAnualMensualOctubre
                const startOfMonthOctubre = new Date(year, 9, 1);
                const endOfMonthOctubre = new Date(year, 9, 31); // Octubre tiene 31 días

                const orderCountOctubreVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthOctubre && itemDate <= endOfMonthOctubre && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountOctubreVendedor1(orderCountOctubreVendedor1);

                const orderCountOctubreVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthOctubre && itemDate <= endOfMonthOctubre && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountOctubreVendedor2(orderCountOctubreVendedor2);

                //countAnualMensualNoviembre
                const startOfMonthNoviembre = new Date(year, 10, 1);
                const endOfMonthNoviembre = new Date(year, 10, 30); // Noviembre tiene 30 días

                const orderCountNoviembreVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthNoviembre && itemDate <= endOfMonthNoviembre && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountNoviembreVendedor1(orderCountNoviembreVendedor1);

                const orderCountNoviembreVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthNoviembre && itemDate <= endOfMonthNoviembre && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountNoviembreVendedor2(orderCountNoviembreVendedor2);

                //countAnualMensualDiciembre
                const startOfMonthDiciembre = new Date(year, 11, 1);
                const endOfMonthDiciembre = new Date(year, 11, 31); // Diciembre tiene 31 días

                const orderCountDiciembreVendedor1 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthDiciembre && itemDate <= endOfMonthDiciembre && item.user_id === 20) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountDiciembreVendedor1(orderCountDiciembreVendedor1);

                const orderCountDiciembreVendedor2 = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthDiciembre && itemDate <= endOfMonthDiciembre && item.user_id === 15) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountDiciembreVendedor2(orderCountDiciembreVendedor2);

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

    useEffect(() => {
        // Crear un objeto que mapea product_id a name
        const map = {};
        productsData.data.forEach(product => {
            map[product.id] = product.name;
        });
        setProductMap(map);
        const mapSku = {};
        productsData.data.forEach(product => {
            mapSku[product.id] = product.sku;
        });
        setProductMapSku(mapSku);
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

    const handleOpenHistoryModal = () => {
        setModalHistoryOpen(true);
    }
    const handleCloseHistoryModal = () => {
        setModalHistoryOpen(false);
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0 },
        { field: 'serie', headerName: 'Orden', flex: 0 },
        { field: 'date', headerName: 'Fecha', flex: 0 },
        {
            field: 'user_id', headerName: 'Asesor', flex: 1, renderCell: (params) => (
                <>{params.row.user_id === 20 ? "Sheyla Ramirez Cruz" : params.row.user_id === 21 ? "Rodrigo" : params.row.user_id === 15 ? "Daniel Lama" : params.row.user_id === 11 ? "Francis" : params.row.user_id === 15 ? "Daniel Lama" : params.row.user_id === 5 ? "Julio Soporte" : params.row.user_id === 15 ? "Daniel Lama" : params.row.user_id === 18 ? "Johnny Soporte" : "Usuario No registrado"}</>
            ),
        },
        { field: 'total', headerName: 'Precio', flex: 0 },
        { field: 'status_text', headerName: 'Estado', flex: 0 },
        { field: 'client', headerName: 'Cliente', flex: 1 },
        {
            field: 'product_id', headerName: 'Producto', flex: 1, renderCell: (params) => (
                <>
                    {productMap[params.row.product_id]}
                </>
            )
        },
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
                            <div className="col-sm-6">
                                <div className='justify-content-end float-sm-right'>
                                    <Button
                                        target="_blank"
                                        variant="contained"
                                        style={{ backgroundColor: switchOn ? "#9C27B0" : "#1A5276", color: switchOn ? "white" : "white" }}
                                        startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                                        onClick={handleOpenHistoryModal}
                                    >
                                        Nuevo
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "22%", justifyContent: "center", textAlign: "center" }}>
                        <div className="card card-outline" style={{ padding: "10px", display: "block" }}>
                            <b><i className='fas fa-cash-register' style={{ fontSize: "28px", color: "#1A5276", margin: "5px" }} /></b>
                            <span className='info-box-text' style={{ margin: "5px" }}>Sheyla {orderCountMonthVendedor1}</span>
                            <b><span className='info-box-number' style={{ fontSize: "15px", margin: "5px" }}> S/{orderPriceMonthVendedor1.toFixed(0)}{" "}{orderPriceMonthVendedor1 > orderPriceMonthVendedor2 ? "😁" : "😢"}</span></b>
                        </div>
                        <div className="card card-outline" style={{ padding: "10px", display: "block" }}>
                            <b><i className='fas fa-cash-register' style={{ fontSize: "28px", color: "#1A5276", margin: "5px" }} /></b>
                            <span className='info-box-text' style={{ margin: "5px" }}>Daniel {orderCountMonthVendedor2}</span>
                            <b><span className='info-box-number' style={{ fontSize: "15px", margin: "5px" }}>S/{orderPriceMonthVendedor2.toFixed(0)}{" "}{orderPriceMonthVendedor2 > orderPriceMonthVendedor1 ? "😁" : "😢"}</span></b>
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
                                ['Enero', orderCountEneroVendedor1, orderCountEneroVendedor2],
                                ['Febrero', orderCountFebreroVendedor1, orderCountFebreroVendedor2],
                                ['Marzo', orderCountMarzoVendedor1, orderCountMarzoVendedor2],
                                ['Abril', orderCountAbrilVendedor1, orderCountAbrilVendedor2],
                                ['Mayo', orderCountMayoVendedor1, orderCountMayoVendedor2],
                                ['Junio', orderCountJunioVendedor1, orderCountJunioVendedor2],
                                ['Julio', orderCountJulioVendedor1, orderCountJulioVendedor2],
                                ['Agosto', orderCountAgostoVendedor1, orderCountAgostoVendedor2],
                                ['Septiembre', orderCountSeptiembreVendedor1, orderCountSeptiembreVendedor2],
                                ['Octubre', orderCountOctubreVendedor1, orderCountOctubreVendedor2],
                                ['Noviembre', orderCountNoviembreVendedor1, orderCountNoviembreVendedor2],
                                ['Diciembre', orderCountDiciembreVendedor1, orderCountDiciembreVendedor2],
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
                                            {selectedIncident.serie} {" "}<Button
                                                variant="contained"
                                                style={{
                                                    backgroundColor: selectedIncident.status_text === "ACEPTADO" ? "#22FF94" : "red", color: selectedIncident.status_text === "ACEPTADO" ? "black" : "white"
                                                }}
                                                size="small"
                                                disabled={true}
                                            >
                                                <b>
                                                    <i className='fas fa-box'></i>{" "}
                                                    {selectedIncident.status_text}
                                                </b>
                                            </Button>
                                            {" "}<Button
                                                variant="contained"
                                                style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                                                size="small"
                                                disabled={true}
                                            ><b>
                                                    <i className='fas fa-motorcycle'></i>{" "}Motorizado</b>
                                            </Button>
                                            {" "}
                                        </Typography>
                                        <Typography>
                                            Asesor: {selectedIncident.user_id === 20 ? "Sheyla Ramirez Cruz" : selectedIncident.user_id === 15 ? "Daniel Lama" : "No es vendedor"} <br />
                                            Venta por: {selectedIncident.client_type} <br />
                                            Plataforma: {selectedIncident.platform} <br />
                                            Fecha de ingreso: {selectedIncident.date}<br />
                                            Cliente: {selectedIncident.client}<br />
                                            Documento: {selectedIncident.document_type}, {selectedIncident.document_number}<br />
                                            Celular: {selectedIncident.phone ? selectedIncident.phone : "No hay numero registrado"}<br />
                                            Direccion: {selectedIncident.address}, {selectedIncident.reference}<br />
                                            Departament, Provincia y distrito: {selectedIncident.departament}, {selectedIncident.province}, {selectedIncident.district}<br />
                                            Observación: {selectedIncident.obs ? selectedIncident.obs : "No hay observación"}
                                            <br />
                                            <br />
                                            <table style={{ width: "100%" }}>
                                                <thead>
                                                    <tr>
                                                        <th>SKU</th>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                        <th>Precio</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedIncident.productosRRSS.map((producto, index) => (
                                                        <tr key={index}>
                                                            <td>{productMapSku[producto.product_id] || 'Unknown Product'}</td>
                                                            <td>{productMap[producto.product_id] || 'Unknown Product'}</td>
                                                            <td>{producto.quantity}</td>
                                                            <td>{producto.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </Typography>
                                    </>
                                )}
                            </div>
                        </Modal>
                    </Box>
                </div>
                <Modal open={modalHistoryOpen} onClose={handleCloseHistoryModal}>
                    <div className="modalDetalle" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'auto', maxHeight: '80vh' }}>
                        <ContentSocial />
                    </div>
                </Modal>
            </div>
        </div>
    );
}
