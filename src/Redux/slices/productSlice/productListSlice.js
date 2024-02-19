import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  pages: null,
  page: null,
  error: "",
};

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        (state.loading = true), (state.products = []);
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        (state.loading = false),
          (state.pages = action.payload.pages),
          (state.page = action.payload.page),
          (state.products = action.payload.products);
      })
      .addCase(listProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const listProducts = createAsyncThunk(
  "productList/listProduct",
  async (
    { keyword = " ", pageNumber = " " },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/product/getProducts`
      );

      // http://localhost:4000/product/getProducts?keyword=${keyword}&pageNumber=${pageNumber}

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export default productListSlice.reducer;
