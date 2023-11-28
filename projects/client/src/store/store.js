import { configureStore } from '@reduxjs/toolkit';
import loginReducers from './slicer/authSlice';

const store = configureStore({
    reducer: {
      login: loginReducers
    }
  });
  
  export default store;