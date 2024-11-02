import React from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const locatin = useLocation()

    return(
        <div className={`${locatin.pathname == '/login' ? 'md:w-full' : 'md:w-[80vw]'} flex justify-between fixed items-center h-[7.90vh] w-full  z-[10] right-0 p-4 bg-gray-800 text-white`}>
        <Link to="/" className="text-2xl font-bold">
        <div className=' font-bold text-xl lg:text-3xl '>Medical<span className='text-orange-600 text-lg lg:text-3xl'>Wholesale</span> </div>
        </Link>
    </div>
    )
};

export default Navbar