import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({id , name , cat , subcat , actualprice , img,index , discountprice}) {
    
    const navigate = useNavigate();
    return (
        <div key={index} className='w-[300px] min-h-[450px] bg-[#ffffffda] shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col justify-around gap-3  py-2'>
            <img src={img} alt="" className='w-full h-60 object-cover rounded-md cursor-pointer' onClick={()=> navigate(`/product/${id}`)}/>
            <div className='flex gap-2'>
                <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit'>{cat}</span>
                <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] w-fit'>{subcat}</span>
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='text-xl font-bold cursor-pointer hover:text-blue-500 ' onClick={()=> navigate(`/product/${id}`)}>{name}</h1>
                <div className='flex justify-start flex-col items-start gap-2'>
                    <h1 className='text-2xl font-bold'>₹&nbsp;{discountprice}</h1>
                    <h1 className='text-lg font-bold text-red-600 line-through'>₹&nbsp;{`${actualprice}`}</h1>
                </div>
                <div className='flex flex-row-reverse items-center rounded-xl bg-orange-600 hover:bg-gray-100 transition-all duration-500 w-full px-6 py-2 text-white hover:text-black cursor-pointer'>
                    <span className=''>
                        {/* <ion-icon name="cart-outline" className="" size="large"></ion-icon> */}
                    </span>
                    <button className='w-full h-full text-lg' onClick={()=> navigate(`/product/${id}`)}>View Product</button>
                </div>
            </div>
        </div>

    )
}

export default ProductCard