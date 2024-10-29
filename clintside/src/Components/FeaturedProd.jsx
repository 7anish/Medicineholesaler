import React from 'react';
import lotion from '../assets/lotion.jpg';
import ViewAllBut from './ViewAllBut';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AddCart } from "../redux/CartSystem";

const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const products = [
    {
        id: 1,
        name: toTitleCase('INJECTION'),
        desc: 'A device used to inject medication into the body.',
        subcategory: toTitleCase('INJECTION'),
        img: 'lotion',
        category: toTitleCase('surgical'),
        price: 15.99
    },
    {
        id: 2,
        name: toTitleCase('CREAM'),
        desc: 'A topical preparation used for skin care.',
        subcategory: toTitleCase('SKIN CARE'),
        img: 'lotion',
        category: toTitleCase('cosmetic'),
        price: 8.49
    },
    {
        id: 3,
        name: toTitleCase('TABLET'),
        desc: 'A solid dose of medication.',
        subcategory: toTitleCase('SUGAR CARE & BP MACHINE'),
        img: 'lotion',
        category: toTitleCase('medicine'),
        price: 12.99
    },
    {
        id: 4,
        name: toTitleCase('SYRUP'),
        desc: 'A liquid Ayurvedic preparation.',
        subcategory: toTitleCase('OTHER'),
        img: 'lotion',
        category: toTitleCase('ayurvedic'),
        price: 7.25
    },
    {
        id: 5,
        name: toTitleCase('SOAP'),
        desc: 'A substance used for washing and cleansing.',
        subcategory: toTitleCase('SKIN CARE'),
        img: 'lotion',
        category: toTitleCase('cosmetic'),
        price: 3.99
    },
    {
        id: 6,
        name: toTitleCase('CAPSULE '),
        desc: 'A small container with Ayurvedic medicine inside. ',
        subcategory: toTitleCase('OTHER'),
        img: 'lotion',
        category: toTitleCase('ayurvedic'),
        price: 9.49
    },
    {
        id: 7,
        name: toTitleCase('CANNUALA'),
        desc: 'A thin tube inserted into a vein or body cavity to administer medication, drain off fluid, or insert a surgical instrument.',
        subcategory: toTitleCase('OTHER'),
        img: 'lotion',
        category: toTitleCase('surgical'),
        price: 5.99
    },
    {
        id: 8,
        name: toTitleCase('FACE WASH'),
        desc: 'A cleanser used to clean the face.',
        subcategory: toTitleCase('SKIN CARE'),
        img: 'lotion',
        category: toTitleCase('cosmetic'),
        price: 6.50
    }
];

function FeaturedProd() {
    const navigation = useNavigate();
    const productClick = () => {
        navigation(`/product`);
    }
    const viewClick = () => {
        navigation(`/shop`);
    }
    const dispatch = useDispatch();

    
    return (
        <div>
            <section className='lg:py-10 xl:pt-20 xl:py-20 lg:px-16' >
                <div className='flex flex-wrap gap-2 px-4 sm:gap-0 py-4 justify-between items-center'>
                    <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>Featured Products</h1>
                    <ViewAllBut />
                </div>
                <div className='flex  flex-wrap  py-4 gap-5 justify-center'>
                    {
                        products.map((product, index) => (
                            <div key={product.id} className='bg-[#ffffffda] shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl flex flex-col gap-4 sm:w-[300px] w-[290px]  sm:h-[410px] h-[400px] p-3 pb-5 justify-between' >
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
                                    <div className='w-full h-[30%] p-1 flex rounded-xl  bg-orange-600 hover:bg-gray-100 transition-all duration-500  w-fulltext-white hover:text-black cursor-pointer justify-center items-center py-2' onClick={() => dispatch(AddCart(product))}>
                                        <div className='h-full flex items-center'>
                                            <ion-icon name="cart-outline" className="" size="large"></ion-icon>
                                        </div>
                                        <button className='w-full h-full text-lg'>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
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
