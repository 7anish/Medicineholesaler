import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import Url from '../../Url';
const Checkout = () => {


    const [name , setname]= useState("");
    const [email, setemail]= useState("");
    const [phoneNumber , setphoneNumber] = useState("")
    const navigate = useNavigate()

    const data = useSelector((state) => {
        return state.carteditems
    })
    
    useEffect(() => {
        try {
            const cartitem = JSON.parse(sessionStorage.getItem('cartitem'))
            if(cartitem.length === 0){
                navigate('/')
            }else{
                console.log("sahjb")
                const info = JSON.parse(localStorage.getItem('information')) || {
                    username : "",
                    usermail : "",
                    userphone : ""
                };
                setname(info.username);
                setemail(info.usermail);
                setphoneNumber(info.userphone)
            }

        }catch (e) {
            navigate('/')
        }
    },[])


    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (number) => {
        const re = /^\d{10}$/;
        return re.test(String(number));
    };


    const validatePincode = (number) => {
        const re = /^\d{6}$/;
        return re.test(String(number));
    };

    const checkothers = (value) => {
        return /^(?!\s*$).+/.test(value);
    };


    const handleSubmit = async (e)=>{
        e.preventDefault();

        const order = data.allcartitem.map((item)=>{
            return {
                quantity : item.quantity,
                productId : item.id
            }
        })
        const deatails = {
            name : e.target.name.value,
            email : e.target.email.value,
            phoneNumber : e.target.phoneNumber.value,
            address : e.target.address.value,
            city : e.target.city.value,
            pincode : e.target.pincode.value,
            landmark : e.target.landmark.value,
            totalPrice : data.totaldiscountprice,
            order : order      
        }

        console.log(deatails)
        if(!checkothers(e.target.name.value)){
            Swal.fire("plese enter a valid name")
            return
        }
        if (!validateEmail(e.target.email.value)) {
            Swal.fire("Please enter a valid email address.");
            return;
        }
        if (!validatePincode(e.target.pincode.value)) {
            Swal.fire("Please enter a valid Pincode");
            return;
        }
        if (!validatePhoneNumber(e.target.phoneNumber.value)) {
            Swal.fire("Please enter a valid phone number.");
            return;
        }
        if(!checkothers(e.target.address.value)){
            Swal.fire("Plese enter a Adderss")
            return
        }
        if(!checkothers(e.target.city.value)){
            Swal.fire("Plese enter a city")
            return
        }
        if(!checkothers(e.target.landmark.value)){
            Swal.fire("Plese enter a landmark")
            return
        }
        

        try{
            const res = await axios.post(`${Url}/api/v1/med/createorder` , deatails)

            if(res.status == 201){
                sessionStorage.setItem('cartitem' , JSON.stringify([]))
                Swal.fire({
                    title : "Ordered Placed Sucessfully",
                    icon : 'success'
                }).then(()=>{
                    window.location.href = '/cart'
                })
                return
            }
            else{
                Swal.fire({
                    title : "Bad Request",
                    icon : 'error'
                })
            }
        }catch(e){
            console.log(e)
            Swal.fire({
                title : "Unable tO place order",
                icon : 'error'
            })
        }
        return
    }
    return (
        <section className="bg-white py-8 antialiased  md:py-16">
            <form className="mx-auto max-w-screen-xl px-4 2xl:px-0" onSubmit={(e) =>handleSubmit(e)}>
                <ol className="items-center flex w-full  text-center text-sm font-medium text-gray-500  sm:text-base">
                    <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-green-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2  text-green-500 after:content-['/']  sm:after:hidden">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Cart
                        </span>
                    </li>

                    <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10 ">
                        <span className="flex items-center after:mx-2 text-orange-600 after:content-['/']  sm:after:hidden">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Checkout
                        </span>
                    </li>

                    <li className="flex shrink-0 items-center">
                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Ordered Completed
                    </li>
                </ol>

                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label for="your_name" className="mb-2 block text-sm font-medium text-gray-900 "> Your name </label>
                                    <input name='name' type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Anish Kumar" required value={name} onChange={(e) => setname(e.target.value)}/>
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Your email* </label>
                                    <input name='email' type="email" id="your_email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="medicalholeshale@gmail.com" required value={email} onChange={(e) => setemail(e.target.value)}/>
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Your Phone Number* </label>
                                    <input type="text" name='phoneNumber' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="991331xxx" required value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)}/>
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Address* </label>
                                    <input type="text" name='address'  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Muradnagar , Ghaziabad " required />
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> City* </label>
                                    <input type="text" name='city' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Delhi" required />
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Pincode* </label>
                                    <input type="text" name='pincode' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="822034" required />
                                </div>

                                <div>
                                    <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 "> Landmark* </label>
                                    <input type="text" name='landmark' className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Near some famous place" required />
                                </div>
                                    
                            </div>
                        </div>
                            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md ">
                                <div className="flow-root">
                                    <div className="-my-3 divide-y divide-gray-200">
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500 ">Subtotal</dt>
                                            <dd className="text-base font-medium text-gray-900 ">₹&nbsp;{data.totalactualprice}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500 ">Savings</dt>
                                            <dd className="text-base font-medium ">-&nbsp;₹&nbsp;{data.totalactualprice - data.totaldiscountprice}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-bold text-gray-900">Total</dt>
                                            <dd className="text-base font-bold text-gray-900">₹&nbsp;{data.totaldiscountprice}</dd>
                                        </dl>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 bg-orange-600">Confirm Your Order</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </form>
                </section>
                )
}

                export default Checkout
