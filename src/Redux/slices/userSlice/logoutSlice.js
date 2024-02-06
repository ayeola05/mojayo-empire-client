import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "./loginSlice";

export const logoutSlice = createSlice({
  name: "logout",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, () => {
      localStorage.removeItem("userInfo");
    });
  },
});

export const logout = createAsyncThunk(
  "logout/logout",
  async (_, { dispatch }) => {
    dispatch(login.fulfilled(null));
    //   dispatch({ type: USER_DETAILS_RESET });
    // dispatch({ type: ORDER_LIST_MY_RESET });
  }
);

export default logoutSlice.reducer;
