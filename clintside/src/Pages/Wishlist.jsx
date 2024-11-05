import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Url from '../../Url';
import Swal from 'sweetalert2';
import ProductCard from '../Components/ProductCard';
import { useNavigate } from 'react-router-dom';
const Wishlist = () => {
    const navigate = useNavigate()
    const cookie =new Cookies()
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        const fetchdata = async () => {
            setloading(true)
            try {
                if(!cookie.get('lgid')){
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

    if(data.length == 0){
        return(
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
                                    <ProductCard index={index} id={item._id} name={item.name} actualprice={item.mrp} img={item.productimage} cat={item.category} subcat={item.subcategory} discountprice={item.ourPrice} companyname={item.companyName} size={item.size} heart={"no"}/>
                                </>
                            ))
                        }
                    </div>
                </section>
            </div>
  )
}

export default Wishlist
