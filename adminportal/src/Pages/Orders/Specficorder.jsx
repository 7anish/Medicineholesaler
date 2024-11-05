import React, { useState, useEffect } from 'react'
import { FaEye } from 'react-icons/fa'
import { FaBookmark } from "react-icons/fa";
import Url from '../../../Url';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Cookies } from 'react-cookie';

const Specficorder = () => {
  const cookie = new Cookies()
  const params = useParams()
  const [re, setre] = useState(true)
  const [order, setorder] = useState([])
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    const fetchdata = async () => {
      try {
        const { data } = await axios.get(`${Url}/api/v1/med/getorder/${params.id}`,
          {
            headers: {
              "Authorization": "Bearer " + cookie.get('lgthusr')
            }
          }
        )
        setloading(false)
        console.log(data)
        setorder(data)
      } catch (e) {
        setloading(false)
        seterror(true)
        console.log(e)
      }
    }
    fetchdata()
  }, [re])


  const handleupdate = async (status) => {
    const products = order?.orders?.map((item)=>{
      return {
        id : item.productId._id,
        quantity : item.quantity
      }
    }) 
    try {
      const res = await axios.patch(`${Url}/api/v1/med/upadateorder/${params.id}`, {
        status: status,
        products : products
      },
        {
          headers: {
            "Authorization": "Bearer " + cookie.get('lgthusr')
          }
        }
      )

      if (res.status == 200) {
        Swal.fire({
          title: "Ordered Upadeted Sucessfully",
          icon: "success"
        })
        setre(!re)
        return;
      } else {
        Swal.fire({
          title: "Error In Updating Order",
          icon: "error"
        });
        return
      }
    } catch (e) {
      Swal.fire({
        title: "Error In Updating Order",
        icon: "error"
      });
    };
  }

  if (loading) {
    return (
      <div className="absolute right-0 top-[8vh]  md:w-[80vw] h-[90vh]  add-product-container p-4 sm:p-6 lg:p-8  shadow-md rounded-md ">
        <div className='w-full h-full flex items-center justify-center'>
          <div className="w-16 h-16 rounded-full animate-spin  border-x-4 border-solid border-gray-500 border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-4 absolute top-[8vh] w-[79vw] right-0'>
        <div className='w-full h-full flex items-center justify-center'>
          <h1>Error in Featching Products</h1>
        </div>
      </div>
    )

  }


  return (
    <div className="absolute right-0 top-[8vh] w-full  md:w-[80vw] h-fit  add-product-container p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl lg:text-3xl font-bold mb-4"></h1>
      <div className="w-full h-fit p-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700 border border-gray-500">
          <tr className='border border-gray-500'>
            <th scope="col" colSpan={4} className="px-6 py-3 border border-gray-500 text-center text-xl text-black text-wrap">
              Order Details
            </th>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Owner/Firm Name
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order.name}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Email
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order.email}
            </td>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Phone Number
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order.phoneNumber}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Address
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order.address}
            </td>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              City
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order.city}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Pincode
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order.pincode}
            </td>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Drug Licence Number
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order.druglcnumber}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Food Licence Number
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order.foodlcnumber}
            </td>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Land Mark
            </th>
            <td scope="col" className="px-6 py-3 border border-gray-500">
              {order.landmark}
            </td>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Order status
            </th>
            <td scope="col" className={`px-6 py-3 border border-gray-500 font-bold ${order.OrderStatus === "Pending" ? 'text-yellow-500' : order.OrderStatus === "Delivered" ? 'text-green-600' : 'text-red-700'}`}>
              {order.OrderStatus}
            </td>
          </tr>
          <tr className='border border-gray-500'>
            <th scope="col" className="px-6 py-3 border border-gray-500">
              Remark
            </th>
            <td colSpan={2} scope="col" className="px-6 py-3 border border-gray-500">
              {order.remark}
            </td>
          </tr>
          <tr>
            <th colSpan={3} scope="col" className="px-6 py-3 border border-gray-500 text-xl font-bol text-right">
              Total Billing Amount
            </th>
            <th scope="col" className="px-6 py-3 border border-gray-500 text-xl font-bold">
              ₹ {order.totalPrice}
            </th>
          </tr>
        </table>
        <hr className='h-1 bg-gray-300 my-10' />

        {
          order.OrderStatus === "Pending" ?
            <>
              <div className='w-full h-fit flex justify-center sm:justify-end gap-5 px-5 mt-3'>
                <button className='bg-green-600 p-3 rounded-lg font-semibold' onClick={() => handleupdate("Delivered")}>Deliverd</button>
                <button className='bg-red-500 p-3 rounded-lg font-semibold' onClick={() => handleupdate("Cancled")}>Cancled</button>
              </div>
              <hr className='h-1 bg-gray-300 my-10' />
            </>
            :
            ""
        }
        {
          order?.orders?.map((product, index) => (
            <>
              <div key={index} className="w-full f-fit flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11 border border-gray-400 mb-3 rounded-2xl py-1">
                <div className="lg:w-[150px]">
                  <img src={product.productId.productimage[0].imageurl} alt="" className="max-sm:mx-auto object-cover border-[1px] rounded-lg border-black" />
                </div>
                <div
                  className="flex flex-col gap-2 w-full lg:w-[70%] p-2 lg:justify-evenly items-start justify-start ">
                  <h1 className="font-manrope font-semibold text-2xl leading-9 text-black whitespace-nowrap capitalize">
                    {product.productId.name}
                  </h1>
                  <h2 className="font-manrope font-semibold text-lg leading-9 text-black mb-3 whitespace-nowrap capitalize">{product.productId.companyName} || {product.productId.size}</h2>
                  <div className='flex gap-2'>
                    <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit capitalize'>{product.productId.category}</span>
                    <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] w-fit capitalize'>{product.productId.subcategory}</span>
                  </div>
                  <div className="w-full items-start justify-start flex flex-wrap gap-x-10 gap-y-3 ">
                    <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty:
                      {product.quantity}</span>
                    <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Total Item Price : ₹&nbsp;{product.productpricee}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
              </div>
              {/* <svg className="mb-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                fill="none">
                <path d="M0 1H1216" stroke="#D1D5DB" />
              </svg> */}
            </>
          ))
        }
      </div>
    </div>
  )
}

export default Specficorder


// order.OrderStatus === "Pending" ?
//                 <div className='w-full h-fit flex justify-center sm:justify-end gap-5 px-5 mt-3'>
//                   <button className='bg-green-600 p-2 rounded-lg font-semibold' onClick={() => handleupdate("Delivered")}>Deliverd</button>
//                   <button className='bg-red-500 p-2 rounded-lg font-semibold' onClick={() => handleupdate("Cancled")}>Cancled</button>
//                 </div>
//                 :
//                 <div className='w-full h-fit flex justify-end gap-5 px-5'>
//                   <h1 className={`text-xl font-bold ${order.OrderStatus === "Delivered" ? 'text-green-600' : 'text-red-500'}`}>{order.OrderStatus}</h1>
//                 </div>