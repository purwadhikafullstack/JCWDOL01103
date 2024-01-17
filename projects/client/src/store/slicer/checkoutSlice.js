import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
  address: null,
  shipping: null,
  payment: null,
};

const formCheckout = createSlice({
  name: "formCheckout",
  initialState,
  reducers: {
    setCartCheckout: (state, action) => {
      state.cart = action.payload;
    },
    setAddressCheckout: (state, action) => {
      state.address = action.payload;
    },
    setShippingCheckout: (state, action) => {
      state.shipping = action.payload;
    },
    setPaymentCheckout: (state, action) => {
      state.payment = action.payload;
    },
  },
});

export const { setAddressCheckout, setCartCheckout, setPaymentCheckout, setShippingCheckout } = formCheckout.actions;
export default formCheckout.reducer;
