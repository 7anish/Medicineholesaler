import React from 'react'
import Family from '../assets/Family.png'

function DiscountHome() {
    return (
        <div>
        <section className='w-full h-[50vh] sm:h-[40vh] md:h-[30vh]  flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 justify-between p-3 sm:px-10 relative'>
            <div className='w-[100%] sm:w-[60%] h-[100%] flex flex-col gap-1 items-start justify-start md:justify-center py-5'>
                <h1 className='text-3xl md:text-4xl text-white font-poppins font-bold'>Get Huge Discount on Our Products</h1>
                <span className='text-2xl md:text-3xl font-poppins font-bold text-orange-500 '>Keep Your Family Healthy</span>
                <p className='text-lg md:text-xl font-medium text-white font-poppins text-justify'>Get upto 50% discounts on skincare, baby care and medicinal producs. Hurry! up the sales are ending soon!!</p>
            </div>
            <div className='absolute right-16 bottom-0 h-full flex items-end '>
                <img src={Family}  alt="" />
            </div>
        </section></div>
    )
}

export default DiscountHome