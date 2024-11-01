import React, { useEffect, useState } from 'react'
import { FaEdit, } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Url from '../../Url';
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";


function ViewProduct() {
  const navigate = useNavigate()
  const [data, setdata] = useState()
  const [isdelete, setisdelete] = useState(true)
  const [error, seterror] = useState(false)
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get(`${Url}/api/v1/med/getproduct`)
        console.log(data)
        setdata(data);
      } catch (e) {
        console.log(e)
        seterror(true)
      }
    }
    fetchdata()
  }, [isdelete])


  const handledelete = async (id) => {
    try {
      const res = await axios.delete(`${Url}/api/v1/med/deleteproduct/${id}`)
      if (res.status == 200) {
        setisdelete(!isdelete)
        Swal.fire({
          title: "Product deleted Sucessfully",
          icon: "success"
        });
        return;

      } else {
        Swal.fire({
          title: "Error In deleting Product",
          icon: "error"
        });
        return
      }
    } catch (e) {
      console.log(e)
      Swal.fire({
        title: "Error In deleting Product",
        icon: "error"
      });
    };
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
    <div className='p-4 absolute top-[8vh] w-full md:w-[79vw] right-0'>
      <h1 className="text-xl lg:text-3xl font-bold mb-4">View Product</h1>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {data?.map((medicine) => (
          <div key={medicine.id} className='bg-[#ffffffda] w-[300px] md:w-[350px] h-fit shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col justify-around gap-3'>
            <img src={medicine.imageurl} alt="" className='w-full h-60 object-cover rounded-md cursor-pointer' onClick={() => navigate(`/view/${medicine.id}`)} />
            <div className='flex gap-2'>
              <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit'>{medicine.category}</span>
              <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] w-fit'>{medicine.subcategory}</span>
            </div>
            <div className='flex flex-col gap-4'>
              <h1 className='text-2xl font-bold cursor-pointer hover:text-blue-500' onClick={() => navigate(`/view/${medicine.id}`)}>{medicine.name}</h1>
              {/* <p className='text-lg flex-grow'>{medicine.desc}</p> */}
              <div className='flex justify-between flex-grow items-center'>
                <h1 className='text-2xl font-bold'>₹&nbsp;{medicine.discountprice}</h1>
              </div>
            </div>
            <div className='flex justify-between flex-row items-center'>
              <NavLink to={`/edit/${medicine.id}`} className='flex text-xl items-center gap-2 text-green-500 hover:text-green-700'>
                <FaEdit />
                <span>Edit</span>
              </NavLink>
              <button className='flex text-xl items-center gap-2 text-red-500 hover:text-red-700' onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be Delete The Product",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#65A30D",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                  if (result.isConfirmed) {
                    handledelete(medicine.id)
                  }
                });

              }}>
                <MdDelete />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewProduct