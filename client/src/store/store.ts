import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../slices/todoSlice";

export const store = configureStore({
  reducer: todosReducer,
});

export type MyDispatch = typeof store.dispatch;
export type MyState = ReturnType<typeof store.getState>;