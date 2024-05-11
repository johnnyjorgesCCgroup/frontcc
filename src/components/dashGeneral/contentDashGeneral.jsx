import React, { useEffect, useRef, useState } from 'react';
import { Modal, Typography, Button, Box, Switch, TextField } from '@mui/material';
import Chart from 'chart.js/auto';

export default function contentInventory() {
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    const [data, setData] = useState([]);
    const [allEtiqueta, SetAllEtiqueta] = useState(0);
    const [allPendiente, SetAllPendiente] = useState(0);
    const [allEnRuta, SetAllEnRuta] = useState(0);
    const [allEntregado, SetAllEntregado] = useState(0);
    const [allAnulado, SetAllAnulado] = useState(0);
    const [allDevolucion, SetAllDevolucion] = useState(0);
    const [switchOn, setSwitchOn] = useState(false);
    const [priceAyerOn, setPriceAyerOn] = useState(false);
    const [priceSemanalOn, setPriceSemanalOn] = useState(false);
    const [priceMensualOn, setPriceMensualOn] = useState(false);
    const chartAyerRef = useRef(null);
    const chartSemanalRef = useRef(null);
    const chartMensualRef = useRef(null);
    const [filteredStatus, setFilteredStatus] = useState([]);
    const [orderCountTodayEtiqueta, SetorderCountTodayEtiqueta] = useState(0);
    const [orderCountTodayPendiente, SetorderCountTodayPendiente] = useState(0);
    const [orderCountTodayEnRuta, SetorderCountTodayEnRuta] = useState(0);
    const [orderCountTodayEntregado, SetorderCountTodayEntregado] = useState(0);
    const [orderCountTodayAnulado, SetorderCountTodayAnulado] = useState(0);
    const [orderCountTodayDevolucion, SetorderCountTodayDevolucion] = useState(0);
    const [orderCountYesterdayEtiqueta, SetorderCountYesterdayEtiqueta] = useState(0);
    const [orderCountYesterdayPendiente, SetorderCountYesterdayPendiente] = useState(0);
    const [orderCountYesterdayEnRuta, SetorderCountYesterdayEnRuta] = useState(0);
    const [orderCountYesterdayEntregado, SetorderCountYesterdayEntregado] = useState(0);
    const [orderCountYesterdayAnulado, SetorderCountYesterdayAnulado] = useState(0);
    const [orderCountYesterdayDevolucion, SetorderCountYesterdayDevolucion] = useState(0);
    const [orderCountWeeklyEtiqueta, SetorderCountWeeklyEtiqueta] = useState(0);
    const [orderCountWeeklyPendiente, SetorderCountWeeklyPendiente] = useState(0);
    const [orderCountWeeklyEnRuta, SetorderCountWeeklyEnRuta] = useState(0);
    const [orderCountWeeklyEntregado, SetorderCountWeeklyEntregado] = useState(0);
    const [orderCountWeeklyAnulado, SetorderCountWeeklyAnulado] = useState(0);
    const [orderCountWeeklyDevolucion, SetorderCountWeeklyDevolucion] = useState(0);
    const [orderCountMonthEtiqueta, SetorderCountMonthEtiqueta] = useState(0);
    const [orderCountMonthPendiente, SetorderCountMonthPendiente] = useState(0);
    const [orderCountMonthEnRuta, SetorderCountMonthEnRuta] = useState(0);
    const [orderCountMonthEntregado, SetorderCountMonthEntregado] = useState(0);
    const [orderCountMonthAnulado, SetorderCountMonthAnulado] = useState(0);
    const [orderCountMonthDevolucion, SetorderCountMonthDevolucion] = useState(0);
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
    const [totalPriceYesterday, SetTotalPriceYesterday] = useState(0);
    const [totalPriceWeekly, SetTotalPriceWeekly] = useState(0);
    const [totalPriceMonth, SetTotalPriceMonth] = useState(0);

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

    const fetchDataFromAPI = () => {
        fetch('https://api.cvimport.com/api/cut')
            .then(response => response.json())
            .then(data => {
                const responseData = data.data;
                const sortedData = responseData.sort((a, b) => b.id - a.id);
                const filteredData = sortedData.map(item => {
                    return {
                        oc: item.oc,
                        price: item.price,
                        status: item.status,
                        date: item.date,
                        origin: item.origin,
                    };
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
                    if (item.status === 2) {
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
                const orderCountTodayPendiente = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 0) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                SetorderCountTodayPendiente(orderCountTodayPendiente);
                const orderCountTodayEnRuta = filteredData.reduce((count, item) => {
                    if (item.date === currentDate && item.status === 2) {
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
                const dayOfWeek = today.getDay();
                const daysUntilMonday = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - daysUntilMonday);
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

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
            })
            .catch(error => console.error('Error al obtener los datos de la API:', error));
    };

    //Fetch
    useEffect(() => {
        fetchDataFromAPI();
    }, []);

    const allHoy = orderCountTodayEtiqueta + orderCountTodayPendiente + orderCountTodayEnRuta + orderCountTodayEntregado + orderCountTodayAnulado + orderCountTodayDevolucion;
    const allAyer = orderCountYesterdayEtiqueta + orderCountYesterdayPendiente + orderCountYesterdayEnRuta + orderCountYesterdayEntregado + orderCountYesterdayAnulado + orderCountYesterdayDevolucion;
    const allSemanal = orderCountWeeklyEtiqueta + orderCountWeeklyPendiente + orderCountWeeklyEnRuta + orderCountWeeklyEntregado + orderCountWeeklyAnulado + orderCountWeeklyDevolucion;
    const allMensual = orderCountMonthEtiqueta + orderCountMonthPendiente + orderCountMonthEnRuta + orderCountMonthEntregado + orderCountMonthAnulado + orderCountMonthDevolucion;

    //BardChart
    useEffect(() => {
        let myChart2 = createBarChartSemanal(orderCountWeeklyVtex, orderCountWeeklySaga, orderCountWeeklyIntercorp, orderCountWeeklyRipley, orderCountWeeklyVentas);
        let myChart3 = createBarChartMensual(orderCountMonthVtex, orderCountMonthSaga, orderCountMonthIntercorp, orderCountMonthRipley, orderCountMonthVentas);
        let myChart = createBarChartAyer(orderCountYesterdayVtex, orderCountYesterdaySaga, orderCountYesterdayIntercorp, orderCountYesterdayRipley, orderCountYesterdayVentas);
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
        };
    }, [orderCountYesterdayVtex, orderCountYesterdaySaga, orderCountYesterdayIntercorp, orderCountYesterdayRipley, orderCountYesterdayVentas, orderCountMonthVtex, orderCountMonthSaga, orderCountMonthIntercorp, orderCountMonthRipley, orderCountMonthVentas, orderCountWeeklyVtex, orderCountWeeklySaga, orderCountWeeklyIntercorp, orderCountWeeklyRipley, orderCountWeeklyVentas]);

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
                    }
                }
            }
        });
        return myChart;
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
                        <div style={{ alignItems: "center" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3 className="card-title">
                                    <b style={{ color: switchOn ? "#E3E3E3" : "black", marginRight: "10px" }}>Hoy</b>
                                    <Switch id="switch1" {...label} checked={switchOn} onChange={handleSwitchChange} color="primary" size="small" />
                                    <b style={{ color: switchOn ? "black" : "#E3E3E3", marginLeft: "10px" }}>Todas</b>
                                </h3>
                                <div>
                                    <i className='fas fa-caret-up' style={{ color: "green", display: switchOn ? "none" : "inline-flex" }}></i>{" "}
                                    <a href="" style={{ color: "green", display: switchOn ? "none" : "inline-flex" }}>{allHoy} Ordenes</a>
                                </div>
                            </div>
                            <div className="row" style={{ width: "100%" }}>
                                <div className="dashPrincipal" style={{ display: "flex", width: "100%" }}>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-boxes-stacked' style={{ color: "#C0392B" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Etiqueta</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allEtiqueta : orderCountTodayEtiqueta}</span>
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
                                            <span className='info-box-text'>Devolución / Cambio</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{switchOn ? allDevolucion : orderCountTodayDevolucion}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card card-outline" style={{ width: "27.3%" }}>
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
                                                <i className='fas fa-caret-up' style={{ color: "green", marginRight:"5px"}}></i>
                                                <a style={{ color: "green"}}>{priceAyerOn ? "" : "S/"} {priceAyerOn ? allAyer : totalPriceYesterday.toFixed(2)}</a>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-outline" style={{ width: "27.3%", marginLeft: "1%" }}>
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
                                                <i className='fas fa-caret-up' style={{ color: "green", marginRight:"5px"}}></i>
                                                <a href="" style={{ color: "green" }}>{priceSemanalOn ? "" : "S/"} {priceSemanalOn ? allSemanal : totalPriceWeekly.toFixed(2)}</a>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-outline" style={{ width: "27.3%", marginLeft: "1%" }}>
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
                                                <i className='fas fa-caret-up' style={{ color: "green", marginRight:"5px" }}></i>{" "}
                                                <a href="" style={{ color: "green" }}>{priceMensualOn ? "" : "S/"} {priceMensualOn ? allMensual : totalPriceMonth.toFixed(2)}</a>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card card-outline' style={{ width: "18.1%", marginLeft: "1%", paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
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
                                        <tr key={item.oc}>
                                            <td>{item.oc}</td>
                                            <td>S/{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
