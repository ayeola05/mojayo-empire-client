import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartSaveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    cartSavePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
    cartClearItems: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existItem = state.cartItems.find(
          (x) => x.product === item.product
        );
        if (existItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }
      })
      .addCase(cartRemoveItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        console.log(action.payload);
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
      });
  },
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId: id, qty },
    { rejectWithValue, fulfillWithValue, dispatch, getState }
  ) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/product/${id}`);

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );

      return fulfillWithValue({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      });
    } catch (error) {}
  }
);

export const cartRemoveItem = createAsyncThunk(
  "cart/cartRemoveItem",
  async (id, { getState, fulfillWithValue }) => {
    try {
      const remainingItems = getState().cart.cartItems.filter(
        (x) => x.product !== id
      );
      // localStorage.setItem(
      //   "cartItems",
      //   JSON.stringify(getState().cart.cartItems)
      // );
      return fulfillWithValue(remainingItems);
    } catch (error) {}
  }
);

export const {
  cartSaveShippingAddress,
  cartSavePaymentMethod,
  cartClearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
