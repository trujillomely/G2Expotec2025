import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <div className="nav-bar">
      {/* Fondo que cubre 100% del ancho */}
      <div className="nav-background">
        <nav className="navbar navbar-expand-lg custom-navbar navbar-dark">
          <div className="container">
            {/* Logo */}
            <Link to="/" className="navbar-brand">
              <h1 className="m-0 text-white display-4">
                <span className="highlight-primary">J</span>ob
                <span className="highlight-primary">Q</span>uest
              </h1>
            </Link>

            {/* Botón hamburguesa móvil */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => {
                document.getElementById('navbarCollapse').classList.toggle('show');
              }}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Enlaces de navegación */}
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarCollapse"
            >
              <div className="navbar-nav py-0">
                <Link to="/" className={`nav-item nav-link ${isActive('/')}`}>Inicio</Link>
                <Link to="/services" className={`nav-item nav-link ${isActive('/services')}`}>Entrevistas</Link>

                {/* Dropdown de "Acerca de Nosotros" */}
                <div className={`nav-item dropdown ${dropdownOpen ? 'show' : ''}`}>
                  <span
                    className={`nav-link dropdown-toggle custom-nav-dropdown-toggle ${dropdownOpen ? 'show' : ''}`}
                    onClick={toggleDropdown}
                    role="button"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    Acerca de Nosotros
                  </span>
                  <div
                    className={`dropdown-menu custom-nav-dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                    onMouseLeave={closeDropdown}
                  >
                    <Link to="/conocenos" className="dropdown-item custom-nav-dropdown-item" onClick={closeDropdown}>
                      Conócenos
                    </Link>
                    <Link to="/equipo" className="dropdown-item custom-nav-dropdown-item" onClick={closeDropdown}>
                      Nuestro Equipo
                    </Link>
                  </div>
                </div>

                <Link to="/Login" className={`nav-item nav-link ${isActive('/Login')}`}>Login</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
