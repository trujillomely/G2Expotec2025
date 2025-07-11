import React from 'react';
import { Link } from 'react-router-dom';

// Iconos importados desde src/assets/img/
import simulacionImg from '../assets/img/Sistema.png';
import historialImg from '../assets/img/Historial.png';
import analisisImg from '../assets/img/Analisis.png';
import seguridadImg from '../assets/img/Seguridad.png';
import respaldoImg from '../assets/img/Respaldo.png';

function Servicios() {
  const servicios = [
  {
    titulo: 'Simulaciones Personalizadas',
    descripcion:
      'Entrevistas adaptadas a tu perfil, edad y área laboral. Practica como en la vida real con escenarios que simulan entrevistas reales para prepararte mejor y ganar seguridad.',
    imagen: simulacionImg
  },
  {
    titulo: 'Historial de Entrevistas',
    descripcion:
      'Registra automáticamente tus respuestas, fechas y resultados de entrevistas anteriores. Así puedes revisar tu evolución, detectar patrones y mejorar constantemente.',
    imagen: historialImg
  },
  {
    titulo: 'Análisis de Desempeño',
    descripcion:
      'Obtén reportes visuales detallados sobre tu rendimiento en las entrevistas, incluyendo fortalezas, debilidades, tiempos de respuesta y recomendaciones personalizadas.',
    imagen: analisisImg
  },
  {
    titulo: 'Seguridad de Datos',
    descripcion:
      'Tu información está protegida con cifrado avanzado. Solo tú tienes acceso a tus entrevistas, respuestas y progreso. Nos tomamos muy en serio tu privacidad.',
    imagen: seguridadImg
  },
  {
    titulo: 'Respaldo y Recuperación',
    descripcion:
      'Recupera tu cuenta desde cualquier dispositivo sin perder tus datos ni historial. Tu avance siempre estará seguro, incluso si cambias de equipo o navegador.',
    imagen: respaldoImg
  }
];


  return (
    <div className="py-5 garamond-text" style={{ backgroundColor: '#ffffff', color: '#18323f' }}>
      <div className="container">
        <div className="text-center mb-5">
          <small style={etiquetaEstilo}>Nuestros Servicios</small>
          <h1 className="garamond-bold mt-3">¿Qué te ofrece JobQuest?</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '18px', color: '#444' }}>
            Cada funcionalidad está diseñada para acompañarte profesionalmente en tu preparación.
          </p>
        </div>

        <div className="row justify-content-center">
          {servicios.map((servicio, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div style={tarjetaEstilo}>
                <img
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  style={iconoImagenEstilo}
                />
                <h4 className="garamond-bold mb-2" style={{ color: '#fddd92' }}>{servicio.titulo}</h4>
                <p style={{ color: '#eee' }}>{servicio.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// Estilos personalizados
const etiquetaEstilo = {
  backgroundColor: '#fddd92',
  color: '#18323f',
  padding: '6px 12px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  borderRadius: '20px',
  fontSize: '14px'
};

const tarjetaEstilo = {
  backgroundColor: '#18323f', // fondo azul para las tarjetas
  borderRadius: '15px',
  padding: '30px 25px',
  textAlign: 'center',
  height: '100%',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  border: '1px solid #264d5e'
};

const iconoImagenEstilo = {
  width: '70px',
  height: '70px',
  objectFit: 'contain',
  marginBottom: '15px'
};

export default Servicios;
