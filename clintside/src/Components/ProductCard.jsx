import React from 'react'
import syrup from '../assets/syrup.jpg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AddCart } from "../redux/CartSystem";

function ProductCard({id , name , cat , subcat , price , img,}) {
    const [count, setCount] = useState(1);
    const navigation = useNavigate();
    const productClick = () => {
        navigation(`/product`)
    }
    const dispatch = useDispatch();
    return (
        <div  key={id} className='w-[300px] h-[400px] bg-[#ffffffda] shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col justify-around gap-3 cursor-pointer'>
            <img src={img} alt="" className='w-full h-60 object-cover rounded-md cursor-pointer' onClick={productClick} />
            <div className='flex gap-2'>
                <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit'>{cat}</span>
                <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] w-fit'>{subcat}</span>
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold cursor-pointer hover:text-blue-500' onClick={productClick}>{name}</h1>
                <div className='flex justify-between flex-grow items-center'>
                    <h1 className='text-2xl font-bold'>${price}</h1>
                </div>
                <div className='flex items-center rounded-xl bg-orange-600 hover:bg-gray-100 transition-all duration-500 w-full px-6 py-2 text-white hover:text-black cursor-pointer' onClick={() => dispatch(AddCart(medicine))}>
                    <span className=''>
                        <ion-icon name="cart-outline" className="" size="large"></ion-icon>
                    </span>
                    <button className='w-full h-full text-lg'>Add to Cart</button>
                </div>
            </div>
        </div>

    )
}

export default ProductCard