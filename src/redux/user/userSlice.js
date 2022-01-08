import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

export const getUser = createAsyncThunk("users/getUser", async () => {
  return authApi.getUser((res) => {
    if (res.data.status === 200) {
      res.data.user.json();
    }
  });
});

const initialState = {
  value: null,
  status: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state) => {
      state.status = "loading";
    },
    [getUser.rejected]: (state) => {
      state.status = "failed";
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.value = action.payload;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
