import React, { useEffect, useState } from 'react';

export default function contentInventory() {
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

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
                            <div className="row" style={{width:"100%"}}>
                                <div className="dashPrincipal" style={{display:"flex", width:"100%"}}>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft:"5px", marginRight:"5px", marginTop:"5px"}}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-boxes-stacked' style={{color:"#C0392B"}}/>
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Etiqueta</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft:"5px", marginRight:"5px", marginTop:"5px"}}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-truck-ramp-box' style={{color:"#C0392B"}}/>
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Pendiente</span>
                                            <span className='info-box-number' style={{ fontSize: "20px"}}>0</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft:"5px", marginRight:"5px", marginTop:"5px"}}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-motorcycle' style={{color:"#7D6608"}}/>
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>En ruta</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft:"5px", marginRight:"5px", marginTop:"5px"}}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-people-carry-box' style={{color:"#229954"}}/>
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Entregado</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft:"5px", marginRight:"5px", marginTop:"5px"}}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-boxes-packing' style={{color:"#1A5276"}}/>
                                        </span>
                                        <div className='info-box-content'>
                                            <span className='info-box-text'>Anulado</span>
                                            <span className='info-box-number' style={{ fontSize: "20px" }}>0</span>
                                        </div>
                                    </div>
                                    <div className='info-box mb-3 bg-default' style={{ height: "10%", marginLeft:"5px", marginRight:"5px", marginTop:"5px"}}>
                                        <span className='info-box-icon'>
                                            <i className='fas fa-truck-ramp-box' style={{color:"#1A5276"}}/>
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
                            <div className="row mb-2" style={{ alignItems: "center" }}>
                                <div className="col-sm-6">
                                    <h3 className="card-title">
                                        <b>Ayer</b>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-outline" style={{ width: "33.3%", marginLeft: "1%" }}>
                        <div className="card-header border-0">
                            <div className="row mb-2" style={{ alignItems: "center" }}>
                                <div className="col-sm-6">
                                    <h3 className="card-title">
                                        <b>Semanal</b>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-outline" style={{ width: "33.3%", marginLeft: "1%" }}>
                        <div className="card-header border-0">
                            <div className="row mb-2" style={{ alignItems: "center" }}>
                                <div className="col-sm-6">
                                    <h3 className="card-title">
                                        <b>Mensual</b>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
