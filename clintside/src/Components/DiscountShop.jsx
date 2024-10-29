import React from 'react'
import Skin from '../assets/skincare.jpeg'


function DiscountShop() {
    return (
        <div>
            <section className='flex justify-between flex-col sm:flex-row pl-0 sm:pl-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                <div className='flex flex-col justify-center sm:w-[60%] w-full sm:px-5 px-10 py-4 sm:py-10'>
                    <h1 className='text-white text-base lg:text-3xl xl:text-4xl font-bold'>Get Huge Discount on Our Products</h1>
                    <span className='text-sm lg:text-2xl xl:text-3xl text-orange-500 font-semibold'>Keep Your Skin Healthy This Winter</span>
                    <p className='text-xs lg:text-lg xl:text-xl text-white'>Get <span className='text-orange-500'>Maximum</span> discounts on skincare, baby care and medicinal producs. Hurry! up the sales are ending soon!!</p>
                </div>
                <div className='sm:w-[40%] hidden sm:flex'>
                    <img src={Skin} className='w-full h-full right-0' alt="" />
                </div>
            </section>
        </div>
    )
}

export default DiscountShop