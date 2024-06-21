import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button, Modal, TextField } from '@mui/material';

export default function ContentSubirImagenMoto() {

    const [usernamePart, setUsernamePart] = useState('');
    const [username1, setUsername1] = useState('');
    const [incidentes, setIncidentes] = useState([]);
    const [idImg, setIDImg] = useState('');
    const [image, setImage] = useState(null);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [countIncidentes, setCountIncidentes] = useState(0);
    const [modalUpOpen, setModalUpOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const todayMarkets = new Date();

    const handleOpenUploadModal = (incident) => {
        setIDImg(incident.id);
        setSelectedIncident(incident);
        setModalUpOpen(true);
    };
    const handleCloseUpModal = () => {
        setModalUpOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', image); // Asegúrate de que 'photo' sea el nombre correcto del campo de imagen en el backend
        formData.append('id_corte', idImg); // Asumiendo que 'client' es el ID del corte que necesita el backend

        try {
            const response = await fetch('https://api.cvimport.com/api/updaloadImage', {
                method: 'POST',
                body: formData,
            });
            const data = await response.text();
            console.log(data);
            alert("Tu imagen fue subida. cargando.....")
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        }
        handleCloseUpModal();
        obtenerIncidentes();
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

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

                // Filtrar por motorizado según el usuario
                if (username1 === 'william.ccgroup@gmail.com') {
                    incidentesFiltrados = incidentesFiltrados.filter(incidente => incidente.motorizado === 'HOME DELIVERY');
                } else if (username1 === 'alfredo.ccgroup@gmail.com') {
                    incidentesFiltrados = incidentesFiltrados.filter(incidente => incidente.motorizado === 'LUIS ALFREDO ORMEÑO PINO');
                } else if (username1 === 'bryanandrecasanova2009@hotmail.com') {
                    incidentesFiltrados = incidentesFiltrados.filter(incidente => incidente.motorizado === 'Bryan Andre Casanova Rios');
                }

                setIncidentes(incidentesFiltrados);
                setCountIncidentes(incidentesFiltrados.length);

                // Formatear datos para el select
                const formattedOptions = incidentesFiltrados.map(incidente => ({
                    value: incidente.id,
                    label: `${incidente.id} - ${incidente.client} - ${incidente.phone}`,
                    data: incidente
                }));

                setOptions(formattedOptions);

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

    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setIncidentes([selectedOption.data]);
        } else {
            obtenerIncidentes(); // Resetear los incidentes si se borra la selección
        }
    };

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
                        options={options}
                        onChange={handleSelectChange}
                        placeholder="Busqueda ID, Cliente, Teléfono"
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
                            <div style={{ width: "30%", paddingLeft: "5px" }}>
                                {incidente.photo !== null ? (
                                    <Button
                                        variant="contained"
                                        style={{
                                            height: "55px",
                                            backgroundColor: "yellow"
                                        }}
                                    >
                                        <i className='fas fa-image'></i>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        style={{
                                            height: "55px",
                                            fontSize: "20px"
                                        }}
                                        onClick={() => handleOpenUploadModal(incidente)}
                                    >
                                        <i className='fas fa-camera'></i>
                                    </Button>
                                )}
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
            ))}
            <Modal open={modalUpOpen} onClose={handleCloseUpModal}>
                <div className="modalDetalle" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'auto', maxHeight: '80vh' }}>
                    <h3 className="card-title">
                        <b>Subir Imagen de evidencia</b>
                    </h3>
                    <br />
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <TextField
                            label="ID"
                            variant="outlined"
                            value={idImg}
                            onChange={(e) => setIdImg(e.target.value)}
                            style={{ marginBottom: '10px', display: 'none' }}
                        />
                        <br />
                        <TextField
                            label="Cliente"
                            variant="outlined"
                            value={selectedIncident ? selectedIncident.client : ''}
                            disabled
                            style={{ marginBottom: '10px' }}
                        />
                        <br />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginBottom: '10px' }}
                        />
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
