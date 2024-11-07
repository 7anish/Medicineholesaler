import React from 'react'
import { useNavigate } from 'react-router-dom'
function ViewAllBut({path}) {
    const navigation = useNavigate();
    const viewClick = ()=>{
        navigation(path)
    }
    return (
        <div>
            <div className='flex justify-center bg-blue-400 rounded-md sm:rounded-xl hover:bg-green-500 transition-all duration-500 w-[90vw] mt-4 sm:w-fit px-0 py-2 sm:px-8 lg:py-2 xl:py-3 text-white cursor-pointer' onClick={viewClick}>
                <button className='text-base lg:text-xl'>View All</button>
            </div>
        </div>
    )
}

export default ViewAllBut