import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Syrup from "../assets/syrup.jpg";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtocart } from '../Store/Room';

function ProductPage() {
    const params = useParams()
    const [count, setCount] = useState(1);
    const [data, setdata] = useState([]);
    const dispach = useDispatch()

    const addtocartitem = (payload) => {
        console.log(payload)
        dispach(addtocart(payload))
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/v1/med/getproduct/${params.id}`)
                console.log(data)
                setdata(data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchdata()
    }, [])


    return (
        <div className='h-fit font-poppins px-4 sm:px-8 md:px-12 lg:px-20 lg:py-20 py-10'>
            {/* Product Section */}
            <section className='flex flex-col lg:flex-row py-10  lg:gap-10 justify-between items-center'>
                <section className='w-full xl:w-[40%]'>
                    <img src={data.productimage} className='rounded-3xl w-full h-full object-cover  border-[1px] border-black' alt="Product Image" />
                </section>
                <section className='w-full xl:w-[60%]'>
                    <div className='bg-[#ffffffda] transition-all duration-500 rounded-xl p-4 flex flex-col min-h-[60vh] min-w-full md:min-w-[450px]  gap-3  justify-evenly'>
                        <h1 className='text-3xl lg:text-6xl font-bold'>{data.name}</h1>
                        <div className='flex gap-2'>
                            <span className='px-2 py-1 border rounded-lg bg-[#ddeff1] font-medium text-base lg:text-lg'>{data.category}</span>
                            <span className='px-2 py-1 border rounded-lg bg-[#ddeff1] text-base lg:text-lg'>{data.subcategory}</span>
                            <span className='px-2 py-1 border rounded-lg bg-[#ecddf1] text-base lg:text-lg'>{data.itemtype}</span>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p className='text-base lg:text-lg flex-grow'>{data.description}</p>
                            <div className='flex justify-between items-center flex-wrap gap-3'>
                                <h2 className='text-xl lg:text-2xl font-bold'>price :₹&nbsp;{data.discountprice}</h2>
                                <div className='flex items-center'>
                                <button
                                        onClick={() => setCount(count > 1 ? count -10: 1)}
                                        className='px-2 py-1 bg-gray-200 border-gray-300 border-[1px]'
                                    >
                                        -10
                                    </button>
                                    <button
                                        onClick={() => setCount(count > 1 ? count - 5 : 1)}
                                        className='px-2 py-1 bg-gray-200 border-gray-300 border-[1px]'
                                    >
                                        -5
                                    </button>
                                    <button
                                        onClick={() => setCount(count > 1 ? count - 1 : 1)}
                                        className='px-2 py-1 bg-gray-200 border-gray-300 border-[1px]'
                                    >
                                        -1
                                    </button>
                                    <span className='py-1 px-3 border-black border-[1px]'>{count}</span>
                                    <button
                                        onClick={() => setCount(count + 1)}
                                        className='px-2 py-1 bg-gray-200 border-gray-300 border-[1px]'
                                    >
                                        +1
                                    </button>
                                    <button
                                        onClick={() => setCount(count + 5)}
                                        className='px-2 py-1 bg-gray-200 border-gray-300 border-[1px]'
                                    >
                                        +5
                                    </button>
                                    <button
                                        onClick={() => setCount(count + 10)}
                                        className='px-2 py-1 bg-gray-200 border-gray-300 border-[1px]'
                                    >
                                        +10
                                    </button>
                                </div>
                            </div>
                            <h1 className='text-lg lg:text-xl font-bold line-through text-red-600'>₹&nbsp;{data.actualprice}</h1>
                            <div className='bg-[#ffffffda] rounded-lg'>
                                <h1 className='text-lg md:text-xl font-semibold pb-1'>Price Ranges</h1>
                                <div className='flex flex-col gap-2'>
                                    {
                                        data.range?.map((range) => {
                                            return (<div className='flex justify-between items-center'>
                                                <h1 className='text-base md:text-lg py-1'>Quantity : {range.min}-{range.max}</h1>
                                                <h1 className='text-base md:text-lg'>₹&nbsp;{range.value}</h1>
                                            </div>)
                                        })
                                    }
                                    <button className='flex items-center justify-center rounded-xl bg-orange-600 hover:bg-gray-100 transition-all duration-500 w-full px-6 py-3 text-white hover:text-black gap-3'  onClick={() => {
                                            addtocartitem({
                                                id: params.id,
                                                img: data.productimage,
                                                name: data.name,
                                                actualprice: data.actualprice,
                                                discountprice: data.discountprice,
                                                cat: data.category,
                                                subcat: data.subcategory,
                                                quantity: count,
                                                range : data.range
                                            })
                                        }}>
                                        <ion-icon name="cart-outline" size="large"></ion-icon>
                                        <span className='text-lg lg:text-xl'>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}

export default ProductPage;
