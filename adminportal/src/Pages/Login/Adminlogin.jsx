import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import axios from 'axios'
import Url from '../../../Url'
function Adminlogin() {
    const [isporocessing , setisprocessing ] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name'], {
        doNotParse: true,
    });
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const checkothers = (value) => {
        return /^(?!\s*$).+/.test(value);
    };

    const handleLoginSubmit =async (e) => {
        e.preventDefault();
        setisprocessing(true)
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(!checkothers(password)){
            setisprocessing(false)
            Swal.fire("Plese enter a valid password")
            return
        }
        
        if (!validateEmail(email)) {
            setisprocessing(false)
            Swal.fire("Please enter a valid email address.");
            return;
        }
        
        try{
            const res = await axios.post(`${Url}/api/v1/admin/logintoaccount` , {
                email : e.target.email.value,
                password : e.target.password.value,
            })

            if(res.status == 200){
                if(res.data.role == "NONE"){
                    Swal.fire({
                        title : "You are Not an Admin",
                        icon : 'warning'
                    })
                    setisprocessing(false)
                    return
                }
                setisprocessing(false)
                setCookie('lgthusr', res.data.token, {
                    path: '/',
                    expires: new Date(Date.now() +(30 * 24 * 60 * 60 * 1000))
                }); 
                setCookie('lgrole', res.data.role, {
                    path: '/',
                    expires: new Date(Date.now() +(30 * 24 * 60 * 60 * 1000))
                });        
                Swal.fire({
                    title : "LoggedIn Sucessfully",
                    icon : 'success'
                }).then(()=>{
                    window.location.href = '/'
                })
                return
            }
            else{
                setisprocessing(false)
                Swal.fire({
                    title : "Bad Request",
                    icon : 'error'
                })
            }
        }catch(e){
            setisprocessing(false)
            console.log(e)
            Swal.fire({
                title : "User id or password did't matched",
                icon : 'error'
            })
        }
    };
    return (
        <div className="w-[100vw] py-10 flex justify-center items-center md:bg-login bg-center bg-no-repeat bg-cover h-[100vh] pt-20 z-40 fixed top-0">
            <div className="bg-[#ffffffd8]  sm:p-16 rounded-3xl w-[90vw] md:w-[40vw] lg:w-[35vw] h-full md:h-fit transition-all duration-300 shadow-card-shadow">
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">Admin Login</h2>
                    <form className="mb-4 " onSubmit={handleLoginSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email ID:</label>
                            <input type="email" name="email" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow duration-300" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password:</label>
                            <input name='password' type="password" required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow duration-300" />
                        </div>
                        <button type="submit" className="w-full bg-orange-500 text-white py-2 mb-4 rounded hover:bg-orange-600 shadow-md transition-all duration-300 items-center flex justify-center">
                            {
                                isporocessing ? 
                                <div className='w-6 h-6 border-r-4 border-white animate-spin rounded-[50%]'></div>
                                :
                                "Login"
                            }
                        </button>
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

export default Adminlogin