import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const [activeForm, setActiveForm] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const showForm = (formName) => {
    setActiveForm(formName);
    setError('');
    setMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        navigate('/Dashboard');
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) { 
      console.log(error.message)
      setError('Error al conectar con el servidor');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nameUser, correo: email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Registro exitoso');
        showForm('login');
      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || 'Error al enviar recuperación');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="auth-wrapper">
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {/* Login */}
      {activeForm === 'login' && (
        <div className="form-container active">
          <h1>Iniciar Sesión</h1>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label>
              <input type="checkbox" /> Recuérdame
            </label>

            <button type="submit">Entrar</button>
            <p className="text-center">
              <button type="button" className="link-button" onClick={() => showForm('forgot')}>
                ¿Olvidaste tu contraseña?
              </button>
            </p>
            <p className="text-center">
              ¿No tienes cuenta?{' '}
              <button type="button" className="link-button" onClick={() => showForm('register')}>
                Crear cuenta
              </button>
            </p>
          </form>
        </div>
      )}

      {/* Registro */}
      {activeForm === 'register' && (
        <div className="form-container active">
          <h2>Registro</h2>
          <form onSubmit={handleRegister}>
            <label>Nombre de usuario</label>
            <input type="text" value={nameUser} onChange={(e) => setNameUser(e.target.value)} required />

            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit">Registrarse</button>

            <p className="text-center">
              ¿Ya tienes cuenta?{' '}
              <button type="button" className="link-button" onClick={() => showForm('login')}>
                Iniciar sesión
              </button>
            </p>
          </form>
        </div>
      )}

      {/* Recuperar contraseña */}
      {activeForm === 'forgot' && (
        <div className="form-container active">
          <h2>Recuperar Contraseña</h2>
          <form onSubmit={handleForgotPassword}>
            <label>Email</label>
            <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />

            <button type="submit">Enviar enlace</button>

            <p className="text-center">
              <button type="button" className="link-button" onClick={() => showForm('login')}>
                Volver a iniciar sesión
              </button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;