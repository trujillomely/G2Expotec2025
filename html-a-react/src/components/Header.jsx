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
      <div className="nav-background">
        <nav className="navbar navbar-expand-lg custom-navbar navbar-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <h1 className="m-0 text-white display-4">
                <span className="highlight-primary">J</span>ob
                <span className="highlight-primary">Q</span>uest
              </h1>
            </Link>

            <button
              className={`navbar-toggler ${dropdownOpen ? 'active' : ''}`}
              type="button"
              onClick={() => {
                const collapse = document.getElementById('navbarCollapse');
                collapse.classList.toggle('show');
                setDropdownOpen(false);
              }}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarCollapse"
            >
              <div className="navbar-nav py-0">
                <Link to="/" className={`nav-item nav-link ${isActive('/')}`}>
                  Inicio
                </Link>

                <Link
                  to="/entrevista/fase/0"
                  className={`nav-item nav-link ${isActive('/entrevista/fase/0')}`}
                >
                  Entrevistas
                </Link>

                <Link
                  to="/ver-entrevistas"
                  className={`nav-item nav-link ${isActive('/ver-entrevistas')}`}
                >
                  Ver Entrevistas
                </Link>

                <Link
                  to="/services"
                  className={`nav-item nav-link ${isActive('/services')}`}
                >
                  Servicios
                </Link>

                <div
                  className={`nav-item dropdown ${dropdownOpen ? 'show' : ''}`}
                >
                  <span
                    className={`nav-link dropdown-toggle custom-nav-dropdown-toggle ${
                      dropdownOpen ? 'show' : ''
                    }`}
                    onClick={toggleDropdown}
                    role="button"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    Acerca de Nosotros
                  </span>
                  <div
                    className={`dropdown-menu custom-nav-dropdown-menu ${
                      dropdownOpen ? 'show' : ''
                    }`}
                    onMouseLeave={closeDropdown}
                  >
                    <Link
                      to="/conocenos"
                      className="dropdown-item custom-nav-dropdown-item"
                      onClick={closeDropdown}
                    >
                      Conócenos
                    </Link>
                    <Link
                      to="/equipo"
                      className="dropdown-item custom-nav-dropdown-item"
                      onClick={closeDropdown}
                    >
                      Nuestro Equipo
                    </Link>
                    <Link
                      to="/faq"
                      className="dropdown-item custom-nav-dropdown-item"
                      onClick={closeDropdown}
                    >
                      Preguntas Frecuentes
                    </Link>
                    <Link
                      to="/guia-uso"
                      className="dropdown-item custom-nav-dropdown-item"
                      onClick={closeDropdown}
                    >
                      Guía de Uso
                    </Link>
                  </div>
                </div>

                <Link
                  to="/login"
                  className={`nav-item nav-link ${isActive('/login')}`}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
