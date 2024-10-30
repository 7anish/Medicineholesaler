import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import DiscountShop from "../Components/DiscountShop";
import { useSearchParams } from "react-router-dom";
import axios from "axios";


function ShopPage() {
  const [searchparams] = useSearchParams();
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let url =""
        if (searchparams.get('category') && searchparams.get('subcategory')) {
          url = `category=${searchparams.get('category')}&subcategory=${searchparams.get('subcategory')}`
        }
        else if (searchparams.get('category')) {
          url = `category=${searchparams.get('category')}`
        }
        const { data } = await axios.get(`https://medicineholesaler-production.up.railway.app/api/v1/med/getproduct?${url}`)
        console.log(data)
        setdata(data);
      } catch (e) {
        console.log(e)
      }
    }
    fetchdata()
  }, [])
  return (
    <div className="">
      <DiscountShop />
      <section className="sm:pb-10 bg-[#eef4f4]">
        <div className="flex flex-wrap bg-white justify-between items-center px-2 sm:px-8 ">
          <h1 className="text-3xl text-orange-500 leading-relaxed tracking-wider font-semibold px-2 py-2 text-center">
            All Products
          </h1>
        </div>
        <section className="flex justify-start flex-wrap sm:flex-nowrap">
          <div className="w-full right-0">
            <div className="w-full px-10 flex flex-wrap justify-center items-center gap-10 py-10">
              {
                data?.map((item)=>{
                  return <ProductCard key={item.id} id={item.id} name={item.name} actualprice={item.actualprice} img={item.imageurl} cat={item.category} subcat={item.subcategory} discountprice={item.discountprice} />
                })
              }
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default ShopPage;
