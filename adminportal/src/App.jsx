
import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaPlus, FaEye, FaBox, FaSignInAlt } from 'react-icons/fa';
import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import { NavLink } from 'react-router-dom';
import AddProduct from './Pages/AddProduct';
import ViewProduct from './Pages/ViewProduct';
import EditProduct from './Pages/EditProduct';
import ViewEach from './Pages/ViewEach';
import Orders from './Pages/Orders';


const Dashboard = () => (
  <div className="p-4 absolute top-[8vh] right-0 w-[80vw]">
    <h1 className="text-xl lg:text-3xl font-bold mb-4">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <NavLink to="/view-product" >
      <div className="p-4 h-[200px] flex flex-col justify-center items-center gap-8 rounded-2xl shadow-card-shadow hover:shadow-card-hover duration-300">
        <h2 className="text-4xl font-bold text-black">Total Products</h2>
        <p className='text-3xl text-black font-semibold'>180</p>
      </div>
      </NavLink>
      <NavLink to="/orders" >
      <div className="p-4 h-[200px] flex flex-col justify-center items-center gap-8   rounded-2xl shadow-card-shadow hover:shadow-card-hover duration-300">
        <h2 className="text-4xl font-bold">All Orders</h2>
        <p className='text-3xl'>123</p>
      </div>
      </NavLink>
      <NavLink to="/" >
      <div className="p-4 h-[200px] flex flex-col justify-center items-center gap-8   rounded-2xl shadow-card-shadow hover:shadow-card-hover duration-300">
        <h2 className="text-4xl font-bold">Orders This Month</h2>
        <p className='text-3xl'>70</p>
      </div>
      </NavLink>
    </div>
  </div>
);

// const AddProduct = () => <div className="p-4">Add Product Page</div>;
const LogIn = () => <div className="p-4">Login Page</div>;

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/view-product" element={<ViewProduct />} />
            <Route path="/view/:id" element={<ViewEach />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
