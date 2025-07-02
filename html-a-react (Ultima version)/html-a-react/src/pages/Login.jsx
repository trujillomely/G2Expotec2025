import React, { useState } from 'react';

function Login() {
  const [activeForm, setActiveForm] = useState('login');

  const showForm = (formName) => {
    setActiveForm(formName);
  };

  return (
    <div className="auth-wrapper">
      {/* Login */}
      {activeForm === 'login' && (
        <div className="form-container active">
          <h1>Iniciar Sesión</h1>
          <form>
            <label htmlFor="email-login">Email</label>
            <input type="email" id="email-login" name="email-login" placeholder="Ingresa tu email" required />

            <label htmlFor="password-login">Contraseña</label>
            <input type="password" id="password-login" name="password-login" placeholder="Ingresa tu contraseña" required />

            <label>
              <input type="checkbox" /> Recuérdame
            </label>

            <p className="text-center">
              <button type="button" className="link-button" onClick={() => showForm('forgot')}>
                ¿Olvidaste tu contraseña?
              </button>
            </p>

            <button type="submit">Entrar</button>
          </form>
          <p className="text-center">
            ¿No tienes cuenta?{' '}
            <button type="button" className="link-button" onClick={() => showForm('register')}>
              Crear cuenta
            </button>
          </p>
        </div>
      )}

      {/* Registro */}
      {activeForm === 'register' && (
        <div className="form-container active">
          <h2>Registro</h2>
          <form>
            <label htmlFor="usuario">Nombre de usuario</label>
            <input type="text" id="usuario" name="usuario" placeholder="Ingresa tu nombre de usuario" required />

            <label htmlFor="email-registro">Email</label>
            <input type="email" id="email-registro" name="email-registro" placeholder="Ingresa tu email" required />

            <label htmlFor="password-registro">Contraseña</label>
            <input type="password" id="password-registro" name="password-registro" placeholder="Crea una contraseña" required />

            <label>
              <input type="checkbox" /> Acepto los términos y condiciones
            </label>

            <button type="submit">Registrarse</button>
          </form>
          <p className="text-center">
            ¿Ya tienes cuenta?{' '}
            <button type="button" className="link-button" onClick={() => showForm('login')}>
              Iniciar sesión
            </button>
          </p>
        </div>
      )}

      {/* Recuperación */}
      {activeForm === 'forgot' && (
        <div className="form-container active">
          <h2>Recuperar Contraseña</h2>
          <form>
            <label htmlFor="email-recuperar">Email</label>
            <input type="email" id="email-recuperar" name="email-recuperar" placeholder="Ingresa tu email" required />
            <button type="submit">Enviar enlace</button>
          </form>
          <p className="text-center">
            <button type="button" className="link-button" onClick={() => showForm('login')}>
              Volver a iniciar sesión
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
