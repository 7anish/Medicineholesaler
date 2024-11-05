import React from 'react'
import { TbCoinRupee } from "react-icons/tb";

const DashBoard = () => {
    return (
        <div className="p-4 absolute top-[8vh] right-0 w-full md:w-[80vw]">
            <h1 className="text-xl lg:text-3xl font-bold mb-4">Dashboard</h1>
            <div className='flex  flex-wrap justify-center gap-4 md:gap-10 bg-red-50'>
                <div className='w-[300px] h-full py-4 p-2 bg-red-300 flex justify-center items-center px-10 rounded-2xl'>
                    <div>
                    <TbCoinRupee size={40} className='text-white' />
                    </div>
                    <div>
                        <h1 className='text-2xl font-extrabold'>Total Earning</h1>
                        <p className='text-xl font-medium'>$019812</p>
                    </div>
                </div>
                <div className='w-[300px] h-full py-4 p-2 bg-red-300 flex justify-center items-center px-10 rounded-2xl'>
                    <div>
                    <TbCoinRupee size={40} className='text-white' />
                    </div>
                    <div>
                        <h1 className='text-2xl font-extrabold'>Total Earning</h1>
                        <p className='text-xl font-medium'>$019812</p>
                    </div>
                </div>
                <div className='w-[300px] h-full py-4 p-2 bg-red-300 flex justify-center items-center px-10 rounded-2xl'>
                    <div>
                    <TbCoinRupee size={40} className='text-white' />
                    </div>
                    <div>
                        <h1 className='text-2xl font-extrabold'>Total Earning</h1>
                        <p className='text-xl font-medium'>$019812</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
