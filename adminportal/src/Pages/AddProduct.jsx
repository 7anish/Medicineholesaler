import React from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Url from '../../Url';

function AddProduct() {
    const cookie = new Cookies()
    const [data, setData] = useState({
        name: '',
        description: '',
        subdescription: '',
        category: '',
        subcategory: '',
        range : '',
        discountprice: '',
        actualprice: '',
        itemtype: '',
        productimage: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'min0' || name === 'max0' || name === 'value0' || name === 'min1' || name === 'max1' || name === 'value1' || name === 'min2' || name === 'max2' || name === 'value2') {
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // add fields checks
        // if alert this "Swal.fire("Enter All the fields Properly");" and return

        const range = [
            {
                min : e.target.min0.value,
                max : e.target.max0.value,
                value : e.target.value0.value
            },
            {
                min : e.target.min1.value,
                max : e.target.max1.value,
                value : e.target.value1.value
            },
            {
                min : e.target.min2.value,
                max : e.target.max2.value,
                value : e.target.value2.value
            },
        ]

        const formdata = new FormData();
        for(let key in data){
            if (key === "range"){
                formdata.append('range' , JSON.stringify(range))
            }
            else{
                formdata.append(key,data[key])
            }
        }

        const details = Object.fromEntries(formdata);
        try {
            const res = await axios.post(`${Url}/api/v1/med/addproduct`, details , {
                headers : {
                    "Authorization": "Bearer " + cookie.get('lgthusr')
                }
            })

            if (res.status === 201) {
                Swal.fire({
                    title: "Product Added Sucessfully",
                    icon: "success"
                });
                return;

            } else {
                Swal.fire({
                    title: "Error In Adding Product",
                    icon: "error"
                });
                return
            }
        } catch (e) {
            console.log(e)
            Swal.fire({
                title: "Error In Adding Product",
                icon: "error"
            });
        };
    }
    return (
        <div className="absolute right-0 top-[8vh]  md:w-[80vw]  add-product-container p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-md rounded-md">
            <form onSubmit={handleSubmit} className="add-product-form space-y-4" id='form1'>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Name:</label>
                    <input type="text" name="name" value={data.name} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Medicine name' />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Description:</label>
                    <input type="text" name="description" value={data.description} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Description'/>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Sub-Description:</label>
                    <input type="text" name="subdescription" placeholder='e.g - 100gm , 100ml' value={data.subdescription} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Category:</label>
                    <select name="category" id="cat" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"  onChange={handleChange} value={data.category}>
                    <option value="">Select Item Type</option>
                        <option value="cosmetic">Cosmetic</option>
                        <option value="surgical">surgical</option>
                        <option value="patent-medicine">patent medicine</option>
                        <option value="generic-medicine">generic medicine</option>
                        <option value="ayurvedic-medicine">ayurvedic medicine</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Sub Category</label>
                    <select name="subcategory" id="subcat" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"  onChange={handleChange} value={data.subcategory}>
                        <option value="">Select Sub-Category</option>
                        <option value="hair-care">Hair care</option>
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
                        <option value="medicine">Medicine</option>
                        <option value="surgical">surgical</option>
                        <option value="patent-medicine">patent medicine</option>
                        <option value="generic-medicine">genericmedicine</option>
                        <option value="ayurvedic-medicine">ayurvedic-medicine</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Actual Price:</label>
                    <input type="number" name="actualprice" value={data.actualprice} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='e.g 500' />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Discount Price:</label>
                    <input type="number" name="discountprice" value={data.discountprice} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='e.g 399'/>
                </div>
                <h3 className='text-2xl font-bold'>Ranges</h3>
                <div className='flex w-full  items-stretch justify-stretch flex-wrap gap-4'>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Min Range  1:</label>
                        <input type="tel" name="min0"  onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='0'/>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Man Range  1:</label>
                        <input type="tel" name="max0"  onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='20'/>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Value 1:</label>
                        <input type="tel" name="value0"  onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='400'/>
                    </div>
                </div>
                <div className='flex w-full  items-stretch justify-stretch flex-wrap gap-4'>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Min Range  2:</label>
                        <input type="tel" name="min1" onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='21'/>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Man Range  2:</label>
                        <input type="tel" name="max1" onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='40'/>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Value 2:</label>
                        <input type="tel" name="value1"  onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='390'/>
                    </div>
                </div>
                <div className='flex w-full  items-stretch justify-stretch flex-wrap gap-4'>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Min Range  3:</label>
                        <input type="tel" name="min2"  onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='41'/>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Man Range  3:</label>
                        <input type="tel" name="max2"  onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='100'/>
                    </div>
                    <div className="form-group">
                        <label className="block text-gray-700 font-semibold">Value 3:</label>
                        <input type="tel" name="value2"  onChange={handleChange} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='380'/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-semibold">Product Image Url:</label>
                    <input type="text" name="productimage" onChange={handleChange}  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='https://medcalwholesale.com/id/1153740646/photo'/>
                </div>
                <button type="submit" className="submit-button mt-4 p-2 w-full bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct