import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Url from '../../Url';
import { useNavigate } from 'react-router-dom';
const Orderhistory = () => {
    const navigate = useNavigate()
    const cookie = new Cookies()
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    const [open, setopen] = useState(null)


    useEffect(() => {
        const fetchdata = async () => {
            setloading(true)
            try {
                if (!cookie.get('lgid')) {
                    seterror(true)
                    navigate('/login')
                    return
                }
                const id = cookie.get('lgid')
                const { data } = await axios.get(`${Url}/api/v1/med/getorderhistory?id=${id}`)
                setdata(data);
                setloading(false)
            } catch (e) {
                seterror(true)
                setloading(false)
            }
        }
        fetchdata()
    }, [])

    const getdate = (isodate)=>{
        const date = new Date(isodate)
        return date.toISOString().substring(0, 10);
    } 


    if (error) {
        return (
            <>
                <section className='w-full h-[80vh] py-10 xl:pt-10 xl:py-0 px-4 lg:px-20 items-center justify-center'>
                    <h1 className='text-3xl font-bold font-poppins text-center py-20 text-green-500'>Error in fetching Product !!!</h1>
                </section>
            </>
        )
    }

    if (data.length == 0) {
        return (
            <>
                <section className='w-full h-[80vh] py-10 xl:pt-10 xl:py-0 px-4 lg:px-20 items-center justify-center'>
                    <h1 className='text-3xl font-bold font-poppins text-center py-20 text-green-500'>No order History</h1>
                </section>
            </>
        )
    }

    return (
        loading ?
            <>
                <section className='w-full h-[80vh]  py-0 xl:pt-10 xl:py-0 px-4 lg:px-20 flex items-center justify-center'>
                    <div className='my-20 flex items-center justify-center'>
                        <div class="w-16 h-16 rounded-full animate-spin 
                    border-x-4 border-solid border-green-500 border-t-transparent"></div>
                    </div>
                </section>
            </>
            :
            <section className="py-24 relative">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">Order History</h2>

                    <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
                        <ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
                            <li
                                className="font-bold text-2xl leading-8 cursor-pointer text-green-600 transition-all duration-500 hover:text-green-500">
                                All Order
                            </li>
                        </ul>
                    </div>
                    {
                        data.map((orders, index) => (
                            <div key={index} className="mt-7 border border-gray-300 pt-9">
                                <div className="flex max-md:flex-col items-start sm:items-center justify-between px-3 md:px-11 py-3">
                                    <div className="data">
                                        <p className="font-medium text-sm sm:text-lg leading-8 text-black whitespace-nowrap">Order ID : <span className=' uppercase'>{(orders._id.slice(16))}</span></p>
                                        <p className="font-medium text-sm sm:text-lg leading-8 text-black whitespace-nowrap">Date : <span className=' uppercase'>{getdate(orders.createdAt).split('-').reverse().join('/')}</span></p>
                                    </div>
                                    <div className=" flex flex-row   justify-center gap-10  items-center">
                                        <p className="font-normal text-lg text-gray-500 leading-8  text-left whitespace-nowrap">
                                            Status : <span className={`font-semibold ${orders.OrderStatus === "Pending" ? 'text-yellow-500' : orders.OrderStatus === "Delivered" ? "text-green-600" : "text-red-600"}`}>{orders.OrderStatus}</span></p>
                                        <div className='flex gap-2'>
                                            <p className="font-bold text-md text-blue-600 cursor-pointer hover:underline" onClick={() => setopen(index)}>
                                                View</p>
                                            <p className="font-bold text-md text-red-600 cursor-pointer hover:underline" onClick={() => setopen(null)}>
                                                Close</p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    <div className={`${open === index ? "" : "hidden"} overflow-hidden`}>
                                        <table className={`w-full text-sm text-left rtl:text-right text-gray-500 border capitalize`}>

                                            {
                                                orders.orders.map((order, index) => (
                                                    <tbody>
                                                        <tr className='odd:bg-white  even:bg-gray-50  border-b text-black text-xl'>
                                                            <th colSpan={2} scope="col" className="px-6 py-1">
                                                                {`${index + 1}. ${order.productId.name}`}
                                                            </th>
                                                        </tr>
                                                        <tr className='odd:bg-white  even:bg-gray-50  border-b'>
                                                            <th scope="col" className="px-6 py-1 capitalize">
                                                                Qunatity
                                                            </th>
                                                            <th scope="col" className="px-6 py-1">
                                                                {order.quantity}
                                                            </th>
                                                        </tr>
                                                        <tr className='odd:bg-white  even:bg-gray-50  border-b'>
                                                            <th scope="col" className="px-6 py-1 capitalize">
                                                                size
                                                            </th>
                                                            <th scope="col" className="px-6 py-1">
                                                                {order.productId.size}
                                                            </th>
                                                        </tr>
                                                        <tr className='odd:bg-white  even:bg-gray-50  border-b'>
                                                            <th scope="col" className="px-6 py-1 capitalize">
                                                                MRP
                                                            </th>
                                                            <th scope="col" className="px-6 py-1">
                                                                ₹  {order.productId.mrp}
                                                            </th>
                                                        </tr>
                                                        <tr className='odd:bg-white  even:bg-gray-50  border-b'>
                                                            <th scope="col" className="px-6 py-1 capitalize">
                                                                unit price
                                                            </th>
                                                            <th scope="col" className="px-6 py-1">
                                                                ₹  {order.productId.ourPrice}
                                                            </th>
                                                        </tr>
                                                    </tbody>
                                                ))
                                            }

                                        </table>
                                    </div>
                                }
                                <svg className="mb-3 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                                    fill="none">
                                    <path d="M0 1H1216" stroke="#D1D5DB" />
                                </svg>
                                <div className="p-3 md:px-11 flex items-center justify-end max-sm:flex-col-reverse">

                                    <p className="font-medium text-xl leading-8 text-black max-sm:py-4"> <span className="text-gray-500">Total
                                        Payable
                                        Amount: </span> ₹&nbsp;{orders.totalPrice}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
    )
}

export default Orderhistory


{/* <div className={`${open === index ? "" : "hidden"}`}>
                                                <div key={i} className="flex  max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                                                    <div className="grid grid-cols-4 w-full">
                                                        <div className="col-span-4 sm:col-span-1">
                                                            <img src={product.productId.productimage[0].imageurl} alt="" className="max-sm:mx-auto object-cover border rounded-lg border-black mb-2" />
                                                        </div>
                                                        <div
                                                            className="col-span-4 sm:col-span-3 sm:max-sm:mt-4 pl-0 sm:pl-8 flex  flex-col  justify-evenly items-start">
                                                            <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap capitalize">
                                                                {product.productId.name}
                                                            </h6>

                                                            <div className="flex  items-start  sm:items-center max-sm:flex-col gap-x-10 gap-y-3">
                                                                <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty:
                                                                    {product.quantity}</span>
                                                                <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Total Price : ₹&nbsp;{product.productpricee}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                                                    </div>
                                                </div>
                                                <svg className="sm:my-9 my-3 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                                                    fill="none">
                                                    <path d="M0 1H1216" stroke="#D1D5DB" />
                                                </svg>
                                            </div> */}