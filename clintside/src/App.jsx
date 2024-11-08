import React, { useEffect } from 'react'
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
import Checkout from './Pages/Checkout';

import { useDispatch } from 'react-redux';
import { initialreducer } from './Store/Room';
import Wishlist from './Pages/Wishlist';
import Orderhistory from './Pages/Orderhistory';
import About from './Pages/About';

export default function App() {
  const dispatch =  useDispatch()
  useEffect(()=>{
    dispatch(initialreducer())
  })
  return (
    <Router >
    <ToastContainer />
      <Scrolltotop />
      <Navbar/>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/category/:id" element={<Subcatpage />} />
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/products" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/singup" element={<Singup />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orderhistory' element={<Orderhistory />} />
        <Route path='/about-us' element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}
