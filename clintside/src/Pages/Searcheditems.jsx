import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Url from "../../Url";

const Searcheditems = () => {
    const [searchparams] = useSearchParams();
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    const [btntext, setbtntext] = useState('Load More')
    const [lastindex, setlastindex] = useState(50)
    const [firstindex , setfirstindex] = useState(0)
  
    const forward = () => {
      setbtntext('Loading...')
      setfirstindex(lastindex)
      setlastindex(lastindex + 50)
      setbtntext('Load More')
    }
    const backward = ()=>{
      setbtntext('Loading...')
      setlastindex(firstindex)
      setfirstindex(firstindex - 50)
      setbtntext('Load More')
    }

    useEffect(() => {
      const fetchdata = async () => {
        setloading(true)
        try {
          const { data } = await axios.get(`${Url}/api/v1/med/getproduct`)
          setdata(data);
          setloading(false)
        } catch (e) {
          seterror(true)
          setloading(false)
        }
      }
      fetchdata()
    }, [])


    const filterData = data?.filter((item) => {
        return item.name.toLowerCase().includes((searchparams.get('search')).toLowerCase())
    })
    if (error) {
      return (
        <>
          <section className="sm:pb-10 bg-[#eef4f4]">
            <div className="flex flex-wrap bg-white justify-between items-center px-2 sm:px-8 ">
              <h1 className="text-md text-green-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center capitalize">
                {/* {`All Products / ${searchparams.get('category').split('-')[0]+ " " +((searchparams.get('category')).split('-')[1] ? (searchparams.get('category')).split('-')[1] : ""  )  || ""} / ${searchparams.get('subcategory').split('-')[0]+ " " +((searchparams.get('subcategory')).split('-')[1] ? (searchparams.get('subcategory')).split('-')[1] : ""  )  || ""}`} */}
                Showing Results {searchparams.get('search')}
              </h1>
            </div>
            <div className="w-full h-[80vh] flex items-center justify-center">
              <h1 className="text-3xl text-green-500 leading-relaxed tracking-wider font-bold px-2 py-2 text-center capitalize font-poppins"> Error While Fetching Product !!!</h1>
            </div>
          </section>
        </>
      )
    }
    return (
      <div className="">
        {
          loading ?
            <section className="sm:pb-10 bg-[#eef4f4]">
              <div className="flex flex-wrap justify-between items-center px-2 sm:px-8  bg-white">
                <h1 className="text-md text-green-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center">
                  Showing Results "{searchparams.get('search')}"
                </h1>
              </div>
              <div className="w-full h-[80vh] flex items-center justify-center">
                <div class="w-16 h-16 rounded-full animate-spin 
                      border-x-4 border-solid border-green-500 border-t-transparent"></div>
              </div>
            </section>
            :
  
            filterData.length === 0 ? 
            <section className="sm:pb-10 bg-[#eef4f4]">
              <div className="flex flex-wrap bg-white justify-between items-center px-2 sm:px-8 ">
                <h1 className="text-md text-green-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center">
                Showing Results "{searchparams.get('search')}"
                </h1>
              </div>
              <div className="w-full h-[80vh] flex items-center justify-center">
              <h1 className="text-3xl text-green-500 leading-relaxed tracking-wider font-bold px-2 py-2 text-center capitalize font-poppins">No such Product Found</h1>
              </div>
            </section>
            :
            <section className="sm:pb-10 bg-[#eef4f4]">
              <div className="flex flex-wrap bg-white  items-center pb-4 sm:justify-between  px-2 sm:px-8">
                <h1 className="text-md text-green-500 leading-relaxed tracking-wider font-semibold px-2 py-2">
                  Showing Results "{searchparams.get('search')}"
                </h1>
              </div>
              <section className="flex justify-start flex-wrap sm:flex-nowrap">
                <div className="w-full right-0">
                  <div className="w-full sm:px-10 flex flex-wrap justify-center items-center gap-2 sm:gap-10 py-5 sm:py-10">
                    {
                        filterData.slice(firstindex, lastindex)?.map((item, index) => {
                        return <ProductCard key={item.index} name={item.name} index={index} id={item.id} cat={item.category} subcat={item.subcategory} img={item.imageurl} actualprice={item.mrp} discountprice={item.ourPrice} companyname={item.companyName} size={item.size} heart={"yes"}  range={item.range} />
                      })
                    }
                  </div>
                </div>
              </section>
              <div className="w-[90%] mx-auto h-20 ">
              {
                firstindex != 0 ?
                  <div className='sm:w-[150px] h-fit p-1 flex rounded-xl  bg-gray-300 font-bold transition-all duration-500    cursor-pointer justify-center items-center py-2 mx-auto my-5 float-left' onClick={() => backward()}>
                    <button className='w-full h-full text-sm sm:text-lg'>Back</button>
                  </div>
                  :
                  ""
              }
              {
                lastindex < data.length ?
                  <div className='sm:w-[150px] h-fit p-1 flex rounded-xl  bg-gray-300 font-bold transition-all duration-500    cursor-pointer justify-center items-center py-2 mx-auto my-5 float-right' onClick={() => forward()}>
                    <button className='w-full h-full text-sm sm:text-lg'>Next</button>
                  </div>
                  :
                  ""
              }
              </div>
            </section>
        }
      </div>
    );
}

export default Searcheditems
