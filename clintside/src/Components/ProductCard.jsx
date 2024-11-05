import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Url from '../../Url';
import Swal from 'sweetalert2';

function ProductCard({ id, name, cat, subcat, actualprice, img, index, discountprice, companyname, size, composition, heart }) {
    const cookie = new Cookies()
    const userid = cookie.get('lgid')
    const navigate = useNavigate();
    const addtowishlist = async (e) => {
        e.stopPropagation()
        try {
            const res = await axios.patch(`${Url}/api/v1/admin/addtowishlist/${userid}`, {
                productid: id
            })
            if (res.status == 200) {
                Swal.fire({
                    title: "Item added to wishlist",
                    icon: "success"
                })
                return
            } else {
                Swal.fire({
                    title: "Somthing Went wrong",
                    icon: "error"
                })
                return
            }
        } catch (e) {
            console.log(e)
            Swal.fire({
                title: "Somthing Went wrong",
                icon: "error"
            })
            return
        }
    }


    const removefromWishlist = async (e) => {
        e.stopPropagation()
        try{
            const res = await axios.patch(`${Url}/api/v1/admin/removefromwishlist/${userid}` , {
                productid : id
            })
            if (res.status == 200) {
                Swal.fire({
                    title: "Item added to wishlist",
                    icon: "success"
                }).then(()=>{
                    window.location.href = '/wishlist'
                })
                return
            } else {
                Swal.fire({
                    title: "Somthing Went wrong",
                    icon: "error"
                })
                return
            }
        }catch(e){
            console.log(e)
            Swal.fire({
                title: "Somthing Went wrong",
                icon: "error"
            })
            return
        }
    }

    const imageUrl = img[0] === undefined ? "" : img[0].imageurl
    return (
        <div key={index} className='w-[300px] min-h-[450px] bg-[#ffffffda] shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col justify-around gap-3  py-2 relative' onClick={() => navigate(`/product/${id}`)}>
            {
                userid ?
                    heart === "yes" ?
                        (
                            <div className='w-8 h-8 bg-gray-100 absolute  p-1 text-2xl rounded-full top-3 right-5  shadow-card-shadow cursor-pointer text-red-600' onClick={(e) => addtowishlist(e)}>
                                <ion-icon name="heart-outline"></ion-icon>
                            </div>
                        ) :
                        ""
                    :
                    ""
            }
            <img src={imageUrl} alt="" className='w-full h-60 object-cover rounded-md cursor-pointer border border-black' onClick={() => navigate(`/product/${id}`)} />
            <div className='flex gap-2'>
                <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit capitalize'>{cat.split('-').join(' ')}</span>
                <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] w-fit capitalize'>{subcat.split('-').join(' ')}</span>
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='text-xl font-bold cursor-pointer hover:text-blue-500'>{name}</h1>
                <h2 className='text-md font-bold cursor-pointer hover:text-blue-500'>{companyname} <span>{size ? `|| ${size}` : ""}</span> <span>{composition ? `|| ${composition}` : ""}</span> </h2>
                <div className='flex justify-start flex-col items-start gap-2'>
                    <h1 className='text-2xl font-bold'>₹&nbsp;{discountprice} <span className='text-lg font-bold text-red-600'>{((((+actualprice) - (+discountprice)) / (+actualprice)) * 100).toFixed(1)}% off</span></h1>
                    <h1 className='text-lg font-bold text-red-600 line-through'><span>₹&nbsp;{`${actualprice}`}</span></h1>
                </div>
                {
                    heart == "yes" ? ""
                        :
                        (
                            <div className='flex flex-row-reverse items-center rounded-xl bg-orange-600 hover:bg-gray-100 transition-all duration-500 w-full px-6 py-2 text-white hover:text-black cursor-pointer' onClick={(e , id) => removefromWishlist(e , id)}>
                                <button className='w-full h-full text-lg'>Remove From Wishlist</button>
                            </div>
                        )
                }
            </div>
        </div>

    )
}

export default ProductCard