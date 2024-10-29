import React from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <div className="flex justify-between fixed items-center h-[7.90vh] w-[80vw] z-[10] right-0 p-4 bg-gray-800 text-white">
        <Link to="/" className="text-2xl font-bold">
        <div className=' font-bold text-xl lg:text-3xl '>Medical<span className='text-orange-600 text-lg lg:text-3xl'>Wholesale</span> </div>
        </Link>
        <Link to="/login" className="flex items-center">
            <FaSignInAlt className="mr-2" />Logout
        </Link>
    </div>
);

export default Navbar