import React, { forwardRef, useState , useEffect } from 'react';
import Swal from 'sweetalert2';
import MUIDataTable from 'mui-datatables';
import { Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import EditIcon from '@mui/icons-material/Edit';
import OnlinePrediction from '@mui/icons-material/OnlinePrediction'
import dayjs from 'dayjs';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Photo from '@mui/icons-material/Photo';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

import * as XLSX from 'xlsx';

const ContentCut = () => {

  const [pdf, setPdf] = useState(null);
  const [userId, setUserId] = useState('');
  const [select, setSelect] = useState([]);
  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [modalOpenDetalle, setModalOpenDetalle] = useState(false);
  const [send, setSend] = useState([]);
  //Avisa si es edit al componente
  const [editingMode, setEditingMode] = useState(false);
  const [file, setFile] = useState(null);
  const [test, setTest] = useState(0);
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  const [switchOn, setSwitchOn] = useState(false);


  const [selectId, setSelectId] = useState(null);


  const handleFileChange = (event) => {
    console.log(event);
    setSelectedFile(event.target.files[0]);
  };

  
  useEffect(() => {
    fetchData();
    const username = localStorage.getItem('username');
    setUserId(username);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.cvimport.com/api/cut');

      if (response.ok) {
        const data = await response.json();
        setData(data.data);

      } else {
        console.error("Error de fetch", response.statusText);
    } 

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {;
      updateTableRows(data);
    }, [rows]);


    function getStatusText(select) {
      if (select.ischange === 0) {
          switch (select.status) {
              case 0:
                  return 'PENDIENTE';
              case 1:
                  return 'ETIQUETA';
              case 2:
                  return 'EN RUTA';
              case 3:
                  return 'ENTREGADO';
              case 4:
                  return 'ANULADO';
              case 5:
                  return 'CAMBIO';
              case 6:
                  return 'DEVOLUCION';
              default:
                  return 'Desconocido';
          }
      } else if (select.ischange === 1) {
          switch (select.status) {
              case 0:
                  return 'PENDIENTE-CAMBIO';
              case 1:
                  return 'ETIQUETA-CAMBIO';
              case 2:
                  return 'EN RUTA-CAMBIO';
              case 3:
                  return 'ENTREGADO-CAMBIO';
              case 4:
                  return 'ANULADO-CAMBIO';
              case 5:
                  return 'CAMBIO';
              case 6:
                  return 'DEVOLUCION';
              default:
                  return 'Desconocido';
          }
      }
  }

  const handleSwitchChange = () => {
      setSwitchOn(!switchOn);
  }

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
      ischange: item.ischange,
      productchange: item.productchange,
      skuchange: item.skuchange,
    }));

    setRows(rows);
  };


  const modalContentDetalle = (
   
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
     
              

                  <Typography>
                  {select && (  
                    
                     <>
                      <Typography variant="h6" gutterBottom component="div">
                            Detalle  Nº de Corte  {select.id}  
                      </Typography>

                      <Button
                                                variant="contained"
                                                style={{
                                                    backgroundColor: switchOn ? "#9C27B0" :
                                                        (select.status === 1 || select.status === 4 || select.status === 5) ? "red" :
                                                            "#22FF94",
                                                    color: switchOn || select.status === 1 || select.status === 4 || select.status === 5 ? "white" : "black"
                                                }}
                                                size="small"
                                                disabled={true}
                                            >
                                                <b>
                                                <p>{getStatusText(select)}</p>
                                                </b>
                      </Button>

                      Plataforma:  {select.origin}  <br />
                      Orden de Compra:   {select.oc} <br />
                      Fecha del corte:   {select.date}  <br />
                      Cliente:  {select.client}   <br /> 
                      Tipo de Documento:  {select.document_type} <br />
                      Numero de Documento:  {select.document_number}  <br />
                      Celular: {select.phone} <br />
                      Direccion: {select.address}  <br />
                      UBIGEO :  <br />
                      Producto: {select.product}     - <br />
                      Cantidad  {select.quantity}  <br />
                      Precio:  {select.price}  <br />
                      Producto Cambiado: {select.productchange}  <br />
                      Motorizado:  -<br />
                      </>
                        )}
                  </Typography>
        
      
      </div>

  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const reader = new FileReader();

    console.log("Aqqui Json data:",reader);
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log("Aqqui Json data:",jsonData);
      handleCreateCut();
      // Enviar los datos a la API
    //  sendDataToAPI(jsonData);
    };

  };


  const handleCreateCut = async (jsonD) => {
    console.log("Aqui JSON DATA",jsonD);
    try {
      setEditingMode(false);

      jsonD.forEach(function(obj) {
        obj["user_id"] = userId;
     });

      const response = await fetch('https://api.cvimport.com/api/cut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
              "user_id": userId,
              jsonData: jsonD , 
            }
        ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }

      Swal.fire({
        icon: 'success',
        title: 'Cortes Generados!',
        showConfirmButton: false,
        timer: 1500,
      });


      console.log(response);

    } catch (error) {
      console.error('Error creating category:', error);
      Swal.fire({
        icon: 'error',
        title: 'El Nombre de Producto ya existe!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  const handleCreateCutInterbank = async (jsonD) => {
    console.log("Aqui JSON DATA",jsonD);
    try {
      setEditingMode(false);

      jsonD.forEach(function(obj) {
        obj["user_id"] = userId;
     });

      const response = await fetch('https://api.cvimport.com/api/createInterbank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
               
              jsonData: jsonD , 
         
            }
        ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Swal.fire({
        icon: 'success',
        title: 'Cortes Generaos!',
        showConfirmButton: false,
        timer: 1500,
      });


      console.log(response);

    } catch (error) {
      console.error('Error creating category:', error);
      Swal.fire({
        icon: 'error',
        title: 'El Nombre de Producto ya existe!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  const handleCreateCutRipley = async (jsonD) => {
    setEditingMode(false);

    jsonD.forEach(function(obj) {
      // Guarda las claves actuales del objeto
      var keys = Object.keys(obj);
      
      // Crea un nuevo objeto con "user_id" como la primera clave
      var newObj = { "user_id": userId };
      
      // Copia las claves y valores originales al nuevo objeto
      keys.forEach(function(key) {
        newObj[key] = obj[key];
      });
      
      // Reemplaza el objeto original con el nuevo objeto
      Object.assign(obj, newObj);
    });
    
    console.log(jsonD);
    try {
      setEditingMode(false);
      const response = await fetch('https://api.cvimport.com/api/createRipley', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
               
              jsonData: jsonD , 
         
            }
        ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Swal.fire({
        icon: 'success',
        title: 'Cortes Generaos!',
        showConfirmButton: false,
        timer: 1500,
      });


      console.log(response);

    } catch (error) {
      console.error('Error creating category:', error);
      Swal.fire({
        icon: 'error',
        title: 'El Nombre de Producto ya existe!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleCreateCutVtex = async (jsonD) => {
    setEditingMode(false);

    jsonD.forEach(function(obj) {
      obj["user_id"] = userId;
   });

    try {
      setEditingMode(false);

      const response = await fetch('https://api.cvimport.com/api/createVtex', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
               
              jsonData: jsonD , 
         
            }
        ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Swal.fire({
        icon: 'success',
        title: 'Cortes Generaos!',
        showConfirmButton: false,
        timer: 1500,
      });


      console.log(response);

    } catch (error) {
      console.error('Error creating category:', error);
      Swal.fire({
        icon: 'error',
        title: 'El Nombre de Producto ya existe!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Desea eliminar este Producto?',
      text: 'Los campos como stock pueden verse afectados',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
    }).then(async (result) => {
      fetchData();
      if (result.isConfirmed) {
        try {
          await fetch(`https://api.cvimport.com/api/product/${id}`, {
            method: 'DELETE',
          });

          Swal.fire({
            icon: 'success',
            title: 'Productos Eliminada!',
            showConfirmButton: false,
            timer: 500,
          });

          setUpdateCount((prevCount) => prevCount + 1);
        } catch (error) {
          setUpdateCount((prevCount) => prevCount + 1);
          console.error('Error deleting category:', error);
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

  const handleCloseModal = () => {
      setOpenModal(false);
    };

    

  const handleDownloadCut = async (id) => {
      
      try {
        // Realizar una solicitud GET al backend para obtener la URL de la imagen
        const response = await fetch(`https://api.cvimport.com/api/getPhoto/${id}`);
        const data = await response.json();
        console.log(response , data.data);
        // Verificar si la solicitud fue exitosa y se recibió la URL de la imagen

          // Crear un enlace temporal
          const link = document.createElement('a');
          link.href = data.data;
          link.target = '_blank'; 
          link.download = 'imagen.jpg'; // Nombre del archivo a descargar
          document.body.appendChild(link);
    
          // Simular un clic en el enlace
          link.click();
    
          // Limpiar el enlace temporal
          document.body.removeChild(link);

      } catch (error) {
        // Manejar errores de red u otros errores
        console.error('Error:', error);
      }

    };


  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
        setDate([year, month, day].join('-'));
        console.log( "Aquiiii date:" , date, [year, month, day].join('-'));

}




const blobToFile = (blob, fileName) => {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};

  const handleDownload = () => {
 
    // Crear un libro de Excel
    console.log("pdf :",pdf);
    const workbook = XLSX.utils.book_new();
    const sheetData = pdf.map(item => [
     `${item.sku.substring(0,1)}00`,
      item.categoria,
      item.sku.substring(0, 3),
      item.subcategoria,
      item.sku,
      "NEW PROD",
      item.name,
      item.unit,
      item.purchase_price,
      "NEW PROD", 
      item.updated_at,
      "ADMIN",
      item.status === 1 ? 'ACTIVO' : 'DESHABILITADO', // Modificado para mostrar "Activo" o "Inactivo"
      "ACTUAL", 
    ]);    
    
    const worksheet = XLSX.utils.aoa_to_sheet([['COD_CAT', 'CATEGORÍA', 'COD_SUB CAT', 'COD_SUB CAT', 'CÓDIGO', 'SKU  ', 'DESCRIPCIÓN', 'U.M.', 'COSTO', 'PROVEEDOR', 'ULT MODIFICACIÓN', 'USER' , 'ESTADO', 'PRICE STATUS' ], ...sheetData]);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    // Cambiado el tipo de blob a 'array' en lugar de 'blob'
    const blob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Convertir el blob a un objeto File
    const file = blobToFile(new Blob([blob]), 'datos.xlsx');

    // Crear un objeto URL para el blob del File
    const url = URL.createObjectURL(file);

    // Crear un enlace de descarga y hacer clic en él para iniciar la descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos.xlsx';
    document.body.appendChild(a);
    a.click();

    // Limpiar el objeto URL y el enlace
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };


  
  const handleAnullCut = async (id) => {

  Swal.fire({
    title: 'Desea Anular el Corte?',
    text: 'Los campos pueden estar asociados a OC',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar!',
  }).then(async (result) => {
    fetchData();
    if (result.isConfirmed) {
      try {
        await fetch(`https://api.cvimport.com/api/anullCut/${id}`, {
          method: 'GET',
        });

        Swal.fire({
          icon: 'success',
          title: 'Corte Anulado!',
          showConfirmButton: false,
          timer: 400,
        });

        setUpdateCount((prevCount) => prevCount + 1);
      } catch (error) {
        setUpdateCount((prevCount) => prevCount + 1);
        console.error('Error deleting Corte:', error);
        Swal.fire({
          icon: 'error',
          title: 'An error occurred while deleting!',
          showConfirmButton: false,
          timer: 400,
        });
      }
    }
  });
};

const getStatusLabel = (status, ischange) => {
  if (ischange === 0) {
      switch (status) {
          case 0:
              return 'PENDIENTE';
          case 1:
              return 'ETIQUETA';
          case 2:
              return 'EN RUTA';
          case 3:
              return 'ENTREGADO';
          case 4:
              return 'ANULADO';
          case 5:
              return 'CAMBIO';
          case 6:
              return 'DEVOLUCION';
          default:
              return 'Desconocido';
      }
  } else if (ischange === 1) {
      switch (status) {
          case 0:
              return 'PENDIENTE-CAMBIO';
          case 1:
              return 'ETIQUETA-CAMBIO';
          case 2:
              return 'EN RUTA-CAMBIO';
          case 3:
              return 'ENTREGADO-CAMBIO';
          case 4:
              return 'ANULADO-CAMBIO';
          case 5:
              return 'CAMBIO';
          case 6:
              return 'DEVOLUCION';
          default:
              return 'Desconocido';
      }
  }
};

const getStatuschange = (status) => {

  switch (status) {
      case 0:
          return '-';
      case 1:
          return 'CAMBIO';
      default:
          return 'Desconocido';
  }


};

  const handleRowClick = async (id) => {
    getSel(data,id);
    setModalOpenDetalle(true);
  }

  const getSel = async (data, id) => {
    const value = data.filter(objeto => objeto.id === id);
    setSelect(value[0]);
  }

  useEffect(() => {
    console.log(select, select.oc);
  }, [select]);

const handleCloseModalDetalle = () => {
  setModalOpenDetalle(false);
}

const columns = [
    {
      field : 'id',
      headerName: 'Id Corte',
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
      field: 'origin',
      headerName: 'SELLER',
    
    },
    {
      field: 'date_cut',
      headerName: 'Fecha de Corte',
    
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
      width: 280,
    },
    {
      field: 'quantity',
      headerName: 'Cantidad',
    },
    {
      field: 'client',
      headerName: 'Cliente',
      width: 280,
    },
    { field: 'ischange', headerName: 'Cambio', width: 120 , renderCell: ({ value }) => getStatuschange(value) },

    {
      field: 'productchange',
      headerName: 'Producto Cambiado',
    },

    {
      field: 'skuchange',
      headerName: 'Sku cambiado',
    },

    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ value, row }) => getStatusLabel(value, row.ischange),
      width: 130,
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
            icon={<DeleteIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleAnullCut(id  )  }
            color="success"
          />,

          <GridActionsCellItem
          icon={<Photo />}
          label="Edit"
          className="textPrimary"
          onClick={() => handleDownloadCut(id  )  }
          color="success"
        />,

        <GridActionsCellItem
        label="Ver Detalle"
        icon={<CloudUploadIcon />}
        style={{ backgroundColor: switchOn ? "#9C27B0" : "#22FF94", color: switchOn ? "white" : "black" }}
        onClick={() => handleRowClick(id)}
        />
    

        ];  
      },
    },


  ];

  const handleConvert = () => {
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
    
        handleCreateCut(json);
 

      };
      reader.readAsBinaryString(file);
    
    }
    fetchData();
  };

  const handleConvertInterbank = () => {
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
    
        handleCreateCutInterbank(json);

      };
      reader.readAsBinaryString(file);
    
    }
    fetchData();
  };

  const handleConvertRipley = () => {
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
    
        handleCreateCutRipley(json);
    

      };
      reader.readAsBinaryString(file);
 
    }
    fetchData();
  };

  const handleConvertVtex = () => {
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
    
        handleCreateCutVtex(json);
   

      };
      reader.readAsBinaryString(file);
    
    }
    fetchData();
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

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Cortes</h1>
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
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">

                      <input type="file" accept=".xls,.xlsx" onChange={e => setFile(e.target.files[0])} />

                         <Button
                          variant="contained"
                          color="success"
                          startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                          onClick={handleConvert}                    >
                          Saga Falabella
                        </Button>

                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                          onClick={handleConvertInterbank}                    >
                           Intercorp
                        </Button>

                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                          onClick={handleConvertRipley}                    >
                          RIPLEY
                        </Button>


                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                          onClick={handleConvertVtex}                    >
                          VTEX
                        </Button>


                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                          onClick={handleConvertVtex}                    >
                          Carga Motorizados
                        </Button> 

                  </div>
                </div>
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
                        <Modal open={modalOpenDetalle} onClose={handleCloseModalDetalle}>
                            {modalContentDetalle}
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

export default ContentCut;



