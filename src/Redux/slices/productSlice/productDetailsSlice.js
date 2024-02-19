import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  product: null,
  error: "",
};

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        (state.loading = false), (state.product = action.payload);
      })
      .addCase(listProductDetails.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const listProductDetails = createAsyncThunk(
  "productDetails/listProductDetails",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/product/${id}`);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export default productDetailsSlice.reducer;
