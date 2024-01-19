import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItemCount: (state, action) => {
      state.itemCount = action.payload;
    },
  },
});

export const { setItemCount } = cartSlice.actions;

export default cartSlice.reducer;
