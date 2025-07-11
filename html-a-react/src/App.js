import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import ServicesPage from './pages/ServicesPage';
import Login from './pages/Login';
import BlogDetail from './pages/BlogDetail';
import Conocenos from './pages/Conocenos';     
import Equipo from './pages/Equipo';           
import ResetPassword from './pages/ResetPassword';
import Faq from './pages/Faq';
import GuiaUso from './pages/GuiaUso';
import Servicios from './pages/Servicios';
import Entrevistas from './pages/Entrevistas'; 




export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/services" element={<Servicios />} />
        <Route path="/entrevista/fase/:faseId" element={<ServicesPage />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/guia-uso' element={<GuiaUso />} />
        <Route path='/login' element={<Login />} />
        <Route path='/blog' element={<BlogDetail />} />
        <Route path='/reset' element={<ResetPassword />} />
        <Route path='/conocenos' element={<Conocenos />} />
        <Route path='/equipo' element={<Equipo />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/ver-entrevistas" element={<Entrevistas />} />
      </Routes>
      <Footer />
    </>
  );
}