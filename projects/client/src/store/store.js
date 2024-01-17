import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "./slicer/authSlice";
import formWarehouseReducers from "./slicer/formWarehouseSlice";
import cartReducer from "./slicer/cartSlice";

const store = configureStore({
  reducer: {
    login: loginReducers,
    formWarehouse: formWarehouseReducers,
    cart: cartReducer,
  },
});

export default store;
