import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/CartSystem";

const Store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default Store;
