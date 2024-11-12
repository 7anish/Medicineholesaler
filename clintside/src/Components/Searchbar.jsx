import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Url from '../../Url';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const navigate = useNavigate()
    const [data, setdata] = useState([])
    const [Search, setsearch] = useState("")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await axios.get(`${Url}/api/v1/med/searchlist`)
                setdata(data)
                console.log(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchdata()
    }, [])

    const filterData = data?.filter((item) => {
        return item.name.toLowerCase().includes(Search.toLowerCase())
    })
    return (
        <div className='relative'>
            <div className='flex items-center justify-between border rounded-2xl border-black p-1 px-2 relative shadow-xl'>
                <input
                    type="text"
                    className='w-[200px]  outline-none pl-2 focus:w-[280px] inputwidt'
                    placeholder='Search Products'
                    value={Search}
                    onChange={(e) => setsearch(e.target.value)}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setOpen(false)}
                />
                <FaSearch className='cursor-pointer text-green-500' size={20} />
            </div>
            {open && (
                <div className='w-[300px] h-fit absolute bg-white top-[100%] rounded-xl left-3 z-40 flex flex-col'>
                    {
                        filterData.length === 0 ? 
                        <p className={`text-black cursor-pointer p-1 bg-gray-100`}>
                            No Result Found
                        </p>
                        :
                        filterData.slice(0,10).map((item, index) => (
                        <p
                            className={`text-black cursor-pointer p-1 ${index % 2 ? 'bg-gray-200' : 'bg-gray-50'}`}
                            onMouseDown={() => navigate(`/product/${item.id}`)}
                        >
                            {item.name}
                        </p>
                    ))}
                </div>
            )}
        </div>

    )
}

export default Searchbar
