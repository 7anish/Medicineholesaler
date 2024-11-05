import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtocart } from '../Store/Room';
import Url from '../../Url';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Cookies } from 'react-cookie';
import Swal from 'sweetalert2';

function ProductPage() {
    const cookie = new Cookies()
    const userid = cookie.get('lgid')
    const params = useParams()
    const [count, setCount] = useState(1);
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    const [active, setactive] = useState(0)

    const dispach = useDispatch()

    const addtocartitem = (payload) => {
        console.log(payload)
        dispach(addtocart(payload))
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await axios.get(`${Url}/api/v1/med/getproduct/${params.id}`)
                console.log(data)
                setdata(data);
                setloading(false)
            } catch (e) {
                seterror(true)
                setloading(false)
                console.log(e)
            }
        }
        fetchdata()
    }, [])


    const addtowishlist = async (e) => {
        e.stopPropagation()
        try {
            const res = await axios.patch(`${Url}/api/v1/admin/addtowishlist/${userid}`, {
                productid: params.id
            })
            if (res.status == 200) {
                Swal.fire({
                    title: "Item added to wishlist",
                    icon: "success"
                })
                return
            } else {
                Swal.fire({
                    title: "Somthing Went wrong",
                    icon: "error"
                })
                return
            }
        } catch (e) {
            console.log(e)
            Swal.fire({
                title: "Somthing Went wrong",
                icon: "error"
            })
            return
        }
    }

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
        loading ?
            <>
                <section className='w-full h-[80vh]  py-0 xl:pt-10 xl:py-0 px-4 lg:px-20 flex items-center justify-center'>
                    <div className='my-20 flex items-center justify-center'>
                        <div class="w-16 h-16 rounded-full animate-spin 
                    border-x-4 border-solid border-orange-500 border-t-transparent"></div>
                    </div>
                </section>
            </>
            :
            <div className='h-fit font-poppins px-4 sm:px-8 md:px-12 lg:px-20 lg:py-10 py-10'>
                {/* Product Section */}
                <section className='w-[40] flex flex-col lg:flex-row justify-between items-center'>
                    <section className='w-full xl:w-[40%] relative'>
                        {
                            userid ?
                                (
                                    <div className='w-8 h-8 bg-gray-100 absolute  p-1 text-2xl rounded-full top-0 right-0  shadow-card-shadow cursor-pointer z-20' onClick={(e) => addtowishlist(e)}>

                                        <ion-icon name="heart-outline"></ion-icon>
                                    </div>
                                ) :
                                ""
                        }
                        {
                            data.length === 0 ? ""
                                :
                                (

                                    <CustomCarousel data={data} />

                                )
                        }
                    </section>
                    <section className='w-full xl:w-[60%]'>
                        <div className='bg-[#ffffffda] transition-all duration-500 rounded-xl p-4 flex flex-col min-h-[60vh] min-w-full md:min-w-[450px]  gap-3  justify-evenly'>
                            <h2 className='text-md font-bold cursor-pointer hover:text-blue-500'>{data.companyName}</h2>
                            <h1 className='text-3xl lg:text-6xl font-bold'>{data.name}</h1>
                            <div className='flex flex-wrap gap-2 my-3'>
                                <span className='px-2 py-1 border rounded-lg bg-[#ddeff1] font-medium text-base lg:text-lg capitalize'>{data.category.split('-').join(' ')}</span>
                                <span className='px-2 py-1 border rounded-lg bg-[#ddeff1] text-base lg:text-lg capitalize'>{data.subcategory.split('-').join(' ')}</span>
                                <span className='px-2 py-1 border rounded-lg bg-[#ecddf1] text-base lg:text-lg capitalize'>{data.itemtype}</span>
                                <span className='text-orange-600 flex items-center hover:text-[#2dd1dd] lg:text-2xl px-5 cursor-pointer' onClick={addtowishlist}>
                                    {/* <FaRegHeart /> */}
                                </span>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-md font-bold cursor-pointer hover:text-blue-500'><span>{data.size ? `${data.size}` : ""}</span>   <span>{data.composition ? `|| ${data.composition}` : ""}</span></h2>
                                <div className='flex justify-between items-center flex-wrap gap-3'>
                                    <h1 className='text-2xl font-bold'>₹&nbsp;{data.ourPrice} <span className='text-lg font-bold text-red-600'>&nbsp;&nbsp;&nbsp;{((((+data.mrp) - (+data.ourPrice)) / (+data.mrp)) * 100).toFixed(1)}% off</span></h1>
                                    <div className='flex items-center'>
                                        <button
                                            onClick={() => setCount(count > 1 ? count - 10 : 1)}
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
                                <h1 className='text-lg lg:text-xl font-bold line-through text-red-600'>₹&nbsp;{data.mrp}</h1>
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
                                        <div className='flex flex-wrap justify-between gap-4'>
                                            <button className='flex items-center justify-center rounded-xl bg-orange-600 hover:bg-gray-100 transition-all duration-500 w-full px-6 py-3 text-white hover:text-black gap-3' onClick={() => {
                                                addtocartitem({
                                                    id: params.id,
                                                    img: data.productimage[0].imageurl,
                                                    name: data.name,
                                                    actualprice: data.mrp,
                                                    discountprice: data.ourPrice,
                                                    cat: data.category,
                                                    subcat: data.subcategory,
                                                    quantity: count,
                                                    range: data.range,
                                                    size: data.size,
                                                    companyName: data.companyName
                                                })
                                            }}>
                                                <ion-icon name="cart-outline" size="large"></ion-icon>
                                                <span className='text-lg lg:text-xl'>Add to Cart</span>
                                            </button>
                                        </div>
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

