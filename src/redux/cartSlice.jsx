import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingInformation: {}, paymentMethod: "COD" };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        // If the item with the same ID , update its quantity
        state.cartItems = state.cartItems.map((item) =>
          item.id === existingItem.id
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
                price: (item.quantity + newItem.quantity) * newItem.price,
              }
            : item
        );
      } else {
        state.cartItems = [
          ...state.cartItems,
          {
            ...newItem,
            price: newItem.price * newItem.quantity,
            isEditing: false,
          },
        ];
      }

      return updateCart(state);
    },
    increaseQuantity(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.price / item.quantity,
            }
          : item
      );
      return updateCart(state);
    },
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - item.price / item.quantity,
            }
          : item
      );
      return updateCart(state);
    },
    toggleEditQuantity(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              isEditing: !item.isEditing, // Toggle the isEditing property
            }
          : item
      );
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => !(item.id === id));

      // Check if the cart is empty after removing the item
      if (state.cartItems.length === 0) {
        state.cartItems = [];
        state.itemsPrice = null;
        state.shippingPrice = null;
        state.totalPrice = null;
        state.subtotal = null;
        localStorage.removeItem("cart");
      } else {
        // If the cart is not empty, update the cart prices
        updateCart(state);
      }
    },
    saveShippingInformation: (state, action) => {
      state.shippingInformation = {
        ...state.shippingInformation,
        ...action.payload,
      };
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      state.itemsPrice = null;
      state.shippingPrice = null;
      state.totalPrice = null;
      state.taxPrice = null;
      localStorage.removeItem("cart");
    },
    resetCart: (state) => (state = initialState),
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  savePaymentMethod,
  saveShippingInformation,
  resetCart,
  clearCartItems,
  toggleEditQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
