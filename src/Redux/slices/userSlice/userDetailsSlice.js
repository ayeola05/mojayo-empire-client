import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { logout } from "./logoutSlice";

const initialState = {
  user: {},
  loading: false,
  error: "",
};

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    userDetailReset: (state) => {
      state.user = {};
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        (state.user = { ...state.user }), (state.loading = true);
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        (state.loading = false), (state.user = action.payload);
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const getUserDetails = createAsyncThunk(
  "userDetails/getUserDetails",
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

      const { data } = await axios.get(
        `http://localhost:4000/user/profile`,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Unauthorized") {
        dispatch(logout.fulfilled());
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { userDetailReset } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
