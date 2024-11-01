import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const data = ()=>{
    try{
        return JSON.parse(sessionStorage.getItem('cartitem'))
    }catch{
        return []
    }
}
const cartitem = createSlice({
    name: "cartitem",
    initialState: {
        allcartitem: data() ||  [],
        itemsid: [],
        totaldiscountprice:  0,
        totalactualprice:  0,
        totalquatity:  0,
    },

    reducers: {
        initialreducer(state , action){
            const suming = () => {
                state.totalactualprice = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.actualprice * currentValue.quantity), 0)
                state.totaldiscountprice = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.discountprice * currentValue.quantity), 0)
                state.totalquatity = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity), 0)
            }
            suming();
        },
        addtocart(state, action) {
            const ispresent = state.itemsid.find((item) => item == action.payload.id) ? 1 : 0;
            if (ispresent) {
                state.allcartitem.map((item) => {
                    if (item.id == action.payload.id) {
                        const tempquatity = action.payload?.quantity;
                        console.log(tempquatity)
                        tempquatity === undefined ? item.quantity += 1 : item.quantity += tempquatity;
                    }
                })
            }

            else {
                console.log(state.itemprice)
                state.itemsid.push(action.payload.id)
                console.log(action.payload.quantity)
                let tempquatity = 1
                if (action.payload.quantity) {
                    tempquatity = action.payload.quantity
                }
                const newitem = {
                    ...action.payload,
                    quantity: tempquatity
                }

                console.log(newitem)
                state.allcartitem.push(newitem)
            }

            const suming = () => {
                state.totalactualprice = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.actualprice * currentValue.quantity), 0)
                state.totaldiscountprice = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.discountprice * currentValue.quantity), 0)
                state.totalquatity = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity), 0)
            }
            const Priceaccordingtorange = (() => {
                state.allcartitem.map((item) => {
                    if (item.id == action.payload.id) {
                        item.range.map((r) => {
                            if (r.min <= item.quantity && r.max >= item.quantity) {
                                item.discountprice = r.value
                            }
                        })

                        if (item.range[2].max < item.quantity) {
                            item.discountprice = item.range[2].value
                        }
                    }
                })
                suming()
            })();
            sessionStorage.setItem('cartitem' , JSON.stringify(state.allcartitem))
            toast.success("Product Added to Cart", {
                position: "bottom-center"
            })
        },

        deletefmcart(state, action) {
            console.log(action.payload)
            state.allcartitem = state.allcartitem.filter((item) => {
                return item.id != action.payload;
            })

            const suming = () => {
                state.totalactualprice = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.actualprice * currentValue.quantity), 0)
                state.totaldiscountprice = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.discountprice * currentValue.quantity), 0)
                state.totalquatity = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity), 0)
            }
            const Priceaccordingtorange = (() => {
                state.allcartitem.map((item) => {
                    if (item.id == action.payload.id) {
                        item.range.map((r) => {
                            if (r.min <= item.quantity && r.max >= item.quantity) {
                                item.discountprice = r.value
                            }
                        })

                        if (item.range[2].max < item.quantity) {
                            item.discountprice = item.range[2].value
                        }
                    }
                })
                suming()
            })();

            sessionStorage.setItem('cartitem' ,JSON.stringify(state.allcartitem))
            toast.success("Product Removed From Cart", {
                position: "bottom-center"
            })
        },

        increasequat(state, action) {

            state.allcartitem.map((item) => {
                if (item.id == action.payload) {
                    item.quantity++
                }
            })

            const suming = () => {
                state.totalactualprice = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.actualprice * currentValue.quantity), 0)
                state.totaldiscountprice = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.discountprice * currentValue.quantity), 0)
                state.totalquatity = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity), 0)
            }
            suming()
            const Priceaccordingtorange = () => {
                console.log("hello")
                state.allcartitem.map((item) => {
                    if (item.id == action.payload) {
                        item.range.map((r) => {
                            if (r.min <= item.quantity && r.max >= item.quantity) {
                                item.discountprice = r.value
                                console.log(item.discountprice)
                            }
                        })

                        if (item.range[2].max < item.quantity) {
                            item.discountprice = item.range[2].value
                            console.log(item.discountprice)
                        }
                    }
                })
                suming()
            }
            sessionStorage.setItem('cartitem' , JSON.stringify(state.allcartitem))
            Priceaccordingtorange();
        },

        decresequat(state, action) {
            state.allcartitem.map((item) => {
                if (item.id == action.payload) {
                    if (item.quantity == 1) {
                        state.allcartitem = state.allcartitem.filter((item) => {
                            return item.id != action.payload;
                        })
                    }
                    else {
                        item.quantity--;
                    }
                }
            })
            const suming = () => {
                state.totalactualprice = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.actualprice * currentValue.quantity), 0)
                state.totaldiscountprice = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.discountprice * currentValue.quantity), 0)
                state.totalquatity = state.allcartitem.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity), 0)
            }
            suming()
            const Priceaccordingtorange = () => {
                state.allcartitem.map((item) => {
                    if (item.id == action.payload) {
                        item.range.map((r) => {
                            if (r.min <= item.quantity && r.max >= item.quantity) {
                                item.discountprice = r.value
                            }
                        })

                        if (item.range[2].max < item.quantity) {
                            item.discountprice = item.range[2].value
                        }
                    }
                })
                suming()
            }
            sessionStorage.setItem('cartitem' ,JSON.stringify(state.allcartitem))
            Priceaccordingtorange()
        }
    },
})

export default cartitem;
export const { addtocart } = cartitem.actions;
export const { deletefmcart } = cartitem.actions;
export const { increasequat } = cartitem.actions;
export const { decresequat } = cartitem.actions;
export const {initialreducer } = cartitem.actions