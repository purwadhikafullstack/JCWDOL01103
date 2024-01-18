import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedWarehouse: null,
};

const formWarehouseSlice = createSlice({
  name: "formWarehouse",
  initialState,
  reducers: {
    setSelectedWarehouse: (state, action) => {
      state.selectedWarehouse = action.payload;
    },
  },
});

export const { setSelectedWarehouse } = formWarehouseSlice.actions;
export default formWarehouseSlice.reducer;
