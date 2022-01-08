import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/userSlice";
import cartItemsSlice from "./shopping-cart/cartItemsSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    shoppingCart: cartItemsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
