import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { login } from "./loginSlice";

const initialState = {
  loading: false,
  userInfo: null,
  error: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerUser: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        console.log("register success");
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const register = createAsyncThunk(
  "register/register",
  async (
    { name, email, password },
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:4000/auth/register",
        { name, email, password },
        config
      );

      dispatch(login.fulfilled(data));

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export default registerSlice.reducer;

export const { registerUser } = registerSlice.actions;
