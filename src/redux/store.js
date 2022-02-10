import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/userSlice";
import cartItemsSlice from "./shopping-cart/cartItemsSlice";
import favoriteItemsSlice from "./favorite-products/favoriteItemsSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    shoppingCart: cartItemsSlice,
    favoriteProducts: favoriteItemsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
