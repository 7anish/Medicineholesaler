import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <>
            <footer className='bg-gradient-to-r from-[#0093E9] to-[#80D0C7] text-white px-5 lg:px-20 py-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center'>
                    <div className='flex flex-col items-start'>
                        <div className='font-bold text-xl lg:text-2xl'>Medical<span className='text-orange-600'>Wholesale</span></div>
                        <p className='text-sm lg:text-lg mt-2'>Your Health, Our Priority</p>
                        <div className='flex gap-4 mt-4'>
                            <NavLink to="https://www.facebook.com">
                                <ion-icon name="logo-facebook" className="text-xl md:text-2xl"></ion-icon>
                            </NavLink>
                            <NavLink to="https://www.instagram.com">
                                <ion-icon name="logo-instagram" className="text-xl md:text-2xl"></ion-icon>
                            </NavLink>
                            <NavLink to="https://www.twitter.com">
                                <ion-icon name="logo-twitter" className="text-xl md:text-2xl"></ion-icon>
                            </NavLink>
                            <NavLink to="https://www.yourwebsite.com">
                                <ion-icon name="globe-outline" className="text-xl md:text-2xl"></ion-icon>
                            </NavLink>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='text-lg lg:text-2xl font-bold'>Company</h2>
                        <NavLink to="/about-us" className='text-sm lg:text-lg mt-2'>About Us</NavLink>
                        <NavLink to="/contact-us" className='text-sm lg:text-lg mt-2'>Contact Us</NavLink>
                        <NavLink to="/privacy-policy" className='text-sm lg:text-lg mt-2'>Privacy Policy</NavLink>
                    </div>
                    <div className='hidden sm:flex flex-col'>
                        <h2 className='text-lg lg:text-2xl font-bold'>Useful Links</h2>
                        <NavLink to="/" className='text-sm lg:text-lg mt-2'>Home</NavLink>
                        <NavLink to="/shop" className='text-sm lg:text-lg mt-2'>Shop</NavLink>
                        <NavLink to="/contacts" className='text-sm lg:text-lg mt-2'>Contacts</NavLink>
                        <NavLink to="/cart" className='text-sm lg:text-lg mt-2'>Cart</NavLink>
                    </div>
                    <div className='sm:flex flex-col hidden'>
                        <h2 className='text-lg lg:text-2xl font-bold'>Newsletter</h2>
                        <p className='text-sm lg:text-lg mt-2'>Subscribe to receive updates on discounts and new products.</p>
                        <form className='flex mt-4'>
                            <input type="email" placeholder="Your Email" className='w-full p-2 rounded-l-lg' />
                            <button type="submit" className='bg-orange-600 px-4 lg:px-6 rounded-r-lg text-white'>Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className='text-center text-xs md:text-sm mt-10'>© 2023 MedicalWholesale. All rights reserved.</div>
            </footer>
        </>
    )
}

export default Footer
