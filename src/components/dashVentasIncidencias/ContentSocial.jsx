import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const ContentSocial = () => {

  const [socialNext, setSocialNext] = useState(null);
  const [send, setSennd] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState(dayjs().format('DD/MM/YYYY'));
  const [proveedor, setProveedor] = useState('');
  const [productos, setProductos] = useState([]);
  const [almacen, setAlmacen] = useState([]);
  const [obs, setObs] = useState("");
  const [total, setTotal] = useState(0);
  const [productoList, setProductoList] = useState(null);
  const [clientList, setClientList] = useState(null);
  const [selClient, setSelClient] = useState([]);
  const [almacenList, setAlmacenList] = useState(null);

  const [isModalOpenClient, setIsModalOpenClient] = useState(false);
  const [openModalClient, setOpenModalClient] = useState(false);
  const [newPerson, setNewPerson] = useState({
    id: '',
    name: '',
    document_type: '',
    document_number: '',
    phone_number: '',
    email: '',
    address: '',
    reference: '',
    departament: '',
    province: '',
    district: '',
    delivery_address: '',
    reference_delivery_address: '',
    departament_delivery_address: '',
    province_delivery_address: '',
    district_delivery_address: '',

  });

  const [chanelList, setChanelList] = useState([
    {
      label: 'VENTA DIRECTA',
      key: 1
    },
    {
      label: 'VENTA CORPORATIVA',
      key: 2
    },
    {
      label: 'VENTA TIENDA',
      key: 3
    },
    {
      label: 'VENTA CONTRA ENTREGA',
      key: 4
    },
    {
      label: 'VENTA PROVINCIA',
      key: 5
    },
    {
      label: 'VENTA ALMACEN ',
      key: 6
    },
  ]);
  const [selChanel, setSelChanel] = useState([]);

  const [entregaList, setEntregaList] = useState([
    {
      label: '24 horas',
      key: 1
    },
    {
      label: '48 horas',
      key: 2
    },
    {
      label: 'Recojo en tienda',
      key: 3
    },
    {
      label: 'Recojo en almacen',
      key: 4
    },
    {
      label: 'Contra-Entrega',
      key: 5
    },
    {
      label: 'No especificado',
      key: 6
    },
  ]);

  const [selEntrega, setSelEntrega] = useState([]);

  const [pagoList, setPagoList] = useState([
    {
      label: 'PLIN',
      key: 1
    },
    {
      label: 'YAPE',
      key: 2
    },
    {
      label: 'WEB',
      key: 3
    },
    {
      label: 'LINK',
      key: 4
    },
    {
      label: 'EFECTIVO',
      key: 5
    },
    {
      label: 'DEPOSITO',
      key: 6
    },
    {
      label: 'TARJETA',
      key: 7
    },
    {
      label: 'TRANSFERENCIA',
      key: 8
    },
    {
      label: 'NO ESPECIFICADO',
      key: 9
    },
  ]);

  const [selPago, setSelPago] = useState([]);



  const [plataformaList, setPlataformaList] = useState([
    {
      label: 'FACEBBOK',
      key: 1
    },
    {
      label: 'FB/WSP',
      key: 2
    },
    {
      label: 'INSTAGRAM',
      key: 3
    },
    {
      label: 'TIENDA',
      key: 4
    },
    {
      label: 'WHATSAPP',
      key: 5
    },
    {
      label: 'Ad fly',
      key: 6
    },
    {
      label: 'Mercado Libre',
      key: 7
    },
  ]);

  const [selPlataforma, setSelPlataforma] = useState([]);

  const [select, setSelect] = useState(null);
  const [selectDelivery, setSelectDelivery] = useState(null);

  const [selectProvince, setSelectProvince] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null);
  const [selectProvinceDelivery, setSelectProvinceDelivery] = useState(null);
  const [selectDistrictDelivery, setSelectDistrictDelivery] = useState(null);

  const [selAlm, setSelAlm] = useState([]);
  const [selProd, setSelProd] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);
  const [nuevoTotal, setNuevoTotal] = useState(0);
  const [newProducto, setNewProducto] = useState({
    id: '',
    provider_id: '',
    warehouse_id: '',
    purchase_date: '',
    total: ''
  });

  const [newPurchaseLine, setNewPurchaseLine] = useState({
    id: '',
    product_id: '',
    name: '',
    quantity: '',
    sku: '',
    price: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);


  useEffect(() => {
    // Calcular el nuevo total basándose en los productos actuales
    const nuevoTotalCalculado = productos.reduce((acc, prod) => acc + prod.subtotal, 0);
    // Actualizar el estado de nuevoTotal
    setNuevoTotal(nuevoTotalCalculado);
    console.log(nuevoTotal);
    const username = localStorage.getItem('username');
    setUserId(username);
    fetchDataSelect();
  }, [updateCount, productos]);

  useEffect(() => {
    obtenerProveedoresDesdeAPI();
    obtenerProductosDesdeAPI();
    obtenerAlmacenDesdeAPI();
    obtenerSocialAPI();

  }, []);

  useEffect(() => {
    obtenerProveedoresDesdeAPI();
  }, [selClient]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseModalClient = () => {
    setOpenModalClient(false);
  };

  const fetchDataSelect = async () => {
    try {
      const response_departament = await fetch('https://api.cvimport.com/api/departamentUbigeoController');

      const valor_select = await response_departament.json();
      console.log(valor_select.data);
      updateSelectsClients(valor_select.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateSelectsClients = (data) => {

    const rows = data.map((item) => ({
      key: item.id,
      value: item.name
    }));
    console.log(rows);
    setSelect(rows);
    setSelectDelivery(rows);
  };


  const handleCreatePerson = async () => {
    try {
      const response = await fetch('https://api.cvimport.com/api/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPerson),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Swal.fire({
        icon: 'success',
        title: 'Nuevo Cliente Creado!',
        showConfirmButton: false,
        timer: 1500,
      });

      handleCloseModalClient();
      setUpdateCount((prevCount) => prevCount + 1);
      obtenerProveedoresDesdeAPI();

    } catch (error) {
      console.error('Error creating category:', error);
      setOpenModalClient(false);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear Cliente,!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  const fetchDataSelectProvince = async (id) => {
    try {
      console.log(id);
      const response_province = await fetch('https://api.cvimport.com/api/provinceUbigeoController');


      const valor_select = await response_province.json();
      console.log("Aquii1;", valor_select)

      const resultados = valor_select.data.filter(objeto => objeto.department_id === id);
      const resultados_final = resultados.map((item) => ({
        key: item.id,
        value: item.name
      }));

      setNewPerson((prevPerson) => ({
        ...prevPerson,
        'province': id,
      }));
      console.log("Aquii;", resultados_final)
      setSelectProvince(resultados_final);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataSelectProvinceDelivery = async (id) => {
    try {
      console.log(id);
      const response_province = await fetch('https://api.cvimport.com/api/provinceUbigeoController');


      const valor_select = await response_province.json();
      console.log("Aquii1;", valor_select)

      const resultados = valor_select.data.filter(objeto => objeto.department_id === id);
      const resultados_final = resultados.map((item) => ({
        key: item.id,
        value: item.name
      }));

      setNewPerson((prevPerson) => ({
        ...prevPerson,
        'province_delivery_address': id,
      }));
      console.log("Aquii;", resultados_final)
      setSelectProvinceDelivery(resultados_final);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDistrict = (event) => {
    const id = event.target.value;
    setSelectDistrict(event.target.value);
    fetchDataSelectDistrict(id);
  };


  const handleDistrictDelivery = (event) => {
    const id = event.target.value;
    setSelectDistrictDelivery(event.target.value);
    fetchDataSelectDistrictDelivery(id);
  };



  const fetchDataSelectDistrict = async (id) => {
    try {
      console.log(id);
      const response_district = await fetch('https://api.cvimport.com/api/districtUbigeoController');


      const valor_select = await response_district.json();
      console.log("Aquii1;", valor_select)

      const resultados = valor_select.data.filter(objeto => objeto.province_id === id);
      const resultados_final = resultados.map((item) => ({
        key: item.id,
        value: item.name
      }));

      setNewPerson((prevPerson) => ({
        ...prevPerson,
        'district': id,
      }));
      console.log("Aquii;", resultados_final)
      setSelectDistrict(resultados_final);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataSelectDistrictDelivery = async (id) => {
    try {
      console.log(id);
      const response_district = await fetch('https://api.cvimport.com/api/districtUbigeoController');


      const valor_select = await response_district.json();
      console.log("Aquii1 Delivery;", valor_select)

      const resultados = valor_select.data.filter(objeto => objeto.province_id === id);
      const resultados_final = resultados.map((item) => ({
        key: item.id,
        value: item.name
      }));

      setNewPerson((prevPerson) => ({
        ...prevPerson,
        'district_delivery_address': id,
      }));
      console.log("Aquii; district delivery", resultados_final)
      setSelectDistrictDelivery(resultados_final);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const obtenerAlmacenDesdeAPI = async () => {
    try {
      const response = await fetch('https://api.cvimport.com/api/warehouse');
      if (response.ok) {
        const data = await response.json();

        const resultados_final = data.data.map((item) => ({
          label: item.name, // Usar 'name' como 'label'
          key: item.id       // Usar 'id' (o la propiedad adecuada) como 'key'
        }));

        setAlmacenList(resultados_final);
        console.log(resultados_final);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleProvince = (event) => {
    const id = event.target.value;

    setNewPerson((prevPerson) => ({
      ...prevPerson,
      'departament': id,
    }));

    setSelectProvince(event.target.value);
    fetchDataSelectProvince(id);
  };

  const handleProvinceDelivery = (event) => {
    const id = event.target.value;

    setNewPerson((prevPerson) => ({
      ...prevPerson,
      'departament_delivery_address': id,
    }));

    setSelectProvinceDelivery(event.target.value);
    fetchDataSelectProvinceDelivery(id);
  };


  const obtenerSocialAPI = async () => {
    try {
      setSocialNext(null);
      const response = await fetch('https://api.cvimport.com/api/obtenerSiguienteSocial');
      if (response.ok) {
        const data = await response.json();

        const resultados_final = data.data;
        setSocialNext(data.data);
        console.log("aQUIIIII:", resultados_final);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  const obtenerProductosDesdeAPI = async () => {
    try {
      const response = await fetch('https://api.cvimport.com/api/product');
      if (response.ok) {
        const data = await response.json();

        const resultados_final = data.data.map((item) => ({
          label: item.name + ' - ' + item.sku,   // Usar 'name' como 'label'
          key: item.id       // Usar 'id' (o la propiedad adecuada) como 'key'
        }));

        setProductoList(resultados_final);
        setSelAlm({ label: 'Almacen Principal AP', key: 1 })
        console.log(resultados_final);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const obtenerProveedoresDesdeAPI = async () => {
    try {
      const response = await fetch('https://api.cvimport.com/api/searchPerson');
      if (response.ok) {
        const data = await response.json();

        const resultados_final = data.data.map((item) => ({
          label: item.name + '-' + item.document_number,
          key: item.id       // Usar 'id' (o la propiedad adecuada) como 'key'
        }));

        setClientList(resultados_final);
        console.log(resultados_final);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const obtenerProductoPorId = async (event, value) => {

    try {
      const response = await fetch(`https://api.cvimport.com/api/product/${value.key}`);
      if (response.ok) {
        const data = await response.json();

        setNewPurchaseLine({
          product_id: value.key,
          name: data.data.name,
          sku: data.data.sku,
          price: data.data.purchase_price,
        });

        const sel = {
          label: data.data.name, // Reemplaza con el nombre que desees
          key: value.key // Reemplaza con el ID que desees
        };
        setSelProd(sel);

      } else {
        console.error('Error al obtener el producto desde la API');
        setProducto(null);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const agregarProducto = async () => {
    console.log("Cantidad;", newPurchaseLine.quantity);
    if (!newPurchaseLine.product_id || !newPurchaseLine.quantity || newPurchaseLine.quantity <= 0) {
      alert('Selecciona un producto y especifica la cantidad antes de agregarlo.');
      return;
    }


    // Calcular el subtotal del nuevo producto
    const subtotal = newPurchaseLine.price * newPurchaseLine.quantity;

    // Crear un nuevo objeto de producto en base a la información de la API
    const nuevoPurchaseline = {
      name: newPurchaseLine.name,
      obs: newPurchaseLine.obs,
      product_id: newPurchaseLine.product_id,
      sku: newPurchaseLine.sku,
      quantity: newPurchaseLine.quantity,
      price: newPurchaseLine.price,
      subtotal: subtotal,

    };

    setNuevoTotal((prevTotal) => prevTotal + subtotal);
    // Agregar el nuevo producto al estado de productos
    setProductos([...productos, nuevoPurchaseline]);
    setSelProd([]);
    // Limpiar los campos del nuevo producto

    setNewPurchaseLine([]);

    console.log("Purchase Line:", newPurchaseLine)

  };

  const eliminarProducto = (sku) => {
    // Eliminar un producto del estado de productos
    console.log(sku, productos);
    const nuevosProductos = productos.filter((prod) => prod.sku !== sku);


    setProductos(nuevosProductos);
  };

  const enviarOrdenCompra = async () => {
    // Implementar la lógica para enviar la orden de compra a la API
    try {

      console.log("Aqui lo que se envia:", selClient, selChanel, selPago, selEntrega)
      const inventoryEntrie_line = productos.map((producto) => ({
        oc: producto.oc,
        product_id: producto.product_id,
        quantity: producto.quantity,
        price: producto.price,
      }));



      const send = {

        "person_detail": selClient.label,
        "person_id": selClient.key,
        "client_type": selChanel.label,
        "shipping_type": selPago.label,
        "payment_type": selEntrega.label,
        "platform": selPlataforma.label,
        "date": date,
        "obs": obs,
        "total": nuevoTotal,
        "inventoryEntrie_line": inventoryEntrie_line,
        "user_id": userId
      }

      obtenerSocialAPI();

      const response = await fetch('https://api.cvimport.com/api/social', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Otros encabezados si es necesario
        },
        body: JSON.stringify(send),
      });

      console.log("Envio : ", send);
    } catch (error) {
      console.error('Error al enviar la orden de compra:', error);
    }

    setProductos([]);
    setSelPago([]);
    setSelChanel([]);
    setSelEntrega([]);
    setSelPlataforma([]);
    setSelClient([]);
    setObs(null);
    newProducto.oc = '';

    Swal.fire({
      icon: 'success',
      title: 'Nuevo Venta RRSS de Creada!',
      showConfirmButton: false,
      timer: 1500,
    });


  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPurchaseLine((prevPurchase) => ({
      ...prevPurchase,
      [name]: value,
    }));
  };

  const handleInputChangePerson = (event) => {
    const { name, value } = event.target;
    console.log(newPerson, name, value);

    setNewPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
    console.log(newPerson);
  };


  const handleInputChangeChanel = (event, value) => {

    const sele = {
      label: value.label,
      key: value.key
    };

    setSelChanel(sele);
  }


  const handleInputChangeEntrada = (event, value) => {

    const sele = {
      label: value.label,
      key: value.key
    };

    setSelEntrega(sele);
  }

  const handleInputChangeClient = (event, value) => {

    const sele = {
      label: value.label,
      key: value.key
    };

    setSelClient(sele);
  }

  const handleInputChangePago = (event, value) => {

    const sele = {
      label: value.label,
      key: value.key
    };

    setSelPago(sele);
  }

  const handleInputChangePlataforma = (event, value) => {

    const sele = {
      label: value.label,
      key: value.key
    };

    setSelPlataforma(sele);
  }

  const handleInputDate = (event) => {
    formatDate(event.$d);

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
    setDate([day, month, year].join('/'));

  }

  const handleInputChangeObs = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setObs(value);

  };

  const editarProducto = (sku) => {
    const productToEdit = productos.find((prod) => prod.sku === sku);
    console.log("Aquiii:", productToEdit, sku)
    setEditingProduct(productToEdit);
    setIsModalOpen(true);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleModalCloseClient = () => {
    setIsModalOpen(false);
  };

  const handleModalOpenClient = () => {
    setIsModalOpenClient(true);
  };

  const setApiDNI = async () => {
    let url;
    const token = 'c1aa445e53986483cc4b70874fb69788367ad18e51ca10edd3f130e959d6191f';


    if (newPerson.document_type === "DNI") {
      const dni = newPerson.document_number;
      url = 'https://apiperu.dev/api/dni';
      try {
        const response = await fetch(`${url}?dni=${dni}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        // Verificar el estado de la respuesta
        if (!response.ok) {
          throw new Error('Error al hacer la solicitud');
        }

        const responsed = await response.json();
        // Hacer algo con la respuesta, por ejemplo:


        setNewPerson((prevClient) => ({
          ...prevClient,
          'name': responsed.data.nombre_completo,
        }));

        console.log(newPerson, newPerson.name);
      } catch (error) {
        // Manejar errores
        alert('Error, porfavor valide los datos:', error);
      }

    } else if (newPerson.document_type === "RUC") {

      const ruc = newPerson.document_number;
      url = 'https://apiperu.dev/api/ruc';
      try {
        const response = await fetch(`${url}?ruc=${ruc}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        // Verificar el estado de la respuesta
        if (!response.ok) {
          throw new Error('Error al hacer la solicitud');
        }

        const responsed = await response.json();
        // Hacer algo con la respuesta, por ejemplo:

        console.log(responsed, responsed.nombre_o_razon_social);
        setNewPerson((prevClient) => ({
          ...prevClient,
          'name': responsed.data.nombre_o_razon_social,
        }));

        console.log(newPerson, newPerson.commercial_name);
      } catch (error) {
        // Manejar errores
        alert('Error, porfavor valide los datos:', error);
      }

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
        Editar
      </Typography>
      {/* Contenido del modal, por ejemplo, un campo de entrada para la nueva cantidad */}
      <TextField
        fullWidth
        label="Nueva Cantidad"
        type="number"
        name="newQuantity"
        value={editingProduct ? editingProduct.quantity : ''}
        onChange={(event) => handleEditInputChange(event)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Nuevo Precio"
        type="number"
        name="newPrice"
        value={editingProduct ? editingProduct.price : ''}
        onChange={(event) => handleEditInputChangePrice(event)}
        margin="normal"
      />
      <Button variant="contained" onClick={() => guardarEdicionCantidad()}>
        Guardar
      </Button>
      <Button variant="contained" onClick={handleModalClose}>
        Cancelar
      </Button>
    </Box>
  );

  const modalContentClient = (
    <Modal open={openModalClient}
      onClose={handleCloseModalClient}
    >
      <div className="modalDetalle" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'auto', maxHeight: '80vh' }}>
         <h2 style={{ textAlign: 'center', marginBottom: '20px' }}
          >Crear Nuevo Cliente</h2>

          <Grid container rowSpacing={2} spacing={1} alignItems="center">
            <Grid item xs={12} md={12}>

              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                value={newPerson.name}
                onChange={handleInputChangePerson}
              />
            </Grid>
          </Grid>

          <Grid container rowSpacing={4} spacing={4} alignItems="center">

            <Grid item xs={12} md={2}>
              <InputLabel id="demo-select-small-label">Tipo de Documento</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-autowidth"
                name="document_type"
                fullWidth
                sx={{ color: 'black' }}
                value={newPerson.document_type}
                label="Tipo de Documento"
                onChange={handleInputChangePerson}
              >
                <MenuItem value={"RUC"}>RUC</MenuItem>
                <MenuItem value={"DNI"}>DNI</MenuItem>
                <MenuItem value={"CE"}>CE</MenuItem>
                <MenuItem value={"PASAPORTE"}>PASAPORTE</MenuItem>
              </Select>

            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Numero de Documento"
                variant="outlined"
                fullWidth
                margin="normal"
                name="document_number"
                value={newPerson.document_number}
                onChange={handleInputChangePerson}
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: 15 }}
                startIcon={<FontAwesomeIcon icon={faSearch} />}
                onClick={() => {
                  setOpenModalClient(true);
                  setApiDNI();
                }}

              >

              </Button>

            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={newPerson.email}
                onChange={handleInputChangePerson}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Telefono"
                variant="outlined"
                fullWidth
                margin="normal"
                name="phone_number"
                value={newPerson.phone_number}
                onChange={handleInputChangePerson}
              />
            </Grid>


          </Grid>

          <Grid container rowSpacing={2} spacing={2} alignItems="center">
            <TextField
              label="id"
              variant="outlined"
              fullWidth
              margin="normal"
              name="id"
              value={newPerson.id}
              style={{ display: 'none' }}
            />

          </Grid>

          <Typography variant="h6" component="h6">
            Direccion
          </Typography>

          <Grid container rowSpacing={2} spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                label="Direccion"
                variant="outlined"
                fullWidth
                margin="normal"
                name="address"
                value={newPerson.address}
                onChange={handleInputChangePerson}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Referencia"
                variant="outlined"
                fullWidth
                margin="normal"
                name="reference"
                value={newPerson.reference}
                onChange={handleInputChangePerson}
              />
            </Grid>


          </Grid>

          <Grid container rowSpacing={3} spacing={3} alignItems="center">

            <Grid item xs={12} md={4}>
              <InputLabel id="demo-select-small-label">Departamento</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small-label"
                name="departament"
                fullWidth
                value={newPerson.departament}
                onChange={handleProvince}
                label="Departamento"
                sx={{ color: 'black' }}
              >
                {Array.isArray(select) && select.length > 0 ? (
                  select.map((item) => (
                    <MenuItem value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No hay Departamentos disponibles
                  </MenuItem>
                )}



              </Select>
            </Grid>

            <Grid item xs={12} md={4}>
              <InputLabel id="demo-select-small-label">Provincia</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small-label"
                name="province"
                fullWidth
                value={newPerson.province}
                label="Tipo de Proveedor"
                sx={{ color: 'black' }}
                onChange={handleDistrict}
              >
                {Array.isArray(selectProvince) && selectProvince.length > 0 ? (
                  selectProvince.map((item) => (
                    <MenuItem value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No hay Provincias disponibles
                  </MenuItem>
                )}

              </Select>
            </Grid>


            <Grid item xs={12} md={4}>
              <InputLabel id="demo-select-small-label">Distrito</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small-label"
                name="district"
                fullWidth
                value={newPerson.district}
                label="Distrito"
                sx={{ color: 'black' }}
              >
                {Array.isArray(selectDistrict) && selectDistrict.length > 0 ? (
                  selectDistrict.map((item) => (
                    <MenuItem value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No hay Distritos disponibles
                  </MenuItem>
                )}

              </Select>
            </Grid>

          </Grid>

          <Typography variant="h6" component="h6">
            Persona de Referencia de Envio
          </Typography>


          <Grid container rowSpacing={3} spacing={1} alignItems="center">
            <Grid item xs={12} md={3}>

              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name_ref"
                value={newPerson.name_ref}
                onChange={handleInputChangePerson}
              />
            </Grid>


            <Grid item xs={12} md={3}>
              <InputLabel id="demo-select-small-label">Tipo de Documento</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-autowidth"
                name="document_type_ref"
                fullWidth
                sx={{ color: 'black' }}
                value={newPerson.document_type_ref}
                label="Tipo de Documento"
                onChange={handleInputChangePerson}
              >
                <MenuItem value={"RUC"}>RUC</MenuItem>
                <MenuItem value={"DNI"}>DNI</MenuItem>
                <MenuItem value={"PASAPORTE"}>PASAPORTE</MenuItem>
              </Select>

            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Numero de Documento"
                variant="outlined"
                fullWidth
                margin="normal"
                name="number_doc_ref"
                value={newPerson.number_doc_ref}
                onChange={handleInputChangePerson}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Agencia"
                variant="outlined"
                fullWidth
                margin="normal"
                name="agency_ref"
                value={newPerson.agency_ref}
                onChange={handleInputChangePerson}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Telefono"
                variant="outlined"
                fullWidth
                margin="normal"
                name="phone_ref"
                value={newPerson.phone_ref}
                onChange={handleInputChangePerson}
              />
            </Grid>


          </Grid>

          <Typography variant="h6" component="h6">
            Direccion de Envio
          </Typography>


          <Grid container rowSpacing={2} spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                label="Direccion de Envio"
                variant="outlined"
                fullWidth
                margin="normal"
                name="delivery_address"
                value={newPerson.delivery_address}
                onChange={handleInputChangePerson}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="referencia de Envio"
                variant="outlined"
                fullWidth
                margin="normal"
                name="reference_delivery_address"
                value={newPerson.reference_delivery_address}
                onChange={handleInputChangePerson}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <InputLabel id="demo-select-small-label">Departamento</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small-label"
                name="departament_delivery_address"
                fullWidth
                value={newPerson.departament_delivery_address}
                onChange={handleProvinceDelivery}
                label="Departamento"
                sx={{ color: 'black' }}
              >
                {Array.isArray(selectDelivery) && selectDelivery.length > 0 ? (
                  selectDelivery.map((item) => (
                    <MenuItem value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No hay Departamentos disponibles
                  </MenuItem>
                )}
              </Select>
            </Grid>

            <Grid item xs={12} md={2}>
              <InputLabel id="demo-simple-select-label">Provincia</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="province_delivery_address"
                fullWidth
                value={newPerson.province_delivery_address}
                label="Provincia"
                onChange={handleDistrictDelivery}
              >
                {Array.isArray(selectProvinceDelivery) && selectProvinceDelivery.length > 0 ? (
                  selectProvinceDelivery.map((item) => (
                    <MenuItem value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No hay Provincias disponibles
                  </MenuItem>
                )}
              </Select>
            </Grid>

            <Grid item xs={12} md={2}>
              <InputLabel id="demo-select-small-label">Distrito</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small-label"
                name="district_delivery_address"
                fullWidth
                value={newPerson.district_delivery_address}
                label="Distrito"
                sx={{ color: 'black' }}
              >
                {Array.isArray(selectDistrictDelivery) && selectDistrictDelivery.length > 0 ? (
                  selectDistrictDelivery.map((item) => (
                    <MenuItem value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No hay Provincias disponibles
                  </MenuItem>
                )}

              </Select>
            </Grid>

          </Grid>

          <div style={style.buttonContainer}>

            <Button
              variant="contained"
              color="primary"
              style={style.createButton}
              onClick={() => handleCreatePerson()}
            >
              Crear
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={style.cancelButton}
              onClick={() => {
                setOpenModalClient(false);
                setNewPerson({
                  id: '',
                  name: '',
                  document_type: '',
                  document_number: '',
                  phone_number: '',
                  email: '',
                  address: '',
                  reference: '',
                  departament: '',
                  province: '',
                  district: '',
                  delivery_address: '',
                  reference_delivery_address: '',
                  departament_delivery_address: '',
                  province_delivery_address: '',
                  district_delivery_address: '',
                });
              }}                      >
              Cancelar
            </Button>
          </div>
      </div>
    </Modal>
  );

  const handleEditInputChange = (event) => {
    const { value } = event.target;
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      quantity: value,
    }));
  };

  const handleEditInputChangePrice = (event) => {
    const { value } = event.target;
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      price: value,
    }));
  };

  const guardarEdicionCantidad = () => {
    // Implementar lógica para guardar la edición de cantidad
    // Puedes actualizar el estado y cerrar el modal
    const updatedProducts = productos.map((prod) =>
      prod.sku === editingProduct.sku ? { ...prod, quantity: editingProduct.quantity, price: editingProduct.price } : prod


    );
    setProductos(updatedProducts);
    handleModalClose();
  };




  return (
    <Container >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={12}>
          <br />
          <Typography variant="h5" gutterBottom>
            Registro de Venta por Redes
          </Typography>
          <Typography variant="h5" gutterBottom>
            Nº {socialNext || []}
          </Typography>
        </Grid>

        <Grid item xs={12} md={5}>

          <Autocomplete
            value={selClient || []}
            id="combo-box-demo"
            options={clientList || []}
            renderInput={(params) => <TextField {...params} label="Cliente" />}
            onChange={handleInputChangeClient}
          />
        </Grid>


        <Grid item xs={12} md={1.4}>
          <Button
            variant="contained"
            color="primary"
            style={{ background: "#1A5276" }}
            sx={{ width: 15 }}
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => {
              setOpenModalClient(true);
              setNewPerson({
                id: '',
                name: '',
                commercial_name: '',
                document_type: '',
                document_number: '',
                phone_number: '',
                email: '',
                supplier_type: '',
                address: '',
                contact_person: '',
                phone_contact_person: '',
                comment: '',
                name_ref: '',
                document_type_ref: '',
                number_doc_ref: '',
                phone_ref: '',
                agency_ref: ''

              });
            }}

          >

          </Button>

        </Grid>


        <Grid item xs={12} md={2.4}>

          <Autocomplete
            value={selChanel || []}
            id="combo-box-demo"
            options={chanelList || []}
            sx={{ width: 180 }}
            renderInput={(params) => <TextField {...params} label="Canal" />}
            onChange={handleInputChangeChanel}
            style={{ width: "140px" }}
          />
        </Grid>

        <Grid item xs={12} md={2}>

          <Autocomplete
            value={selPlataforma || []}
            id="combo-box-demo"
            options={plataformaList || []}
            sx={{ width: 180 }}
            renderInput={(params) => <TextField {...params} label="Plataforma" />}
            onChange={handleInputChangePlataforma}
          />
        </Grid>

        <Grid item xs={12} md={3}>

          <Autocomplete
            value={selEntrega || []}
            id="combo-box-demo"
            options={entregaList || []}
            sx={{ width: 180 }}
            renderInput={(params) => <TextField {...params} label="Entrega" />}
            onChange={handleInputChangeEntrada}

          />
        </Grid>

        <Grid item xs={12} md={3}>

          <Autocomplete
            value={selPago || []}
            id="combo-box-demo"
            options={pagoList || []}
            sx={{ width: 180 }}
            renderInput={(params) => <TextField {...params} label="Pago" />}
            onChange={handleInputChangePago}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha"
              sx={{ width: 360 }}
              defaultValue={dayjs(new Date())}
              onChange={handleInputDate}
              format="DD/MM/YYYY" />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            sx={{ width: 740 }}
            label="Observacion"
            type="text"
            name="obs"
            value={obs || ''}
            onChange={handleInputChangeObs}
            margin="normal"
          />
        </Grid>


        <Grid item xs={12} md={12}>
          <br />
          <Typography variant="h6" gutterBottom>
            Agregue Productos
          </Typography>
        </Grid>
        <Grid container marginLeft={5} spacing={2} alignItems="center">
          <Grid item xs={12} md={4.5}>
            <Autocomplete
              value={selProd || []}
              clearOnBlur={true}
              id="combo-box-demo"
              options={productoList || []}  // Añade una verificación para asegurarte de que no sea null
              onChange={obtenerProductoPorId}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Productos" />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Cantidad"
              type="number"
              name="quantity"
              value={newPurchaseLine.quantity || []}
              onChange={handleInputChange}
              margin="normal"
              sx={{ width: 150 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" onClick={agregarProducto} style={{ background: "#1A5276" }}>
              Agregar Producto
            </Button>
          </Grid>
        </Grid>
        <br />
        {/* Tabla de productos */}
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>{prod.sku}</TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.price}</TableCell>
                  <TableCell>{prod.quantity}</TableCell>
                  <TableCell>
                    <Button onClick={() => editarProducto(prod.sku)}
                      startIcon={<FontAwesomeIcon icon={faEdit} />}
                    ></Button>
                    <Button onClick={() => eliminarProducto(prod.sku)}
                      startIcon={<FontAwesomeIcon icon={faTrash} />}
                    ></Button>                      </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={isModalOpen} onClose={handleModalClose}>
          {modalContent}
        </Modal>
        <Modal open={openModalClient} onClose={handleModalCloseClient}>
          {modalContentClient}
        </Modal>
        <div style={style.buttonContainer}>
          <Typography variant="h6" gutterBottom>
            Total: {nuevoTotal.toFixed(2)}
          </Typography>

          <Button variant="contained" onClick={enviarOrdenCompra} style={{ background: "#1A5276" }}>
            Enviar
          </Button>
        </div>
      </Grid>

    </Container>
  );
};

const style = {
  Container: {
    position: 'absolute',
    width: '1500px',
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1220px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: "1000",
    overflowY: "auto"
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
    marginRight: '10px',
  },
};


export default ContentSocial;