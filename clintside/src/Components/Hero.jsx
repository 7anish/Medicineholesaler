import React from 'react'
import HeroImg from '../assets/Hero.png'
import { useNavigate } from 'react-router-dom'

function Hero() {
    const navigation = useNavigate();
    const exploreClick = ()=>{
        navigation('/shop')
    }
    return (
        <div>
        <section className='w-full h-fit md:h-[60vh] lg:h-[90vh]     flex flex-col md:flex-row justify-center  gap-6 px-3 md:px-6 lg:px-10'>
            <div className='w-full md:w-[70%] lg:w-[60%] h-full flex flex-col gap-3 md:gap-7  items-start justify-center p-4 pt-8 md:pt-0 md:p-10'>
                <h1 className='xl:text-7xl lg:text-6xl text-3xl font-bold'>Find The Best Product For Your <span className='text-orange-600'>Health Care</span></h1>
                <p className='text-xl lg:text-2xl xl:text-3xl'>Get the best care with our medicinal products in budget of your shop</p>
                <div className='flex bg-blue-800 rounded-md lg:rounded-xl hover:bg-orange-600 transition-all duration-500  w-fit px-10 py-2 lg:py-4 xl:py-3 text-white cursor-pointer' onClick={exploreClick}>
                    <button className='lg:text-xl xl:text-2xl'>Explore</button>
                </div>
            </div>
            <div className='w-full md:w-[30%] lg:w-[40%] relative flex justify-center items-center'>
                {/* <div className='absolute hidden lg:block rounded-home px-60 xl:px-72 py-44 xl:py-56 bg-orange-50 left-0  top-20 z-[-1] '></div> */}
                <img src={HeroImg} className='scale-75 md:scale-110' alt="" />
                {/* <Lottie animationData={HeroAnimation} loop={true} />; */}
            </div>
        </section></div>
    )
}

export default Hero