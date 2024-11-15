import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Url from '../../Url';
import { Cookies } from 'react-cookie';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ViewEach() {
    const cookie = new Cookies()
    const params = useParams()
    const [data , setdata] =  useState([])
    const [count, setCount] = useState(1);
    const [loading , setloading] = useState(false)
    const [error , seterror] = useState(false)
    const [active , setactive ] = useState(0)

    useEffect(()=>{
        const fetchdata = async ()=>{
            setloading(true)
            try{
                const {data} = await axios.get(`${Url}/api/v1/med/getproduct/${params.id}` , 
                    {
                        headers : {
                            "Authorization": "Bearer " + cookie.get('lgthusr')
                        }
                    }
                )
                setdata(data)
                setloading(false)
            }catch(e){
                seterror(true)
                setloading(false)
            }
        }
        fetchdata()
    },[])

    if (error) {
        return (
            <>
                <section className='w-full h-[80vh] py-10 xl:pt-10 xl:py-0 px-4 lg:px-20 items-center justify-center'>
                    <h1 className='text-3xl font-bold font-poppins text-center py-20 text-orange-500'>Error in fetching Product !!!</h1>
                </section>
            </>
        )
    }

    return (
        <div className='absolute right-0 w-full md:w-[80vw] top-[8vh]'>
            <div className='font-poppins'>
                <section className='flex flex-col lg:flex-row p-10  lg:gap-10 justify-between items-center '>
                <section className='w-full xl:w-[40%] flex flex-col items-center justify-center'>
                {
                    data.length === 0 ? "" 
                    : 
                    (
                        (

<CustomCarousel data={data} />

)
                    )
                }
                </section>
                <section className='w-full xl:w-[60%]'>
                    <div className='bg-[#ffffffda] transition-all duration-500 rounded-xl p-4 py-10 flex flex-col min-h-[60vh] min-w-full md:min-w-[450px]  gap-6  justify-evenly'>
                        <h2 className='text-md font-bold cursor-pointer hover:text-blue-500'>{data.companyName}</h2>
                        <h1 className='text-3xl lg:text-6xl font-bold capitalize'>{data.name}</h1>
                        <div className='flex gap-2 flex-wrap'>
                            <span className='px-2 py-1 border rounded-lg bg-[#ddeff1] font-medium text-base lg:text-lg capitalize'>{data.category}</span>
                            <span className='px-2 py-1 border rounded-lg bg-[#ddeff1] text-base lg:text-lg capitalize'>{data.subcategory}</span>
                            <span className='px-2 py-1 border rounded-lg bg-[#ecddf1] text-base lg:text-lg capitalize'>{data.itemtype}</span>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-md font-bold cursor-pointer hover:text-blue-500'><span>{data.size ? `${data.size}` : ""}</span>   <span>{data.composition ? `|| ${data.composition}` : ""}</span></h2>
                            <div className='flex justify-between items-center flex-wrap gap-3'>
                            <h1 className='text-2xl font-bold'>₹&nbsp;{data.ourPrice} <span className='text-lg font-bold text-red-600'>&nbsp;&nbsp;&nbsp;{((((+data.mrp)-(+data.ourPrice))/(+data.mrp))*100).toFixed(1)}% off</span></h1>
                            </div>
                            <h1 className='text-lg lg:text-xl font-bold line-through text-red-600'>₹&nbsp;{data.mrp}</h1>
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
            </div>
        </div>
    )
}

export default ViewEach

const CustomCarousel = ({ data }) => {
    // Define a custom function for rendering thumbnails
    const renderThumbs = () =>
        data?.productimage?.map((image, index) => (
            <img
                key={index}
                src={image.imageurl}
                alt={`Thumbnail ${index + 1}`}
                className="w-12 h-12 object-cover rounded-sm"
            />
        ));

    return (
        <Carousel
            className='w-full h-full'
            renderThumbs={renderThumbs} // Custom thumbnails
            // infiniteLoop
            // autoPlay
            // interval={3000}
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            showThumbs={true}
            swipeable={true}
        >
            {data?.productimage?.map((image, index) => (
                <div key={index} className=''>
                    <img
                        src={image.imageurl}
                        alt={`Product Image ${index + 1}`}
                        className='rounded-3xl w-full h-[300px] sm:w-[500px] sm:h-[400px] object-contain'
                    />
                </div>
            ))}
        </Carousel>
    );
};