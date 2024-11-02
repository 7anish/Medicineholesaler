import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Url from '../../../Url'
import { FaEye } from 'react-icons/fa'
import { FaBookmark } from "react-icons/fa";
import { Cookies } from 'react-cookie';

const Pendingorder = () => {
    const cookie = new Cookies()
    const navigate = useNavigate()
    const [data, setdata] = useState([])
    const [error, seterror] = useState(false)

    useEffect(()=>{
        const fetchdata = async ()=>{
            try{
                const {data} = await axios.get(`${Url}/api/v1/med/getorder?OrderStatus=Pending` ,
                    {
                        headers : {
                            "Authorization": "Bearer " + cookie.get('lgthusr')
                        }
                    }
                )
                console.log(data)
                setdata(data)
            }catch(e){
                seterror(true)
                console.log(e)
            }
        }
        fetchdata()
    },[])

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
        <div className='p-4 absolute top-[8vh] w-full md:w-[79vw] right-0 h-fit'>
            <h1 className="text-xl lg:text-3xl font-bold mb-4">Pending Orders</h1>
            <div className="w-full h-fit flex flex-wrap  gap-4 items-center justify-center px-10 py-3">
                {data?.map((order) => (
                    <div key={order.id} className='bg-[#ffffffda] w-[320px] min-h-[450px]  shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col justify-around gap-3 relative'>
                        <h1 className={`absolute -top-1 right-2 text-4xl ${order.OrderStatus === "Pending"? 'text-yellow-500' : order.OrderStatus === "Delivered" ? 'text-green-600' : 'text-red-700'  }`}><FaBookmark /></h1>
                        <h1 className='font-bold'>Name : <span className='font-normal'>{order.name}</span></h1>
                        <h1 className='font-bold'>Email : <span className='font-normal'>{order.email}</span></h1>
                        <h1 className='font-bold'>Phone Number : <span className='font-normal'>{order.phoneNumber}</span></h1>
                        <h1 className='font-bold'>Address :</h1>
                        <p>{order.address}</p>
                        <h1 className='font-bold'>Pin Code: <span className='font-normal'>{order.pincode}</span></h1>
                        <h1 className='font-bold'>City: <span className='font-normal'>{order.city}</span></h1>
                        <h1 className='font-bold'>Landmark: <span className='font-normal'>{order.landmark}</span></h1>
                        <div className='w-full h-fit py-3  flex justify-between items-center'>
                            <h1 className='font-bold text-xl'>Total : ₹ <span>{order.total}</span></h1>
                            <button className='w-[100px] h-[35px]  bg-blue-500 text-white flex items-center justify-center gap-2 rounded-lg' onClick={()=> navigate(`/orders/${order.id}`)}>
                                <FaEye />
                                <span>View</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pendingorder
