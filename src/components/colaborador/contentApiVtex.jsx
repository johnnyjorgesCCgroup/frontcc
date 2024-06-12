import React, { useState } from 'react';

export default function ContentApiVtex() {
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleSubmit = async () => {
    const accountName = 'ccgrouppe';
    const environment = 'vtexcommercestable';
    const url = `https://${accountName}.${environment}.com.br/api/oms/pvt/orders/${orderId}/start-handling`;

    const headers = {
      'X-VTEX-API-AppKey': 'vtexappkey-ccgrouppe-FHLXZQ',
      'X-VTEX-API-AppToken': 'TWYJHNZIGUOWMXJKBCXWFNYLULETJIMNWXNVXOUKBNADTOUQLNQXLUXXTHGWKJBXAJTRJSGFIACALIATOLPBIWVLXHNUSDLKEAWHFYVCBSHOKXLHBRSNAYXLXPVBTDDH',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='content-wrapper'>
      <p>Cambio de estados Vtex</p>
      <input 
        type='text' 
        value={orderId} 
        onChange={handleInputChange} 
        placeholder='Ingrese Order ID aquí' 
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}