import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Url from '../../Url';
const Wishlist = () => {
    const cookie =new Cookies()
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)


    useEffect(() => {
        const fetchdata = async () => {
            setloading(true)
            try {
                if(!cookie.get('lgid')){
                    seterror(true)
                    return
                }
                const id = cookie.get('lgid')
                console.log(id)
                const { data } = await axios.get(`${Url}/api/v1/med/getorderhistory?id=${id}`)
                console.log(data)
                setdata(data);
                setloading(false)
            } catch (e) {
                console.log(e)
                seterror(true)
                setloading(false)
            }
        }
        // fetchdata()
    }, [])


    if (error) {
        return (
            <>
                <section className='w-full h-[80vh] py-10 xl:pt-10 xl:py-0 px-4 lg:px-20 items-center justify-center'>
                    <h1 className='text-3xl font-bold font-poppins text-center py-20 text-orange-500'>Error in fetching Product !!!</h1>
                </section>
            </>
        )
    }
  return (
    <div>
      wishlist
    </div>
  )
}

export default Wishlist
