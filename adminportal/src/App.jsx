import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import AddProduct from './Pages/AddProduct';
import ViewProduct from './Pages/ViewProduct';
import EditProduct from './Pages/EditProduct';
import ViewEach from './Pages/ViewEach';
import DashBoard from './Pages/DashBoard';
import Allorders from './Pages/Orders/Allorders';
import Specficorder from './Pages/Orders/Specficorder';
import Adminlogin from './Pages/Login/Adminlogin';
import Auth from './Pages/Login/Auth';



function App() {
  return (
    <Router>
    <Auth />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/view-product" element={<ViewProduct />} />
            <Route path="/view/:id" element={<ViewEach />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/orders" element={<Allorders />} />
            <Route path="/orders/:id" element={<Specficorder />} />
            <Route path='/login' element={<Adminlogin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
