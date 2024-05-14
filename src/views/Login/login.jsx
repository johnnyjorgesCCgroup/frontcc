import { useState } from 'react';
import { useAuth } from '../../components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginResponse = await fetch('https://api.cvimport.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error(`Error al iniciar sesión. Status: ${loginResponse.status}`);
      }

      const loginData = await loginResponse.json();
      console.log('Respuesta de la API:', loginData);

      // Verificar si la respuesta de la API indica una autenticación exitosa
      if (loginData.error) {
        setError('Nombre de usuario o contraseña incorrectos');
      } else {
        // Si la autenticación es exitosa, realiza el login

        login();

        // Almacena el token en localStorage
        localStorage.setItem('token', loginData.access_token);
        localStorage.setItem('username', username);

        // Muestra el token en la consola
        console.log('Token almacenado en LocalStorage:', loginData.token);
        console.log('Usuario almacenado en LocalStorage:', username);


        navigate('/');
      }

    } catch (error) {
      // Mostrar el mensaje de error en la pantalla
      setError('Usuario o Contraseña Incorrecta');
      console.error(error);
    }
  };


  const passwordVisibleUpdate = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className= "mainLogin">
      <div className="leftLogin">
        <h1 className='leftLoginH1'>
          Bienvenidos
          <br />CC GROUP SYSTEM
        </h1>
        <img
          src="/logoblanco.png"
          className='leftLoginImage'
          alt="Imagem animada"
        />
      </div>
      <div className='rightLogin'>
        <div className='cardLogin'>
          <h1 className='cardLoginH1'>LOGIN</h1>
          <div className='textField'>
            <label htmlFor="usuario" className='textFieldLabel'>
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='textFieldInput'
            />
          </div>
          <div className='textField'>
            <label htmlFor="senha" className='textFieldLabel'>
              Contraseña
            </label>
            <div style={{ display: 'flex' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='textFieldInput'
              />
              <button type='submit' onClick={passwordVisibleUpdate} id='btnViewContrasena'><i className='fas fa-eye'></i></button>
            </div>
          </div>
          <button onClick={handleLogin} className='btnLogin'>
            ENTRAR
          </button>
          <div className='btnPlus'>
            <Link to="/create" className='btnCadastrarSe'>
              No tienes una cuenta? <span className='spanCadastrarSe'>Regístrate</span>
            </Link>
          </div>
          <br></br>
          {error && <p style={{ color: 'red' }}><i className="fas fa-square-xmark"></i> {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;