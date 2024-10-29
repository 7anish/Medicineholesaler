import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Login from '../assets/LogIn.jpg'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import axios from 'axios'
function LogInPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name'], {
        doNotParse: true,
    });
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (number) => {
        const re = /^\d{10}$/;
        return re.test(String(number));
    };

    const handleLoginSubmit =async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if (!validateEmail(email)) {
            Swal.fire("Please enter a valid email address.");
            return;
        }
        
        try{
            const res = await axios.post('http://localhost:8000/api/v1/admin/logintoaccount' , {
                email : e.target.email.value,
                password : e.target.password.value,
            })

            if(res.status == 200){
                setCookie('lgthusr' , res.data.token , {
                    path : '/',
                    expires : ''
                })
                Swal.fire({
                    title : "LoggedIn Sucessfully",
                    icon : 'success'
                }).then(()=>{
                    window.location.href = '/'
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
                title : "Somthing went wrong",
                icon : 'error'
            })
        }
    };
    return (
        <div className="w-full py-10 flex justify-center items-center md:bg-login bg-center bg-no-repeat bg-cover md:min-h-screen pt-20">
            <div className="bg-[#ffffffd8]  sm:p-16 rounded-3xl w-[90vw] md:w-[40vw] lg:w-[35vw] h-full md:h-fit transition-all duration-300">
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">Login</h2>
                    <form className="mb-4" onSubmit={handleLoginSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email ID:</label>
                            <input type="email" name="email" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow duration-300" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password:</label>
                            <input name='password' type="password" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow duration-300" />
                        </div>
                        <button type="submit" className="w-full bg-orange-500 text-white py-2 mb-4 rounded hover:bg-orange-600 shadow-md transition-all duration-300">Login</button>
                        <div  className="text-center">
                            <NavLink to={'/singup'} className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                                New User? Sign-in
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogInPage