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
            <section className='lg:py-10 xl:pt-20 xl:py-20 lg:px-16' >
                <div className='flex flex-wrap gap-2 px-4 sm:gap-0 py-4 justify-between items-center'>
                    <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>Featured Products</h1>
                    <ViewAllBut path={'/products'} />
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
                        <ViewAllBut path={'/category/allcategory'} />
                    </div>
                    <div className='my-20 flex items-center justify-center'>
                        <div class="w-16 h-16 rounded-full animate-spin 
                    border-x-4 border-solid border-orange-500 border-t-transparent"></div>
                    </div>
                </section>
            </>
            :
            <div>
                <section className='lg:py-10 xl:pt-20 xl:py-20 lg:px-16' >
                    <div className='flex flex-wrap gap-2 px-4 sm:gap-0 py-4 justify-between items-center'>
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>Featured Products</h1>
                        <ViewAllBut path={'/products'} />
                    </div>
                    <div className='flex  flex-wrap  py-4 gap-5 justify-center'>
                        {
                            data.map((item, index) => (
                                <>
                                    <ProductCard index={index} id={item.id} name={item.name} actualprice={item.mrp} img={item.imageurl} cat={item.category} subcat={item.subcategory} discountprice={item.ourPrice} companyname={item.companyName} size={item.size} heart={"yes"}/>
                                </>
                            ))
                        }
                    </div>
                </section>
            </div>
    )
}


const Card = () => {
    return (
        <div key={product.id} className='bg-[#ffffffda] shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl flex flex-col gap-4 sm:w-[300px] w-[290px]  sm:h-[410px] h-[400px] p-3 pb-5'>
            <img src={lotion} alt="" className='w-full cursor-pointer h-[40%] object-cover rounded-md' onClick={productClick} />
            <div className='flex gap-2'>
                <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit'>{product.category}</span>
                <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] w-fit'>{product.subcategory}</span>
            </div>
            <div className='flex flex-col gap-2 xl:gap-4'>
                <h1 className='text-2xl font-bold cursor-pointer hover:text-blue-500' onClick={productClick}>{product.name}</h1>
                <div className='flex justify-between flex-grow items-center'>
                    <h1 className='text-2xl font-bold'>${product.price}</h1>
                </div>
                <div className='w-full h-[30%] p-1 flex rounded-xl  bg-orange-600 hover:bg-gray-100 transition-all duration-500  w-fulltext-white hover:text-black cursor-pointer justify-center items-center py-2 ' onClick={() => dispatch(AddCart(product))}>
                    <div className='h-full flex items-center'>
                        <ion-icon name="cart-outline" className="" size="large"></ion-icon>
                    </div>
                    <button className='w-full h-full text-lg'>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
export default FeaturedProd;
