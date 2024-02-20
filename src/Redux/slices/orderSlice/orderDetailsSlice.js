import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../userSlice/logoutSlice";

const initialState = {
  loading: false,
  order: null,
  orderItems: [],
  shippingAddress: {},
  error: "",
};

export const getOrderDetailsSlice = createSlice({
  name: "getOrderDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        (state.loading = false), (state.order = action.payload);
      });
  },
});

export const orderDetails = createAsyncThunk(
  "getOrderDetails/orderDetails",
  async (id, { getState, fulfillWithValue, dispatch, rejectWithValue }) => {
    try {
      const {
        login: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:4000/order/${id}`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        dispatch(logout.fulfilled());
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);
