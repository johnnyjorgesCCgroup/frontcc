import React, { forwardRef, useState , useEffect } from 'react';
import Swal from 'sweetalert2';
import MUIDataTable from 'mui-datatables';
import { Button, IconButton, Modal, TextField,  Typography ,Autocomplete } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OnlinePrediction from '@mui/icons-material/OnlinePrediction'
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
import dayjs from 'dayjs';

const ContentMotorized = () => {

  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedid, setSelectedid] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);


  const [motorizadoList, setMotorizadoList] = useState( [
    {     label: 'JHONNY JORGES'  ,   key:  60  },
    {     label: 'BRYAN CASANOVA'  ,   key:  62  },
    {     label: 'LUIS ALFREDO ORMENO'  ,   key:  63  },
    {     label: 'HOME DELIVERY'  ,   key:  64  },
    {     label: 'SHALON'  ,   key:  65  },
    {     label: 'OLVA'  ,   key:  66  },
    {     label: 'SABAR'  ,   key:  67  },
  ]);
  const [ ident , setIdent ] = useState([]);

  const [selMot, setSelMot] = useState([]);
  //Avisa si es edit al componente
  const [editingMode, setEditingMode] = useState(false);
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState('');
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalOpenMotorizado, setIsModalOpenMotorizado] = useState(false);




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
      motorizado: item.motorizado,
      status: item.status,
      phone: item.phone,
      client: item.client,
      address: item.address,
      distrito: item.distrito,
      product: item.product,
      quantity: item.quantity,
      autoruta: item.autoruta,
      imprimir: item.imprimir,
      estado: item.estado,
    }));
  
    setRows(rows);
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => {setOpen(true),console.log(open)};


const chagestatus = async () => {

    const formData = new FormData();
    formData.append('id', selectedid);
    formData.append('motorizado', selMot.key); 
    console.log(formData);
    const response = await fetch('https://api.cvimport.com/api/autoruta', {
      method: 'POST',
      body: formData,
    });
    console.log(response);
    fetchData();
    updateTableRows(data);
    handleClose() ;

 }

 
 const handleSendMot = async () => {
  const ids = ident.map(item => item.id);
  const formData = new FormData();
  formData.append('id', ids.join(',')); // Unir los ids en una cadena separada por comas
  formData.append('motorizado', selMot.key); 

  const response = await fetch('https://api.cvimport.com/api/onlymot', {
    method: 'POST',
    body: formData,
  });
  fetchData();
  updateTableRows(data);
  handleModalCloseMotorizado() ;

} 

const handleModalClose = () => {
  setIsModalOpen(false);
};

const handleModalCloseMotorizado = () => {
  setIsModalOpenMotorizado(false);
};



const  handleMotorizado = async (id) => {
    try {
      const response = await fetch(`https://api.cvimport.com/api/getcut/${id}`, {
        method: 'GET',
      });

      const responseData = await response.json();
      const foundObject = motorizadoList.find(item => item.key === responseData.data.worker_id );
      console.log("foundObject",foundObject );

      setSelMot(foundObject);
  } catch (error) {
    console.log('Error al seleccionar la imagen:', error);
  }
};


const  handleCloseStatus = async (id) => {
  try {
    const response = await fetch(`https://api.cvimport.com/api/closemotorizado/${id}`, {
      method: 'GET',
    });

    const responseData = await response.json();

    console.log(responseData);
} catch (error) {
  console.log('Error al seleccionar la imagen:', error);
}
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
    fetchData();
    updateTableRows(data);

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
    <Button variant="contained"  onClick={() => { uploadImageToBackend() ; handleCloseStatus(); handleModalClose()}}>
      Guardar
    </Button>
    </Grid>

    <Grid item xs={12} md={6}>
    <Button variant="contained" color="secondary"     style={style.cancelButton} onClick={() => {handleModalClose() }}>
      Cancelar
    </Button>
    </Grid>

    
    </Grid>
  </Box>
);




const handleInputChangeWorker  = (event, value) => {
  console.log("Worker", value)   
  setSelMot(value);

} ;


const columns = [
    {
      field : 'id',
      headerName: 'Id',
      options: {
        display: false,
      },
      width: 90,
    },
    {
      field: 'date',
      headerName: 'Fecha',
    
    },
    {
      field: 'oc',
      headerName: 'Orden',
      width: 240,
    },
    {
      field: 'motorizado',
      headerName: 'Motorizado',
      width: 180,
    },
    {
      field: 'autoruta',
      headerName: 'Auto Ruta',
      width: 100,
    },
    {
      field: 'imprimir',
      headerName: 'Impresion',
      width: 100,
    },
    
    {
      field: 'estado',
      headerName: 'Status',
      width: 130,
    },

    {
      field: 'distrito',
      headerName: 'Distrito',
      width: 140,
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
            onClick={() =>   { handleOpen() ,    
                              setSelectedid(id)  ,
                              handleMotorizado(id) }}
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

  const onRowsSelectionHandler = (ids) => {
    console.log("ids",ids);
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    setIdent(selectedRowsData);
  };


  
  const handleSendClick = async () => {
    const ids = ident.map(item => item.id);
    console.log("ids",ids);   

 
    try {
      const response = await fetch('https://api.cvimport.com/api/updatemultiplemoto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
     
      });
      const data = await response.json();
      console.log(data);
      fetchData();
      updateTableRows(data);

    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleSendMotorizado = async () => {
    const ids = ident.map(item => item.id);
    console.log("ids",ids);   

 
    try {
      const response = await fetch('https://api.cvimport.com/api/SendMotorizado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
     
      });
      const data = await response.json();
      console.log(data);
      fetchData();
      updateTableRows(data);

    } catch (error) {
      console.error('Error:', error);
    }
  };


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

  const blobToFile = (blob, fileName) => {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  };

  const fetchDataAutoRutaFast = async () => {

    try {
      const response = await fetch('https://api.cvimport.com/api/ReporteAutoRutaFast', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const valor = await response.json();
    
      const distritosZonas = [
        { "distrito": "Chorrillos", "zona": "SUR" },
        { "distrito": "Villa El Salvador", "zona": "SUR" },
        { "distrito": "San Juan De Miraflores", "zona": "SUR" },
        { "distrito": "Villa Maria Del Triunfo", "zona": "SUR" },
        { "distrito": "Santiago De Surco", "zona": "SUR" },
        { "distrito": "Surquillo", "zona": "SUR" },
        { "distrito": "Barranco", "zona": "SUR" },
        { "distrito": "Lurin", "zona": "SUR" },
        { "distrito": "PACHACAMAC", "zona": "SUR" },
        { "distrito": "San Borja", "zona": "ESTE" },
        { "distrito": "San Luis", "zona": "ESTE" },
        { "distrito": "La Victoria", "zona": "ESTE" },
        { "distrito": "La Molina", "zona": "ESTE" },
        { "distrito": "Ate", "zona": "ESTE" },
        { "distrito": "Chaclacayo", "zona": "ESTE" },
        { "distrito": "Cieneguilla", "zona": "ESTE" },
        { "distrito": "Santa Anita", "zona": "ESTE" },
        { "distrito": "Los Olivos", "zona": "NORTE" },
        { "distrito": "Puente Piedra", "zona": "NORTE" },
        { "distrito": "Ventanilla", "zona": "NORTE" },
        { "distrito": "San Martin De Porres", "zona": "NORTE" },
        { "distrito": "Mi Peru", "zona": "NORTE" },
        { "distrito": "Independencia", "zona": "NORTE" },
        { "distrito": "Carabayllo", "zona": "NORTE" },
        { "distrito": "Ancon", "zona": "NORTE" },
        { "distrito": "Comas", "zona": "NORTE" },
        { "distrito": "Magdalena Del Mar", "zona": "CENTRO" },
        { "distrito": "Pueblo Libre", "zona": "CENTRO" },
        { "distrito": "San Miguel", "zona": "CENTRO" },
        { "distrito": "Jesus Maria", "zona": "CENTRO" },
        { "distrito": "Miraflores", "zona": "CENTRO" },
        { "distrito": "San Isidro", "zona": "CENTRO" },
        { "distrito": "Lince", "zona": "CENTRO" },
        { "distrito": "Breña", "zona": "CENTRO" },
        { "distrito": "San Juan De Lurigancho", "zona": "ESTE 2" },
        { "distrito": "El Agustino", "zona": "ESTE 2" },
        { "distrito": "Rimac", "zona": "ESTE 2" },
        { "distrito": "Cercado de Lima", "zona": "ESTE 2" },
        { "distrito": "Callao", "zona": "NORTE" },
        { "distrito": "Carmen De La Legua Reynoso", "zona": "NORTE" },
        { "distrito": "La Punta", "zona": "NORTE" },
        { "distrito": "La Perla", "zona": "NORTE" },
        { "distrito": "Bellavista", "zona": "NORTE" },
        { "distrito": "Lima", "zona": "NORTE" },
        { "distrito": "Shalom", "zona": "SHALOM" },
        { "distrito": "San bartolo", "zona": "SUR" },
        { "distrito": "Olva", "zona": "Olva" },
        { "distrito": "Punta negra", "zona": "SUR" },
        { "distrito": "Villa María Del Triunfo", "zona": "SUR" }
      ];

      const datosConZona = valor.data.map(item => {
        const distrito = item.distrito.trim(); // Asegurarse de eliminar espacios en blanco al inicio y al final del distrito
        const zonaEncontrada = distritosZonas.find(zona => zona.distrito.toUpperCase() === distrito.toUpperCase());
        const zona = zonaEncontrada ? zonaEncontrada.zona : '-'; // Si no se encuentra la zona, se asigna 'Zona no encontrada'
        // Devolver un nuevo objeto con la zona añadida
        return { ...item, zona  };
      });
     
      console.log("Aquiiii datosConZona", datosConZona);

        const estadoTotal = [
          { "status": 0, "indice": "PENDIENTE" },
          { "status": 1, "indice": "ETIQUETA" },
          { "status": 2, "indice": "EN RUTA" },
          { "status": 3, "indice": "ENTREGADO" },
          { "status": 4, "indice": "ANULADO" },
          { "status": 5, "indice": "CAMBIO" },
          { "status": 6, "indice": "DEVOLUCION" },
          { "status": 7, "indice": "EMPAQUETADO" },
          { "status": 8, "indice": "RECOJO" },
          { "status": 12, "indice": "REGULARIZAR" }
        ];

        const estadoTotalChange = [
          { "status": 0, "indice": "PENDIENTE-CAMBIO" },
          { "status": 1, "indice": "ETIQUETA-CAMBIO" },
          { "status": 2, "indice": "EN RUTA-CAMBIO" },
          { "status": 3, "indice": "ENTREGADO-CAMBIO" },
          { "status": 4, "indice": "ANULADO-CAMBIO" },
          { "status": 5, "indice": "CAMBIO-CAMBIO" },
          { "status": 6, "indice": "DEVOLUCION-CAMBIO" },
          { "status": 7, "indice": "EMPAQUETADO" },
          { "status": 8, "indice": "RECOJO-CAMBIO" },
          { "status": 12, "indice": "REGULARIZAR-CAMBIO" }
        ];


        const datosConEstado = datosConZona.map(item => {
          let estadoEncontrado; 
          if(item.ischange===1){
          
            estadoEncontrado = estadoTotalChange.find(est => est.status === item.status);
          
          }else{
         
            estadoEncontrado = estadoTotal.find(est => est.status === item.status);
       
          }
          const estado = estadoEncontrado ? estadoEncontrado.indice : '-';

          return { ...item, estado };
        });

        console.log("Aquiiii datosConEstado", datosConZona);

      const datosConEstadoModificado = datosConEstado.map(item => {
        const worker_name = item.worker ? item.worker.name : null; // Obtener el nombre del trabajador
        return {
          ...item, // Mantener todas las demás propiedades del objeto original
          worker_name // Agregar el nombre del trabajador con el nuevo nombre de campo
        };
      });
      
      console.log("Aquiiii datosConEstado", datosConEstadoModificado);
   
      

      const datosConPrioridad = datosConEstadoModificado.map(item => {
        let prioridad = 'Baja'; // Por defecto, la prioridad es baja
        
        if (item.date) {
          const fechaActual = new Date();
          const fechaItem = new Date(item.date);
          const diferenciaDias = Math.ceil((fechaActual - fechaItem) / (1000 * 60 * 60 * 24)); // Diferencia en días
          
          if (diferenciaDias >= 3) {
            prioridad = 'Alta';
          } else if (diferenciaDias >= 2) {
            prioridad = 'Media';
          }
        }
      
        return {
          ...item,
          prioridad
        };
      });

      const datosConTipo = datosConPrioridad.map(item => {
        const worker_name = item.worker ? item.worker.name : null; // Obtener el nombre del trabajador
        let tipo = item.ischange ? 'Incidente' : 'Venta'; // Determinar el tipo según item.ischange

        return {
          ...item, // Mantener todas las demás propiedades del objeto original
          worker_name ,// Agregar el nombre del trabajador con el nuevo nombre de campo
          tipo
        };
      });

      const workbook = XLSX.utils.book_new();
      const sheetData = datosConTipo.map(item => [
        item.date,
        item.oc,
        item.origin,
        item.person.name,
        item.person.phone_number,
        item.adrress_delivery_string,
        item.reference_delivery_address,
        item.distrito,
        item.product,
        item.worker_default,
        item.obs,
      
      ]);    
      


      const worksheet = XLSX.utils.aoa_to_sheet([['FECHA', 'OC', 'ORIGEN', 'CLIENTE','TELEFONO',  'DOMICILIO', 'REFERENCIA', 'DISTRITO', 'PRODUCTO', 
      'MOTORIZADO', 'OBSERVACION' ], ...sheetData]);
  
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  
      const blob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blobToFile = (blob, fileName) => {
        return new File([blob], fileName, { type: blob.type });
      };
  
      const file = blobToFile(new Blob([blob]), 'Datos.xlsx');
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Cut.xlsx';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);

  
    } catch (error) {
      console.error('Error creating Report:', error);

    }
  };


  const handleSiAutorutaClick = async() => {

    const ids = ident.map(item => item.id);
    console.log("ids",ids);   

    try {
      const response = await fetch('https://api.cvimport.com/api/siautoruta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
     
      });
      const data = await response.json();
      console.log(data);
      fetchData();
      updateTableRows(data);
      handleModalCloseMotorizado() ;

  } catch (error) {
    console.log('Error al seleccionar la imagen:', error);
  }

  }


  const handleNoAutorutaClick = async () => {

    const ids = ident.map(item => item.id);
    console.log("ids",ids);   

    try {
      const response = await fetch('https://api.cvimport.com/api/noautoruta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
     
      });
      const data = await response.json();
      console.log(data);
      fetchData();
      updateTableRows(data);
      handleModalCloseMotorizado() ;
  } catch (error) {
    console.log('Error al seleccionar la imagen:', error);
  }

  }


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
          <Grid container rowSpacing={2} spacing={1} padding={2} alignItems="center">
          <Grid item xs={12} md={3}>
          <Button    variant="contained" color="info"  onClick={handleSendClick}>
                    Actualizar Estado
                  </Button>
          </Grid> 
          <Grid item xs={12} md={3 }>
          <Button    variant="contained" color="info" onClick={() => { handleSendMot ,  setIsModalOpenMotorizado(true)}}>
                    Actualizar Motorizado
                  </Button>
          </Grid> 

          <Grid item xs={12} md={2}>     
                  <Button  variant="contained"   color="success" onClick={handleSiAutorutaClick}>
                    Si Impresion
                  </Button>
          </Grid> 
          <Grid item xs={12} md={2}>          
                  <Button    style={style.cancelButton}  color="secondary" onClick={handleNoAutorutaClick}>
                    No Impresion
                  </Button>
          </Grid> 
          <Grid item xs={12} md={2}>     
                  <Button
                                        variant="contained"
                                        color="info"
                                        startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                                        onClick={() => {
                                          fetchDataAutoRutaFast();
                                        }} 
                                        >
                                    Reporte De AutoRuta
                                    </Button>
                                    </Grid> 
                                    </Grid> 
                                    <br />
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                <br />
                  <div className="row">


                  <br />
                    <div className="col-lg-12">
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box     
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          bgcolor: 'background.paper',
                          boxShadow: 24,
                          p: 4,
                        }}>
                          <Typography id="modal-modal-title" variant="h6" component="h6">
                              Confirmar La salida del Motorizado
                          </Typography>
                          <br />


                    

                          <Grid container rowSpacing={2} spacing={1} alignItems="center">
                          <Grid item xs={12} md={12}>
                          <Autocomplete
                            value = {selMot || []}
                            id="combo-box-demo"
                            options={motorizadoList || []}
                            sx={{ width:180 }}
                            renderInput={(params) => <TextField {...params} label="Motorizado" />}
                            onChange={ handleInputChangeWorker }
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                          <Button variant="contained"  onClick={() => { chagestatus() ; handleModalClose()}}>
                            Guardar
                          </Button>
                          </Grid>

                          <Grid item xs={12} md={6}>
                          <Button variant="contained"     style={style.cancelButton} color="secondary" onClick={() => {handleClose() }}>
                            Cancelar
                          </Button>
                          </Grid>
                          </Grid>
                        </Box>
                      </Modal>
                      <DataGrid
                          rows={rows}
                          columns={columns}
                          checkboxSelection
                          disableRowSelectionOnClick
                          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
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

                    <Modal open={isModalOpenMotorizado} onClose={handleModalCloseMotorizado}>
                    <div style={style.modalContainer}>
                    <Box
                      height={280}
                      width={350}
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
       

                      <Grid container rowSpacing={2} spacing={1} alignItems="center">

                      <Typography id="modal-modal-title" variant="h6" component="h6">
                              Confirmar La salida del Motorizado
                          </Typography>
                          <br />

                          <Grid item xs={12} md={12}>
                          <Autocomplete
                            value = {selMot || []}
                            id="combo-box-demo"
                            options={motorizadoList || []}
                            sx={{ width:180 }}
                            renderInput={(params) => <TextField {...params} label="Motorizado" />}
                            onChange={ handleInputChangeWorker }
                            />
                          </Grid>
                          
 
                      <Grid item xs={12} md={6}>
                      <Button variant="contained"  onClick={() => { handleSendMot() ;handleModalCloseMotorizado()}}>
                        Guardar
                      </Button>
                      </Grid>

                      <Grid item xs={12} md={6}>
                      <Button variant="contained" color="secondary"     style={style.cancelButton} onClick={() => {handleModalCloseMotorizado() }}>
                        Cancelar
                      </Button>
                      </Grid>

                      
                      </Grid>
                    </Box>
                    </div>
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
      width: '350px',
      backgroundColor: '#fff',
      boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },

  cancelButton: {
    padding: '10px',
    borderRadius: '8px',
    background: '#f44336',
    color: '#fff',
    cursor: 'pointer',
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