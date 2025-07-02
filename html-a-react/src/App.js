import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'
import ServicesPage from './pages/ServicesPage'
import Login from './pages/Login'
import BlogDetail from './pages/BlogDetail'

export default function App() {
  return (
    <>
    <Header/>
        <Routes>
          <Route path='/'element = {<Home/>}/>
          <Route path='/About'element = {<About/>}/>
          <Route path='/Contact'element = {<Contact/>}/>
          <Route path='/Services'element = {<ServicesPage/>}/>
          <Route path='/Login'element = {<Login/>}/>
          <Route path='/Blog'element = {<BlogDetail/>}/>
        </Routes>
    <Footer/>  
  </>
  )
}

