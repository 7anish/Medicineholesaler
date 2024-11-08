import React, { useEffect, useState } from 'react'
import { FaEdit, } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Url from '../../Url';
import Swal from 'sweetalert2';
import { Cookies } from 'react-cookie';



const c = ["baby-and-female-and-elderly-care", "face-and-oral-care", "sexual-wellness", "shampoo-and-body-care", "health-and-wellness", "others"];
const s = ["bandage", "sugar-and-bp-care-machine", "syringe", "others"];
const p = ["injections", "tablet-and-capsule", "syrup", "cream-and-ointment", "peadiatric-drop-and-syrup", "others"];
const g = ["injections", "tablet-and-capsule", "syrup", "cream-and-ointment", "pediatric-drop-and-syrup", "others"];
const a = ["bati-tablets-and-capsule", "asave-and-syrup", "churan-and-powder", "others"];


function ViewProduct() {
  const cookie = new Cookies()
  const [querry, setquerry] = useState({
    category: "",
    subcategory: ""
  })
  const navigate = useNavigate()
  const [data, setdata] = useState([])
  const [isdelete, setisdelete] = useState(true)
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(false)
  const [type, setype] = useState([])
  const [Search , setsearch] = useState("")

  useEffect(() => {
    if (querry.category == "cosmetic-products") {
      setype(c);
    } else if (querry.category == "surgical-items") {
      setype(s);
    } else if (querry.category == "patent-medicine") {
      setype(p);
    } else if (querry.category == "generic-medicine") {
      setype(g);
    } else if (querry.category == "ayurvedic-product") {
      setype(a);
    }
    console.log(type)
  }, [querry.category])

  useEffect(() => {
    const fetchdata = async (querrystring) => {
      setloading(true)
      try {
        const { data } = await axios.get(`${Url}/api/v1/med/getproduct?${querrystring}`)
        setloading(false)
        console.log(data)
        setdata(data);
      } catch (e) {
        console.log(e)
        seterror(true)
        setloading(false)
      }
    }
    if (!(querry.category == "" && querry.subcategory == "")) {
      fetchdata(`category=${querry.category}&subcategory=${querry.subcategory}`)
    }
    else {
      fetchdata("")
    }

  }, [isdelete, querry.subcategory])


  const handledelete = async (id) => {
    try {
      const res = await axios.delete(`${Url}/api/v1/med/deleteproduct/${id}`,
        {
          headers: {
            "Authorization": "Bearer " + cookie.get('lgthusr')
          }
        }
      )
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

  
  const filterdata = data.filter((item)=>{
    return item.name.toLowerCase().includes(Search.toLowerCase());
  })
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
    <div className='p-4 absolute top-[8vh] w-full md:w-[79vw]  right-0'>
      <div className='w-full flex flex-wrap justify-between py-3 mb-5 items-center'>
      <div className=" w-full form-group">
            <label className="block text-gray-700 font-semibold">Search By Product Name</label>
            <input type="text" name="companyName" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Product Name' value={Search} onChange={(e)=> setsearch(e.target.value)} />
          </div>
        <div className='flex gap-5 flex-wrap md:justify-evenly w-full h-fit p-4 items-start justify-start'>
          <div className="form-group md:w-[40%]">
            <label className=" block text-gray-700 font-semibold">Category:</label>
            <select name="category" id="cat" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setquerry({ ...querry, category: e.target.value })} value={querry.category}>
              <option value="">Select Category</option>
              <option value="cosmetic-products">COSMETIC PRODUCTS</option>
              <option value="surgical-items">SURGICAL ITEMS</option>
              <option value="patent-medicine">patent medicine</option>
              <option value="generic-medicine">generic medicine</option>
              <option value="ayurvedic-product">ayurvedic product</option>
            </select>
          </div>
          <div className="form-group md:w-[40%]">
            <label className="block text-gray-700 font-semibold">Sub Category</label>
            <select name="subcategory" id="subcat" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setquerry({ ...querry, subcategory: e.target.value })} value={querry.subcategory}>
              <option value="">Select Category</option>
              {
                type?.map((item) => {
                  return <option value={item} className=' capitalize'>{item.split('-').join(' ')}</option>
                })
              }
            </select>
          </div>
        </div>
      </div>

      <hr className='h-1 bg-gray-300 mb-3' />
      <div className="flex flex-wrap gap-4 items-center lg:justify-center  justify-start">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-500 text-wrap">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Company Name
              </th>
              <th scope="col" class="px-6 py-3">
                Composition
              </th>
              <th scope="col" class="px-6 py-3">
                Mrp
              </th>
              <th scope="col" class="px-6 py-3">
                Our Price
              </th>
              <th scope="col" class="px-6 py-3">
                Inventory
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              loading ?
                <>
                  <tr>
                    <td colSpan={5}>
                      <section className='w-full h-[80vh]  py-0 xl:pt-10 xl:py-0 px-4 lg:px-20 flex items-center justify-center '>
                        <div className='my-20 flex items-center justify-center'>
                          <div class="w-16 h-16 rounded-full animate-spin 
                    border-x-4 border-solid border-gray-500 border-t-transparent"></div>
                        </div>
                      </section>
                    </td>
                  </tr>
                </>
                :

                filterdata.length == 0
                  ?
                  <>
                    <tr>
                      <td colSpan={6}>
                        <section className='w-full h-[80vh]  py-0 xl:pt-10 xl:py-0 px-4 lg:px-20 flex items-center justify-center '>
                          <div className='my-20 flex items-center justify-center'>
                            <h1 className='text-xl font-semibold'>No Product Found</h1>
                          </div>
                        </section>
                      </td>
                    </tr>
                  </>

                  :

                  filterdata?.map((item) => {
                    return (
                      <tr class="odd:bg-white  even:bg-gray-50  border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer capitalize hover:underline" onClick={() => navigate(`/view/${item.id}`)}>
                          {item.name}
                        </th>
                        <td class="px-6 py-4 capitalize">
                          {item.companyName}
                        </td>
                        <td class="px-6 py-4 capitalize">
                          {item.composition}
                        </td>
                        <td class="px-6 py-4 capitalize">
                          {item.mrp}
                        </td>
                        <td class="px-6 py-4 capitalize">
                          ₹&nbsp;{item.ourPrice}
                        </td>
                        <td class="px-6 py-4 capitalize">
                          {item.inventory}
                        </td>
                        <td class="px-6 py-4 flex gap-2">
                          <NavLink to={`/edit/${item.id}`}><p class="font-medium text-blue-600 hover:underline ml-3">Edit</p></NavLink>
                          <button class="font-medium text-red-600  hover:underline" onClick={() => {
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
                                handledelete(item.id)
                              }
                            });

                          }}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewProduct


// {data?.map((medicine) => (
//   <div key={medicine.id} className='bg-[#ffffffda] w-[300px] md:w-[350px] h-fit shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col justify-around gap-3'>
//     <img src={medicine.imageurl} alt="" className='w-full h-60 object-cover rounded-md cursor-pointer' onClick={() => navigate(`/view/  ₹&nbsp;{medicine.id}`)} />
//     <div className='flex gap-2'>
//       <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit'>{medicine.category}</span>
//       <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] w-fit'>{medicine.subcategory}</span>
//     </div>
//     <div className='flex flex-col gap-4'>
//       <h1 className='text-2xl font-bold cursor-pointer hover:text-blue-500' onClick={() => navigate(`/view/  ₹&nbsp;{medicine.id}`)}>{medicine.name}</h1>
//       {/* <p className='text-lg flex-grow'>{medicine.desc}</p> */}
//       <div className='flex justify-between flex-grow items-center'>
//         <h1 className='text-2xl font-bold'> ₹&nbsp;&nbsp;{medicine.discountprice}</h1>
//       </div>
//     </div>
//     <div className='flex justify-between flex-row items-center'>
//       <NavLink to={`/edit/  ₹&nbsp;{medicine.id}`} className='flex text-xl items-center gap-2 text-green-500 hover:text-green-700'>
//         <FaEdit />
//         <span>Edit</span>
//       </NavLink>
// <button className='flex text-xl items-center gap-2 text-red-500 hover:text-red-700' onClick={() => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be Delete The Product",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#65A30D",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!"
//   }).then((result) => {
//     if (result.isConfirmed) {
//       handledelete(medicine.id)
//     }
//   });

// }}>
//         <MdDelete />
//         <span>Delete</span>
//       </button>
//     </div>
//   </div>
// ))}