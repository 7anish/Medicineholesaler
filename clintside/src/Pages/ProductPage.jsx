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
import { useNavigate } from 'react-router-dom';

function ProductPage() {
    const [wishlist , setwishlist] = JSON.parse(localStorage.getItem('wishlistitems')) ?  useState(JSON.parse(localStorage.getItem('wishlistitems'))) : useState([])
    const cookie = new Cookies()
    const userid = cookie.get('lgid')
    const params = useParams()
    const [count, setCount] = useState(1);
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    const [active, setactive] = useState(0)
    const navigate = useNavigate()
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
            localStorage.setItem('wishlistitems' , JSON.stringify([...wishlist , params.id]))
            setwishlist([...wishlist , params.id])
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

    const removefromWishlist = async (e) => {
        e.stopPropagation()
        try {
            const res = await axios.patch(`${Url}/api/v1/admin/removefromwishlist/${userid}`, {
                productid: params.id
            })

            const arr = JSON.parse(localStorage.getItem('wishlistitems')).filter((i)=>{
                return i != params.id
            })  

            setwishlist(arr)

            localStorage.setItem('wishlistitems', JSON.stringify(arr))
            if (res.status == 200) {
                Swal.fire({
                    title: "Item Removed to wishlist",
                    icon: "success"
                }).then(() => {
                    // window.location.href = '/wishlist'
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

    const handlebuynow = ()=>{
        let price = 0

        data.range.map((r) => {
            if (r.min <= count && r.max >= count) {
                price = r.value
            }
        })
        if (data.range[2].max < count) {
            price = data.range[2].value
        }
        const obj = {
            quantity : count,
            productpricee : ((+count)*(+price)).toFixed(2),
            productId : params.id
        }
        sessionStorage.setItem('instantbuy' , JSON.stringify(obj))

        Swal.fire({
            title : "Proceed to check out",
            icon : 'success'
        }).then(()=>{
            navigate('/instantcheckout')
        })
    }

    

    if (error) {
        return (
            <>
                <section className='w-full h-[80vh] py-10 xl:pt-10 xl:py-0 px-4 lg:px-20 items-center justify-center'>
                    <h1 className='text-3xl font-bold font-poppins text-center py-20 text-green-500'>Error in fetching Product !!!</h1>
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
                    border-x-4 border-solid border-green-500 border-t-transparent"></div>
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
                                    <div className='sm:w-8 sm:h-8 w-6 h-6 bg-gray-100 z-20 absolute  text-lg sm:text-2xl rounded-full top-3 right-5  shadow-card-shadow cursor-pointer text-red-600 flex items-center justify-center' onClick={wishlist.includes(data._id) ? (e) => removefromWishlist(e) : (e)=>addtowishlist(e)}>
                                        {
                                            wishlist.includes(data._id) ?
                                                <ion-icon name="heart"></ion-icon>
                                                :
                                                <ion-icon name="heart-outline"></ion-icon>
                                        }
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
                            <h2 className='text-md font-bold cursor-pointer hover:text-blue-500 capitalize'>{data.companyName}</h2>
                            <h1 className='text-3xl lg:text-6xl font-bold capitalize'>{data.name} <span className='text-2xl lg:text-2xl'>{data.size ? `|| ${data.size}` : ""}</span> <span className='text-2xl lg:text-2xl'>{`|| ${data.itemtype}`}</span></h1>
                            <div className='flex flex-col gap-4'>
                                <h2 className='w-full md:w-[60%] text-md capitalize font-semibold'>   <span>{data.composition ? `${data.composition}` : ""}</span></h2>
                                <div className='flex justify-between items-center flex-wrap gap-3'>
                                    <h1 className='text-2xl font-bold'>Our Price : ₹&nbsp;{data.ourPrice} <span className='text-lg font-bold text-red-600'>&nbsp;&nbsp;&nbsp;{((((+data.mrp) - (+data.ourPrice)) / (+data.mrp)) * 100).toFixed(1)}% off</span></h1>
                                    <h1 className='text-lg lg:text-xl font-bold  sm:hidden flex'>MRP : <span className='line-through text-red-600'> ₹&nbsp;{data.mrp}</span></h1>
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
                                <h1 className='text-lg lg:text-xl font-bold  hidden sm:flex'>Mrp : <span className='line-through text-red-600'> ₹&nbsp;{data.mrp}</span></h1>
                                <div className='bg-[#ffffffda] rounded-lg'>
                                    <h1 className='text-lg md:text-xl font-semibold pb-1'>Price Ranges</h1>
                                    <div className='flex flex-col gap-2'>
                                        {
                                            data.range?.map((range) => {
                                                return (<div className='flex justify-between items-center'>
                                                    <h1 className='text-base md:text-lg py-1'>Quantity : {range.min}-{range.max}</h1>
                                                    <h1 className='text-base md:text-lg'>₹&nbsp;{range.value} <span className='font-semibold text-green-600'>{((((+data.mrp) - (+range.value)) / (+data.mrp)) * 100).toFixed(1)}% off</span></h1>
                                                </div>)
                                            })
                                        }
                                        <div className='flex flex-wrap justify-between gap-4'>
                                            <button className='flex items-center justify-center rounded-xl bg-green-600 hover:bg-gray-100 transition-all duration-500 w-full px-6 py-3 text-white hover:text-black gap-3' onClick={() => {
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
                                        <div className='flex flex-wrap justify-between gap-4'>
                                            <button className='flex items-center justify-center rounded-xl bg-[#dba40ee1]    hover:bg-gray-100 transition-all duration-500 w-full px-6 py-3 text-white hover:text-black gap-3' onClick={handlebuynow}>
                                                <ion-icon name="bag-outline" size="large"></ion-icon>
                                                <span className='text-lg lg:text-xl'>Buy Now</span>
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

