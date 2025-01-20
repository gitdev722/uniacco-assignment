import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/favouritesSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
