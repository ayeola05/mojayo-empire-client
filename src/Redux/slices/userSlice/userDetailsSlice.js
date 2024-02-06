import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  user: {},
  loading: false,
  error: "",
};

// export const userDetailsReducer = (state = { user: {} }, action) => {
//   switch (action.type) {
//     case USER_DETAILS_REQUEST:
//       return { ...state, loading: true };
//     case USER_DETAILS_SUCCESS:
//       return { loading: false, user: action.payload };
//     case USER_DETAILS_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_DETAILS_RESET:
//       return { user: {} };
//     default:
//       return state;
//   }
// };

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
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
  async (_, { dispatch, getState }) => {
    try {
      const {
        login: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`http://localhost:4000/users/${id}`);
    } catch (error) {}
  }
);

// export const getUserDetails = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: USER_DETAILS_REQUEST });
//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(`/api/users/${id}`, config);
//     dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "Not authorized, token failed") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: USER_DETAILS_FAIL,
//       payload: message,
//     });
//   }
// };

export default userDetailsSlice.reducer;
