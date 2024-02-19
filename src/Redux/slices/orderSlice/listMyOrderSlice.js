import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: null,
  loading: false,
  error: "",
};

export const listMyOrderSlice = createSlice({
  name: "listMyOrder",
  initialState,
  reducers: {
    orderReset: (state) => {
      (state.orders = null), (state.loading = false), (state.error = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listMyOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(listMyOrder.fulfilled, (state, action) => {
        (state.loading = true), (state.orders = action.payload);
      })
      .addCase(listMyOrder.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const listMyOrder = createAsyncThunk(
  "listMyOrder/listMyOrder",
  async (_, { dispatch, getState, fulfillWithValue, rejectWithValue }) => {
    try {
      const {
        login: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:4000/order", config);

      return fulfillWithValue(data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        dispatch(logout.fulfilled());
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export default listMyOrderSlice.reducer;

export const { orderReset } = listMyOrderSlice.actions;
