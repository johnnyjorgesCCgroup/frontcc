import React, { useState, useEffect } from 'react';
import { CircularProgress, TextField, Grid, Button, Typography } from '@mui/material';
import { format, parse } from 'date-fns';
import './contentDashProductos.css';

export default function ContentDashProductos() {
    const [cuts, setCuts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalNumMoves, setTotalNumMoves] = useState(0);

    const handleDateChange = (setter) => (event) => {
        const date = parse(event.target.value, 'yyyy-MM-dd', new Date());
        setter(date);
    };

    const obtenerCuts = async () => {
        try {
            setIsLoading(true); // Establecer isLoading a true antes de la solicitud

            const response = await fetch("http://cc.cvimport.com:3000/procesarDatos");
            if (response.ok) {
                const data = await response.json();
                const responseData = data;
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayDateString = yesterday.toISOString().split('T')[0];

                const filteredData = responseData.filter(item => {
                    const itemDate = new Date(item.date).toISOString().split('T')[0];
                    return itemDate === yesterdayDateString;
                });

                const sumaProductsForCuts = filteredData.reduce((acc, cut) => {
                    if (!acc[cut.product_id]) {
                        acc[cut.product_id] = { ...cut, count: 0, numMoves: 0 };
                    }
                    if (cut.numMoves !== 0) {
                        acc[cut.product_id].numMoves += 1;
                    }
                    acc[cut.product_id].count += 1;
                    return acc;
                }, {});

                const sortedCuts = Object.values(sumaProductsForCuts).sort((a, b) => b.numMoves - a.numMoves);

                setCuts(sortedCuts);
            } else {
                console.error("Error al obtener los datos: ", response.statusText);
            }
        } catch (error) {
            console.error("Error de bd", error);
        } finally {
            setIsLoading(false); // Establecer isLoading a false después de completar la solicitud
        }
    }

    useEffect(() => {
        obtenerCuts();
    }, []);

    return (
        <div className="content-wrapper">
            <div className="card" id="cardGeneral">
                <div className="card card-outline">
                    <div className="card-header border-0">
                        <div className="row mb-2" style={{ alignItems: "center" }}>
                            <div className="col-sm-6">
                                <h3 className="card-title">
                                    <b>Dashboard Productos (Cortes vs Salidas)</b>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', width: '100%' }}>
                        <CircularProgress />
                    </div>
                )}
                <div className="cardContainerProducts">
                        {cuts.map((cut) => (
                            <div className="cardProducts" key={cut.product_id}>
                                <div className="cardContentProducts">
                                    <div>
                                        <img src={"https://ccgroup.skfacturacion.com/storage/uploads/logos/logo_20607115398.png"} alt={"No Hay Imagen"} />
                                        <div style={{ display: "flex" }}>
                                            <b>SKU:</b>{" "}
                                            <p>{cut.product_id}</p>
                                        </div>
                                    </div>
                                    <div className="productName">
                                        <p>{cut.product}</p>
                                    </div>
                                    <div className="productCuts">
                                        <b>Cortes</b>
                                        <p>{cut.count}</p>
                                    </div>
                                    <div className="productOutputs">
                                        <b>Salidas:</b>
                                        <p>{cut.numMoves}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
