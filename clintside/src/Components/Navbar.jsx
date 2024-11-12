import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Searchbar from './Searchbar';
import axios from 'axios';
import Url from '../../Url';

function Navbar() {
    const [data , setdata] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['name']);
    const [login, setlogin] = useState(true)
    const Links = [
        {
            name: 'Home',
            link: '/'
        },
    ]

    const Quant = useSelector((state) => {
        return state.carteditems.allcartitem
    })

    useEffect(() => {
        if (cookies.lgthusr) {
            setlogin(false)
        }
    }, [])

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await axios.get(`${Url}/api/v1/med/searchlist`)
                setdata(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchdata()
    }, [])

    const handlelogout = () => {
        console.log("hello")
        Swal.fire({
            title: "Do you want Logout",
            showCancelButton: true,
            confirmButtonText: "Logout",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                removeCookie('lgthusr')
                removeCookie('lgid')
                removeCookie('lgrole')
                localStorage.removeItem('information')
                Swal.fire({
                    title: "Logout Sucessfully",
                    icon: 'success'
                });
                window.location.href = "/"
            }
        });
    }

    const [open, setOpen] = useState(false);
    const linkClass = ({ isActive }) => isActive ? "text-green-600 text-lg rounded-md px-3 py-2" : "text-gray-500 text-lg hover:text-green-800  rounded-md px-3 py-2";
    return (
        <nav className='w-full  m-0 pr-6 md:pr-0 sm:py-4 md::py-4   bg-white font-poppins z-50 sticky top-0'>
            <div className='md:flex justify-between items-center font-poppins px-2  md:px-20'>
                <div className='flex lg:justify-center items-center justify-between '>
                    <NavLink to={'/'}>
                        <div className=' font-bold text-xl lg:text-4xl '>Medicine<span className='text-green-600 text-lg lg:text-2xl'>Wholesale</span> </div>
                    </NavLink>
                    <div onClick={() => setOpen(!open)} className='text-3xl md:hidden flex items-center py-4'>
                        <ion-icon name={open ? 'close' : 'menu-outline'}></ion-icon>
                    </div>
                </div>
                <div className={`flex  md:flex-row lg:w-1/2 w-full md:z-auto bg-white z-10 transition-all duration-300 ease-in sm:justify-end gap-10 sm:gap-4 items-center lg:py-0 py-4 absolute md:static ${open ? 'left-0' : 'left-[-100%]'} flex-col`}>
                    
                    {
                        login ?
                            (
                                <>
                                    <NavLink to={'/login'} className='text-green-600 flex items-center hover:text-green-800 lg:text-lg px-5'>
                                        {/* <span className='text-lg'>(0)</span> */}
                                        <button className='text-green-600 hover:text-green-800 rounded-xl' onClick={() => setOpen(!open)}>Login</button>
                                    </NavLink>
                                    <NavLink to={'/cart'} className='text-green-600 hover:text-green-800 text-2xl px-5 flex items-center justify-center' onClick={() => setOpen(!open)}>
                                        <ion-icon name="cart-outline" size='large' className="font-extrabold "></ion-icon>
                                        <span className='text-lg'>{Quant.length}</span>
                                    </NavLink>
                                    <Searchbar data={data} />
                                </>
                            )
                            : (
                                <>
                                    <NavLink to={'/wishlist'} className='text-green-600 flex items-center hover:text-green-800 gap-1 lg:text-lg px-5' onClick={() => setOpen(!open)}>
                                        Wishlist<ion-icon name="heart-outline" className="font-extrabold "></ion-icon>
                                    </NavLink>
                                    <NavLink to={'/orderhistory'} className='text-green-600 flex items-center hover:text-green-800 lg:text-lg px-5 gap-1' onClick={() => setOpen(!open)}>
                                        Order <ion-icon name="logo-dropbox" className="font-extrabold "></ion-icon>
                                    </NavLink>
                                    <NavLink to={'/cart'} className='text-green-600 hover:text-green-800 text-2xl px-5 flex items-center justify-center' onClick={() => setOpen(!open)}>
                                        <ion-icon name="cart-outline" size='large' className="font-extrabold "></ion-icon>
                                        <span className='text-lg'>{Quant.length}</span>
                                    </NavLink>
                                    <div className='text-green-600 flex items-center hover:text-green-800 lg:text-lg px-5 cursor-pointer gap-1' onClick={() => handlelogout()}>
                                        Logout<ion-icon name="log-out-outline" className="font-extrabold "></ion-icon>
                                    </div>
                                    <Searchbar data={data} />
                                </>
                            )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar