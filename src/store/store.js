import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  });

export const store = makeStore();

export const RootState = undefined;
export const AppDispatch = undefined;
