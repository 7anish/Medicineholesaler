import React , {useEffect , useState} from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';


const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['name']);
    const locatin = useLocation()
    const [login, setlogin] = useState(true)

    useEffect(() => {
        if (cookies.lgthusr) {
            setlogin(false)
        }
    }, [])

    const handlelogout = () => {
        console.log("hello")
        Swal.fire({
            title: "Do you want Logout",
            showCancelButton: true,
            confirmButtonText: "Logout",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                removeCookie('lgthusr')
                removeCookie('lgid')
                removeCookie('lgrole')
                localStorage.removeItem('information')
                Swal.fire("Logout Sucessfully");
                window.location.href = "/login"
            }
        });
    }
    return (
        <div className={`${locatin.pathname == '/login' ? 'md:w-full' : 'md:w-[80vw]'} flex justify-between fixed items-center h-[7.90vh] w-full  z-[10] right-0 p-4 bg-gray-800 text-white`}>
            <Link to="/" className="text-2xl font-bold">
                <div className=' font-bold text-xl lg:text-3xl md:hidden flex'>Medical<span className='text-orange-600 text-lg lg:text-3xl'>Wholesale</span> </div>
            </Link>
            {
                !(login )?
                    <div className='text-white-600 flex font-bold lg:text-xl px-5 cursor-pointer justify-center items-center gap-1' onClick={() => handlelogout()}>
                        Logout<MdLogout className='text-orange-600' />
                    </div>
                    :
                    ""
            }
        </div>
    )
};

export default Navbar