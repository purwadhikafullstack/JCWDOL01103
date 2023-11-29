import { configureStore } from "@reduxjs/toolkit"
import addressReducer from "./../features/addressSlice"

const store = configureStore({
  reducer: {
    address: addressReducer,
  },
})

export default store
