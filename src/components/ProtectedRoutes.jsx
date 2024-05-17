import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import IndexTicket from '../views/Ticket/index';
import IndexHooks from '../views/Hooks/index';
import IndexInventory from '../views/Inventory/index';
import IndexDashboard from '../views/Dashboard/index';
import IndexFechasRapidas from '../views/FechasRapidas/index2';
import IndexRegisterMotorizado from '../views/RegisterMotorizado/index';
import IndexDashGeneral from '../views/DashGeneral/index';
import IndexDashVentasIncidencias from '../views/DashVentasIncidencias/index';
import './ProtectedRoutes.css'


const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (!authChecked) {
    return <div className='Cargando1' style={{ color: '#00FF88' }}>
    Cargando<span className='DotAnimation'>.</span>
  </div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<IndexDashGeneral />} />
      <Route path="/ticket" element={<IndexTicket />} />
      <Route path="/hooks" element={<IndexHooks />} />
      <Route path="/inventory" element={<IndexInventory />} />
      <Route path="/dashboard" element={<IndexDashboard />} />
      <Route path="/fechasrapidas" element={<IndexFechasRapidas />} />
      <Route path="/registroMoto" element={<IndexRegisterMotorizado />} />
      <Route path="/dashgeneral" element={<IndexDashGeneral />} />
      <Route path="/dashventasincidencias" element={<IndexDashVentasIncidencias />} />
    </Routes>
  );
};

export default ProtectedRoutes;