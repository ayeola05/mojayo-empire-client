import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../userSlice/logoutSlice";
import { cartClearItems } from "../cartSlice/cartSlice";

const initialState = {
  loading: false,
  success: false,
  order: null,
  error: "",
};

export const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    resetOrder: (state) => {
      (state.loading = false),
        (state.success = false),
        (state.order = null),
        (state.error = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        (state.loading = false),
          (state.success = true),
          (state.order = action.payload);
        localStorage.removeItem("cartItems");
      })
      .addCase(createOrder.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const createOrder = createAsyncThunk(
  "createOrder/createOrder",
  async (order, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    try {
      console.log(order);
      const {
        login: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:4000/order",
        order,
        config
      );
      dispatch(cartClearItems());
      return fulfillWithValue(data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        dispatch(logout.fulfilled());
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { resetOrder } = createOrderSlice.actions;

export default createOrderSlice.reducer;
