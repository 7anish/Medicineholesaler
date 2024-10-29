import React from 'react'
import care from '../assets/Care.jpg'


function Care() {
  return (
    <div>
        <section className='sm:px-20 px-4 py-10 sm:py-28 flex flex-wrap gap-4  justify-between items-center'>
        <div className='sm:w-[50%] flex flex-col gap-4 sm:gap-10'>
          <h1 className='text-3xl lg:text-4xl xl:text-6xl font-bold '>The right care for your journey to recovery</h1>
          <p className='text--base lg:text-xl xl:text-2xl'>
            From essential medications to personal care items, we offer the right products for quicker recovery and better well-being. Trust us for quality health care essentials and stay supported on your path to wellness!</p>
        </div>
        <div className='w-full sm:w-[40%]'>
          <img src={care} className='rounded-3xl' alt="" />
        </div>
      </section>
    </div>
  )
}

export default Care