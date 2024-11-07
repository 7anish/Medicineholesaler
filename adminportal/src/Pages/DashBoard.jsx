import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Url from '../../Url'
import { Cookies } from 'react-cookie';


const DashBoard = () => {
    const cookie = new Cookies()
    const navigate = useNavigate()
    const [data, setdata] = useState([])
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)
    const [type, setype] = useState("")

    useEffect(() => {
        const fetchdata = async () => {
            setloading(true)
            try {
                const { data } = await axios.get(`${Url}/api/v1/med/todaysordrs`,
                    {
                        headers: {
                            "Authorization": "Bearer " + cookie.get('lgthusr')
                        }
                    }
                )
                console.log(data)
                setdata(data)
                setloading(false)
            } catch (e) {
                setloading(false)
                seterror(true)
                console.log(e)
            }
        }
        fetchdata()
    }, [])

    if (error) {
        return (
            <div className='absolute top-[8vh] w-full md:w-[79vw] right-0'>
                <div className='w-scre h-screen flex items-center justify-center'>
                    <h1 className='text-2xl font-bold'>Error in Featching Products</h1>
                </div>
            </div>
        )
    }
    return (
        <div className='p-4 absolute top-[8vh] w-full md:w-[79vw] right-0 h-fit'>
            <h1 className="text-xl lg:text-3xl font-bold mb-4">Todays Order</h1>
            <hr className='h-1 bg-gray-300 my-2' />
            
            <div className='flex gap-5 flex-wrap md:justify-evenly w-full h-fit p-4 items-start justify-start '>
                <div className="w-full flex flex-wrap gap-4 items-center md:justify-center  justify-start">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-500">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Order ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Qunatity
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Total Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Inventory
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ?
                                    <>
                                        <tr>
                                            <td colSpan={6}>
                                                <section className='w-full h-[80vh]  py-0 xl:pt-10 xl:py-0 px-4 lg:px-20 flex items-center justify-center '>
                                                    <div className='my-20 flex items-center justify-center'>
                                                        <div className="w-16 h-16 rounded-full animate-spin  border-x-4 border-solid border-gray-500 border-t-transparent"></div>
                                                    </div>
                                                </section>
                                            </td>
                                        </tr>
                                    </>
                                    :
                                    data.length == 0
                                        ?
                                        <>
                                            <tr>
                                                <td colSpan={6}>
                                                    <section className='w-full h-[80vh]  py-0 xl:pt-10 xl:py-0 px-4 lg:px-20 flex items-center justify-center '>
                                                        <div className='my-20 flex items-center justify-center'>
                                                            <h1 className='text-xl font-semibold'>No  Product Ordered Today</h1>
                                                        </div>
                                                    </section>
                                                </td>
                                            </tr>
                                        </>

                                        :
                                        data.map((order) => (
                                            order.orders.map((product) => (
                                                <tr className='odd:bg-white  even:bg-gray-50  border-b'>
                                                    <th scope="col" className="px-6 py-3 capitalize">
                                                        {order._id}
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 capitalize">
                                                        {product.productId.name}
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        {product.quantity}
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        {order.totalPrice}
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        {product.productId.inventory}
                                                    </th>
                                                    <th scope="col" className={`px-6 py-3 ${order.OrderStatus === "Pending" ? 'text-yellow-500' : order.OrderStatus === "Delivered" ? 'text-green-600' : 'text-red-700'}`}>
                                                        {order.OrderStatus}
                                                    </th>
                                                </tr>
                                            ))
                                        ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DashBoard


