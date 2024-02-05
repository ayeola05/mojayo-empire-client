import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import logoutReducer from "./slices/logoutSlice";
import registerReducer from "./slices/registerSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    logout: logoutReducer,
    register: registerReducer,
  },
});
