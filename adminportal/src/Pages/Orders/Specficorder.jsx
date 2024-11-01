import React , {useState , useEffect} from 'react'
import { FaEye } from 'react-icons/fa'
import { FaBookmark } from "react-icons/fa";
import Url from '../../../Url';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Specficorder = () => {
  const params = useParams()
  const [order, setorder] = useState([])
  const [error, seterror] = useState(false)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const {data}= await axios.get(`${Url}/api/v1/med/getorder/${params.id}`)
        console.log(data)
        setorder(data)
      } catch (e) {
        seterror(true)
        console.log(e)
      }
    }
    fetchdata()
  }, [])


  const handleupdate = ()=>{

  }

    if (error) {
      return(
        <div className='p-4 absolute top-[8vh] w-[79vw] right-0'>
        <div className='w-full h-full flex items-center justify-center'>
          <h1>Error in Featching Products</h1>
        </div>
      </div>
      )
  
    }


  return (
    <div className='p-4 absolute top-[8vh] w-full md:w-[79vw] right-0'>
      <h1 className="text-xl lg:text-3xl font-bold mb-4"></h1>
      <div className="flex flex-col w-full h-[80vh] p-4">
        <div className='bg-[#ffffffda] w-full h-fit  shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col md:flex-row  justify-around gap-2 relative mb-10' >
          <div className='md:w-[50%] w-full md:h-full h-fit py-4 flex flex-col gap-4'>
            {/* <h1 className={`absolute -top-1 right-2 text-4xl ${order.OrderStatus === "Pending" ? 'text-yellow-500' : order.OrderStatus === "Delivered" ? 'text-green-600' : 'text-red-700'}`}><FaBookmark /></h1> */}
            <h1 className='font-bold'>Name : <span className='font-normal'>{order.name}</span></h1>
            <h1 className='font-bold'>Email : <span className='font-normal'>{order.email}</span></h1>
            <h1 className='font-bold'>Phone Number : <span className='font-normal'>{order.phoneNumber}</span></h1>
            <h1 className='font-bold text-2xl'>Total : ₹ <span>{order.totalPrice}</span></h1>
          </div>
          <div className='md:w-[50%] w-full md:h-full h-fit py-4 flex flex-col gap-2 items-start'>
            <h1 className='font-bold'>Address :</h1>
            <p>{order.address}</p>
            <h1 className='font-bold'>Pin Code: <span className='font-normal'>{order.pincode}</span></h1>
            <h1 className='font-bold'>City: <span className='font-normal'>{order.city}</span></h1>
            <h1 className='font-bold'>Landmark: <span className='font-normal'>{order.landmark}</span></h1>
          </div>
        </div>
        {
          order?.orders?.map((item) => (
            <div className='w-full h-fit  shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl flex flex-col md:flex-row  justify-around gap-2  mb-7' >
              <div className='w-full md:w-[40%] h-[250px] flex flex-col gap-4 overflow-hidden rounded-md p-2'>
                <img src={item.productId.productimage} alt="" className='w-full h-full object-cover border-[1px] border-black rounded-lg' />
              </div>
              <div className='md:w-[70%] w-full md:h-full h-fit py-4 flex flex-col gap-2 items-start justify-between p-4'>
                <div className='flex flex-col gap-2'>
                  <h1 className='font-bold text-3xl'>{item.productId.name}</h1>
                  <h1 className='text-sm sm:text-xl'>{item.productId.description}</h1>
                  <h1 className='text-lg sm:text-xl'>Price : ₹&nbsp;{item.productId.discountprice}</h1>
                </div>
                <div className=' flex gap-3 sm:gap-10 flex-wrap'>
                  <h1 className='font-bold text-xl'>Qunatity : {item.quantity}</h1>
                  <h1 className='font-bold text-xl'>Total Amount : {item.productpricee}</h1>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Specficorder
