import React, { useState , useEffect } from 'react';
import axios from 'axios';
import lotion from '../assets/lotion.jpg';
import ViewAllBut from './ViewAllBut';
import ProductCard from './ProductCard';
import Url from '../../Url';

function FeaturedProd() {
    const [data , setdata] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
          try {
            const { data } = await axios.get(`${Url}/api/v1/med/getproduct`)
            console.log(data)
            setdata(data);
          } catch (e) {
            console.log(e)
          }
        }
        fetchdata()
      }, [])

    
    return (
        <div>
            <section className='lg:py-10 xl:pt-20 xl:py-20 lg:px-16' >
                <div className='flex flex-wrap gap-2 px-4 sm:gap-0 py-4 justify-between items-center'>
                    <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>Featured Products</h1>
                    <ViewAllBut />
                </div>
                <div className='flex  flex-wrap  py-4 gap-5 justify-center'>
                    {
                        data.map((item, index) => (
                            <>
                            <ProductCard index={index} id={item.id} name={item.name} actualprice={item.actualprice} img={item.imageurl} cat={item.category} subcat={item.subcategory} discountprice={item.discountprice} />
                            {/* <ProductCard index={index} id={item.id} name={item.name} actualprice={item.actualprice} img={item.imageurl} cat={item.category} subcat={item.subcategory} discountprice={item.discountprice}/>
                            <ProductCard index={index} id={item.id} name={item.name} actualprice={item.actualprice} img={item.imageurl} cat={item.category} subcat={item.subcategory} discountprice={item.discountprice}/>
                            <ProductCard index={index} id={item.id} name={item.name} actualprice={item.actualprice} img={item.imageurl} cat={item.category} subcat={item.subcategory} discountprice={item.discountprice}/> */}
                            </>
                        ))
                    }
                </div>
            </section >
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
