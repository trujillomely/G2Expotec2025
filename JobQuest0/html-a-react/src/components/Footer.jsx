import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: '#18323f', color: 'white', marginTop: '5rem', paddingTop: '3rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div className="row pt-4 mx-auto">

          {/* Columna 1: Logo y descripción */}
          <div className="col-lg-3 col-md-6 mb-5">
            <h1 className="m-0 mt-n2 text-white display-4">
              <span style={{ color: '#f1a523' }}>J</span>ob
              <span style={{ color: '#f1a523' }}>Q</span>uest
            </h1>
            <p>JobQuest es un simulador interactivo que te prepara para entrevistas reales mediante práctica guiada y retroalimentación personalizada.</p>
            <div className="d-flex justify-content-start mt-4">
              <a className="btn btn-outline-primary rounded-circle text-center px-0" style={{ width: '38px', height: '38px' }} href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación rápida */}
          <div className="col-lg-3 col-md-6 mb-5">
            <h5 className="font-weight-bold text-white mb-4">Navegación Rápida</h5>
            <div className="d-flex flex-column justify-content-start">
              <Link className="text-white mb-2" to="/">
                <i className="fa fa-angle-right text-primary mr-2"></i>Inicio
              </Link>
              <Link className="text-white mb-2" to="/conocenos">
                <i className="fa fa-angle-right text-primary mr-2"></i>Sobre Nosotros
              </Link>
              <Link className="text-white mb-2" to="/mision">
                <i className="fa fa-angle-right text-primary mr-2"></i>Misión y Visión
              </Link>
              <Link className="text-white" to="/valores">
                <i className="fa fa-angle-right text-primary mr-2"></i>Valores
              </Link>
            </div>
          </div>

          {/* Columna 3: Recursos útiles */}
          <div className="col-lg-3 col-md-6 mb-5">
            <h5 className="font-weight-bold text-white mb-4">Recursos Útiles</h5>
            <div className="d-flex flex-column justify-content-start">
              <Link className="text-white mb-2" to="/consejos">
                <i className="fa fa-angle-right text-primary mr-2"></i>Consejos de Entrevista
              </Link>
              <Link className="text-white mb-2" to="/guia">
                <i className="fa fa-angle-right text-primary mr-2"></i>Guía de Uso
              </Link>
              <Link className="text-white mb-2" to="/faq">
                <i className="fa fa-angle-right text-primary mr-2"></i>Preguntas Frecuentes
              </Link>
              <Link className="text-white mb-2" to="/servicios">
                <i className="fa fa-angle-right text-primary mr-2"></i>Servicios
              </Link>
              <Link className="text-white" to="/terminos">
                <i className="fa fa-angle-right text-primary mr-2"></i>Términos y Condiciones
              </Link>
            </div>
          </div>

          {/* Columna 4: Contacto */}
          <div className="col-lg-3 col-md-6 mb-5">
            <h5 className="font-weight-bold text-white mb-4">Contáctanos</h5>
            <p>¿Tienes dudas o sugerencias? Estamos aquí para ayudarte a avanzar profesionalmente.</p>
            <p><i className="fa fa-map-marker-alt text-primary mr-2"></i>San Juan Sacatepéquez, Guatemala</p>
            <p><i className="fa fa-phone-alt text-primary mr-2"></i>+502 4281 0719</p>
            <p><i className="fa fa-envelope text-primary mr-2"></i>informacion@jobquest.gt</p>
          </div>
        </div>
      </div>

      {/* Pie final */}
      <div className="container-fluid py-4 px-sm-3 px-md-5" style={{ backgroundColor: '#18323f', color: 'white' }}>
        <p className="m-0 text-center">&copy; <span className="font-weight-semi-bold">JobQuest</span>. ExpoTec 2025 &mdash; Instituto Emiliani Somascos.</p>
      </div>
    </>
  );
}

export default Footer;
