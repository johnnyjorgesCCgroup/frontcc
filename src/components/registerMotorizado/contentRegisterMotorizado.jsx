import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Typography, ButtonGroup, Button, Box, Switch, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSearch, faDatabase } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono que desees usar aquí
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import './contentRegisterMotorizado.css';


function ImageUploader() {
  const [modalOpen, setModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [switchOn, setSwitchOn] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    // Función para actualizar el número de columnas basado en el ancho de la pantalla
    const updateCols = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {
        setCols(2); // Cambiar a 2 columnas si el ancho de la pantalla es menor o igual a 600px
      } else {
        setCols(3); // De lo contrario, mantener 3 columnas
      }
    };

    // Llamar a la función de actualización una vez y suscribirse a los cambios de tamaño de la ventana
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols); // Limpiar el efecto cuando el componente se desmonta
  }, []);

  const MAX_DISPLAY_IMAGES = 200;

  const handleSwitchChange = () => {
    setSwitchOn(!switchOn);
  }

  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const fetchImages = async () => {
    setLoadingImages(true);
    try {
      const response = await fetch(`http://cc.cvimport.com:3000/procesarDatos`);
      const data = await response.json();

      // Aquí podrías mapear los datos para obtener solo las imágenes si es necesario
      const imagesData = data.map(item => ({
        oc: item.oc,
        imageArchive: item.imageArchive
      }));

      setImages(imagesData);
      setLoadingImages(false);

    } catch (error) {
      console.error('Error fetching images:', error);
      setLoadingImages(false);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://cc.cvimport.com:3000/procesarDatos`);
      const data = await response.json();

      // Filtrar la orden correspondiente al número de orden buscado
      const foundOrder = data.find(item => item.oc === orderNumber);
      if (foundOrder) {
        setOrderDetails([foundOrder]);
      } else {
        setOrderDetails([]);
      }

    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };


  useEffect(() => {
    fetchImages();
  }, []);

  const searchImageByOrderNumber = async () => {
    if (orderNumber.trim() === '') {
      setOrderDetails(null);
      fetchImages();
    } else {
      const foundImage = images.find(img => img.oc === orderNumber);
      if (foundImage) {
        fetchOrder();
        setImages([foundImage]);
      } else {
        setImages([]);
        setOrderDetails(null);
      }
    }
  };

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
                <TextField
                  label="Número de Orden"
                  variant="outlined"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <Button
                  variant="contained"
                  onClick={searchImageByOrderNumber}
                  startIcon={<FontAwesomeIcon icon={faSearch} />}
                  style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
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
                        Documento: {details.document} <br />
                        Celular: {details.phone} <br />
                        Dirección: {details.address} <br />
                        Producto: {details.product} <br />
                        Cantidad y Precio: {details.quantity}<br />
                        Precio: {details.price} <br />
                        ID de Movimiento: {details.idMove} <br />
                      </p>
                    </div>
                  ))
                ) : orderNumber.trim() !== '' ? (
                  <p style={{ textAlign: 'center' }}>
                    Cargando <i className="fas fa-hourglass-half fa-spin" style={{ fontSize: '15px', color: '#888' }}></i>
                  </p>

                ) : (
                  <p style={{ textAlign: 'center' }}>Ingrese un número de orden para obtener los detalles.</p>
                )}
              </div>
            </div>
            <div className="boxImagenes">
              <div className='card-body' id="card-img">
                <Box sx={{ height: 550, overflowY: 'scroll' }}>
                  {loadingImages ? (
                    <p style={{ textAlign: 'center' }}>
                      Cargando base de datos <i className="fas fa-database fa-spin" style={{ fontSize: '15px', color: '#888' }}></i>
                    </p>
                  ) : (
                    <ImageList className="customImageList" variant="masonry" cols={cols} gap={8}>
                      {images.slice(0, MAX_DISPLAY_IMAGES).map((imageName, index) => (
                        <ImageListItem key={index}>
                          {imageName && imageName.imageArchive && (
                            <img
                              onMouseEnter={() => setSelectedImageIndex(index)}
                              onMouseLeave={() => setSelectedImageIndex(null)}
                              style={{ filter: selectedImageIndex === index ? 'none' : 'grayscale(100%)' }}
                              srcSet={`http://cc.cvimport.com:3000/uploads/images/${imageName.imageArchive}?w=248&fit=crop&auto=format&dpr=2 2x`}
                              src={`http://cc.cvimport.com:3000/uploads/images/${imageName.imageArchive}?w=248&fit=crop&auto=format`}
                              alt={`Imagen ${index.id}`}
                              loading="lazy"
                            />
                          )}
                        </ImageListItem>
                      ))}
                    </ImageList>
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
    </div>
  );
}

export default ImageUploader;