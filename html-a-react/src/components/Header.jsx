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
    <div className="container-fluid nav-bar p-0">
      <div className="container-lg p-0">
        <nav className="navbar navbar-expand-lg custom-navbar navbar-dark">
          <Link to="/" className="navbar-brand">
           <h1 className="m-0 text-white display-4">
          <span className="highlight-primary">J</span>ob
          <span className="highlight-primary">Q</span>uest
          </h1>
          </Link>

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

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div className="navbar-nav ml-auto py-0">
              <Link to="/" className={`nav-item ${isActive('/')}`}>Inicio</Link>
              <Link to="/services" className={`nav-item ${isActive('/services')}`}>Entrevistas</Link>

              {/* Dropdown Acerca de Nosotros */}
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

              <Link to="/Login" className={`nav-item ${isActive('/contact')}`}>Login</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
