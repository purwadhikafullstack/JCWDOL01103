import { configureStore } from '@reduxjs/toolkit';
import loginReducers from './slicer/authSlice';
import formWarehouseReducers from './slicer/formWarehouseSlice';

const store = configureStore({
    reducer: {
      login: loginReducers,
      formWarehouse: formWarehouseReducers
    }
  });
  
  export default store;