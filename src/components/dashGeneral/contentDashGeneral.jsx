import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function contentInventory() {
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    const [data, setData] = useState([]);
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

    const createBarChartAyer = () => {
        let myChart = null;

        const ctx = chartAyerRef.current.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Vtex", "Falabella", "Intercorp", "Ripley", "RRSS"],
                datasets: [{
                    label: 'Ordenes',
                    data: [150, 250, 50, 50, 110],
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

    const createBarChartSemanal = () => {
        let myChart = null;

        const ctx = chartSemanalRef.current.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Vtex", "Falabella", "Intercorp", "Ripley", "RRSS"],
                datasets: [{
                    label: 'Ordenes',
                    data: [150, 250, 50, 50, 10],
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

    const createBarChartMensual = () => {
        let myChart = null;

        const ctx = chartMensualRef.current.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Vtex", "Falabella", "Intercorp", "Ripley", "RRSS"],
                datasets: [{
                    label: 'Ordenes',
                    data: [150, 250, 200, 50, 90],
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

    useEffect(() => {
        let myChart = createBarChartAyer();
        let myChart2 = createBarChartSemanal();
        let myChart3 = createBarChartMensual();
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
    }, []);

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
                        date: item.date
                    };
                });
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

                //semanal
                const today = new Date();
                const dayOfWeek = today.getDay();
                const daysUntilMonday = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - daysUntilMonday);
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];
                const formattedEndOfWeek = endOfWeek.toISOString().split('T')[0];

                console.log("Fecha de inicio de la semana:", formattedStartOfWeek);
                console.log("Fecha de fin de la semana:", formattedEndOfWeek);

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

                const limitedData = filteredData.slice(0, 14);
                setData(limitedData);
            })
            .catch(error => console.error('Error al obtener los datos de la API:', error));
    };

    useEffect(() => {
        fetchDataFromAPI();
    }, []);

    const allHoy = orderCountTodayEtiqueta + orderCountTodayPendiente + orderCountTodayEnRuta + orderCountTodayEntregado + orderCountTodayAnulado + orderCountTodayDevolucion;

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
                                    <b>Hoy</b>
                                </h3>
                                <div>
                                    <i className='fas fa-caret-up' style={{ color: "green" }}></i>{" "}
                                    <a href="" style={{ color: "green" }}>{allHoy} Ordenes</a>
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
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountTodayEtiqueta}</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-truck-ramp-box' style={{ color: "#C0392B" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Pendiente</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountTodayPendiente}</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-motorcycle' style={{ color: "#7D6608" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>En ruta</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountTodayEnRuta}</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-people-carry-box' style={{ color: "#229954" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Entregado</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountTodayEntregado}</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-boxes-packing' style={{ color: "#1A5276" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Anulado</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountTodayAnulado}</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Devolución / Cambio</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>{orderCountTodayDevolucion}</span>
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
                                                <i className='fas fa-caret-up' style={{ color: "green" }}></i>{" "}
                                                <a href="" style={{ color: "green" }}>S/ 0.00</a>
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
                                                <i className='fas fa-caret-up' style={{ color: "green" }}></i>{" "}
                                                <a href="" style={{ color: "green" }}>S/ 0.00</a>
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
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-boxes-packing' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Anulado</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Devolución / Cambio</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
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
                                                <i className='fas fa-caret-up' style={{ color: "green" }}></i>{" "}
                                                <a href="" style={{ color: "green" }}>S/ 0.00</a>
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
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Pendiente</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-motorcycle' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>En ruta</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-people-carry-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Entregado</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-boxes-packing' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Anulado</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                            </div>
                                        </div>
                                        <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                            <span className='info-box-icon'>
                                                <i className='fas fa-truck-ramp-box' style={{ color: "#1A5276" }} />
                                            </span>
                                            <div className='info-box-content'>
                                                <span className='info-box-text'>Devolución / Cambio</span>
                                                <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
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
