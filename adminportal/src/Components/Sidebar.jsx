import React, { useEffect, useState } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { FaClipboardList } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";



import { FaPlus, FaEye, FaBox, FaBars } from 'react-icons/fa';

function Sidebar() {
    const location = useLocation()
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
        <div className={`${location.pathname == '/login' ? 'hidden' : '' } w-[80vw] md:w-[20vw] h-screen  fixed  bg-gray-800 text-white transition-all duration-300 ${open ?  'translate-x-[0%]' : 'translate-x-[-100%] md:translate-x-[0%]' } sm:left-0 z-40`}>
            <div className="h-[8vh] flex items-center px-4 border-b">
                <NavLink to="/" className="text-2xl font-bold hidden sm:block">
                <div className=' font-bold text-xl lg:text-3xl md:flex hidden'>Medicine<span className='text-orange-600 text-lg lg:text-3xl'>Wholesale</span> </div>
                </NavLink>
            </div>
            <div>
                <div className="flex flex-col gap-4 border-b py-4 pl-2 h-fit relative">
                    <div className="ml-auto text-xl block absolute md:hidden left-[100%] top-14 p-2 sm: bg-gray-800 rounded-r-2xl" onClick={() => setOpen(!open)}>
                        {open ? <RxCross2 /> : <FaBars />}
                    </div>
                    <h3 className="text-xl lg:text-2xl">Product Section</h3>
                    <ul className="flex flex-col pl-2">
                        <li className="">
                            <NavLink to="/" className={linkClass} onClick={()=> setOpen(!open)}>
                                <FaClipboardList className="mr-2"  /> Dashboard
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink to="/add-product" className={linkClass} onClick={()=> setOpen(!open)}>
                                <FaPlus className="mr-2" /> Add Product
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink to="/view-product" className={linkClass} onClick={()=> setOpen(!open)}>
                                <FaEye className="mr-2" /> View Product
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4 py-4 pl-4 h-fit">
                    <h3 className="text-xl lg:text-2xl">Orders Section</h3>
                    <ul className="flex flex-col gap-1">
                        <li className="">
                            <NavLink to="/orders" className={linkClass} onClick={()=> setOpen(!open)}>
                                <FaBoxArchive className="mr-2" />Orders
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
