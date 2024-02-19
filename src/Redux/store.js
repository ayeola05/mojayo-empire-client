import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/userSlice/loginSlice";
import logoutReducer from "./slices/userSlice/logoutSlice";
import registerReducer from "./slices/userSlice/registerSlice";
import userDetailsReducer from "./slices/userSlice/userDetailsSlice";
import productListReducer from "./slices/productSlice/productListSlice";
import createOrderReducer from "./slices/orderSlice/createOrderSlice";
import listMyOrderReducer from "./slices/orderSlice/listMyOrderSlice";
import updateUserProfileReducer from "./slices/userSlice/updateUserProfileSlice";
import productDetailsReducer from "./slices/productSlice/productDetailsSlice";
import productReviewReducer from "./slices/productSlice/createProductReviewSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    logout: logoutReducer,
    register: registerReducer,
    userDetails: userDetailsReducer,
    productList: productListReducer,
    createOrder: createOrderReducer,
    listMyOrder: listMyOrderReducer,
    updateUserProfile: updateUserProfileReducer,
    productDetails: productDetailsReducer,
    productReview: productReviewReducer,
  },
});
