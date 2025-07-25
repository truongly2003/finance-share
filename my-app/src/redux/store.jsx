import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../features/post/postSlice";
export const store = configureStore({
  reducer: {
    posts: postSlice,
  },
});
