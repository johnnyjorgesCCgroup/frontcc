import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Typography, ButtonGroup, Button, Box, Switch, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSearch, faDatabase } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono que desees usar aquí
import './contentRegisterMotorizado.css';
import Select from 'react-select';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';


function ImageUploader() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenViewImage, setModalOpenViewImage] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [imagesApi, setImagesApi] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [switchOn, setSwitchOn] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);
  const [options, setOptions] = useState([]);
  const [rows, setRows] = useState(null);
  const [archive, setArchive] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState('');
  const [usedSpaceMB, setUsedSpaceMB] = useState(0);
  const [totalSpaceMB, setTotalSpaceMB] = useState(10240);
  const matches = useMediaQuery('(min-width:600px)');

  const fetchImagesApi = async () => {
    setLoadingImages(true);
    try {
      const response = await fetch('http://cc.cvimport.com:3000/uploads/images');
      const data = await response.json();
      setImagesApi(data);
      setLoadingImages(false);

      // Extraer la columna 'archive' y almacenarla en un estado
      const archiveData = data.map((item) => item.archive);
      setArchive(archiveData);

      const uniqueOptions = {};
      data.forEach((item) => {
        if (item.oc) uniqueOptions[item.oc] = true;
        if (item.document) uniqueOptions[item.document] = true;
        if (item.client) uniqueOptions[item.client] = true;
      });
      const optionsArray = Object.keys(uniqueOptions).map((value) => ({ value, label: value }));

      setOptions(optionsArray);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoadingImages(false);
    }
  };

  const handleSearch = () => {
    if (orderNumber.trim() === '') {
      setOrderDetails([]);
      return;
    }
  };

  const fetchFilteredData = async () => {
    try {
      setLoadingOrderDetails(true);
      const response = await fetch(`http://cc.cvimport.com:3000/procesarDatos/search/${orderNumber}`);
      const data = await response.json();
      setOrderDetails(data);
      setLoadingOrderDetails(false);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
      setLoadingOrderDetails(false);
    }
  };

  const fetchFolderSize = async () => {
    try {
      const response = await fetch('http://cc.cvimport.com:3000/uploads/folder-size');
      const data = await response.json();
      const usedSpaceMB = data.totalSizeMB;
      setUsedSpaceMB(usedSpaceMB);
    } catch (error) {
      console.error('Error fetching folder size:', error);
    }
  };

  const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: '8px', // Altura del progreso lineal
    borderRadius: '4px', // Bordes redondeados
    '& .MuiLinearProgress-bar': {
      borderRadius: '4px', // Bordes redondeados para la barra de progreso
    },
  }));

  const progress = (usedSpaceMB / totalSpaceMB) * 100;

  useEffect(() => {
    if (orderDetails && orderDetails.length > 0) {
      const filteredRows = orderDetails.map((details, index) => ({
        id: index + 1,
        ...details,
        date: details.date_cut ?? "Sin datos",
        client: details.client ?? "Sin datos",
        document: details.document_number ?? "Sin datos",
        product: details.product ?? "Sin datos",
        oc: details.oc ?? "Sin datos",
        archive: details.imageArchive ?? "Sin datos", // Agrega la propiedad archive aquí
      }));
      setRows(filteredRows);
    } else {
      const allRows = imagesApi.map((image, index) => ({
        id: index + 1,
        ...image,
        date: image.date ?? "Sin datos",
        client: image.client ?? "Sin datos",
        document: image.document ?? "Sin datos",
        product: image.product ?? "Sin datos",
        oc: image.oc ?? "Sin datos",
        archive: image.archive ?? "Sin datos", // Agrega la propiedad archive aquí
      })).sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
      setRows(allRows);
    }
  }, [orderDetails, imagesApi]);


  const columns = [
    {
      field: 'view',
      headerName: 'View',
      width: 90,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (params.row && params.row.archive) {
              handleOpenModalViewImage(params.row.archive);
            } else {
              console.error('El valor de archive en params.row es indefinido.');
            }
          }}
          style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
        >
          Ver
        </Button>

      )
    },
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'date', headerName: 'Date', flex: matches ? 1 : undefined,
    width: matches ? undefined : 100},
    { field: 'client', headerName: 'Client', flex: matches ? 1 : undefined,
    width: matches ? undefined : 100},
    { field: 'document', headerName: 'Document', flex: matches ? 1 : undefined,
    width: matches ? undefined : 100},
    { field: 'product', headerName: 'Product', flex: matches ? 1 : undefined,
    width: matches ? undefined : 100},
    { field: 'oc', headerName: 'OC', flex: matches ? 1 : undefined,
    width: matches ? undefined : 100},
  ];

  const handleSwitchChange = () => {
    setSwitchOn(!switchOn);
  }

  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleOpenModalViewImage = (archiveValue) => {
    console.log("handleOpenModalViewImage ejecutada con archiveValue:", archiveValue);
    if (archiveValue) {
      const filename = archiveValue.substring(archiveValue.lastIndexOf('/') + 1);
      console.log("Nombre del archivo seleccionado:", filename);
      setModalOpenViewImage(true);
      setSelectedImageURL(`http://cc.cvimport.com:3000/uploads/images/${filename}`);
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const handleCloseModalViewImage = () => {
    setModalOpenViewImage(false);
    setSelectedImageURL('');
  }

  useEffect(() => {
    fetchFolderSize();
    fetchImagesApi();
  }, []);

  useEffect(() => {
    if (orderNumber.trim() !== '') {
      fetchFilteredData();
    }
  }, [orderNumber]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imagenEvidencia', image);

    try {
      const response = await fetch(`http://cc.cvimport.com:3000/uploads/images/single?orderNumber=${orderNumber}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    handleCloseModal();
  };

  return (
    <div className='content-wrapper'>
      <div className="card" id="principalCard">
        <div className="card card-outline">
          <div className="card-header border-0">
            <div className="row mb-2" id="tituloBotones">
              <div className="col-sm-6">
                <h3 className="card-title">
                  <b>Registro Motorizados</b>
                </h3>
                <Switch id="switch1" checked={switchOn} onChange={handleSwitchChange} color="secondary" size="small" />
              </div>
              <div className="col-sm-6">
                <div className='justify-content-end float-sm-right'>
                  <Button
                    variant="contained"
                    onClick={handleOpenModal}
                    style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
                    startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                  >
                    Subir Imagen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-outline">
          <div className="detallesBusqueda">
            <div className="boxBusqueda">
              <div id="card-busqueda" className='card-body'>
                <Select
                  options={options}
                  onChange={(selectedOption) => setOrderNumber(selectedOption?.value || '')}
                  placeholder="Busqueda DNI OC Nombre"
                  isClearable={true}
                />
                <Button
                  variant="contained"
                  startIcon={<FontAwesomeIcon icon={faSearch} />}
                  style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black", margin: "6px" }}
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
              </div>
              <br />
              <div className='card-detalles'>
                {orderDetails && orderDetails.length > 0 ? (
                  orderDetails.map((details, index) => (
                    <div key={index}>
                      <h6>Orden de Compra</h6>
                      <p style={{ marginRight: '10px' }}>
                        Plataforma: {details.origin} <br />
                        Fecha del corte: {details.date_cut} <br />
                        Cliente: {details.client} <br />
                        Documento: {details.document_number} <br />
                        Celular: {details.phone} <br />
                        Dirección: {details.address} <br />
                        Producto: {details.product} <br />
                        Cantidad y Precio: {details.quantity} - {details.price} <br />
                        ID de Movimiento: {details.idMove} <br />
                      </p>
                    </div>
                  ))
                ) : orderNumber.trim() !== '' ? (
                  <p style={{ textAlign: 'center' }}>
                    Cargando <i className="fas fa-hourglass-half fa-spin" style={{ fontSize: '15px', color: '#888' }}></i>
                  </p>
                ) : (
                  <p style={{ textAlign: 'center' }}>
                    {orderNumber.trim() === '' ? 'Ingrese un número de orden para obtener los detalles.' : ''}
                  </p>
                )}
              </div>

            </div>
            <div className="boxImagenes">
              <div style={{marginTop:"20px", marginLeft:"20px", marginRight:"20px"}}>
                <CustomLinearProgress variant="determinate" value={(usedSpaceMB / totalSpaceMB) * 100} />
                <p>
                  {parseFloat(usedSpaceMB.toFixed(2))} MB utilizados de{' '}
                  {Math.round((totalSpaceMB / 1024) * 100) / 100} GB
                </p>
              </div>
              <div className='card-body' id="card-img">
                <Box sx={{ height: 550, overflowY: 'scroll' }}>
                  {loadingImages ? (
                    <p style={{ textAlign: 'center' }}>
                      Cargando base de datos <i className="fas fa-database fa-spin" style={{ fontSize: '15px', color: '#888' }}></i>
                    </p>
                  ) : (
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      pageSizeOptions={[10, 20, 25]}
                      loading={loadingOrderDetails}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      disableSelectionOnClick
                    />
                  )}
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div className="modalDetalle">
          <h3 className="card-title">
            <b>Subir Imagen de evidencia</b>
          </h3>
          <br />
          <form onSubmit={handleSubmit}>
            <TextField
              label="Número de Orden"
              variant="outlined"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
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
              style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
            >
              Enviar
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={modalOpenViewImage} onClose={handleCloseModalViewImage}>
        <div className="modalDetalle">
          <img src={selectedImageURL} alt="Vista previa de la imagen" style={{ maxWidth: "100%", maxHeight: "20%", height: "500px" }} />
        </div>
      </Modal>
    </div>
  );
}

export default ImageUploader;