import React from 'react'
import { useState } from 'react';
import Syrup from '../assets/syrup.jpg';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
function ViewEach() {
    const params = useParams()
    const [medicine , setmedicine] =  useState([])
    const [count, setCount] = useState(1);
    const toTitleCase = (str) => {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    useEffect(()=>{
        const fetchdata = async ()=>{
            try{
                const {data} = await axios.get(`http://localhost:8000/api/v1/med/getproduct/${params.id}`)
                setmedicine(data)
                console.log(data)
            }catch(e){
                console.log(e)
            }
        }
        fetchdata()
    },[])

    return (
        <div className='absolute right-0 w-[80vw] top-[8vh]'>
            <div className='font-poppins'>
                {/* Product Section */}
                <section className='flex flex-col md:flex-row py-20 px-4 md:px-20 gap-6 md:gap-10 justify-center items-center'>
                    <section className='w-full md:w-[50%]'>
                        <img src={medicine.productimage} className='rounded-3xl w-full' alt="Product Image" />
                    </section>
                    <section className='w-full md:w-auto'>
                                <div className='bg-[#ffffffda] transition-all duration-500 rounded-xl p-4 flex flex-col min-h-[40vh] min-w-full md:min-w-[450px] justify-center gap-4'>
                                    <div className='flex gap-2'>
                                        <span className='px-2 border rounded-lg bg-[#ddeff1] font-medium text-lg'>{medicine.category}</span>
                                        <span className='px-2 border rounded-lg bg-[#ddeff1] text-lg'>{medicine.subcategory}</span>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <h1 className='text-2xl font-bold'>{medicine.name}</h1>
                                        <p className='text-lg flex-grow'>{medicine.description}</p>
                                        <div className='flex justify-between items-center'>
                                            <h1 className='text-2xl font-bold'>${medicine.actualprice}</h1>
                                        </div>
                                    </div>
                                </div>
                    </section>
                </section>
            </div>
        </div>
    )
}

export default ViewEach