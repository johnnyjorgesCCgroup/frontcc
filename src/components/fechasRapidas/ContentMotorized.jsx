import React, { forwardRef, useState , useEffect } from 'react';
import Swal from 'sweetalert2';
import MUIDataTable from 'mui-datatables';
import { Button, IconButton, Modal, TextField,  Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OnlinePrediction from '@mui/icons-material/OnlinePrediction'
import dayjs from 'dayjs';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Lock from '@mui/icons-material/Lock';
import Photo from '@mui/icons-material/Photo';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  GridRowModes,
  DataGrid,
  
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

import * as XLSX from 'xlsx';
import { idID } from '@mui/material/locale';

const ContentMotorized = () => {

  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedid, setSelectedid] = useState(null);


  //Avisa si es edit al componente
  const [editingMode, setEditingMode] = useState(false);
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState('');
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.cvimport.com/api/indexMotorizado');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const valor = await response.json();
      setData(valor.data);
      updateTableRows(valor.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {;
    updateTableRows(data);
  }, [rows]);
  
  const updateTableRows = (data) => {
    const rows = data.map((item) => ({
      id: item.id,
      origin: item.origin,
      date: item.date,
      date_cut: item.date_cut,
      oc: item.oc,
      code: item.code,
      status: item.status,
      phone: item.phone,
      client: item.client,
      address: item.address,
      distrito: item.distrito,
      product: item.product,
      quantity: item.quantity,
    }));
  
    setRows(rows);
  };


  const handleAnullCut = async (id) => {

  Swal.fire({
    title: 'Desea Confirmar la entrega?',
    text: 'Los campos pueden estar asociados a OC',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Cofirmar!',
  }).then(async (result) => {
    fetchData();
    if (result.isConfirmed) {
      try {
        await fetch(`https://api.cvimport.com/api/delivery/${id}`, {
          method: 'GET',
        });

        Swal.fire({
          icon: 'success',
          title: 'Producto Entregado!',
          showConfirmButton: false,
          timer: 500,
        });

        setUpdateCount((prevCount) => prevCount + 1);
      } catch (error) {
        setUpdateCount((prevCount) => prevCount + 1);
        console.error('Error deleting provedor:', error);
        Swal.fire({
          icon: 'error',
          title: 'An error occurred while deleting!',
          showConfirmButton: false,
          timer: 500,
        });
      }
    }
  });
};

const handleModalClose = () => {
  setIsModalOpen(false);
};


const selectImageFromGallery = async (id) => {
  try {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = e.target.files[0];
      setSelectedImage(file); // Almacena la imagen seleccionada en el estado
    };

    input.click();
  } catch (error) {
    console.log('Error al seleccionar la imagen:', error);
  }
};

const uploadImageToBackend = async () => {
  try {

    const formData = new FormData();
    formData.append('photo', selectedImage);
    formData.append('id_corte', selectedid); 
    console.log(formData);
    const response = await fetch('https://api.cvimport.com/api/updaloadImage', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al enviar la imagen al servidor');
    }

    console.log(response);
  } catch (error) {
    console.error('Error al enviar la imagen:', error);
  }
};

const modalContent = (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    }}
  >
    <Typography variant="h6" gutterBottom>
      Cargar Imagen  
    </Typography>
    {/* Contenido del modal, por ejemplo, un campo de entrada para la nueva cantidad */}

    <Grid container rowSpacing={2} spacing={1} alignItems="center">

    <Grid item xs={12} md={12}>
    <Button variant="contained"  color="success"   startIcon={<CloudUploadIcon />}   onClick={() => selectImageFromGallery()}>
    Seleccionar imagen
    </Button>
    </Grid>
 
    <Grid item xs={12} md={6}>
    <Button variant="contained"  onClick={() => { uploadImageToBackend() ; handleModalClose()}}>
      Guardar
    </Button>
    </Grid>

    <Grid item xs={12} md={6}>
    <Button variant="contained" onClick={() => {handleModalClose }}>
      Cancelar
    </Button>
    </Grid>

    
    </Grid>
  </Box>
);

const columns = [
    {
      field : 'id',
      headerName: 'Id',
      options: {
        display: false,
      },
      width: 120,
    },
    {
      field: 'oc',
      headerName: 'Orden',
      width: 240,
    },
    {
      field: 'date',
      headerName: 'Fecha',
    
    },
    {
      field: 'code',
      headerName: 'SKU',
    },
    {
      field: 'product',
      headerName: 'nombre',
      width: 250,
    },
    {
      field: 'quantity',
      headerName: 'Cantidad',
    },
    {
      field: 'client',
      headerName: 'Cliente',
      width: 250,
    },
    {
      field: 'Actions',
      type: 'actions',
      width: 130,
      headerName: 'Acciones',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Lock />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleAnullCut(id  )  }
            color="success"
          />,

          <GridActionsCellItem
          icon={<Photo />}
          label="Foto"
          className="textPrimary"
          onClick={() => {
            setIsModalOpen(true);
            setSelectedid(id);
            selectImageFromGallery();
          }}
          color="success"
        />,

        ];  
      },
    },


  ];


  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Despacho Motorizado</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">v</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
             
                    <div className="col-lg-12">
                    <DataGrid checkboxSelection={checkboxSelection}
                        rows={rows}
                        columns={columns}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 50 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                        
                      />
                    <Modal open={isModalOpen} onClose={handleModalClose}>
                  {modalContent}
                    </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const style  = {
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '5 00px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
     marginBottom: '5px', 
     padding: '5px',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '40px',
  },
  createButton: {
    padding: '10px',
    borderRadius: '8px',
    background: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px',
    borderRadius: '8px',
    background: '#f44336',
    color: '#fff',
    cursor: 'pointer',
  },
  spaceBetweenElements: {
    marginRight: '10px', // Ajusta el margen entre elementos flexibles según tus necesidades
  },
};

export default ContentMotorized;