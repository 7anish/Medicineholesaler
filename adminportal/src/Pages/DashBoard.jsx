import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Url from '../../Url'
import { Cookies } from 'react-cookie';


const DashBoard = () => {
    const cookie = new Cookies()
    const [data, setdata] = useState([])
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)
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
                setdata(data)
                setloading(false)
            } catch (e) {
                setloading(false)
                seterror(true)
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
            <h1 className="text-xl lg:text-3xl font-bold mb-4">Pending Order Quantity</h1>
            <hr className='h-1 bg-gray-300 my-2' />

            <div className='flex gap-5 flex-wrap md:justify-evenly w-full h-fit p-4 items-start justify-start '>
                <div className="w-full flex flex-wrap gap-4 items-center justify-start overflow-scroll scrollbar">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-500">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Our Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mrp
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Inventory
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
                                            <tr className='odd:bg-white  even:bg-gray-50  border-b'>
                                                <th scope="col" className="px-6 py-3 capitalize">
                                                    {order.name}
                                                </th>
                                                <th scope="col" className="px-6 py-3 capitalize">
                                                    {order.quantity}
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    {order.ourPrice}
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    {order.mrp}
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    {order.inventory}
                                                </th>
                                            </tr>
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


