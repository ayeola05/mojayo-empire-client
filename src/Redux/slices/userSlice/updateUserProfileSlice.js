import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./logoutSlice";
import { login } from "./loginSlice";

const initialState = {
  loading: false,
  success: false,
  userInfo: null,
  error: "",
};

export const updateUserProfileSlice = createSlice({
  name: "updateUserProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        (state.loading = false),
          (state.success = true),
          (state.userInfo = action.payload);
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile/updateUserProfile",
  async (user, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const {
        login: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log(user);
      const { data } = axios.patch(
        "http://localhost:4000/user/profile",
        user,
        config
      );
      //dispatch user login success and pass data

      dispatch(login(data).fulfilled);
      return fulfillWithValue(data);
    } catch (error) {
      if (error.response.data.message === "Unauthorized") {
        dispatch(logout.fulfilled());
      }
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export default updateUserProfileSlice.reducer;
