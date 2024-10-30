import React from 'react'
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import MainLayout from './Layout/MainLayout';
import HomePage from './Pages/HomePage';
import DoctorPage from './Pages/DoctorPage';
import ShopPage from './Pages/ShopPage';
import Cart from './Pages/Cart';
import ProductPage from './Pages/ProductPage';
import LogInPage from './Pages/LogInPage';
import Scrolltotop from './Components/Scrolltotop'
import Singup from './Pages/Singup'
import Subcatpage from './Components/Subcatpage';

export default function App() {
  return (
    <Router >
    <ToastContainer />
      <Scrolltotop />
      <Navbar/>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/category" element={<Subcatpage />} />
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/products" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/singup" element={<Singup />} />
      </Routes>
      <Footer />
    </Router>
  );
}
