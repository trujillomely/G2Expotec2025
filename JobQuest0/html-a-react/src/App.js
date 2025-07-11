import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import ServicesPage from './pages/ServicesPage';
import Login from './pages/Login';
import Conocenos from './pages/Conocenos';
import Equipo from './pages/Equipo';
import EntrevistaFases from './pages/Fases'; // ✅ Importación correcta

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/servicios" element={<EntrevistaFases />} /> {/* ✅ Aquí se sustituyó correctamente */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
