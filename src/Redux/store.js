import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/userSlice/loginSlice";
import logoutReducer from "./slices/userSlice/logoutSlice";
import registerReducer from "./slices/userSlice/registerSlice";
import userDetailsReducer from "./slices/userSlice/userDetailsSlice";
import productListReducer from "./slices/productSlice/productListSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    logout: logoutReducer,
    register: registerReducer,
    userDetails: userDetailsReducer,
    productList: productListReducer,
  },
});
