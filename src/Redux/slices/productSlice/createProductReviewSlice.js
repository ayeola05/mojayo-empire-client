import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../userSlice/logoutSlice";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const productReviewSlice = createSlice({
  name: "productReview",
  initialState,
  reducers: {
    createReviewReset: (state) => {
      (state.loading = false), (state.success = false), (state.error = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reviewProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(reviewProducts.fulfilled, (state) => {
        (state.loading = false), (state.success = true);
      })
      .addCase(reviewProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const reviewProducts = createAsyncThunk(
  "productsReview/reviewPRoducts",
  async ({ productId, review }, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(review);
      const {
        login: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `http://localhost:4000/product/${productId}/review`,
        review,
        config
      );
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        dispatch(logout.fulfilled());
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { createReviewReset } = productReviewSlice.actions;

export default productReviewSlice.reducer;
