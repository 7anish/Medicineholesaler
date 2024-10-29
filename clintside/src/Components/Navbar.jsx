import React, { useEffect, useState } from 'react';
import logo from '../assets/Logo.png'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

function Navbar() {
    const [cookies, setCookie] = useCookies(['name']);
    const [login, setlogin] = useState(true)
    const Links = [
        {
            name: 'Home',
            link: '/'
        },
    ]

    useEffect(() => {
        if (cookies.lgthusr) {
            setlogin(false)
        }
    }, [])



    const { cart } = useSelector((state) => state.cart);
    const Qnt = (item) => {
        let quant = 0;
        for (let index = 0; index < item.length; index++) {
            const element = item[index];
            quant += element.quantity
        }
        return quant;
    };

    const [open, setOpen] = useState(false);
    const linkClass = ({ isActive }) => isActive ? "text-[#2dd1dd] text-xl rounded-md px-3 py-2" : "text-gray-500 text-xl hover:text-[#2dd1dd]  rounded-md px-3 py-2";
    return (
        <nav className='w-full  m-0 pr-6 md:pr-0 py-4 md::py-4 shadow-card-shadow  bg-white font-poppins z-50 sticky top-0'>
            <div className='md:flex justify-between items-center font-poppins px-4 md:px-20'>
                <div className='flex lg:justify-center items-center justify-between '>
                    <NavLink to={'/'}>
                        <div className=' font-bold text-xl lg:text-4xl '>Medical<span className='text-orange-600 text-lg lg:text-3xl'>Wholesale</span> </div>
                    </NavLink>
                    <div onClick={() => setOpen(!open)} className='text-3xl md:hidden flex items-center py-4'>
                        <ion-icon name={open ? 'close' : 'menu-outline'}></ion-icon>
                    </div>
                </div>
                <div className={`flex flex-col md:flex-row lg:w-1/2 w-full md:z-auto bg-white z-10 transition-all duration-300 ease-in sm:justify-end gap-10 sm:gap-10 items-center lg:py-0 py-4 absolute md:static ${open ? 'left-0' : 'left-[-100%]'}`}>
                    {
                        Links.map((link) => (
                            <div key={link.name} className='lg:my-0'>
                                <NavLink to={link.link} className={linkClass}>
                                    {link.name}
                                </NavLink>
                            </div>
                        ))
                    }
                    <NavLink to={'/cart'} className='text-orange-600 hover:text-[#2dd1dd] text-3xl px-5 flex items-center justify-center'>
                        <ion-icon name="cart-outline" size='large' className="font-extrabold "></ion-icon>
                        <span className='text-lg'>{isNaN(Qnt(cart)) ? '0' : `${Qnt(cart)}`}</span>
                        {/* <button className='text-white px-7 py-4 font-semibold'>Cart</button> */}
                    </NavLink>
                    {
                        login ?
                            (
                                <NavLink to={'/login'} className='text-orange-600 flex items-center hover:text-[#2dd1dd] lg:text-2xl px-5'>
                                    {/* <span className='text-lg'>(0)</span> */}
                                    <button className='text-white px-6 py-2 rounded-xl bg-orange-500 font-semibold'>LogIn</button>
                                </NavLink>
                            )
                            : null
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar