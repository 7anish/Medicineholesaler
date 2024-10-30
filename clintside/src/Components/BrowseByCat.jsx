import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ViewAllBut from './ViewAllBut';
import axios from 'axios';
import { HashLink } from 'react-router-hash-link';

function BrowseByCat() {
    const [categories, setategories] = useState([])
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchcat = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/api/v1/med/getcategory")
                setategories(data)
                console.log(data)
                seterror(false)
                setloading(false)
            } catch (e) {
                console.log(e)
                seterror(true)
                setloading(false)
            }
        }

        fetchcat()
    },[])
    const navigation = useNavigate();
    const handleClick = (subcategory) => {
        navigation(`/category/#${subcategory}`)
    }

    if (error) {
        return (
            <>
                <section className='py-10 xl:pt-10 xl:py-0 px-4 lg:px-20'>
                    <div className='flex flex-wrap gap-2 sm:gap-0 py-2 mb-4 justify-between items-center'>
                        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>Browse by Categories</h1>
                        <ViewAllBut />
                    </div>
                    <h1 className='text-3xl font-bold font-poppins text-center py-20'>Error in fetchin Category !!!</h1>
                </section>
            </>
        )
    }
    return (
        <div>
            <section className='py-10 xl:pt-10 xl:py-0 px-4 lg:px-20'>
                <div className='flex flex-wrap gap-2 sm:gap-0 py-2 mb-4 justify-between items-center'>
                    <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold sm:text-center'>Browse by Categories</h1>
                    <ViewAllBut />
                </div>
                <div className='grid place-content-center grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4 xl:gap-10 lg:px-4 xl:px-10 lg:py-8  xl:py-16'>
                    {
                        categories.map((category, index) => (
                            <HashLink  to={`/category/#${category.category}`} key={index}  className={`rounded-xl cursor-pointer flex flex-col items-center justify-center p-3 hover:scale-105 duration-300`} style={{backgroundColor : category.bg , color : category.text}}>
                                <div className='flex flex-col justify-between gap-2 items-center'>
                                    <ion-icon name={category.img} class='text-3xl xl:text-4xl'></ion-icon>
                                    <h1 className='text-xl font-semibold text-center capitalize'>{(category.category).split('-')[0]+ " " +((category.category).split('-')[1] ? (category.category).split('-')[1] : ""  )}</h1>
                                </div>
                            </HashLink>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default BrowseByCat