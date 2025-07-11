import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

function Toast({ type, text, onClose }) {
  if (!text) return null;
  return (
    <div className={`toast ${type}`} role="alert">
      <span>{text}</span>
      <button className="close-btn" onClick={onClose} aria-label="Cerrar notificación">×</button>
    </div>
  );
}

const isValidEmail = (email) =>
  /^[^\s@]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com)$/.test(email);

const isStrongPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

function Login() {
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState('login');
  const [form, setForm] = useState({
    email: '',
    password: '',
    nameUser: '',
    forgotEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast({ type: '', text: '' }), 4000);
  };

  const showForm = (formName) => {
    setActiveForm(formName);
    setToast({ type: '', text: '' });
    setLoading(false);
    setForm({ email: '', password: '', nameUser: '', forgotEmail: '' });
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!isValidEmail(email)) return showToast('error', 'Correo inválido');
    if (!isStrongPassword(password)) return showToast('error', 'Contraseña insegura');
    if (email.length > 100) return showToast('error', 'Correo demasiado largo');

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast('success', data.message || 'Inicio de sesión exitoso');
        navigate('/Dashboard');
      } else {
        showToast('error', data.message || 'Credenciales incorrectas');
      }
    } catch {
      showToast('error', 'Error de conexión');
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { nameUser, email, password } = form;

    if (!nameUser.trim()) return showToast('error', 'Nombre vacío');
    if (!isValidEmail(email)) return showToast('error', 'Correo inválido');
    if (!isStrongPassword(password)) return showToast('error', 'Contraseña insegura');
    if (email.length > 100) return showToast('error', 'Correo muy largo');
    if (nameUser.length > 50) return showToast('error', 'Nombre muy largo');

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nameUser, correo: email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast('success', 'Registro exitoso');
        showForm('login');
      } else {
        showToast('error', data.message || 'Error en el registro');
      }
    } catch {
      showToast('error', 'Error de conexión');
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const { forgotEmail } = form;

    if (!isValidEmail(forgotEmail)) return showToast('error', 'Correo inválido');
    if (forgotEmail.length > 100) return showToast('error', 'Correo muy largo');

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast('success', data.message || 'Correo enviado');
      } else {
        showToast('error', data.message || 'Error al enviar recuperación');
      }
    } catch {
      showToast('error', 'Error de conexión');
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <Toast type={toast.type} text={toast.text} onClose={() => setToast({ type: '', text: '' })} />

      {/* === LOGIN === */}
      {activeForm === 'login' && (
        <div className="form-container active">
          <form onSubmit={handleLogin}>
            <h1>Iniciar Sesión</h1>

            <div className="input-group left-icon">
              <FaEnvelope className="input-icon left" />
              <input
                type="email"
                placeholder="Correo"
                value={form.email}
                onChange={handleChange('email')}
                required
              />
            </div>

            <div className="input-group">
              {showPassword ? (
                <FaEyeSlash className="input-icon right" onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye className="input-icon right" onClick={() => setShowPassword(true)} />
              )}
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange('password')}
                required
              />
            </div>

            <label><input type="checkbox" /> Recuérdame</label>

            <button type="submit" disabled={loading}>
              {loading ? 'Cargando...' : 'Entrar'}
            </button>

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

      {/* === REGISTRO === */}
      {activeForm === 'register' && (
        <div className="form-container active">
          <form onSubmit={handleRegister}>
            <h2>Registro</h2>

            <div className="input-group left-icon">
              <FaUser className="input-icon left" />
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={form.nameUser}
                onChange={handleChange('nameUser')}
                required
              />
            </div>

            <div className="input-group left-icon">
              <FaEnvelope className="input-icon left" />
              <input
                type="email"
                placeholder="Correo"
                value={form.email}
                onChange={handleChange('email')}
                required
              />
            </div>

            <div className="input-group">
              {showPassword ? (
                <FaEyeSlash className="input-icon right" onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye className="input-icon right" onClick={() => setShowPassword(true)} />
              )}
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange('password')}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Cargando...' : 'Registrarse'}
            </button>

            <p className="text-center">
              ¿Ya tienes cuenta?{' '}
              <button type="button" className="link-button" onClick={() => showForm('login')}>
                Iniciar sesión
              </button>
            </p>
          </form>
        </div>
      )}

      {/* === RECUPERAR CONTRASEÑA === */}
      {activeForm === 'forgot' && (
        <div className="form-container active">
          <form onSubmit={handleForgotPassword}>
            <h2>Recuperar Contraseña</h2>

            <div className="input-group left-icon">
              <FaEnvelope className="input-icon left" />
              <input
                type="email"
                placeholder="Correo"
                value={form.forgotEmail}
                onChange={handleChange('forgotEmail')}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar enlace'}
            </button>

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
