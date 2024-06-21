import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button } from '@mui/material';

export default function contentSubirImagenMoto() {

    const [usernamePart, setUsernamePart] = useState('');
    const [username1, setUsername1] = useState('');
    const [incidentes, setIncidentes] = useState([]);
    const [countIncidentes, setCountIncidentes] = useState(0);
    const todayMarkets = new Date();

    const obtenerIncidentes = async () => {
        try {
            const response = await fetch("https://api.cvimport.com/api/indexMotorizado");
            if (response.ok) {
                const data = await response.json();
                const hoy = new Date();
                const diaDeLaSemana = hoy.getDay();
                // Calcular la fecha del lunes de esta semana
                const fechaInicioSemana = new Date(hoy);
                fechaInicioSemana.setDate(hoy.getDate() - diaDeLaSemana + (diaDeLaSemana === 0 ? -6 : 1) - 1);
                fechaInicioSemana.setHours(0, 0, 0, 0); // Poner la fecha de inicio al comienzo del día

                // Filtrar los incidentes a partir del lunes de esta semana
                let incidentesFiltrados = data.data.filter(incidente => {
                    const fechaIncidente = new Date(incidente.date);
                    return fechaIncidente >= fechaInicioSemana;
                });

                // Filtrar por motorizado si el usuario es "soporte@ccgroupperu.com"
                if (username1 === 'soporte@ccgroupperu.com') {
                    incidentesFiltrados = incidentesFiltrados.filter(incidente => incidente.motorizado === 'HOME DELIVERY');
                }

                setIncidentes(incidentesFiltrados);
                setCountIncidentes(incidentesFiltrados.length);
            } else {
                console.error("Error de fetch", response.statusText);
            }
        } catch (error) {
            console.error("Error de bd", error);
        }
    };
    
    const formatDateTime = (date, timeZone) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false,
            timeZone: timeZone,
        };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };
    const formattedDateTime = formatDateTime(todayMarkets, 'America/Lima');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            const username = storedUsername.split('@')[0];
            setUsernamePart(username);
            setUsername1(storedUsername);
            
        } else {
            console.log("No se encontró el nombre de usuario en el localStorage.");
        }
    }, []);

    useEffect(() => {
        obtenerIncidentes();
    }, [username1]);

    return (
        <div className='content-wrapper'>
            <div>
                <div style={{ display: "block", justifyContent: "center", textAlign: "center", paddingTop: "15px" }}>
                    <p style={{ marginBottom: "-3px" }}>{usernamePart}</p>
                    <h2>Mis Pedidos</h2>
                    <p>{formattedDateTime} - Semanal</p>
                    <h1>{countIncidentes}</h1>
                </div>
                <div style={{ display: "block", justifyContent: "center", textAlign: "center", paddingLeft: "20px", paddingRight: "20px" }}>
                    <Select
                        /*value={selectedDocument}
                        onChange={handleChange}
                        options={documentos}*/
                        placeholder="Busqueda DNI OC Nombre"
                        isClearable={true}
                    />
                </div>
            </div>
            {incidentes.map((incidente) => (
                <div style={{ padding: "25px" }} key={incidente.oc}>
                    <div className='card card-outline' style={{ justifyContent: "center", padding: "10px", backgroundColor: "#E1FFF8" }}>
                        <div style={{ display: "flex", width: "100%" }}>
                            <div style={{ width: "70%" }}>
                                <h5>({incidente.id}){" "}{incidente.client}</h5>
                                <h5><i style={{ fontSize: "15px" }} className='fas fa-phone'></i>{incidente.phone}</h5>
                            </div>
                            <div style={{ width: "30%", paddingLeft:"5px"}}>
                                <Button
                                    variant="contained"
                                    style={{
                                        height: "55px",
                                    }}
                                >
                                    Subir
                                </Button>
                            </div>
                        </div>
                        <div style={{ paddingLeft: "10px", }}>
                            <div style={{ justifyContent: "center", padding: "10px", backgroundColor: "#E1E8E7" }}>
                                <p><i className='fas fa-basket-shopping'></i> Productos:</p>
                                <div>
                                    <p>{incidente.product}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p style={{ fontSize: "13px", textAlign: "center" }}>{incidente.oc} - {incidente.origin} - {incidente.date}</p>
                        </div>
                    </div>
                </div>
                )
            )}
        </div>
    );
}
