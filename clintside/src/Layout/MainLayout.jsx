import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function MainLayout() {
  return (
    <div>
        <Navbar/>
        <Outlet />
        <Footer/>
        <ToastContainer autoClose={1500}/>
    </div>
  )
}

export default MainLayout