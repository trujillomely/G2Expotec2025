import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <>
      <div className="container-fluid mi-footer mt-5 pt-5 px-sm-3 px-md-5">
        <div className="row pt-5">
          <div className="col-lg-3 col-md-6 mb-5">
            <Link to="/" className="navbar-brand">
              <h1 className="m-0 mt-n2 text-white display-4">
                <span className="text-primary">J</span>ob<span className="text-primary">Q</span>uest
              </h1>
            </Link>
            <p>Sistema de Entrevistas</p>
            <div className="d-flex justify-content-start mt-4">
              <a className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                 style={{ width: '38px', height: '38px' }}
                 href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                 style={{ width: '38px', height: '38px' }}
                 href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                 style={{ width: '38px', height: '38px' }}
                 href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-5">
            <h5 className="font-weight-bold text-primary mb-4">Quick Links</h5>
            <div className="d-flex flex-column justify-content-start">
              <Link className="text-white mb-2" to="/"><i className="fa fa-angle-right text-primary mr-2"></i>Home</Link>
              <Link className="text-white mb-2" to="/about"><i className="fa fa-angle-right text-primary mr-2"></i>About Us</Link>
              <Link className="text-white mb-2" to="/services"><i className="fa fa-angle-right text-primary mr-2"></i>Services</Link>
              <Link className="text-white mb-2" to="/pricing"><i className="fa fa-angle-right text-primary mr-2"></i>Pricing</Link>
              <Link className="text-white" to="/contact"><i className="fa fa-angle-right text-primary mr-2"></i>Contact Us</Link>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-5">
            <h5 className="font-weight-bold text-primary mb-4">Popular Links</h5>
            <div className="d-flex flex-column justify-content-start">
              <Link className="text-white mb-2" to="/"><i className="fa fa-angle-right text-primary mr-2"></i>Home</Link>
              <Link className="text-white mb-2" to="/about"><i className="fa fa-angle-right text-primary mr-2"></i>About Us</Link>
              <Link className="text-white mb-2" to="/services"><i className="fa fa-angle-right text-primary mr-2"></i>Services</Link>
              <Link className="text-white mb-2" to="/pricing"><i className="fa fa-angle-right text-primary mr-2"></i>Pricing</Link>
              <Link className="text-white" to="/contact"><i className="fa fa-angle-right text-primary mr-2"></i>Contact Us</Link>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-5">
            <h5 className="font-weight-bold text-primary mb-4">Get In Touch</h5>
            <p>Dolor clita stet nonumy clita diam vero, et et ipsum diam labore</p>
            <p><i className="fa fa-map-marker-alt text-primary mr-2"></i>123 Street, New York, USA</p>
            <p><i className="fa fa-phone-alt text-primary mr-2"></i>+012 345 67890</p>
            <p><i className="fa fa-envelope text-primary mr-2"></i>info@example.com</p>
          </div>
        </div>
      </div>

      <div className="container-fluid mi-footer py-4 px-sm-3 px-md-5">
        <p className="m-0 text-center">
          &copy; <Link className="font-weight-semi-bold" to="/">Your Site Name</Link>. All Rights Reserved.
          Designed by <a className="font-weight-semi-bold" href="https://htmlcodex.com" target="_blank" rel="noopener noreferrer">HTML Codex</a>
        </p>
      </div>
    </>
  );
}

export default Footer;
