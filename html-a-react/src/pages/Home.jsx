import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePageEffects from '../hook/usePageEffects';
import logoAbout from '../assets/img/JobQuestBlanco.png';
import logoAbout1 from '../assets/img/JobQuest.png';

function Home() {
  usePageEffects();

  const miembros = [
    { nombre: "Luis Santiago Orizabal Ortiz", img: logoAbout1 },
    { nombre: "William Joel Quintanilla Suárez", img: logoAbout1 },
    { nombre: "Cristian Roel Soto Rosil", img: logoAbout1 },
    { nombre: "Melany Alejandra Trujillo Sian", img: logoAbout1 },
    { nombre: "Maria Jose Vasquez Estrada", img: logoAbout1 },
    { nombre: "Dereck Stanley Zarceño Fuentes", img: logoAbout1 },
  ];

  const mensajes = [
    {
      titulo: 'Sistema de Entrevistas',
      mensaje: 'Prepárate, presenta y triunfa',
      boton: 'Realiza tu Entrevista',
      link: '/entrevista'
    },
    {
      titulo: 'Sistema de Entrevistas',
      mensaje: 'Más Que Preguntas, Conexiones',
      boton: 'Realiza tu Entrevista',
      link: '/entrevista'
    },
    {
      titulo: 'Sistema de Entrevistas',
      mensaje: 'Descubre. Pregunta. Conecta.',
      boton: 'Realiza tu Entrevista',
      link: '/entrevista'
    }
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [mensajeIndex, setMensajeIndex] = useState(0);

  // Avanzar miembros automáticamente cada 5 segundos
  useEffect(() => {
    const intervaloMiembros = setInterval(() => {
      setStartIndex((prev) =>
        prev + 1 >= miembros.length ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(intervaloMiembros);
  }, [miembros.length]);

  // Avanzar mensajes cada 5 segundos
  useEffect(() => {
    const intervaloMensajes = setInterval(() => {
      setMensajeIndex((prev) => (prev + 1) % mensajes.length);
    }, 5000);
    return () => clearInterval(intervaloMensajes);
  }, []);

  // Ver solo 3 miembros visibles, siempre
  const visibleMiembros =
    startIndex + 3 <= miembros.length
      ? miembros.slice(startIndex, startIndex + 3)
      : [...miembros.slice(startIndex), ...miembros.slice(0, 3 - (miembros.length - startIndex))];

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? miembros.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + 1 >= miembros.length ? 0 : prev + 1
    );
  };

  return (
    <>
      <style>
        {`
          .garamond-text, p, li, span, a, small {
            font-family: 'EB Garamond', serif;
            font-weight: 400;
          }
          h1, h2, h3, h4, h5, h6, .garamond-bold {
            font-family: 'EB Garamond', serif;
            font-weight: 700;
          }
          .btn-jobquest {
            font-family: 'EB Garamond', serif;
            font-weight: 700;
            background-color: #fddd92;
            color: #18323f;
            padding: 12px 24px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }
          .btn-jobquest:hover {
            background-color: #f1a523;
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="text-center py-5 garamond-text" style={{ backgroundColor: '#ffffff', color: '#18323f' }}>
        <div className="container">
          <h1 className="display-3 font-weight-bold garamond-bold">Bienvenido a JobQuest</h1>
          <p className="lead">Tu plataforma para prepararte para entrevistas de trabajo</p>
        </div>
      </div>

      {/* About Section */}
      <div className="py-5 garamond-text" style={{ backgroundColor: '#18323f', color: '#ffffff' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center mb-4 mb-md-0">
              <img src={logoAbout} alt="Logo JobQuest" style={{ width: '250px', height: 'auto' }} />
            </div>
            <div className="col-md-6">
              <h2 className="mb-3 garamond-bold">JobQuest</h2>
              <p>Somos un sistema de reclutamiento dedicado al registro y gestión de entrevistas.</p>
              <Link to="/conocenos" className="btn btn-jobquest">Conócenos</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Simulador Section */}
      <div className="py-5 garamond-text" style={{ backgroundColor: '#fff', color: '#18323f' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <h2 className="mb-3 garamond-bold">Entrena para tu próxima oportunidad</h2>
              <p>Con nuestro simulador de entrevistas, conviertes la práctica en resultados reales.</p>
              <ul className="list-unstyled">
                <li className="mb-2">✔ Prepárate como un profesional.</li>
                <li className="mb-2">✔ Convierte la práctica en resultados.</li>
              </ul>
              <Link to="/entrevista" className="btn btn-jobquest">Realiza tu entrevista</Link>
            </div>
            <div className="col-lg-6">
              <div className="row justify-content-center">
                <div className="col-sm-6 mb-3">
                  <div className="bg-white text-center text-dark rounded p-4 shadow-sm">
                    <h2 className="display-4 garamond-bold">2</h2>
                    <p className="font-weight-bold mb-0 garamond-text">Meses de Desarrollo</p>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="bg-white text-center text-dark rounded p-4 shadow-sm">
                    <h2 className="display-4 garamond-bold">0</h2>
                    <p className="font-weight-bold mb-0 garamond-text">Usuarios Registrados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel Miembros con Flechas + Autoplay */}
      <div className="garamond-text" style={{ backgroundColor: '#18323f', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <small style={etiquetaEstilo}>Conoce al Equipo</small>
            <h1 style={{ color: 'white', marginTop: '10px' }} className="garamond-bold">Los estudiantes detrás de esta idea.</h1>
            <p style={{ color: '#ccc', fontSize: '18px', maxWidth: '600px' }}>
              Proyecto creado por estudiantes del Instituto Emiliani Somascos como parte de ExpoTec XXVIII.
            </p>
            <Link to="/conocenos" className="btn btn-jobquest">Conócenos</Link>
          </div>

          <div style={{ position: 'relative' }}>
            <button onClick={handlePrev} style={flechaEstilo('left')}>❮</button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {visibleMiembros.map((miembro, index) => (
                <div key={index} style={tarjetaMiembroEstilo}>
                  <img src={miembro.img} alt={miembro.nombre} style={imagenMiembroEstilo} />
                  <div style={{ padding: '10px' }}>
                    <h5 style={{ color: 'white', margin: '10px 0 5px', fontWeight: 'bold' }} className="garamond-bold">{miembro.nombre}</h5>
                    <span style={{ color: '#fddd92' }}>Estudiante, IES</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleNext} style={flechaEstilo('right')}>❯</button>
          </div>
        </div>
      </div>

      {/* Carrusel de Mensajes */}
      <div className="garamond-text" style={{ backgroundColor: '#ffffff', color: '#18323f', padding: '80px 20px', textAlign: 'center' }}>
        <h5 style={{ fontSize: '22px', color: '#f1a523' }}>{mensajes[mensajeIndex].titulo}</h5>
        <h1 style={{ fontSize: '48px', marginBottom: '30px' }} className="garamond-bold">{mensajes[mensajeIndex].mensaje}</h1>
        <Link to={mensajes[mensajeIndex].link} className="btn btn-jobquest">{mensajes[mensajeIndex].boton}</Link>
      </div>
    </>
  );
}

const etiquetaEstilo = {
  backgroundColor: '#fddd92',
  color: '#18323f',
  padding: '5px 10px',
  textTransform: 'uppercase',
  fontWeight: 'bold'
};

const tarjetaMiembroEstilo = {
  backgroundColor: '#18323f',
  borderRadius: '10px',
  overflow: 'hidden',
  textAlign: 'center',
  paddingBottom: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
};

const imagenMiembroEstilo = {
  width: '100%',
  height: '200px',
  objectFit: 'contain',
  backgroundColor: '#fff'
};

const flechaEstilo = (lado) => ({
  position: 'absolute',
  top: '40%',
  [lado]: '-40px',
  background: '#fddd92',
  color: '#18323f',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  fontSize: '20px',
  cursor: 'pointer',
  zIndex: 10,
  transition: 'all 0.3s',
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
});

export default Home;