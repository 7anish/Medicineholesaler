import React from 'react'
import { useState } from 'react';
import Syrup from '../assets/syrup.jpg';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Url from '../../Url';
function ViewEach() {
    const params = useParams()
    const [data , setdata] =  useState([])
    const [count, setCount] = useState(1);
    const toTitleCase = (str) => {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    useEffect(()=>{
        const fetchdata = async ()=>{
            try{
                const {data} = await axios.get(`${Url}/api/v1/med/getproduct/${params.id}`)
                setdata(data)
                console.log(data)
            }catch(e){
                console.log(e)
            }
        }
        fetchdata()
    },[])

    return (
        <div className='absolute right-0 w-full md:w-[80vw] top-[8vh]'>
            <div className='font-poppins'>
                {/* Product Section */}
                <section className='flex flex-col lg:flex-row p-10  lg:gap-10 justify-between items-center'>
                <section className='w-full xl:w-[40%]'>
                    <img src={data.productimage} className='rounded-3xl w-full h-full object-cover  border-[1px] border-black' alt="Product Image" />
                </section>
                <section className='w-full xl:w-[60%]'>
                    <div className='bg-[#ffffffda] transition-all duration-500 rounded-xl p-4 flex flex-col min-h-[60vh] min-w-full md:min-w-[450px]  gap-3  justify-evenly'>
                        <h1 className='text-3xl lg:text-6xl font-bold capitalize'>{data.name}</h1>
                        <div className='flex gap-2'>
                            <span className='px-2 py-1 border rounded-lg bg-[#ddeff1] font-medium text-base lg:text-lg capitalize'>{data.category}</span>
                            <span className='px-2 py-1 border rounded-lg bg-[#ddeff1] text-base lg:text-lg capitalize'>{data.subcategory}</span>
                            <span className='px-2 py-1 border rounded-lg bg-[#ecddf1] text-base lg:text-lg capitalize'>{data.itemtype}</span>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <p className='text-base lg:text-lg flex-grow'>{data.subdescription}</p>
                            <div className='flex justify-between items-center flex-wrap gap-3'>
                                <h2 className='text-xl lg:text-2xl font-bold capitalize'>price :₹&nbsp;{data.discountprice}</h2>
                                
                            </div>
                            <h1 className='text-lg lg:text-xl font-bold line-through text-red-600'>₹&nbsp;{data.actualprice}</h1>
                            <div className='bg-[#ffffffda] rounded-lg'>
                                <h1 className='text-lg md:text-xl font-semibold pb-1'>Price Ranges</h1>
                                <hr className='my-1 h-1 bg-black'/>
                                <div className='flex flex-col gap-2'>
                                    {
                                        data.range?.map((range) => {
                                            return (<div className='flex justify-between items-center'>
                                                <h1 className='text-base md:text-lg py-1'>Quantity : {range.min}-{range.max}</h1>
                                                <h1 className='text-base md:text-lg'>₹&nbsp;{range.value}</h1>
                                            </div>)
                                        })
                                    }   
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className=' px-14'>
                <h1 className='text-xl lg:text-2xl font-bold capitalize pb-5'>Description</h1>
                <p className='md:text-justify text-left'>{data.description}</p>
            </section>
            </div>
        </div>
    )
}

export default ViewEach