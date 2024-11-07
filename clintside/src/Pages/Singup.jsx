import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';
import Url from '../../Url';
function Singup() {
    const navigate = useNavigate();
    const [isprocess , setisprocess] = useState(false)
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (number) => {
        const re = /^\d{10}$/;
        return re.test(String(number));
    };

    const checkothers = (value) => {
        return /^(?!\s*$).+/.test(value);
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setisprocess(true)
        const email = e.target.email.value;
        const number = e.target.number.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        if(!checkothers(name)){
            setisprocess(false)
            Swal.fire("plese enter a valid name")
            return
        }
        if (!validateEmail(email)) {
            setisprocess(false)
            Swal.fire("Please enter a valid email address.");
            return;
        }
        if (!validatePhoneNumber(number)) {
            setisprocess(false)
            Swal.fire("Please enter a valid phone number.");
            return;
        }

        if(!checkothers(password)){
            setisprocess(false)
            Swal.fire("Plese enter a valid password")
            return
        }

        try{
            const res = await axios.post(`${Url}/api/v1/admin/createaccount` , {
                name : e.target.name.value,
                email : e.target.email.value,
                phonenumber : e.target.number.value,
                password : e.target.password.value,
                lsno : e.target.b2b?.vaule
            })

            if(res.status == 201){
                setisprocess(false)
                Swal.fire({
                    title : "Account Created",
                    icon : 'success'
                })
                navigate('/login')
                return
            }
            else{
                setisprocess(false)
                Swal.fire({
                    title : "Bad Request",
                    icon : 'error'
                })
            }
        }catch(e){
            setisprocess(false)
            Swal.fire({
                title : "Somthing went wrong",
                icon : 'error'
            })
        }
    }

    return (
        <div className="w-full py-10 flex justify-center items-center md:bg-login bg-center bg-no-repeat bg-cover md:min-h-screen pt-20">
            <div className="bg-[#ffffffd8]  sm:p-16 rounded-3xl w-[90vw] md:w-[40vw] lg:w-[35vw] h-full md:h-fit transition-all duration-300">
            <div className={`mb-3`}>
                <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Signup</h2>
                <form onSubmit={handleSignupSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input name='name' type="text" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-300" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Number:</label>
                        <input type="tel" name="number" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-300" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input type="email" name="email" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-300" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password:</label>
                        <input name='password' type="password" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-300" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">B2B Licence Number (optional):</label>
                        <input name='b2b' type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-300" />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 mb-4 rounded hover:bg-green-600 shadow-md transition-all duration-300 items-center flex justify-center">
                            {
                                isprocess ? 
                                <div className='w-6 h-6 border-r-4 border-white animate-spin rounded-[50%]'></div>
                                :
                                "Sing Up"
                            }
                        </button>
                    <div className="text-center">
                        <NavLink to={'/login'} className="text-blue-500 hover:text-blue-700 transition-colors duration-300" >
                            Already a user? Log-in
                        </NavLink>
                    </div>
                </form>
            </div>
            </div>
        </div>

    )
}

export default Singup