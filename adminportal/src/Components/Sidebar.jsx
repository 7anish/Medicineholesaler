import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { FaClipboardList } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaBoxArchive } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { MdDoNotDisturb } from "react-icons/md";




import { FaPlus, FaEye, FaBox, FaBars } from 'react-icons/fa';

function Sidebar() {
    const linkClass = ({ isActive }) => isActive ? "flex text-lg items-center bg-white text-black p-2 m-3 rounded-2xl" : "flex text-lg items-center text-white bg-gray-800 hover:bg-white hover:text-black p-2 m-3 rounded-2xl";
    const [open, setOpen] = useState(true);

    useEffect(()=>{
        if(window.innerWidth > 768){
            setOpen(true)
        }else{
            setOpen(false)
        }
    },[])

    return (
        <div className={`w-[80vw] md:w-[20vw] h-screen absolute sm:fixed bg-gray-800 text-white transition-all duration-300 ${open ?  'translate-x-[0%]' : 'translate-x-[-100%]' } sm:left-0 z-40`}>
            <div className="h-[8vh] flex items-center px-4 border-b">
                <NavLink to="/" className="text-2xl font-bold hidden sm:block">
                    <h2 className="text-xl lg:text-3xl font-bold">Admin Panel</h2>
                </NavLink>
            </div>
            <div>
                <div className="flex flex-col gap-4 border-b py-4 pl-2 h-fit relative">
                    <div className="ml-auto text-xl block absolute md:hidden left-[100%] top-0 p-1 sm: bg-gray-800 rounded-r-2xl" onClick={() => setOpen(!open)}>
                        {open ? <RxCross2 /> : <FaBars />}
                    </div>
                    <h3 className="text-xl lg:text-2xl">Product Section</h3>
                    <ul className="flex flex-col pl-2">
                        <li className="">
                            <NavLink to="/" className={linkClass}>
                                <FaClipboardList className="mr-2" /> Dashboard
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink to="/add-product" className={linkClass}>
                                <FaPlus className="mr-2" /> Add Product
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
                    <ul className="flex flex-col gap-1">
                        <li className="">
                            <NavLink to="/orders" className={linkClass}>
                                <FaBoxArchive className="mr-2" /> All Orders
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink to={`/delivered`} className={linkClass}>
                                <TbTruckDelivery className="mr-2" /> Delivered Orders
                            </NavLink>
                        </li>
                        
                        <li className="">
                            <NavLink to={`/pending`} className={linkClass}>
                                <IoIosTimer className="mr-2" /> Pending  Orders
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink to={`/cancleorder`} className={linkClass}>
                                <MdDoNotDisturb className="mr-2" /> Cancled Order
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
