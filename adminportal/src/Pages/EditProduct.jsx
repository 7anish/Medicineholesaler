import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
function EditProduct() {
    const params = useParams()
    console.log(params.id)
    const [data, setData] = useState({
        name: '',
        description: '',
        category: '',
        subcategory: '',
        discountprice: '',
        actualprice: '',
        itemtype: '',
        range: {
            min: '',
            max: '',
            value: ''
        },
        productimage: null
    });
    useEffect(()=>{
        const fetchdata = async ()=>{
            try{
                const data = await axios.get(`http://localhost:8000/api/v1/med/getproduct/${params.id}`)
                console.log(data)
            }catch(e){
                console.log(e)
            }
        }
        fetchdata()
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'min' || name === 'max' || name === 'value') {
            setData((prevData) => ({
                ...prevData,
                range: {
                    ...prevData.range,
                    [name]: value
                }
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            productimage: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };
  return (
    <div className="absolute right-0 top-[8vh] w-[80vw]  add-product-container p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-md rounded-md">
            <form onSubmit={handleSubmit} className="add-product-form space-y-4">
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Name:</label>
                    <input type="text" name="name" value={data.name} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Description:</label>
                    <input type="text" name="description" value={data.description} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Category:</label>
                    <input type="text" name="category" value={data.category} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Subcategory:</label>
                    <input type="text" name="subcategory" value={data.subcategory} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Discount Price:</label>
                    <input type="number" name="discountprice" value={data.discountprice} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Actual Price:</label>
                    <input type="number" name="actualprice" value={data.actualprice} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Item Type:</label>
                    <input type="text" name="itemtype" value={data.itemtype} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Range Min:</label>
                    <input type="number" name="min" value={data.range.min} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Range Max:</label>
                    <input type="number" name="max" value={data.range.max} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Range Value:</label>
                    <input type="number" name="value" value={data.range.value} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Product Image:</label>
                    <input type="file" name="productimage" onChange={handleFileChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" className="submit-button mt-4 p-2 w-full bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Add Product</button>
            </form>
        </div>
  )
}

export default EditProduct