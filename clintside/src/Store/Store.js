import { configureStore } from "@reduxjs/toolkit";
import cartitem from "./Room";

const store = configureStore({
    reducer:{
        carteditems : cartitem.reducer
    }
})

export default store