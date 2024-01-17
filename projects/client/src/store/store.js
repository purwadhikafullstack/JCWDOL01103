import { configureStore } from '@reduxjs/toolkit';
import loginReducers from './slicer/authSlice';
import formWarehouseReducers from './slicer/formWarehouseSlice';
import formCheckout from './slicer/checkoutSlice';

const store = configureStore({
    reducer: {
      login: loginReducers,
      formWarehouse: formWarehouseReducers,
      formCheckout: formCheckout
    }
  });
  
  export default store;