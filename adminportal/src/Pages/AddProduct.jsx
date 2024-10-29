import React from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';



function AddProduct() {
    const [data, setData] = useState({
        name: '',
        description: '',
        category: '',
        subcategory: '',
        discountprice: '',
        actualprice: '',
        itemtype: '',
        range: [],
        productimage: null
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
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
        console.log(e.target.files)
        setData((prevData) => ({
            ...prevData,
            productimage: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // add fields checks
        // if alert this "Swal.fire("Enter All the fields Properly");" and return
        
        const formdata = new FormData();
        for(let key in data){
            if(key === "productimage"){
                formdata.append('productimage' , data[key])
            }
            else if(key === "range"){
                formdata.append("range" , JSON.stringify(data[key]));
            }
            else{
                formdata.append(key,data[key])
            }
        }
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/med/addproduct`,formdata)

            if (res.status == 201) {
                Swal.fire({
                    title: "Message Sent Sucessfully",
                    text: "One of our executive contact you soon",
                    icon: "success"
                });
                return;

            } else {
                Swal.fire({
                    title: "Error In sending Message",
                    text: "Please Try after some time",
                    icon: "error"
                });
                return
            }
        } catch (e) {
            console.log(e)
            Swal.fire({
                title: "Error In sending Message catch",
                text: "Please Try after some time",
                icon: "error"
            });
        };
    }
    return (
        <div className="absolute right-0 top-[8vh] w-[80vw]  add-product-container p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-md rounded-md">
            <form onSubmit={handleSubmit} className="add-product-form space-y-4" id='form1'>
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
                    <select name="category" id="cat" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"  onChange={handleChange} value={data.category}>
                    <option value="">Select Item Type</option>
                        <option value="cosmetic">Cosmatic</option>
                        <option value="surgical">surgical</option>
                        <option value="patent-medicine">patent medicine</option>
                        <option value="generic-medicine">genericmedicine</option>
                        <option value="ayurvedic-medicine">ayurvedic-medicine</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Sub Category</label>
                    <select name="subcategory" id="subcat" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"  onChange={handleChange} value={data.subcategory}>
                        <option value="">Select Sub-Category</option>
                        <option value="Cosmatic">Cosmatic</option>
                        <option value="Aruvedic-Medicine">Aruvedic Medicine</option>
                        <option value="Cosmatic">Cosmatic</option>
                        <option value="Aruvedic-Medicine">Aruvedic Medicine</option>
                        <option value="Cosmatic">Cosmatic</option>
                        <option value="Aruvedic-Medicine">Aruvedic Medicine</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Item Type</label>
                    <select name="itemtype" id="item" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase" value={data.itemtype} onChange={handleChange}>
                        <option value="">Select Item Type</option>
                        <option value="cosmetic">Cosmatic</option>
                        <option value="surgical">surgical</option>
                        <option value="patent-medicine">patent medicine</option>
                        <option value="generic-medicine">genericmedicine</option>
                        <option value="ayurvedic-medicine">ayurvedic-medicine</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Actual Price:</label>
                    <input type="number" name="actualprice" value={data.actualprice} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Discount Price:</label>
                    <input type="number" name="discountprice" value={data.discountprice} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <h3 className='text-2xl font-bold'>Ranges</h3>
                <div className='flex w-full  items-stretch justify-stretch flex-wrap gap-4'>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Range Min:</label>
                        <input type="number" name="min" value={data.range.min} onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Range Max:</label>
                        <input type="number" name="max" value={data.range.max} onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Range Value:</label>
                        <input type="number" name="value" value={data.range.value} onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
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

export default AddProduct