import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaEye, FaBox, FaBars } from 'react-icons/fa';

function Sidebar() {
    const linkClass = ({ isActive }) => isActive ? "flex text-lg items-center bg-white text-black p-2 m-3 rounded-2xl" : "flex text-lg items-center text-white bg-gray-800 hover:bg-white hover:text-black p-2 m-3 rounded-2xl";
    const [open, setOpen] = useState(false);

    return (
        <div className={`w-[20vw] h-screen absolute sm:fixed bg-gray-800 text-white transition-all duration-300 ${open ? 'left-0' : 'left-[-200%]'} sm:left-0 z-40`}>
            <div className="h-[8vh] flex items-center px-4 border-b">
                <NavLink to="/" className="text-2xl font-bold hidden sm:block">
                    <h2 className="text-xl lg:text-3xl font-bold">Admin Panel</h2>
                </NavLink>
                <div className="ml-auto text-2xl block sm:hidden" onClick={() => setOpen(!open)}>
                    {open ? 'X' : <FaBars />}
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-4 border-b py-4 pl-2 h-fit">
                    <h3 className="text-xl lg:text-2xl">Product Section</h3>
                    <ul className="flex flex-col gap-4 pl-2">
                        <li className="">
                            <NavLink to="/add-product" className={linkClass}>
                                <FaPlus className="mr-2"/> Add Product
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink to="/view-product" className={linkClass}>
                                <FaEye className="mr-2" /> View Product
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4 py-4 pl-4 h-fit">
                    <h3 className="text-xl lg:text-2xl">Orders Section</h3>
                    <ul className="flex flex-col gap-4">
                        <li className="py-2 my-2">
                            <NavLink to="/orders" className={linkClass}>
                                <FaBox className="mr-2" /> Orders
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
