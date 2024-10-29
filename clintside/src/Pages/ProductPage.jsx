import React, { useState } from 'react';
import Syrup from "../assets/syrup.jpg";

function ProductPage() {
    const [count, setCount] = useState(1);
    const toTitleCase = (str) => {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const product = [
        {
            name: toTitleCase('INJECTION'),
            desc: 'A device used to inject medication into the body. Very easy to use and sturdy material. Can be used for multiple purposes.',
            subcategory: toTitleCase('INJECTION'),
            img: 'lotion',
            category: toTitleCase('surgical'),
            price: 15.99,
            range: [
                {
                    '0-20': 15.99,
                    '21-50': 14.99,
                    '>51': 13.99,
                }
            ]
        }
    ];

    return (
        <div className='font-poppins px-4 sm:px-8 md:px-12 lg:px-20'>
            {/* Product Section */}
            <section className='flex flex-col lg:flex-row py-10 gap-6 lg:gap-10 justify-center items-center'>
                <section className='w-full lg:w-1/2'>
                    <img src={Syrup} className='rounded-3xl w-full' alt="Product Image" />
                </section>
                <section className='w-full lg:w-auto'>
                    {
                        product.map((medicine, index) => (
                            <div key={index} className='bg-[#ffffffda] transition-all duration-500 rounded-xl p-4 flex flex-col min-h-[40vh] min-w-full md:min-w-[450px] justify-between gap-3'>
                                <div className='flex gap-2'>
                                    <span className='px-2 py-1 border rounded-lg bg-[#ddeff1] font-medium text-base lg:text-lg'>{medicine.category}</span>
                                    <span className='px-2 py-1 border rounded-lg bg-[#ddeff1] text-base lg:text-lg'>{medicine.subcategory}</span>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <h1 className='text-xl lg:text-2xl font-bold'>{medicine.name}</h1>
                                    <p className='text-base lg:text-lg flex-grow'>{medicine.desc}</p>
                                    <div className='flex justify-between items-center'>
                                        <h1 className='text-xl lg:text-2xl font-bold'>${medicine.price}</h1>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                onClick={() => setCount(count > 1 ? count - 1 : 1)}
                                                className='px-2 py-1 bg-gray-200 rounded'
                                            >
                                                -
                                            </button>
                                            <span className='text-lg lg:text-xl'>{count}</span>
                                            <button
                                                onClick={() => setCount(count + 1)}
                                                className='px-2 py-1 bg-gray-200 rounded'
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        product.map((medicine, index) => (
                                            <div key={index} className='bg-[#ffffffda] rounded-lg'>
                                                <h1 className='text-lg md:text-xl font-semibold'>Price Ranges</h1>
                                                <div className='flex flex-col gap-2'>
                                                    {
                                                        Object.entries(medicine.range[0]).map(([range, price], idx) => (
                                                            <div key={idx} className='flex justify-between items-center'>
                                                                <h1 className='text-base md:text-lg font-semibold'>{range}</h1>
                                                                <h1 className='text-base md:text-lg'>${price}</h1>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <button className='flex items-center justify-center rounded-xl bg-orange-600 hover:bg-gray-100 transition-all duration-500 w-full px-6 py-3 text-white hover:text-black'>
                                        <ion-icon name="cart-outline" size="large"></ion-icon>
                                        <span className='text-lg lg:text-xl'>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </section>
        </div>
    );
}

export default ProductPage;
