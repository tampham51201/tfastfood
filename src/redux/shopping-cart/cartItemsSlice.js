import { createSlice } from "@reduxjs/toolkit";
const items =
  localStorage.getItem("cartItems") != null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const initialState = {
  value: items,
};
export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const newItem = action.payload;

      const dublicate = findItem(state.value, newItem);

      if (dublicate.length > 0) {
        state.value = delItem(state.value, newItem);

        state.value = [
          ...state.value,
          {
            ...newItem,
            id: dublicate[0].id,
            quantity: newItem.quantity + dublicate[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...newItem,
            id:
              state.value.length > 0
                ? state.value[state.value.length - 1].id + 1
                : 1,
          },
        ];
      }

      localStorage.setItem("cartItems", JSON.stringify(sortItems(state.value)));
    },
    updateItems: (state, action) => {
      const itemUpdate = action.payload;

      const item = findItem(state.value, itemUpdate);

      if (item.length > 0) {
        state.value = delItem(state.value, itemUpdate);
        state.value = [
          ...state.value,
          {
            ...itemUpdate,
            id: item[0].id,
          },
        ];
        localStorage.setItem(
          "cartItems",
          JSON.stringify(sortItems(state.value))
        );
      }
    },
    removeItem: (state, action) => {
      const itemDelete = action.payload;

      state.value = delItem(state.value, itemDelete);

      localStorage.setItem("cartItems", JSON.stringify(sortItems(state.value)));
    },
  },
});
const findItem = (arr, item) =>
  arr.filter((e) => e.slug === item.slug && e.idUser === item.idUser);

const delItem = (arr, item) =>
  arr.filter((e) => e.slug !== item.slug || e.idUser !== item.idUser);

const sortItems = (arr) =>
  arr.sort((a, b) => {
    return a.id - b.id;
  });

export const { addItems, updateItems, removeItem } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
