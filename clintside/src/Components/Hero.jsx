import React, { useEffect } from 'react'
import HeroImg from '../assets/Hero.png'
import { useNavigate } from 'react-router-dom'

function Hero() {
    const navigation = useNavigate();
    

    return (
        <div className='w-full h-[90vh] p-5 flex items-center justify-center'>
        <section className='w-full h-full flex flex-col md:flex-row justify-center md:bg-blue-100 rounded-2xl px-2 sm:px-10 gap-5'>
            <div className='w-full md:w-[60%] h-[50%] md:h-full flex flex-col gap-3 md:gap-7  items-start justify-center'>
                <h1 className='xl:text-7xl lg:text-6xl text-4xl font-bold'>Get The Medical Product At <span className='text-orange-600'>Best Price</span></h1>
                <p className='text-md lg:text-xl font-light xl:text-2xl sm:w-[90%]'>Get the best care with our medicinal products in budget of your shop</p>
                {/* <div className='flex bg-blue-800 rounded-md lg:rounded-xl hover:bg-orange-600 transition-all duration-500  w-fit px-10 py-2 lg:py-4 xl:py-3 text-white cursor-pointer' onClick={exploreClick}>
                    <button className='lg:text-xl xl:text-2xl'>Explore</button>
                </div> */}
            </div>
            <div className='w-full md:w-[50%]  h-[50%] md:h-full flex justify-center items-center'>
                <img src={HeroImg} className='' alt="" />
            </div>
        </section>
        </div>
    )
}

export default Hero