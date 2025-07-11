import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import usePageEffects from '../hook/usePageEffects';
function Home() {
     usePageEffects(); // 🔁 activa scroll y botón
  const teamMembers = [
    {
      name: 'Luis Santiago Orizabal Ortiz',
      role: 'Estudiante, IES',
      image: '/assets/img/JobQuestBlanco.png'
    },
    {
      name: 'William Joel Quintanilla Suárez',
      role: 'Estudiante, IES',
      image: '/assets/img/JobQuestBlanco.png'
    },
    {
      name: 'Cristian Roel Soto Rosil',
      role: 'Estudiante, IES',
      image: '/assets/img/JobQuestBlanco.png'
    },
    {
      name: 'Melany Alejandra Trujillo Sian',
      role: 'Estudiante, IES',
      image: '/assets/img/JobQuestBlanco.png'
    },
    {
      name: 'Maria Jose Vasquez Estrada',
      role: 'Estudiante, IES',
      image: '/assets/img/JobQuestBlanco.png'
    },
    {
      name: 'Dereck Stanley Zarceño Fuentes',
      role: 'Estudiante, IES',
      image: '/assets/img/JobQuestBlanco.png'
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <>
      {/* ...navbar y secciones anteriores omitidas para brevedad... */}

      {/* Carrusel de miembros del equipo con react-slick */}
      <div className="container-fluid pt-6 bg-team">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-6">
              <small className="bg-primary text-white text-uppercase font-weight-bold px-1">Conoce al Equipo</small>
              <h1 className="mt-2 mb-3" style={{ color: 'white' }}>Los estudiantes detrás de esta idea.</h1>
              <h4 className="font-weight-normal text-muted mb-4">
                Este proyecto fue creado por estudiantes del Instituto Emiliani Somascos
                como parte de su proyecto de ExpoTec XXVIII.
              </h4>
              <Link to="/conocenos" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold">Conoce al Equipo</Link>
            </div>
            <div className="col-lg-8 mb-5">
              <Slider {...sliderSettings} className="team-carousel">
                {teamMembers.map((member, idx) => (
                  <div className="team-item text-center px-3" key={idx}>
                    <div className="position-relative">
                      <img className="img-fluid" src={member.image} alt={member.name} style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                    <div className="text-center" style={{ padding: 15, backgroundColor: 'transparent' }}>
                      <h5 className="font-weight-bold" style={{ color: 'white' }}>{member.name}</h5>
                      <span style={{ color: 'white' }}>{member.role}</span>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      {/* ...resto del contenido (footer, etc.)... */}
      <a href="/#" className="btn btn-lg btn-primary back-to-top" style={{ display: 'none' }}>
        <i className="fa fa-angle-up"></i>
      </a>
    </>
  );
}

export default Home;
