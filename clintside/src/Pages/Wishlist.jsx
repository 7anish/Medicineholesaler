import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Url from '../../Url';
import Swal from 'sweetalert2';
import ProductCard from '../Components/ProductCard';
import { useNavigate } from 'react-router-dom';
const Wishlist = () => {
    const navigate = useNavigate()
    const cookie = new Cookies()
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        const fetchdata = async () => {
            setloading(true)
            try {
                if (!cookie.get('lgid')) {
                    seterror(true)
                    navigate('/login')
                    return
                }
                const id = cookie.get('lgid')
                console.log(id)
                const { data } = await axios.get(`${Url}/api/v1/admin/getwishlist/${id}`)
                console.log(data)
                setdata(data);
                setloading(false)
            } catch (e) {
                console.log(e)
                seterror(true)
                setloading(false)
            }
        }
        fetchdata()
    }, [])

    if (data.length == 0) {
        return (
            <>
                <section className='w-full h-[80vh] py-10 xl:pt-10 xl:py-0 px-4 lg:px-20 items-center justify-center'>
                    <div className='flex flex-wrap gap-2 sm:gap-0 py-2 mb-4 justify-between items-center'>
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>WishList Product</h1>
                    </div>
                    <h1 className='text-3xl font-bold font-poppins text-center py-20 text-orange-500'>No WishList Product</h1>
                </section>
            </>
        )
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
                <section className='py-0 xl:pt-10 xl:py-0 px-4 lg:px-20'>
                    <div className='flex flex-wrap gap-2 sm:gap-0 py-2 mb-4 justify-between items-center'>
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>WishList Product</h1>
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
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>Wishlist Products</h1>
                    </div>
                    <div className='flex  flex-wrap  py-4 gap-5 justify-center'>
                        {
                            data.map((item, index) => (
                                <>
                                    <Wishlistcard index={index} id={item._id} name={item.name} actualprice={item.mrp} img={item.productimage} cat={item.category} subcat={item.subcategory} discountprice={item.ourPrice} companyname={item.companyName} size={item.size} heart={"no"} />
                                </>
                            ))
                        }
                    </div>
                </section>
            </div>
    )
}


function Wishlistcard({ id, name, cat, subcat, actualprice, img, index, discountprice, companyname, size, composition, heart, range }) {
    const cookie = new Cookies()
    const userid = cookie.get('lgid')
    const navigate = useNavigate();

    const removefromWishlist = async (e) => {
        e.stopPropagation()
        try {
            const res = await axios.patch(`${Url}/api/v1/admin/removefromwishlist/${userid}`, {
                productid: id
            })
            if (res.status == 200) {
                Swal.fire({
                    title: "Item added to wishlist",
                    icon: "success"
                }).then(() => {
                    window.location.href = '/wishlist'
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

    const imageUrl = img[0] === undefined ? "" : img[0].imageurl
    return (
        <div key={index} className='w-[300px] min-h-[450px] bg-[#ffffffda] shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col justify-around gap-3  py-2 relative' onClick={() => navigate(`/product/${id}`)}>
            <img src={imageUrl} alt="" className='w-full h-60 object-cover rounded-md cursor-pointer border border-black' onClick={() => navigate(`/product/${id}`)} />
            <div className='flex gap-2'>
                <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit capitalize'>{cat.split('-').join(' ')}</span>
                <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] w-fit capitalize'>{subcat.split('-').join(' ')}</span>
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='text-xl font-bold cursor-pointer hover:text-blue-500'>{name}</h1>
                <h2 className='text-md font-bold cursor-pointer hover:text-blue-500'>{companyname} <span>{size ? `|| ${size}` : ""}</span> <span>{composition ? `|| ${composition}` : ""}</span> </h2>
                <div className='flex justify-start flex-col items-start gap-2'>
                    <h1 className='text-2xl font-bold'>₹&nbsp;{discountprice} <span className='text-lg font-bold text-red-600'>{((((+actualprice) - (+discountprice)) / (+actualprice)) * 100).toFixed(1)}% off</span></h1>
                    <h1 className='text-lg font-bold text-red-600 line-through'><span>₹&nbsp;{`${actualprice}`}</span></h1>
                </div>
                <div className='flex flex-row-reverse items-center rounded-xl bg-orange-600 hover:bg-gray-100 transition-all duration-500 w-full px-6 py-2 text-white hover:text-black cursor-pointer' onClick={(e, id) => removefromWishlist(e, id)}>
                    <button className='w-full h-full text-lg'>Remove From Wishlist</button>
                </div>
            </div>
        </div>

    )
}

export default Wishlist
