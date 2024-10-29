import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart: [],
    quantity: 0,
    totalAmount: 0,
};

export const CartSystem = createSlice({
    name: "user",
    initialState,
    reducers: {
        AddCart(state, action) {
            const product = action.payload;
            const existingProductIndex = state.cart.findIndex(
                (item) => item.id === product.id
            );

            if (existingProductIndex >= 0) {
                // If the product already exists, update its quantity
                state.cart[existingProductIndex].quantity += 1;
            } else {
                // If the product is new, add it to the cart with quantity of 1
                state.cart.push({ ...product, quantity: 1 });
            }

            // Update cart quantity and total amount
            state.quantity += 1;
            state.totalAmount += product.price;
            toast.success("Product Added to Cart", {
                position: "bottom-center"
            })

        },
        UpdateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const productIndex = state.cart.findIndex((item) => item.id === id);

            if (productIndex >= 0) {
                const product = state.cart[productIndex];
                const quantityChange = quantity - product.quantity;

                // Update product quantity and adjust totalAmount accordingly
                product.quantity = quantity;
                state.quantity += quantityChange;
                state.totalAmount += quantityChange * product.price;
            }
        },
        RemoveFromCart(state, action) {
            const productId = action.payload;
            const productIndex = state.cart.findIndex(
                (item) => item.id === productId
            );

            if (productIndex >= 0) {
                const product = state.cart[productIndex];

                // Update quantity and totalAmount
                state.quantity -= product.quantity;
                state.totalAmount -= product.quantity * product.price;

                // Remove product from the cart
                state.cart.splice(productIndex, 1);
            }
            toast.success("Product Removed from cart", {
                position: "bottom-center"
            })
        },
    },
});

export const { AddCart, UpdateQuantity, RemoveFromCart } = CartSystem.actions;
export default CartSystem.reducer;
