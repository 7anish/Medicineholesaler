import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';

const DashBoard = () => {
    return (
        <div className="p-4 absolute top-[8vh] right-0 w-full md:w-[80vw]">
            <h1 className="text-xl lg:text-3xl font-bold mb-4">Dashboard</h1>
            <div className='flex  flex-wrap justify-center gap-4 md:gap-10'>
                <NavLink to="/orders" >
                    <div className="p-2 w-[300px] h-[150px] flex flex-col justify-center items-center gap-2  rounded-2xl shadow-card-shadow hover:shadow-card-hover duration-300 relative">
                        <h2 className="text-3xl font-bold text-green-600">All Completed</h2>
                        <p className='text-2xl text-green-600 font-medium'>123</p>
                        <FaCheckCircle className='absolute top-3 right-3 text-green-400' size={18} />
                    </div>
                </NavLink>
                <NavLink to="/" >
                    <div className="p-2 w-[300px] h-[150px] flex flex-col justify-center items-center gap-2  rounded-2xl shadow-card-shadow hover:shadow-card-hover duration-300 relative">
                        <h2 className="text-3xl font-bold text-yellow-600">Pending Orders</h2>
                        <p className='text-2xl text-yellow-600 font-medium'>13</p>
                        <FaSpinner className='absolute top-3 right-3 text-yellow-400' size={18} />
                    </div>
                </NavLink>
                <NavLink to="/view-product" >
                    <div className="p-2 w-[300px] h-[150px] flex flex-col justify-center items-center gap-2 rounded-2xl shadow-card-shadow hover:shadow-card-hover duration-300 relative">
                        <h2 className="text-3xl font-bold text-red-600">Cancled Order</h2>
                        <p className='text-2xl font-medium text-red-600'>3</p>
                        <FaTimesCircle className='absolute top-3 right-3 text-red-400' size={18} />
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default DashBoard
