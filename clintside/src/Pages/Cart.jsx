import syrup from "../assets/syrup.jpg"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deletefmcart } from "../Store/Room";
import { increasequat } from "../Store/Room";
import { decresequat } from "../Store/Room";


function Cart() {
  const navigate = useNavigate()
  const dispatc = useDispatch()
  const deleteitem = (payload)=>{
    dispatc(deletefmcart(payload))
  }

  const decrese = (payload)=>{
    dispatc(decresequat(payload))
  }

  const increse = (payload)=>{
    dispatc(increasequat(payload))
  }

  const data = useSelector((state) => {
    return state.carteditems
  })

  const cartdata = data.allcartitem
  const checkout = ()=>{
    if(cartdata.length === 0 ){

    }else{
      navigate('/checkout')
    }
  }
  return (
    <div>
      <div className="container mx-auto py-16 sm:py-28 px-3 sm:px-0">
        <h1 className="text-orange-500 text-3xl mb-4 font-bold xl:text-5xl">My Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-4 mb-4 px-2">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {cartdata.length === 0 ? (
              <div className="w-full h-[60vh] text-center flex items-center justify-center font-bold text-4xl">No products in the cart.</div>
            ) : (
              cartdata.map((medicine, index) => (
                <div key={medicine.id} className='bg-[#ffffffda] shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col gap-3 cursor-pointer h-fit'>
                  <div className='flex flex-col lg:flex-row gap-2'>
                    <img src={medicine.img} alt="" className='lg:w-[40%] w-[100%] h-46 object-cover rounded-md border-black border-[1px]' />
                    <div className="w-full flex flex-col  justify-between p-2 sm:p-5 gap-4">
                      <div className='flex flex-col w-full gap-2'>
                        <div className='flex gap-2'>
                          <span className='text-sm flex h-fit px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit'>{medicine.cat}</span>
                          <span className='text-sm h-fit flex px-2 border rounded-lg bg-[#ddeff1] w-fit'>{medicine.subcat}</span>
                        </div>
                        <div className='flex gap-4'>
                          <h1 className='text-2xl font-bold'>{medicine.name}</h1>
                        </div>
                      </div>
                      <div className='flex justify-between items-center sm:gap-10 gap-2 flex-wrap'>
                          <h1 className='text-xl font-bold'>Price :₹&nbsp;{medicine.discountprice}</h1>
                          <div className='flex items-center justify-center'>
                          <p className='text-xl font-bold mr-3  '>Quantity</p>
                                    <button
                                    onClick={()=> decrese(medicine.id)}
                                        className='px-2 py-1 bg-gray-200 border-gray-300 border-[1px]'
                                    >
                                        -1
                                    </button>
                                    <span className='py-1 px-3 border-black border-[1px]'>{medicine.quantity}</span>
                                    <button
                                    onClick={()=> increse(medicine.id)}
                                        className='px-2 py-1 bg-gray-200 border-gray-300 border-[1px]'
                                    >
                                        +1
                                    </button>
                                </div>
                          
                          {/* <h1 className='text-lg font-bold'>Quantity :&nbsp;{medicine.quantity}</h1> */}
                      </div>
                      <div className='flex flex-wrap items-center justify-between gap-3 '>
                      <div>
                      <h1 className='text-xl font-bold'>Total : ₹&nbsp;{(+medicine.discountprice)*(+medicine.quantity)}</h1>
                      <h1 className='text-sm font-bold text-red-600 line-through'>₹&nbsp;{(+medicine.actualprice)*(+medicine.quantity)}</h1>
                      </div>
                        <div className='w-full sm:w-[40%] flex items-center justify-center rounded-xl bg-rose-500 hover:bg-gray-100 transition-all duration-500  px-6 py-2 text-white hover:text-black cursor-pointer' onClick={()=> {
                          deleteitem(medicine.id)
                          }}>
                          <ion-icon name="trash-outline"></ion-icon>
                          <button className='w-full h-full text-lg'>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              ))
            )}
          </div>
          <section className={`flex flex-col gap-4 pt-10 static lg:sticky lg:top-32 lg:w-[28vw] shadow-card-shadow rounded-xl h-fit py-10 bg-gray-100 px-4`}>
            <h1 className='text-xl sm:text-3xl font-bold text-blue-500'>Check Out</h1>
            <div className='flex justify-between'>
              <h1 className='font-bold text-xl sm:text-2xl'>Total Quantity: </h1>
              <span className='font-semibold text-xl sm:text-2xl text-blue-600'>{data.totalquatity}</span>
            </div>
            <div className='flex justify-between  pb-1'>
              <h1 className='font-bold text-xl sm:text-2xl'>Total Amount:</h1>
              <span className='font-semibold text-xl sm:text-2xl text-blue-600'>₹&nbsp;{data.totalactualprice}</span>
            </div>
            <div className='flex justify-between  pb-1'>
              <h1 className='font-bold text-xl sm:text-2xl'>Discount:</h1>
              <span className='font-semibold text-xl sm:text-2xl text-blue-600'>₹&nbsp;{data.totalactualprice-data.totaldiscountprice}</span>
            </div>
            <div className='flex justify-between border-y-2 py-2'>
              <h1 className='font-bold text-xl sm:text-2xl'>Total Payable Amount:</h1>
              <span className='font-semibold text-xl sm:text-2xl text-blue-600'>₹&nbsp;{data.totaldiscountprice}</span>
            </div>
            <div className='flex items-center rounded-xl bg-orange-500 hover:bg-white transition-all duration-500 w-full px-6 py-2 text-white hover:text-black cursor-pointer'>
              <span>
                <ion-icon name="checkmark-done-circle-outline" size="large"></ion-icon>
              </span>
              <button className='w-full h-full text-lg' onClick={checkout}>Place Order</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


export default Cart;
