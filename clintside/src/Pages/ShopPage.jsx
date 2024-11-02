import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import DiscountShop from "../Components/DiscountShop";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Url from "../../Url";

function ShopPage() {
  const [searchparams] = useSearchParams();
  const [data, setdata] = useState([]);
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(true)


  useEffect(() => {
    const fetchdata = async () => {
      setloading(true)
      try {
        let url = ""
        if (searchparams.get('category') && searchparams.get('subcategory')) {
          url = `category=${searchparams.get('category')}&subcategory=${searchparams.get('subcategory')}`
        }
        else if (searchparams.get('category')) {
          url = `category=${searchparams.get('category')}`
        }
        const { data } = await axios.get(`${Url}/api/v1/med/getproduct?${url}`)
        console.log(data)
        setdata(data);
        setloading(false)
      } catch (e) {
        console.log(e)
        seterror(true)
        setloading(false)
      }
    }
    fetchdata()
  }, [])


  if (data.length === 0 ) {
    return (
      <>
        <DiscountShop />
        <section className="sm:pb-10 bg-[#eef4f4]">
          <div className="flex flex-wrap bg-white justify-between items-center px-2 sm:px-8 ">
            <h1 className="text-3xl text-orange-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center capitalize">
              {/* {`All Products / ${searchparams.get('category').split('-')[0]+ " " +((searchparams.get('category')).split('-')[1] ? (searchparams.get('category')).split('-')[1] : ""  )  || ""} / ${searchparams.get('subcategory').split('-')[0]+ " " +((searchparams.get('subcategory')).split('-')[1] ? (searchparams.get('subcategory')).split('-')[1] : ""  )  || ""}`} */}
              Products
            </h1>
          </div>
          <div className="w-full h-[80vh] flex items-center justify-center">
            <h1 className="text-3xl text-orange-500 leading-relaxed tracking-wider font-bold px-2 py-2 text-center capitalize font-poppins">No Product Found</h1>
          </div>
        </section>
      </>
    )
  }

  if (error) {
    return (
      <>
        <DiscountShop />
        <section className="sm:pb-10 bg-[#eef4f4]">
          <div className="flex flex-wrap bg-white justify-between items-center px-2 sm:px-8 ">
            <h1 className="text-3xl text-orange-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center capitalize">
              {/* {`All Products / ${searchparams.get('category').split('-')[0]+ " " +((searchparams.get('category')).split('-')[1] ? (searchparams.get('category')).split('-')[1] : ""  )  || ""} / ${searchparams.get('subcategory').split('-')[0]+ " " +((searchparams.get('subcategory')).split('-')[1] ? (searchparams.get('subcategory')).split('-')[1] : ""  )  || ""}`} */}
              Products
            </h1>
          </div>
          <div className="w-full h-[80vh] flex items-center justify-center">
            <h1 className="text-3xl text-orange-500 leading-relaxed tracking-wider font-bold px-2 py-2 text-center capitalize font-poppins"> Error While Fetching Product !!!</h1>
          </div>
        </section>
      </>
    )
  }
  return (
    <div className="">
      <DiscountShop />

      {
        loading ?
          <section className="sm:pb-10 bg-[#eef4f4]">
            <div className="flex flex-wrap bg-white justify-between items-center px-2 sm:px-8 ">
              <h1 className="text-3xl text-orange-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center capitalize">
                {/* {`All Products / ${searchparams.get('category').split('-')[0]+ " " +((searchparams.get('category')).split('-')[1] ? (searchparams.get('category')).split('-')[1] : ""  )  || ""} / ${searchparams.get('subcategory').split('-')[0]+ " " +((searchparams.get('subcategory')).split('-')[1] ? (searchparams.get('subcategory')).split('-')[1] : ""  )  || ""}`} */}
                Products
              </h1>
            </div>
            <div className="w-full h-[80vh] flex items-center justify-center">
              <div class="w-16 h-16 rounded-full animate-spin 
                    border-x-4 border-solid border-orange-500 border-t-transparent"></div>
            </div>
          </section>
          :
          <section className="sm:pb-10 bg-[#eef4f4]">
            <div className="flex flex-wrap bg-white justify-between items-center px-2 sm:px-8 ">
              <h1 className="text-3xl text-orange-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center capitalize">
                {/* {`All Products / ${searchparams.get('category').split('-')[0]+ " " +((searchparams.get('category')).split('-')[1] ? (searchparams.get('category')).split('-')[1] : ""  )  || ""} / ${searchparams.get('subcategory').split('-')[0]+ " " +((searchparams.get('subcategory')).split('-')[1] ? (searchparams.get('subcategory')).split('-')[1] : ""  )  || ""}`} */}
                Products
              </h1>
            </div>
            <section className="flex justify-start flex-wrap sm:flex-nowrap">
              <div className="w-full right-0">
                <div className="w-full px-10 flex flex-wrap justify-center items-center gap-10 py-10">
                  {
                    data?.map((item) => {
                      return <ProductCard key={item.id} id={item.id} name={item.name} actualprice={item.actualprice} img={item.imageurl} cat={item.category} subcat={item.subcategory} discountprice={item.discountprice} />
                    })
                  }
                </div>
              </div>
            </section>
          </section>
      }
    </div>
  );
}

export default ShopPage;
