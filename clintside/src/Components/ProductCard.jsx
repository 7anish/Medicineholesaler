import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Url from '../../Url';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addtocart } from '../Store/Room'


function ProductCard({ id, name, cat, subcat, actualprice, img, index, discountprice, companyname, size, composition, heart, range}) {
    const dispach = useDispatch()
    const cookie = new Cookies()
    const userid = cookie.get('lgid')
    const navigate = useNavigate();
    const [count, setCount] = useState(1)
    const [wishlist , setwishlist] = JSON.parse(localStorage.getItem('wishlistitems')) ?  useState(JSON.parse(localStorage.getItem('wishlistitems'))) : useState([])

    
    const addtocartitem = (e) => {
        e.stopPropagation()
        dispach(addtocart(
            {
                id: id,
                img: imageUrl,
                name: name,
                actualprice: actualprice,
                discountprice: discountprice,
                cat: cat,
                subcat: subcat,
                quantity: count,
                range: range,
                size: size,
                companyName: companyname
            }
        ))
    }

    const addtowishlist = async (e) => {
        e.stopPropagation()
        try {
            const res = await axios.patch(`${Url}/api/v1/admin/addtowishlist/${userid}`, {
                productid: id
            })
            localStorage.setItem('wishlistitems' , JSON.stringify([...wishlist , id]))
            setwishlist([...wishlist , id])
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

    const imageUrl = img[0] === undefined ? "" : img[0].imageurl
    return (
        <div key={index} className='w-[165px]   sm:w-[300px]  shadow-smcard sm:shadow-card-shadow sm:hover:shadow-card-hover  min-h-fit sm:min-h-[450px] bg-[#ffffffda]  transition-all duration-500 rounded-xl p-4 flex flex-col justify-around gap-3  py-4 sm:py-2 relative' onClick={() => navigate(`/product/${id}`)}>

            {
                userid ?
                    (
                        <div className='sm:w-8 sm:h-8 w-6 h-6 bg-gray-100 absolute  p-1 text-lg sm:text-2xl rounded-full top-3 right-5  shadow-card-shadow cursor-pointer text-red-600 flex items-center justify-center' onClick={(e) => addtowishlist(e)}>
                            {
                                wishlist.includes(id) ?
                                <ion-icon name="heart"></ion-icon>
                                :
                                <ion-icon name="heart-outline"></ion-icon>
                            }
                        </div>
                    ) :
                    ""
            }

            <div className='flex flex-col gap-4'>
                <img src={imageUrl} alt="" className='sm:w-full  h-20 w-full   sm:h-60 object-cover rounded-md cursor-pointer border border-black' onClick={() => navigate(`/product/${id}`)} />
                <div className='flex flex-col sm:gap-1'>
                    {/* <h2 className='text-[10px] sm:text-sm font-bold cursor-pointer hover:text-blue-500'>{companyname}</h2> */}
                    <h1 className='text-sm sm:text-xl font-bold cursor-pointer hover:text-blue-500 leading-normal whitespace-normal'>{name} <span className='text-[10px] sm:text-sm'>{size ? `|| ${size}` : ""}</span></h1>
                    <h2 className='text-[10px] sm:text-md cursor-pointer hover:text-blue-500'><span>{composition ? `${composition}` : ""}</span></h2>
                    <div className='flex justify-start flex-col items-start sm:gap-2'>
                        <h1 className='text-md sm:text-xl font-bold whitespace-noraml'>Unit Price : ₹&nbsp;{discountprice} <span className='text-[10px] sm:text-lg font-bold text-red-600'>{((((+actualprice) - (+discountprice)) / (+actualprice)) * 100).toFixed(1)}% off</span></h1>
                        <h1 className='text-[12px] font-bold'>Mrp : <span className='text-red-600 line-through'>₹&nbsp;{`${actualprice}`}</span></h1>
                    </div>
                </div>
            </div>
            <div className='flex gap-2 flex-wrap'>
                {
                    range?.map((range) => <p className='text-[10px] sm:text-[12px]  bg-gray-100 p-1 rounded-sm'>{range.min}-{range.max}pc ₹&nbsp;{range.value} <span className='text-[8px] font-semibold'>{((((+actualprice) - (+range.value)) / (+actualprice)) * 100).toFixed(1)}% off</span></p> )
                }
            </div>
            <div className='flex flex-col gap-2  justify-center tems-start '>
                <div className='' >
                    <button
                        onClick={(e) => { e.stopPropagation(); setCount(count > 1 ? count - 1 : 1) }}
                        className='sm:px-2 sm:py-1 px-1 bg-gray-200 border-gray-300 border-[1px]'
                    >
                        -1
                    </button>
                    <span className='sm:px-3 sm:py-1 px-2 border-black border-[1px]'>{count}</span>
                    <button
                        onClick={(e) => { e.stopPropagation(); setCount(count + 1) }}
                        className='sm:px-2 sm:py-1 px-1 bg-gray-200 border-gray-300 border-[1px]'
                    >
                        +1
                    </button>
                </div>
                <div className='flex  items-center  rounded-lg sm:rounded-xl bg-green-600 hover:bg-gray-100 transition-all duration-500  px-3 sm:px-6 py-1 sm:py-2 text-white hover:text-black cursor-pointer' onClick={(e) => {
                    addtocartitem(e)
                }}>
                    <button className='w-full h-full text-[14px] sm:text-lg'>Add to cart</button>
                </div>
            </div>
        </div>

    )
}

export default ProductCard