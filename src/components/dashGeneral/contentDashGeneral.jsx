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
                        <div className="row mb-2" style={{ alignItems: "center" }}>
                            <div className="col-sm-6">
                                <h3 className="card-title">
                                    <b>Hoy</b>
                                </h3>
                            </div>
                            <div className="row">
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
