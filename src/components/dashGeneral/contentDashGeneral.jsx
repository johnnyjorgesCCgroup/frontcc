import React, { useEffect, useRef, useState } from 'react';
import { Modal, Typography, Button, Box, Switch, TextField } from '@mui/material';
import Chart from 'chart.js/auto';
import './contentDashGeneral.css';

export default function contentInventory() {
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    const [data, setData] = useState([]);
    const [allEtiqueta, SetAllEtiqueta] = useState(0);
    const [allPendiente, SetAllPendiente] = useState(0);
    const [allEnRuta, SetAllEnRuta] = useState(0);
    const [allEntregado, SetAllEntregado] = useState(0);
    const [allAnulado, SetAllAnulado] = useState(0);
    const [allDevolucion, SetAllDevolucion] = useState(0);
    const [allRegularizar, SetAllRegularizar] = useState(0);
    const [switchOn, setSwitchOn] = useState(false);
    const [priceAyerOn, setPriceAyerOn] = useState(false);
    const [priceSemanalOn, setPriceSemanalOn] = useState(false);
    const [priceMensualOn, setPriceMensualOn] = useState(false);
    const chartAllRef = useRef(null);
    const chartAyerRef = useRef(null);
    const chartSemanalRef = useRef(null);
    const chartMensualRef = useRef(null);
    const chartLineMonthRef = useRef(null);
    const [filteredStatus, setFilteredStatus] = useState([]);
    const [orderCountTodayEtiqueta, SetorderCountTodayEtiqueta] = useState(0);
    const [orderCountTodayEtiquetaVtex, SetorderCountTodayEtiquetaVtex] = useState(0);
    const [orderCountTodayEtiquetaFalabella, SetorderCountTodayEtiquetaFalabella] = useState(0);
    const [orderCountTodayEtiquetaRipley, SetorderCountTodayEtiquetaRipley] = useState(0);
    const [orderCountTodayEtiquetaIntercorp, SetorderCountTodayEtiquetaIntercorp] = useState(0);
    const [orderCountTodayEtiquetaVentas, SetorderCountTodayEtiquetaVentas] = useState(0);
    const [orderCountTodayPendiente, SetorderCountTodayPendiente] = useState(0);
    const [orderCountTodayEnRuta, SetorderCountTodayEnRuta] = useState(0);
    const [orderCountTodayEntregado, SetorderCountTodayEntregado] = useState(0);
    const [orderCountTodayAnulado, SetorderCountTodayAnulado] = useState(0);
    const [orderCountTodayDevolucion, SetorderCountTodayDevolucion] = useState(0);
    const [orderCountTodayRegularizar, SetorderCountTodayRegularizar] = useState(0);
    const [orderCountYesterdayEtiqueta, SetorderCountYesterdayEtiqueta] = useState(0);
    const [orderCountYesterdayPendiente, SetorderCountYesterdayPendiente] = useState(0);
    const [orderCountYesterdayEnRuta, SetorderCountYesterdayEnRuta] = useState(0);
    const [orderCountYesterdayEntregado, SetorderCountYesterdayEntregado] = useState(0);
    const [orderCountYesterdayAnulado, SetorderCountYesterdayAnulado] = useState(0);
    const [orderCountYesterdayDevolucion, SetorderCountYesterdayDevolucion] = useState(0);
    const [orderCountYesterdayRegularizar, SetorderCountYesterdayRegularizar] = useState(0);
    const [orderCountWeeklyEtiqueta, SetorderCountWeeklyEtiqueta] = useState(0);
    const [orderCountWeeklyPendiente, SetorderCountWeeklyPendiente] = useState(0);
    const [orderCountWeeklyEnRuta, SetorderCountWeeklyEnRuta] = useState(0);
    const [orderCountWeeklyEntregado, SetorderCountWeeklyEntregado] = useState(0);
    const [orderCountWeeklyAnulado, SetorderCountWeeklyAnulado] = useState(0);
    const [orderCountWeeklyDevolucion, SetorderCountWeeklyDevolucion] = useState(0);
    const [orderCountWeeklyRegularizar, SetorderCountWeeklyRegularizar] = useState(0);
    const [orderCountMonthEtiqueta, SetorderCountMonthEtiqueta] = useState(0);
    const [orderCountMonthPendiente, SetorderCountMonthPendiente] = useState(0);
    const [orderCountMonthEnRuta, SetorderCountMonthEnRuta] = useState(0);
    const [orderCountMonthEntregado, SetorderCountMonthEntregado] = useState(0);
    const [orderCountMonthAnulado, SetorderCountMonthAnulado] = useState(0);
    const [orderCountMonthDevolucion, SetorderCountMonthDevolucion] = useState(0);
    const [orderCountMonthRegularizar, SetorderCountMonthRegularizar] = useState(0);
    const [orderCountYesterdayVtex, SetorderCountYesterdayVtex] = useState(0);
    const [orderCountYesterdaySaga, SetorderCountYesterdaySaga] = useState(0);
    const [orderCountYesterdayIntercorp, SetorderCountYesterdayIntercorp] = useState(0);
    const [orderCountYesterdayRipley, SetorderCountYesterdayRipley] = useState(0);
    const [orderCountYesterdayVentas, SetorderCountYesterdayVentas] = useState(0);
    const [orderCountMonthVtex, SetorderCountMonthVtex] = useState(0);
    const [orderCountMonthSaga, SetorderCountMonthSaga] = useState(0);
    const [orderCountMonthIntercorp, SetorderCountMonthIntercorp] = useState(0);
    const [orderCountMonthRipley, SetorderCountMonthRipley] = useState(0);
    const [orderCountMonthVentas, SetorderCountMonthVentas] = useState(0);
    const [orderCountWeeklyVtex, SetorderCountWeeklyVtex] = useState(0);
    const [orderCountWeeklySaga, SetorderCountWeeklySaga] = useState(0);
    const [orderCountWeeklyIntercorp, SetorderCountWeeklyIntercorp] = useState(0);
    const [orderCountWeeklyRipley, SetorderCountWeeklyRipley] = useState(0);
    const [orderCountWeeklyVentas, SetorderCountWeeklyVentas] = useState(0);
    const [orderCountYearVtex, SetorderCountYearVtex] = useState(0);
    const [orderCountYearSaga, SetorderCountYearSaga] = useState(0);
    const [orderCountYearIntercorp, SetorderCountYearIntercorp] = useState(0);
    const [orderCountYearRipley, SetorderCountYearRipley] = useState(0);
    const [orderCountYearVentas, SetorderCountYearVentas] = useState(0);
    const [totalPriceYesterday, SetTotalPriceYesterday] = useState(0);
    const [orderCountEnero, setorderCountEnero] = useState(0);
    const [orderCountFebrero, setorderCountFebrero] = useState(0);
    const [orderCountMarzo, setorderCountMarzo] = useState(0);
    const [orderCountAbril, setorderCountAbril] = useState(0);
    const [orderCountMayo, setorderCountMayo] = useState(0);
    const [orderCountJunio, setorderCountJunio] = useState(0);
    const [orderCountJulio, setorderCountJulio] = useState(0);
    const [orderCountAgosto, setorderCountAgosto] = useState(0);
    const [orderCountSeptiembre, setorderCountSeptiembre] = useState(0);
    const [orderCountOctubre, setorderCountOctubre] = useState(0);
    const [orderCountNoviembre, setorderCountNoviembre] = useState(0);
    const [orderCountDiciembre, setorderCountDiciembre] = useState(0);
    const [totalPriceWeekly, SetTotalPriceWeekly] = useState(0);
    const [totalPriceMonth, SetTotalPriceMonth] = useState(0);
    const [modalHistoryOpen, setModalHistoryOpen] = useState(0);
    const [modalEtiquetaOpen, setModalEtiquetaOpen] = useState(0);
    const todayMarkets = new Date();

    const formatDateTime = (date, timeZone) => {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: timeZone,
        };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
      };
      const formattedDateTime = formatDateTime(todayMarkets, 'America/Lima');
      

    const handleSwitchChange = () => {
        setSwitchOn(!switchOn);
    }

    const handlePriceAyerChange = () => {
        setPriceAyerOn(!priceAyerOn);
    }

    const handlePriceSemanalChange = () => {
        setPriceSemanalOn(!priceSemanalOn);
    }

    const handlePriceMensualChange = () => {
        setPriceMensualOn(!priceMensualOn);
    }

    const handleOpenHistoryModal = () => {
        setModalHistoryOpen(true);
    }
    const handleOpenEtiquetaModal = () => {
        setModalEtiquetaOpen(true);
    }
    const handleCloseHistoryModal = () => {
        setModalHistoryOpen(false);
    }
    const handleCloseEtiquetaModal = () => {
        setModalEtiquetaOpen(false);
    }

    const fetchDataFromAPI = () => {
        fetch('https://api.cvimport.com/api/cut')
            .then(response => response.json())
            .then(data => {
                const responseData = data.data;
                const sortedData = responseData.sort((a, b) => b.id - a.id);
                // Usar un Set para llevar un registro de los valores únicos de oc
                const uniqueOcSet = new Set();
                const filteredData = [];

                sortedData.forEach(item => {
                    if (!uniqueOcSet.has(item.oc)) {
                        uniqueOcSet.add(item.oc);
                        filteredData.push({
                            oc: item.oc,
                            price: item.price,
                            status: item.status,
                            date: item.date,
                            origin: item.origin,
                            client: item.client,
                        });
                    }
                });

                //allData
                const allEtiqueta = filteredData.reduce((count, item) => {
                    if (item.status === 1) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetAllEtiqueta(allEtiqueta);
                const allPendiente = filteredData.reduce((count, item) => {
                    if (item.status === 0) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetAllPendiente(allPendiente);
                const allEnRuta = filteredData.reduce((count, item) => {
                    if (item.status === 2 || item.status === 7) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetAllEnRuta(allEnRuta);
                const allEntregado = filteredData.reduce((count, item) => {
                    if (item.status === 3) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetAllEntregado(allEntregado);
                const allAnulado = filteredData.reduce((count, item) => {
                    if (item.status === 4) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetAllAnulado(allAnulado);
                const allDevolucion = filteredData.reduce((count, item) => {
                    if (item.status === 5) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetAllDevolucion(allDevolucion);
                const allRegularizar = filteredData.reduce((count, item) => {
                    if (item.status === 12) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetAllRegularizar(allRegularizar);

                //countHoy
                const currentDate = new Date().toISOString().split('T')[0];
                const filteredStatusList = filteredData.filter(item => item.date === currentDate).map(item => item.status);
                setFilteredStatus(filteredStatusList);

                const orderCountTodayEtiqueta = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 1) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayEtiqueta(orderCountTodayEtiqueta);
                const orderCountTodayEtiquetaVtex = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 1 && item.origin === "Vtex") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayEtiquetaVtex(orderCountTodayEtiquetaVtex);
                const orderCountTodayEtiquetaFalabella = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 1 && item.origin === "Saga") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayEtiquetaFalabella(orderCountTodayEtiquetaFalabella);
                const orderCountTodayEtiquetaRipley = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 1 && item.origin === "Ripley") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayEtiquetaRipley(orderCountTodayEtiquetaRipley);
                const orderCountTodayEtiquetaIntercorp = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 1 && item.origin === "InterCorp") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayEtiquetaIntercorp(orderCountTodayEtiquetaIntercorp);
                const orderCountTodayEtiquetaVentas = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 1 && item.origin === "VENTA") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayEtiquetaVentas(orderCountTodayEtiquetaVentas);
                const orderCountTodayPendiente = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 0) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayPendiente(orderCountTodayPendiente);
                const orderCountTodayEnRuta = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 2 || item.date === currentDate && item.status === 7) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayEnRuta(orderCountTodayEnRuta);
                const orderCountTodayEntregado = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 3) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayEntregado(orderCountTodayEntregado);
                const orderCountTodayAnulado = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 4) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayAnulado(orderCountTodayAnulado);
                const orderCountTodayDevolucion = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 5) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayDevolucion(orderCountTodayDevolucion);
                const orderCountTodayRegularizar = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 12) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayRegularizar(orderCountTodayRegularizar);

                //countAyer
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const formattedYesterday = yesterday.toISOString().split('T')[0];

                const orderCountYesterdayEtiqueta = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.status === 1) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayEtiqueta(orderCountYesterdayEtiqueta);
                const orderCountYesterdayPendiente = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.status === 0) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayPendiente(orderCountYesterdayPendiente);
                const orderCountYesterdayEnRuta = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.status === 2) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayEnRuta(orderCountYesterdayEnRuta);
                const orderCountYesterdayEntregado = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.status === 3) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayEntregado(orderCountYesterdayEntregado);
                const orderCountYesterdayAnulado = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.status === 4) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayAnulado(orderCountYesterdayAnulado);
                const orderCountYesterdayDevolucion = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.status === 5) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayDevolucion(orderCountYesterdayDevolucion);
                const orderCountYesterdayRegularizar = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.status === 12) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayRegularizar(orderCountYesterdayRegularizar);

                //countAyerMarkets
                const orderCountYesterdayVtex = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.origin === "Vtex") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayVtex(orderCountYesterdayVtex);
                const orderCountYesterdaySaga = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.origin === "Saga") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdaySaga(orderCountYesterdaySaga);
                const orderCountYesterdayIntercorp = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.origin === "Intercorp") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayIntercorp(orderCountYesterdayIntercorp);
                const orderCountYesterdayRipley = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.origin === "Ripley") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayRipley(orderCountYesterdayRipley);
                const orderCountYesterdayVentas = filteredData.reduce((count, item) => {
                    if (item.date === formattedYesterday && item.origin === "VENTA") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYesterdayVentas(orderCountYesterdayVentas);

                //priceAyer
                const totalPriceYesterday = filteredData.reduce((total, item) => {
                    if (item.date === formattedYesterday) {
                        return total + parseFloat(item.price); // Suma el valor numérico del precio
                    } else {
                        return total;
                    }
                }, 0);
                SetTotalPriceYesterday(totalPriceYesterday);

                //semanal y mensual
                const today = new Date();
                const year = today.getFullYear();
                const dayOfWeek = today.getDay(); //dia de la semana
                const daysUntilMonday = (dayOfWeek === 0) ? 6 : dayOfWeek - 1; //descuenta 1 al día de la semana
                const startOfWeek = new Date(today); //fecha de hoy
                const endOfWeek = new Date(startOfWeek);
                startOfWeek.setDate(today.getDate() - daysUntilMonday - 1);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                const startOfYear = new Date(today.getFullYear(), 0, 1);
                const endOfYear = new Date(today.getFullYear(), 11, 31);

                //countAnualMensualEnero
                const startOfMonthEnero = new Date(year, 0, 1);
                const endOfMonthEnero = new Date(year, 0, 31);

                const orderCountEnero = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthEnero && itemDate <= endOfMonthEnero) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountEnero(orderCountEnero);

                //countAnualMensualFebrero
                const isLeapYear = (year) => {
                    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
                };

                const startOfMonthFebrero = new Date(year, 1, 1);
                const endOfMonthFebrero = new Date(year, 1, isLeapYear(year) ? 29 : 28);

                const orderCountFebrero = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthFebrero && itemDate <= endOfMonthFebrero) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountFebrero(orderCountFebrero);

                //countAnualMensualMarzo
                const startOfMonthMarzo = new Date(year, 2, 1);
                const endOfMonthMarzo = new Date(year, 2, 31);

                const orderCountMarzo = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthMarzo && itemDate <= endOfMonthMarzo) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountMarzo(orderCountMarzo);

                //countAnualMensualAbril
                const startOfMonthAbril = new Date(year, 3, 1);
                const endOfMonthAbril = new Date(year, 3, 30); // 30 días en abril

                const orderCountAbril = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthAbril && itemDate <= endOfMonthAbril) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountAbril(orderCountAbril);

                //countAnualMensualMayo
                const startOfMonthMayo = new Date(year, 4, 1);
                const endOfMonthMayo = new Date(year, 4, 31); // Mayo tiene 31 días

                const orderCountMayo = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthMayo && itemDate <= endOfMonthMayo) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountMayo(orderCountMayo);

                //countAnualMensualJunio
                const startOfMonthJunio = new Date(year, 5, 1);
                const endOfMonthJunio = new Date(year, 5, 30); // Junio tiene 30 días

                const orderCountJunio = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthJunio && itemDate <= endOfMonthJunio) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountJunio(orderCountJunio);

                //countAnualMensualJulio
                const startOfMonthJulio = new Date(year, 6, 1);
                const endOfMonthJulio = new Date(year, 6, 31); // Julio tiene 31 días

                const orderCountJulio = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthJulio && itemDate <= endOfMonthJulio) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountJulio(orderCountJulio);

                //countAnualMensualAgosto
                const startOfMonthAgosto = new Date(year, 7, 1);
                const endOfMonthAgosto = new Date(year, 7, 31); // Agosto tiene 31 días

                const orderCountAgosto = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthAgosto && itemDate <= endOfMonthAgosto) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountAgosto(orderCountAgosto);

                //countAnualMensualSeptiembre
                const startOfMonthSeptiembre = new Date(year, 8, 1);
                const endOfMonthSeptiembre = new Date(year, 8, 30); // Septiembre tiene 30 días

                const orderCountSeptiembre = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthSeptiembre && itemDate <= endOfMonthSeptiembre) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountSeptiembre(orderCountSeptiembre);

                //countAnualMensualOctubre
                const startOfMonthOctubre = new Date(year, 9, 1);
                const endOfMonthOctubre = new Date(year, 9, 31); // Octubre tiene 31 días

                const orderCountOctubre = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthOctubre && itemDate <= endOfMonthOctubre) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountOctubre(orderCountOctubre);

                //countAnualMensualNoviembre
                const startOfMonthNoviembre = new Date(year, 10, 1);
                const endOfMonthNoviembre = new Date(year, 10, 30); // Noviembre tiene 30 días

                const orderCountNoviembre = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthNoviembre && itemDate <= endOfMonthNoviembre) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountNoviembre(orderCountNoviembre);

                //countAnualMensualDiciembre
                const startOfMonthDiciembre = new Date(year, 11, 1);
                const endOfMonthDiciembre = new Date(year, 11, 31); // Diciembre tiene 31 días

                const orderCountDiciembre = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonthDiciembre && itemDate <= endOfMonthDiciembre) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setorderCountDiciembre(orderCountDiciembre);

                //priceSemanal
                const totalPriceWeekly = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek) {
                        return count + parseFloat(item.price);
                    } else {
                        return count;
                    }
                }, 0);
                SetTotalPriceWeekly(totalPriceWeekly);

                //countSemanal
                const orderCountWeeklyEtiqueta = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.status === 1) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyEtiqueta(orderCountWeeklyEtiqueta);
                const orderCountWeeklyPendiente = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.status === 0) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyPendiente(orderCountWeeklyPendiente);
                const orderCountWeeklyEnRuta = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.status === 2) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyEnRuta(orderCountWeeklyEnRuta);
                const orderCountWeeklyEntregado = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.status === 3) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyEntregado(orderCountWeeklyEntregado);
                const orderCountWeeklyAnulado = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.status === 4) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyAnulado(orderCountWeeklyAnulado);
                const orderCountWeeklyDevolucion = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.status === 5) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyDevolucion(orderCountWeeklyDevolucion);
                const orderCountWeeklyRegularizar = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.status === 12) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyRegularizar(orderCountWeeklyRegularizar);

                //countWeeklyMarkets
                const orderCountWeeklyVtex = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.origin === "Vtex") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyVtex(orderCountWeeklyVtex);
                const orderCountWeeklySaga = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.origin === "Saga") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklySaga(orderCountWeeklySaga);
                const orderCountWeeklyIntercorp = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.origin === "InterCorp") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyIntercorp(orderCountWeeklyIntercorp);
                const orderCountWeeklyRipley = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.origin === "Ripley") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyRipley(orderCountWeeklyRipley);
                const orderCountWeeklyVentas = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek && item.origin === "VENTA") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountWeeklyVentas(orderCountWeeklyVentas);

                //countMensual
                const orderCountMonthEtiqueta = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.status === 1) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthEtiqueta(orderCountMonthEtiqueta);
                const orderCountMonthPendiente = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.status === 0) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthPendiente(orderCountMonthPendiente);
                const orderCountMonthEnRuta = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.status === 2) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthEnRuta(orderCountMonthEnRuta);
                const orderCountMonthEntregado = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.status === 3) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthEntregado(orderCountMonthEntregado);
                const orderCountMonthAnulado = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.status === 4) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthAnulado(orderCountMonthAnulado);
                const orderCountMonthDevolucion = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.status === 5) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthDevolucion(orderCountMonthDevolucion);
                const orderCountMonthRegularizar = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.status === 12) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthRegularizar(orderCountMonthRegularizar);

                //priceMensual
                const totalPriceMonth = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth) {
                        return count + parseFloat(item.price);
                    } else {
                        return count;
                    }
                }, 0);
                SetTotalPriceMonth(totalPriceMonth);

                //countMonthMarkets
                const orderCountMonthVtex = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.origin === 'Vtex') {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthVtex(orderCountMonthVtex);

                const orderCountMonthSaga = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.origin === 'Saga') {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthSaga(orderCountMonthSaga);

                const orderCountMonthIntercorp = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.origin === 'InterCorp') {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthIntercorp(orderCountMonthIntercorp);

                const orderCountMonthRipley = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.origin === 'Ripley') {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthRipley(orderCountMonthRipley);

                const orderCountMonthVentas = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfMonth && itemDate <= endOfMonth && item.origin === 'VENTA') {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountMonthVentas(orderCountMonthVentas);

                const limitedData = filteredData.slice(0, 14);
                setData(limitedData);

                //countYearMarkets
                const orderCountYearVtex = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfYear && itemDate <= endOfYear && item.origin === "Vtex") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYearVtex(orderCountYearVtex);
                const orderCountYearSaga = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfYear && itemDate <= endOfYear && item.origin === "Saga") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYearSaga(orderCountYearSaga);
                const orderCountYearIntercorp = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfYear && itemDate <= endOfYear && item.origin === "InterCorp") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYearIntercorp(orderCountYearIntercorp);
                const orderCountYearRipley = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfYear && itemDate <= endOfYear && item.origin === "Ripley") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYearRipley(orderCountYearRipley);
                const orderCountYearVentas = filteredData.reduce((count, item) => {
                    const itemDate = new Date(item.date);
                    if (itemDate >= startOfYear && itemDate <= endOfYear && item.origin === "Ripley") {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountYearVentas(orderCountYearVentas);
            })
            .catch(error => console.error('Error al obtener los datos de la API:', error));
    };

    //Fetch
    useEffect(() => {
        fetchDataFromAPI();
    }, []);


    const allTodo = allPendiente + allEtiqueta + allEnRuta + allEntregado + allAnulado + allDevolucion + allRegularizar;
    const allHoy = orderCountTodayEtiqueta + orderCountTodayPendiente + orderCountTodayEnRuta + orderCountTodayEntregado + orderCountTodayAnulado + orderCountTodayDevolucion + orderCountTodayRegularizar + orderCountTodayRegularizar;
    const allAyer = orderCountYesterdayEtiqueta + orderCountYesterdayPendiente + orderCountYesterdayEnRuta + orderCountYesterdayEntregado + orderCountYesterdayAnulado + orderCountYesterdayDevolucion + orderCountYesterdayRegularizar;
    const allSemanal = orderCountWeeklyEtiqueta + orderCountWeeklyPendiente + orderCountWeeklyEnRuta + orderCountWeeklyEntregado + orderCountWeeklyAnulado + orderCountWeeklyDevolucion + orderCountWeeklyRegularizar;
    const allMensual = orderCountMonthEtiqueta + orderCountMonthPendiente + orderCountMonthEnRuta + orderCountMonthEntregado + orderCountMonthAnulado + orderCountMonthDevolucion + orderCountMonthRegularizar;

    //BardChart
    useEffect(() => {
        let myChart2 = createBarChartSemanal(orderCountWeeklyVtex, orderCountWeeklySaga, orderCountWeeklyIntercorp, orderCountWeeklyRipley, orderCountWeeklyVentas);
        let myChart3 = createBarChartMensual(orderCountMonthVtex, orderCountMonthSaga, orderCountMonthIntercorp, orderCountMonthRipley, orderCountMonthVentas);
        let myChart = createBarChartAyer(orderCountYesterdayVtex, orderCountYesterdaySaga, orderCountYesterdayIntercorp, orderCountYesterdayRipley, orderCountYesterdayVentas);
        let myChart1 = createBarChartYear(orderCountYearVtex, orderCountYearSaga, orderCountYearIntercorp, orderCountYearRipley, orderCountYearVentas);
        let myChart4 = createLineChartMonth(orderCountEnero, orderCountFebrero, orderCountMarzo, orderCountAbril, orderCountMayo, orderCountJunio, orderCountJulio, orderCountAgosto, orderCountSeptiembre, orderCountOctubre, orderCountNoviembre, orderCountDiciembre);
        return () => {
            if (myChart) {
                myChart.destroy();
            }
            if (myChart2) {
                myChart2.destroy();
            }
            if (myChart3) {
                myChart3.destroy();
            }
            if (myChart1) {
                myChart1.destroy();
            }
            if (myChart4) {
                myChart4.destroy();
            }
        };
    }, [orderCountYesterdayVtex, orderCountYesterdaySaga, orderCountYesterdayIntercorp, orderCountYesterdayRipley, orderCountYesterdayVentas, orderCountMonthVtex, orderCountMonthSaga, orderCountMonthIntercorp, orderCountMonthRipley, orderCountMonthVentas, orderCountWeeklyVtex, orderCountWeeklySaga, orderCountWeeklyIntercorp, orderCountWeeklyRipley, orderCountWeeklyVentas, orderCountYearVtex, orderCountYearSaga, orderCountYearIntercorp, orderCountYearRipley, orderCountYearVentas, orderCountEnero, orderCountFebrero, orderCountMarzo, orderCountAbril, orderCountMayo, orderCountJunio, orderCountJulio, orderCountAgosto, orderCountSeptiembre, orderCountOctubre, orderCountNoviembre, orderCountDiciembre]);

    const createBarChartAyer = (orderCountYesterdayVtex, orderCountYesterdaySaga, orderCountYesterdayIntercorp, orderCountYesterdayRipley, orderCountYesterdayVentas) => {

        let myChart = null;

        const ctx = chartAyerRef.current.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Vtex", "Falabella", "Intercorp", "Ripley", "RRSS"],
                datasets: [{
                    label: 'Ordenes',
                    data: [orderCountYesterdayVtex, orderCountYesterdaySaga, orderCountYesterdayIntercorp, orderCountYesterdayRipley, orderCountYesterdayVentas],
                    backgroundColor: ['#1A5276'],
                    hoverBackgroundColor: ['#CED4DA', '#CED4DA', '#CED4DA', '#CED4DA'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom' // Coloca la leyenda en la parte inferior
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                // Muestra el valor en el tooltip junto con su porcentaje
                                return context.dataset.label + ': ' + context.parsed.y + ' (' + ((context.parsed.y / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(2) + '%)';
                            }
                        }
                    }
                }
            }
        });

        // Devolvemos el gráfico creado para poder destruirlo más tarde si es necesario
        return myChart;
    };

    const createBarChartSemanal = (orderCountWeeklyVtex, orderCountWeeklySaga, orderCountWeeklyIntercorp, orderCountWeeklyRipley, orderCountWeeklyVentas) => {
        let myChart = null;

        const ctx = chartSemanalRef.current.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Vtex", "Falabella", "Intercorp", "Ripley", "RRSS"],
                datasets: [{
                    label: 'Ordenes',
                    data: [orderCountWeeklyVtex, orderCountWeeklySaga, orderCountWeeklyIntercorp, orderCountWeeklyRipley, orderCountWeeklyVentas],
                    backgroundColor: ['#1A5276'],
                    hoverBackgroundColor: ['#CED4DA', '#CED4DA', '#CED4DA', '#CED4DA'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom' // Coloca la leyenda en la parte inferior
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                // Muestra el valor en el tooltip junto con su porcentaje
                                return context.dataset.label + ': ' + context.parsed.y + ' (' + ((context.parsed.y / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(2) + '%)';
                            }
                        }
                    }
                }
            }
        });

        // Devolvemos el gráfico creado para poder destruirlo más tarde si es necesario
        return myChart;
    };

    const createBarChartMensual = (orderCountMonthVtex, orderCountMonthSaga, orderCountMonthIntercorp, orderCountMonthRipley, orderCountMonthVentas) => {
        let myChart = null;

        const ctx = chartMensualRef.current.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Vtex", "Falabella", "Intercorp", "Ripley", "RRSS"],
                datasets: [{
                    label: 'Ordenes',
                    data: [orderCountMonthVtex, orderCountMonthSaga, orderCountMonthIntercorp, orderCountMonthRipley, orderCountMonthVentas],
                    backgroundColor: ['#1A5276'],
                    hoverBackgroundColor: ['#CED4DA', '#CED4DA', '#CED4DA', '#CED4DA'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom' // Coloca la leyenda en la parte inferior
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                // Muestra el valor en el tooltip junto con su porcentaje
                                return context.dataset.label + ': ' + context.parsed.y + ' (' + ((context.parsed.y / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(2) + '%)';
                            }
                        }
                    }
                }
            }
        });
        return myChart;
    };

    const createBarChartYear = (orderCountYearVtex, orderCountYearSaga, orderCountYearIntercorp, orderCountYearRipley, orderCountYearVentas) => {
        try {
            let myChart = null;

            const ctx = chartAllRef.current.getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Vtex", "Falabella", "Intercorp", "Ripley", "RRSS"],
                    datasets: [{
                        label: 'Ordenes',
                        data: [orderCountYearVtex, orderCountYearSaga, orderCountYearIntercorp, orderCountYearRipley, orderCountYearVentas],
                        backgroundColor: '#1A5276',
                        hoverBackgroundColor: ['#CED4DA', '#CED4DA', '#CED4DA', '#CED4DA'],
                        borderWidth: 0.2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom' // Coloca la leyenda en la parte inferior
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    // Muestra el valor en el tooltip junto con su porcentaje
                                    return context.dataset.label + ': ' + context.parsed.y + ' (' + ((context.parsed.y / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(2) + '%)';
                                }
                            }
                        }
                    },
                    layout: {
                        padding: {
                            left: 15,
                            right: 15,
                            top: 15,
                            bottom: 15
                        }
                    },
                    barThickness: 17
                }
            });
            return myChart;

        } catch (error) {
            console.error("Error al crear el gráfico:", error);
            return null;
        }
    };

    const createLineChartMonth = (orderCountEnero, orderCountFebrero, orderCountMarzo, orderCountAbril, orderCountMayo, orderCountJunio, orderCountJulio, orderCountAgosto, orderCountSeptiembre, orderCountOctubre, orderCountNoviembre, orderCountDiciembre) => {
        try {
            let myChart = null;

            const ctx = chartLineMonthRef.current.getContext('2d');
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    datasets: [{
                        label: 'Ordenes',
                        data: [orderCountEnero, orderCountFebrero, orderCountMarzo, orderCountAbril, orderCountMayo, orderCountJunio, orderCountJulio, orderCountAgosto, orderCountSeptiembre, orderCountOctubre, orderCountNoviembre, orderCountDiciembre],
                        backgroundColor: ['#1A5276'],
                        hoverBackgroundColor: ['#CED4DA', '#CED4DA', '#CED4DA', '#CED4DA'],
                        borderWidth: 5
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom' // Coloca la leyenda en la parte inferior
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    // Muestra el valor en el tooltip junto con su porcentaje
                                    return context.dataset.label + ': ' + context.parsed.y + ' (' + ((context.parsed.y / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(2) + '%)';
                                }
                            }
                        }
                    }
                }
            });
            return myChart;

        } catch (error) {
            console.error("Error al crear el gráfico:", error);
            return null;
        }

    };

    return (
        <div className="content-wrapper">
            <div className="card" style={{ padding: 20 }}>
                <div className="card card-outline">
                    <div className="card-header border-0">
                        <div className="row mb-2" style={{ alignItems: "center" }}>
                            <div className="col-sm-6">
                                <h3 className="card-title">
                                    <b>Dashboard General</b>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card card-outline">
                    <div className="card-header border-0">
                        <div className="cardEstadosDashGeneral">
                            <div className="cardEstadosTitle">
                                <h3 className="card-title">
                                    <b style={{ color: switchOn ? "#E3E3E3" : "black", marginRight: "10px" }}>Hoy</b>
                                    <Switch id="switch1" {...label} checked={switchOn} onChange={handleSwitchChange} color="primary" size="small" />
                                    <b style={{ color: switchOn ? "black" : "#E3E3E3", marginLeft: "10px" }}>Todas</b>
                                </h3>
                                <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                    <i className='fas fa-caret-up' style={{ color: "green", marginRight: "5px" }}></i>
                                    <a onClick={handleOpenHistoryModal} style={{ color: "green" }}>{switchOn ? allTodo : allHoy} Ordenes</a>
                                </div>
                            </div>
                            <div className="row" style={{ width: "100%" }}>
                                <div className="dashPrincipal">
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i onClick={handleOpenEtiquetaModal} className='fas fa-boxes-stacked' style={{ color: "#C0392B" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <a onClick={handleOpenEtiquetaModal} style={{ color: 'inherit', textDecoration: 'none' }} className='info-box-text'>Etiqueta</a>
                                            <a onClick={handleOpenEtiquetaModal} className='info-box-number' style={{ fontSize: "20px", color: 'inherit', textDecoration: 'none' }}>{switchOn ? allEtiqueta : orderCountTodayEtiqueta}</a>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-truck-ramp-box' style={{ color: "#C0392B" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Pendiente</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allPendiente : orderCountTodayPendiente}</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-motorcycle' style={{ color: "#7D6608" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>En ruta</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allEnRuta : orderCountTodayEnRuta}</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-people-carry-box' style={{ color: "#229954" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Entregado</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allEntregado : orderCountTodayEntregado}</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-boxes-packing' style={{ color: "#1A5276" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Anulado</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allAnulado : orderCountTodayAnulado}</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Cambio</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allDevolucion : orderCountTodayDevolucion}</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-hourglass' style={{ color: "#1A5276" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Regularizar</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allRegularizar : orderCountTodayRegularizar}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cardAyerSemanalAnualGeneral">
                    <div className="card card-outline" id="cardAyerGeneral">
                        <div className="card-header border-0">
                            <div>
                                <div>
                                    <div className="card card-outlined" id='cardAyer' style={{ padding: "20px", borderRadius: "10px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <h3 className="card-title" style={{ color: "black" }}>
                                                <b>Ayer</b>
                                            </h3>
                                            <div>
                                                <Switch id="switch1" {...label} checked={priceAyerOn} onChange={handlePriceAyerChange} color="primary" size="small" />
                                                <i className='fas fa-caret-up' style={{ color: "green", marginRight: "5px" }}></i>
                                                <a style={{ color: "green" }}>{priceAyerOn ? "" : "S/"} {priceAyerOn ? allAyer : totalPriceYesterday.toFixed(2)}</a>
                                            </div>
                                        </div>
                                        <br />
                                        <canvas ref={chartAyerRef} style={{ height: "200px" }} />
                                    </div>
                                    <div id='cardAyerDetalles' style={{ paddingTop: "15px" }}>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-boxes-stacked' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Etiqueta</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountYesterdayEtiqueta}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Pendiente</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountYesterdayPendiente}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-motorcycle' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>En ruta</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountYesterdayEnRuta}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-people-carry-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Entregado</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountYesterdayEntregado}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-boxes-packing' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Anulado</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountYesterdayAnulado}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Devolución / Cambio</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountYesterdayDevolucion}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-hourglass' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Regularizar</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountYesterdayRegularizar}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-outline" id="cardSemanalGeneral">
                        <div className="card-header border-0">
                            <div>
                                <div>
                                    <div className="card card-outline" id='cardSemanal' style={{ padding: "20px", borderRadius: "10px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <h3 className="card-title" style={{ color: "black" }}>
                                                <b>Semanal</b>
                                            </h3>
                                            <div>
                                                <Switch id="switch2" {...label} checked={priceSemanalOn} onChange={handlePriceSemanalChange} color="primary" size="small" />
                                                <i className='fas fa-caret-up' style={{ color: "green", marginRight: "5px" }}></i>
                                                <a style={{ color: "green" }}>{priceSemanalOn ? "" : "S/"} {priceSemanalOn ? allSemanal : totalPriceWeekly.toFixed(2)}</a>
                                            </div>
                                        </div>
                                        <br />
                                        <canvas ref={chartSemanalRef} style={{ height: "200px" }} />
                                    </div>
                                    <div id='cardSemanalDetalles' style={{ paddingTop: "15px" }}>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-boxes-stacked' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Etiqueta</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountWeeklyEtiqueta}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Pendiente</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountWeeklyPendiente}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-motorcycle' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>En ruta</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountWeeklyEnRuta}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-people-carry-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Entregado</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountWeeklyEntregado}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-boxes-packing' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Anulado</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountWeeklyAnulado}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Devolución / Cambio</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountWeeklyDevolucion}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-hourglass' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Regularizar</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountWeeklyRegularizar}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-outline" id="cardMensualGeneral">
                        <div className="card-header border-0">
                            <div>
                                <div>
                                    <div className="card card-outlined" id='cardMensual' style={{ padding: "20px", borderRadius: "10px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <h3 className="card-title" style={{ color: "black" }}>
                                                <b>Mensual</b>
                                            </h3>
                                            <div>
                                                <Switch id="switch2" {...label} checked={priceMensualOn} onChange={handlePriceMensualChange} color="primary" size="small" />
                                                <i className='fas fa-caret-up' style={{ color: "green", marginRight: "5px" }}></i>{" "}
                                                <a style={{ color: "green" }}>{priceMensualOn ? "" : "S/"} {priceMensualOn ? allMensual : totalPriceMonth.toFixed(2)}</a>
                                            </div>
                                        </div>
                                        <br />
                                        <canvas ref={chartMensualRef} style={{ height: "200px" }} />
                                    </div>
                                    <div id='cardMensualDetalles' style={{ paddingTop: "15px" }}>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-boxes-stacked' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Etiqueta</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountMonthEtiqueta}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Pendiente</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountMonthPendiente}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-motorcycle' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>En ruta</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountMonthEnRuta}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-people-carry-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Entregado</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountMonthEntregado}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-boxes-packing' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Anulado</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountMonthAnulado}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Devolución / Cambio</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountMonthDevolucion}</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-hourglass' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Regularizar</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountMonthRegularizar}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card card-outline' id="cardUltimosMovimientos" style={{ width: "18.1%", marginLeft: "1%", paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
                        <div style={{ display: "inline-block", width: "fit-content", backgroundColor: "#E4EEF3", borderRadius: "10px", padding: "10px", margin: "0 auto", textAlign: "center", marginBottom: "5px" }}>
                            <i className='fas fa-box-open' style={{ color: "#1A5276" }}></i>
                        </div>
                        <h3 className="card-title" style={{ color: "black", textAlign: "center", fontSize: "14px", marginBottom: "7px" }}>
                            <b>Ultimos Movimientos</b>
                        </h3>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: "#E4EEF3", fontSize: "14px" }}>Orden</th>
                                        <th style={{ backgroundColor: "#E4EEF3", fontSize: "14px" }}>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(item => (
                                        <tr key={item.oc} id="tooltip">
                                            <td style={{ fontSize: "12px" }}><b>{item.oc}</b></td>
                                            <td style={{ fontSize: "12px" }}><b>S/{item.price}</b>
                                                <span className="tooltiptext">Fecha: <span style={{ fontSize: "12px" }}>{item.date}</span><br />Origen: <span style={{ fontSize: "12px" }}>{item.origin}</span><br />Cliente: <span style={{ fontSize: "12px" }}>{item.client}</span><br />Estado: <span style={{ fontSize: "12px" }}>{item.status === 0 ? "Pendiente" : item.status === 1 ? "ETIQUETA" : item.status === 2 ? "EN RUTA" : item.status === 3 ? "ENTREGADO" : item.status === 4 ? "ANULADO" : item.status === 5 ? "DEVOLUCION" : "OTROS"}</span></span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="card card-outline" style={{ paddingBottom: "30px" }}>
                    <div className="card-header border-0">
                        <div className="row mb-2" style={{ alignItems: "center" }}>
                            <div className="col-sm-6">
                                <h3 className="card-title">
                                    <b>Anual</b>
                                    <span style={{ marginLeft: '10px', fontSize: '18px', color: "green" }}>{new Date().getFullYear()}</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="cardAnualGeneral">
                        <div className='card card-outline' id="cardAnual1">
                            <canvas ref={chartAllRef} style={{ width: "100%" }} />
                        </div>
                        <div className='card card-outline' id="cardAnual2">
                            <canvas ref={chartLineMonthRef} style={{ width: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={modalHistoryOpen} onClose={handleCloseHistoryModal}>
                <div className="modalDetalle">
                    <h3 className="card-title">
                        <Typography>Cortes Diarios</Typography>
                    </h3>
                    <br />
                    <br />
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Corte</th>
                                <th>Inicio</th>
                                <th>Fin</th>
                                <th>CCG</th>
                                <th>OPL</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Vtex 1°</td>
                                <td>08:00</td>
                                <td>09:30</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Ripley 1°</td>
                                <td>08:00</td>
                                <td>09:30</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Ventas RRSS 1°</td>
                                <td>08:00</td>
                                <td>09:30</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Incidencias</td>
                                <td>08:00</td>
                                <td>09:30</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Mercado Libre</td>
                                <td>08:00</td>
                                <td>09:30</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Intercorp 1°</td>
                                <td>12:50</td>
                                <td>13:00</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>Intercorp 2°</td>
                                <td>15:30</td>
                                <td>16:00</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>Ripley 2°</td>
                                <td>15:30</td>
                                <td>16:00</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>Vtex 2°</td>
                                <td>16:00</td>
                                <td>16:30</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>Ventas RRSS 2°</td>
                                <td>16:00</td>
                                <td>16:30</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td>Falabella Antiguo</td>
                                <td>16:00</td>
                                <td>16:30</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </Modal>
            <Modal open={modalEtiquetaOpen} onClose={handleCloseEtiquetaModal}>
                <div className="modalDetalle" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'auto', maxHeight: '80vh' }}>
                    <h3 className="card-title">
                        <b>Etiquetas de hoy: {formattedDateTime}</b>
                    </h3>
                    <br />
                        <div className="dashPrincipal2">
                            <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                <span className='info-box-icon'>
                                    <i onClick={handleOpenEtiquetaModal} className='fas fa-square' style={{ color: "#FF00D4" }} />
                                </span>
                                <div className='info-box-content'>
                                    <a onClick={handleOpenEtiquetaModal} style={{ color: 'inherit', textDecoration: 'none' }} className='info-box-text'>Vtex</a>
                                    <a onClick={handleOpenEtiquetaModal} className='info-box-number' style={{ fontSize: "20px", color: 'inherit', textDecoration: 'none' }}>{switchOn ? 0 : orderCountTodayEtiquetaVtex}</a>
                                </div>
                            </div>
                            <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                <span className='info-box-icon'>
                                    <i className='fas fa-square' style={{ color: "#ADD608" }} />
                                </span>
                                <div className='info-box-content'>
                                    <span className='info-box-text'>Falabella</span>
                                    <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? 0 : orderCountTodayEtiquetaFalabella}</span>
                                </div>
                            </div>
                            <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                <span className='info-box-icon'>
                                    <i className='fas fa-square' style={{ color: "#6620BB" }} />
                                </span>
                                <div className='info-box-content'>
                                    <span className='info-box-text'>Ripley</span>
                                    <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allEnRuta : orderCountTodayEtiquetaRipley}</span>
                                </div>
                            </div>
                            <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                <span className='info-box-icon'>
                                    <i className='fas fa-square' style={{ color: "#5ACAFA" }} />
                                </span>
                                <div className='info-box-content'>
                                    <span className='info-box-text'>Intercorp</span>
                                    <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allEntregado : orderCountTodayEtiquetaIntercorp}</span>
                                </div>
                            </div>
                            <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                <span className='info-box-icon'>
                                    <i className='fas fa-square' style={{ color: "#1A5276" }} />
                                </span>
                                <div className='info-box-content'>
                                    <span className='info-box-text'>Ventas RRSS</span>
                                    <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allAnulado : orderCountTodayEtiquetaVentas}</span>
                                </div>
                            </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
