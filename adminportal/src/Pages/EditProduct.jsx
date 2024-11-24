import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Url from '../../Url';
import Swal from 'sweetalert2';
import { Cookies } from 'react-cookie';


const c = ["baby-and-female-and-elderly-care", "face-and-oral-care", "sexual-wellness", "shampoo-and-body-care", "health-and-wellness", "others"];
const s = ["bandage", "sugar-and-bp-care-machine", "syringe", "others"];
const p = ["injections", "tablet-and-capsule", "syrup", "cream-and-ointment", "peadiatric-drop-and-syrup", "others"];
const g = ["injections", "tablet-and-capsule", "syrup", "cream-and-ointment", "pediatric-drop-and-syrup", "others"];
const a = ["bati-tablets-and-capsule", "asave-and-syrup", "churan-and-powder", "others"];


function EditProduct() {
    const cookie = new Cookies()
    const navigate = useNavigate()
    const params = useParams()
    const [process, setprocess] = useState(false)
    const [loading, setloading] = useState(false)
    const [type, setype] = useState([])
    const [data, setData] = useState({
        category: '',
        subcategory: '',
        companyName: '',
        name: '',
        ourPrice: '',
        mrp: '',
        itemtype: '',
        size: '',
        composition: '',
        inventory: '',
        range: [
            {
                min: '',
                max: '',
                value: ''
            },
            {
                min: '',
                max: '',
                value: ''
            },
            {
                min: '',
                max: '',
                value: ''
            }
        ],
        images: [],
        featured: false
    });

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setData({ ...data, images: files });
    }

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


    useEffect(() => {
        if (data.category == "cosmetic-products") {
            setype(c);
        } else if (data.category == "surgical-items") {
            setype(s);
        } else if (data.category == "patent-medicine") {
            setype(p);
        } else if (data.category == "generic-medicine") {
            setype(g);
        } else if (data.category == "ayurvedic-product") {
            setype(a);
        }
    }, [data.category])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)

        const formdata = new FormData();
        for (let key in data) {
            if (key === "images") {
                data[key].forEach((image) => {
                    formdata.append("images", image);
                });
            }
            if (key === "range") {
                formdata.append('range', JSON.stringify(data.range))
            }
            else {
                formdata.append(key, data[key])
            }
        }
        console.log(Object.fromEntries(formdata))

        try {
            const res = await axios.patch(`${Url}/api/v1/med/updateproduct/${params.id}`, formdata, {
                headers: {
                    "Authorization": "Bearer " + cookie.get('lgthusr')
                }
            })

            if (res.status == 200) {
                Swal.fire({
                    title: "Product Upadeted Sucessfully",
                    icon: "success"
                }).then(() => navigate('/view-product'))
                setloading(false)
                return;

            } else {
                Swal.fire({
                    title: "Error In Adding Product",
                    icon: "error"
                });
                setloading(false)
                return
            }
        } catch (e) {
            setloading(false)
            Swal.fire({
                title: "Error In Adding Product",
                icon: "error"
            });
        };
    }

    useEffect(() => {
        const fetchdata = async () => {
            setprocess(true)
            try {
                const { data } = await axios.get(`${Url}/api/v1/med/getproduct/${params.id}`)
                setprocess(false)
                setData(data)
            } catch (e) {
                setprocess(false)
            }
        }
        fetchdata()
    }, [])

    return (
        process ?
            <div className="absolute right-0 top-[8vh]  md:w-[80vw] h-full  add-product-container p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-md rounded-md items-center justify-center flex">
                <div className='flex items-center justify-center'>
                    <div class="w-16 h-16 rounded-full animate-spin 
                    border-x-4 border-solid border-gray-500 border-t-transparent"></div>
                </div>
            </div>
            :
            <div className="absolute right-0 top-[8vh]  md:w-[80vw]  add-product-container p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-md rounded-md">
                <form onSubmit={handleSubmit} className="add-product-form space-y-4" id='form1'>
                    <div className='flex gap-5 flex-wrap justify-start'>
                        <div className="form-group md:w-[40%]">
                            <label className=" block text-gray-700 font-semibold">Category:</label>
                            <select name="category" id="cat" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} value={data.category}>
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
                            <select name="subcategory" id="subcat" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} value={data.subcategory}>
                                <option value="">Select Category</option>
                                {
                                    type?.map((item) => {
                                        return <option value={item} className=' capitalize'>{item.split('-').join(' ')}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>


                    <div className='flex gap-5 flex-wrap'>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Company Name:*</label>
                            <input type="text" name="companyName" value={data.companyName} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Company Name' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Name:*</label>
                            <input type="text" name="name" value={data.name} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Medicine name' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Item Type:</label>
                            <input type="text" name="itemtype" value={data.itemtype} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Item Type' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Mrp:*</label>
                            <input type="tel" name="mrp" value={data.mrp} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Mrp' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Our Price:*</label>
                            <input type="tel" name="ourPrice" value={data.ourPrice} onChange={handleChange} required className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Our Price' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Size:</label>
                            <input type="text" name="size" value={data.size} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Size' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Composition:</label>
                            <input type="text" name="composition" value={data.composition} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Composition' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Inventory:</label>
                            <input type="number" name="inventory" value={data.inventory} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='Inventory' />
                        </div>
                        <div className="form-group  flex items-center justify-center">
                            <input type="checkbox" className='mr-2 w-4 h-4' checked={data.featured} onChange={() => setData({ ...data, featured: !data.featured })} />
                            <label>Featured Product</label>
                        </div>
                    </div>
                    <h3 className='text-2xl font-bold'>Ranges</h3>
                    <div className='flex w-full  items-stretch justify-stretch flex-wrap gap-4'>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Min Range  1:</label>
                            <input type="tel" name="min0" value={data.range[0].min} onChange={(e) => setData({ ...data, range: [{ min: e.target.value, max: data.range[0].max, value: data.range[0].value }, { min: data.range[1].min, max: data.range[1].max, value: data.range[1].value }, { min: data.range[2].min, max: data.range[2].max, value: data.range[2].value }] })} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='0' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Max Range  1:</label>
                            <input type="tel" name="max0" value={data.range[0].max} onChange={(e) => setData({ ...data, range: [{ min: data.range[0].min, max: e.target.value, value: data.range[0].value }, { min: data.range[1].min, max: data.range[1].max, value: data.range[1].value }, { min: data.range[2].min, max: data.range[2].max, value: data.range[2].value }] })} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='20' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Value 1:</label>
                            <input type="tel" name="value0" value={data.range[0].value} onChange={(e) => setData({ ...data, range: [{ min: data.range[0].min, max: data.range[0].max, value: e.target.value }, { min: data.range[1].min, max: data.range[1].max, value: data.range[1].value }, { min: data.range[2].min, max: data.range[2].max, value: data.range[2].value }] })} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='400' />
                        </div>
                    </div>
                    <div className='flex w-full  items-stretch justify-stretch flex-wrap gap-4'>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Min Range  2:</label>
                            <input type="tel" name="min1" value={data.range[1].min} onChange={(e) => setData({ ...data, range: [{ min: data.range[0].min, max: data.range[0].max, value: data.range[0].value }, { min: e.target.value, max: data.range[1].max, value: data.range[1].value }, { min: data.range[2].min, max: data.range[2].max, value: data.range[2].value }] })} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='21' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Max Range  2:</label>
                            <input type="tel" name="max1" value={data.range[1].max} onChange={(e) => setData({ ...data, range: [{ min: data.range[0].min, max: data.range[0].max, value: data.range[0].value }, { min: data.range[1].min, max: e.target.value, value: data.range[1].value }, { min: data.range[2].min, max: data.range[2].max, value: data.range[2].value }] })} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='40' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Value 2:</label>
                            <input type="tel" name="value1" value={data.range[1].value} onChange={(e) => setData({ ...data, range: [{ min: data.range[0].min, max: data.range[0].max, value: data.range[0].value }, { min: data.range[1].min, max: data.range[1].max, value: e.target.value }, { min: data.range[2].min, max: data.range[2].max, value: data.range[2].value }] })} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='390' />
                        </div>
                    </div>
                    <div className='flex w-full  items-stretch justify-stretch flex-wrap gap-4'>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Min Range  3:</label>
                            <input type="tel" name="min2" value={data.range[2].min} onChange={(e) => setData({ ...data, range: [{ min: data.range[0].min, max: data.range[0].max, value: data.range[0].value }, { min: data.range[1].min, max: data.range[1].max, value: data.range[1].value }, { min: e.target.value, max: data.range[2].max, value: data.range[2].value }] })} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='41' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Max Range  3:</label>
                            <input type="tel" name="max2" value={data.range[2].max} onChange={(e) => setData({ ...data, range: [{ min: data.range[0].min, max: data.range[0].max, value: data.range[0].value }, { min: data.range[1].min, max: data.range[1].max, value: data.range[1].value }, { min: data.range[2].min, max: e.target.value, value: data.range[2].value }] })} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='100' />
                        </div>
                        <div className="form-group">
                            <label className="block text-gray-700 font-semibold">Value 3:</label>
                            <input type="tel" name="value2" value={data.range[2].value} onChange={(e) => setData({ ...data, range: [{ min: data.range[0].min, max: data.range[0].max, value: data.range[0].value }, { min: data.range[1].min, max: data.range[1].max, value: data.range[1].value }, { min: data.range[2].min, max: data.range[2].max, value: e.target.value }] })} required className="mt-1 p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder='380' />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Images</h3>
                        <input
                            type="file"
                            name="images"
                            multiple
                            onChange={handleFileChange}
                            className="border border-gray-600 rounded p-2"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button  p-2 w-full bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {
                            loading ?
                                (
                                    <div className='w-full h-full flex items-center justify-center'>
                                        <div className='w-6 h-6 border-4 border-r-white rounded-[50%] animate-spin'></div>
                                    </div>
                                )
                                :
                                "Update Product"
                        }
                    </button>
                </form>
            </div>
    )
}

export default EditProduct