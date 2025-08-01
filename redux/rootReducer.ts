import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import userSlice from "@/redux/slice/userSlice";

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  user: userSlice,
});
