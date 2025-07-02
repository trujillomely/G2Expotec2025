import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <div className="container-fluid nav-bar p-0">
      <div className="container-lg p-0">
        <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
          <Link to="/" className="navbar-brand">
            <h1 className="m-0 text-white display-4">
              <span className="text-primary">D</span>ot<span className="text-primary">C</span>om
            </h1>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div className="navbar-nav ml-auto py-0">
              <Link to="/" className={`nav-item ${isActive('/')}`}>Home</Link>
              <Link to="/about" className={`nav-item ${isActive('/about')}`}>About</Link>
              <Link to="/services" className={`nav-item ${isActive('/services')}`}>Services</Link>
              <Link to="/pricing" className={`nav-item ${isActive('/pricing')}`}>Pricing</Link>

              <div className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={(e) => e.preventDefault()} // evita navegación al hacer clic
                >
                  Pages
                </Link>
                <div className="dropdown-menu border-0 rounded-0 m-0" aria-labelledby="navbarDropdown">
                  <Link to="/blog" className="dropdown-item">Blog Grid</Link>
                  <Link to="/blog-detail" className="dropdown-item">Blog Detail</Link>
                </div>
              </div>

              <Link to="/contact" className={`nav-item ${isActive('/contact')}`}>Contact</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
