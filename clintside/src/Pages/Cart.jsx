import { useDispatch, useSelector } from 'react-redux';
import syrup from "../assets/syrup.jpg"
import { useNavigate } from 'react-router-dom';
import { UpdateQuantity, RemoveFromCart } from '../redux/CartSystem';

function Cart() {
  const { cart } = useSelector((state) => state.cart);
  // console.log(cart);
  const dispatch = useDispatch();

  const navigation = useNavigate();
  const productClick = () => {
    navigation(`/product`)
  }
  const total = (item) => {
    let totalprice = 0;
    item.forEach(element => {
        totalprice = totalprice + element
    });
  };

  return (
    <div>
      <div className="container mx-auto py-16 sm:py-28 px-3 sm:px-0">
        <h1 className="text-orange-500 text-3xl mb-4 font-bold xl:text-5xl">My Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-4 mb-4 px-2">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {cart.length === 0 ? (
              <div className="w-full h-[60vh] text-center flex items-center justify-center font-bold text-4xl">No products in the cart.</div>
            ) : (
              cart.map((medicine, index) => (
                <div key={medicine.id} className='bg-[#ffffffda] shadow-card-shadow hover:shadow-card-hover transition-all duration-500 rounded-xl p-4 flex flex-col gap-3 cursor-pointer'>
                  <div className='flex flex-col lg:flex-row gap-2'>
                    <img src={syrup} alt="" className='w-full lg:w-60  xl:w-80 h-60 object-cover rounded-md' onClick={productClick} />
                    <div className='flex flex-col w-full gap-2'>
                      <div className='flex gap-2'>
                        <span className='text-sm flex h-fit px-2 border rounded-lg bg-[#ddeff1] font-medium w-fit'>{medicine.category}</span>
                        <span className='text-sm h-fit flex px-2 border rounded-lg bg-[#ddeff1] w-fit'>{medicine.subcategory}</span>
                      </div>
                      <div className='flex gap-4'>
                        <h1 className='text-2xl font-bold' onClick={productClick}>{medicine.name}</h1>
                      </div>
                      <div className='flex justify-between flex-grow items-center'>
                        <h1 className='text-2xl font-bold'>${medicine.price}</h1>
                        <div className='flex items-center gap-2'>
                          <input
                            type="number"
                            className='px-2 py-1 border rounded w-16 text-center'
                            value={medicine.quantity}
                            min="1"
                            onChange={(e) => {
                              const quantity = parseInt(e.target.value);
                              if (isNaN(quantity) || quantity < 1) {
                                dispatch(RemoveFromCart(medicine.id));
                              } else {
                                dispatch(UpdateQuantity({ id: medicine.id, quantity }));
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className='flex flex-wrap  items-center justify-between gap-3'>
                        <div className='flex gap-2'>
                          <h1 className='text-2xl font-bold text-blue-600'>Total:</h1>
                          <h1 className='text-2xl font-bold'>${isNaN((medicine.price * medicine.quantity).toFixed(2)) ? '0' : (medicine.price * medicine.quantity).toFixed(2)}</h1>
                        </div>
                        <div className='w-full sm:w-[40%] flex items-center justify-center rounded-xl bg-rose-500 hover:bg-gray-100 transition-all duration-500  px-6 py-2 text-white hover:text-black cursor-pointer' onClick={() => dispatch(RemoveFromCart(medicine.id))}>
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
              <h1 className='font-bold text-xl sm:text-2xl'>Total Products: </h1>
              <span className='font-semibold text-xl sm:text-2xl text-blue-600'>{cart.length}</span>
            </div>
            <div className='flex justify-between border-y-2 py-2'>
              <h1 className='font-bold text-xl sm:text-2xl'>Total Payable Amount:</h1>
              <span className='font-semibold text-xl sm:text-2xl text-blue-600'>${isNaN(total(cart)) ? '0' : total(cart)}</span>
            </div>
            <div className='flex items-center rounded-xl bg-orange-500 hover:bg-white transition-all duration-500 w-full px-6 py-2 text-white hover:text-black cursor-pointer'>
              <span>
                <ion-icon name="checkmark-done-circle-outline" size="large"></ion-icon>
              </span>
              <button className='w-full h-full text-lg'>Place Order</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cart;
