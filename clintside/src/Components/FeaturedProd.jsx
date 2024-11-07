import React, { useState, useEffect } from 'react';
import axios from 'axios';
import lotion from '../assets/lotion.jpg';
import ViewAllBut from './ViewAllBut';
import ProductCard from './ProductCard';
import Url from '../../Url';

function FeaturedProd() {
    const [data, setdata] = useState([])
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    const [btntext, setbtntext] = useState('Load More')

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await axios.get(`${Url}/api/v1/med/getproduct?type=feature`)
                setdata(data);
                console.log(data)
                setloading(false)
            } catch (e) {
                console.log(e)
                seterror(true)
                setloading(false)
            }
        }
        fetchdata()
    }, [])


    if (error) {
        return (
            <section className='lg:py-10 xl:pt-20 xl:py-20 lg:px-16'  >
                <div className='flex flex-wrap gap-2 px-4 sm:gap-0 py-4 justify-between items-center'>
                    <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>Featured Products</h1>
                    {/* <ViewAllBut path={'/products'} /> */}
                </div>
                <h1 className='text-3xl font-bold font-poppins text-center py-20 text-orange-500'>Error in fetching Products!!!</h1>
            </section>
        )
    }

    return (
        loading ?
            <>
                <section className='py-0 xl:pt-10 xl:py-0 px-4 lg:px-20'>
                    <div className='flex flex-wrap gap-2 sm:gap-0 py-2 mb-4 justify-between items-center'>
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>Featured Products</h1>
                        {/* <ViewAllBut path={'/category/allcategory'} /> */}
                    </div>
                    <div className='my-20 flex items-center justify-center'>
                        <div class="w-16 h-16 rounded-full animate-spin 
                    border-x-4 border-solid border-orange-500 border-t-transparent"></div>
                    </div>
                </section>
            </>
            :
            <div>
                <section className='lg:py-5 xl:pt-20 xl:py-5 lg:px-16'>
                    <div className='flex flex-wrap gap-2 px-4 sm:gap-0 py-4 justify-between items-center'>
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>Featured Products</h1>
                        {/* <ViewAllBut path={'/products'} /> */}
                    </div>
                    <div className='flex  flex-wrap  py-4 gap-2 sm:gap-5 justify-center'>
                        {
                            data.map((item, index) => (
                                <>
                                    <ProductCard index={index} id={item.id} name={item.name} actualprice={item.mrp} img={item.imageurl} cat={item.category} subcat={item.subcategory} discountprice={item.ourPrice} companyname={item.companyName} size={item.size} heart={"yes"}  range={item.range} composition={item.composition} />
                                </>
                            ))
                        }
                    </div>
                </section>
            </div>
    )
}

export default FeaturedProd;
