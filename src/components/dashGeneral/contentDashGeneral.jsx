import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function contentInventory() {
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    const chartAyerRef = useRef(null);
    const chartSemanalRef = useRef(null);
    const chartMensualRef = useRef(null);

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
                            <div className="col-sm-6">
                                <h3 className="card-title">
                                    <b>Hoy</b>
                                </h3>
                            </div>
                            <div className="row" style={{ width: "100%" }}>
                                <div className="dashPrincipal" style={{ display: "flex", width: "100%" }}>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-boxes-stacked' style={{ color: "#C0392B" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Etiqueta</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-truck-ramp-box' style={{ color: "#C0392B" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Pendiente</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-motorcycle' style={{ color: "#7D6608" }} />
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>En ruta</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft: "5px", marginRight: "5px", marginTop: "5px" }}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-people-carry-box' style={{ color: "#229954" }} />
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
                <div style={{ display: "flex", justifyContent: "center", height: "700px" }}>
                    <div className="card card-outline" style={{ width: "33.3%" }}>
                        <div className="card-header border-0">
                            <div>
                                <div>
                                    <h3 className="card-title">
                                        <b>Ayer</b>
                                    </h3>
                                    <br></br>
                                    <br></br>
                                    <div className='cardAyer'>
                                        <canvas ref={chartAyerRef}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-outline" style={{ width: "33.3%", marginLeft: "1%" }}>
                        <div className="card-header border-0">
                            <div>
                                <div>
                                    <h3 className="card-title">
                                        <b>Semanal</b>
                                    </h3>
                                    <br></br>
                                    <br></br>
                                    <div className='cardSemanal'>
                                        <canvas ref={chartSemanalRef}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-outline" style={{ width: "33.3%", marginLeft: "1%"}}>
                        <div className="card-header border-0">
                            <div>
                                <div>
                                    <h3 className="card-title">
                                        <b>Mensual</b>
                                    </h3>
                                    <br></br>
                                    <br></br>
                                    <div className='cardSemanal'>
                                        <canvas ref={chartMensualRef}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
