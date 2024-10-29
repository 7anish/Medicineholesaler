import React, { useEffect, useState } from 'react'
import syrup from '../assets/syrup.jpg'
import { FaEye, FaEdit } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function ViewProduct() {
  const toTitleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const [productdata, setproductdata] = useState([]);

  const products = [
    {
      id: 1,
      name: toTitleCase('INJECTION'),
      desc: 'A device used to inject medication into the body.',
      subcategory: toTitleCase('INJECTION'),
      img: 'lotion',
      category: toTitleCase('surgical'),
      price: 15.99
    },
    {
      id: 2,
      name: toTitleCase('CREAM'),
      desc: 'A topical preparation used for skin care.',
      subcategory: toTitleCase('SKIN CARE'),
      img: 'lotion',
      category: toTitleCase('cosmetic'),
      price: 8.49
    },
    {
      id: 3,
      name: toTitleCase('TABLET'),
      desc: 'A solid dose of medication.',
      subcategory: toTitleCase('SUGAR CARE & BP MACHINE'),
      img: 'lotion',
      category: toTitleCase('medicine'),
      price: 12.99
    },
    {
      id: 4,
      name: toTitleCase('SYRUP'),
      desc: 'A liquid Ayurvedic preparation.',
      subcategory: toTitleCase('OTHER'),
      img: 'lotion',
      category: toTitleCase('ayurvedic'),
      price: 7.25
    },
    {
      id: 5,
      name: toTitleCase('SOAP'),
      desc: 'A substance used for washing and cleansing.',
      subcategory: toTitleCase('SKIN CARE'),
      img: 'lotion',
      category: toTitleCase('cosmetic'),
      price: 3.99
    },
    {
      id: 6,
      name: toTitleCase('CAPSULE'),
      desc: 'A small container with Ayurvedic medicine inside.',
      subcategory: toTitleCase('OTHER'),
      img: 'lotion',
      category: toTitleCase('ayurvedic'),
      price: 9.49
    },
    {
      id: 7,
      name: toTitleCase('CANNUALA'),
      desc: 'A thin tube inserted into a vein or body cavity to administer medication, drain off fluid, or insert a surgical instrument.',
      subcategory: toTitleCase('OTHER'),
      img: 'lotion',
      category: toTitleCase('surgical'),
      price: 5.99
    },
    {
      id: 8,
      name: toTitleCase('FACE WASH'),
      desc: 'A cleanser used to clean the face.',
      subcategory: toTitleCase('SKIN CARE'),
      img: 'lotion',
      category: toTitleCase('cosmetic'),
      price: 6.50
    }
  ];

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const {data} = await axios.get(`http://localhost:8000/api/v1/med/getproduct`)
        setproductdata(data)
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchdata()
  },[])

  return (
    <div className='p-4 absolute top-[8vh] w-[79vw] right-0'>
      <h1 className="text-xl lg:text-3xl font-bold mb-4">View Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productdata.map((medicine) => (
          <div key={medicine.id} className='bg-[#ffffffda] shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col justify-around gap-3'>
            <img src={medicine.imageurl} alt="" className='w-full h-60 object-cover rounded-md cursor-pointer' />
            <div className='flex gap-2'>
              <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit'>{medicine.category}</span>
              <span className='text-sm flex px-2 border rounded-lg bg-[#ddeff1] w-fit'>{medicine.subcategory}</span>
            </div>
            <div className='flex flex-col gap-4'>
              <h1 className='text-2xl font-bold cursor-pointer hover:text-blue-500'>{medicine.name}</h1>
              {/* <p className='text-lg flex-grow'>{medicine.desc}</p> */}
              <div className='flex justify-between flex-grow items-center'>
                <h1 className='text-2xl font-bold'>${medicine.actualprice}</h1>
              </div>
            </div>
            <div className='flex justify-between'>
              <NavLink to={`/view/${medicine.id}`} className='flex text-xl items-center gap-2 text-red-500 hover:text-red-700'>
                <FaEye />
                <span>View</span>
              </NavLink>
              <NavLink to={`/edit/${medicine.id}`} className='flex text-xl items-center gap-2 text-green-500 hover:text-green-700'>
                <FaEdit />
                <span>Edit</span>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewProduct