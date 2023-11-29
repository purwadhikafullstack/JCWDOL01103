import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import addressService from "../api/api"

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    provinces: [],
    cities: [],
  },

  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload
    },
    addAddresses: (state, action) => {
      state.addresses.push(action.payload)
    },
    deleteAddresses: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.address_id !== action.payload
      )
    },
    updateAddresses: (state, action) => {
      const index = state.addresses.findIndex(
        (address) => address.address_id === action.payload.address_id
      )
      if (index !== -1) state.addresses[index] = action.payload
    },
    setProvinces: (state, action) => {
      state.provinces = action.payload
    },
    setCities: (state, action) => {
      state.cities = action.payload
    },
  },
})

export const {
  setAddresses,
  addAddresses,
  deleteAddresses,
  updateAddresses,
  setProvinces,
  setCities,
} = addressSlice.actions

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async () => {
    const addresses = await addressService.getAddresses()
    // console.log("List address", addresses)
    return addresses
  }
)

export const deleteAddressAsync = createAsyncThunk(
  "address/deleteAddress",
  async (addressId) => {
    await addressService.deleteAddress(addressId)
    return addressId
  }
)

export const fetchProvinces = createAsyncThunk(
  "address/fetchProvinces",
  async () => {
    const provinces = await addressService.getProvinces()
    return provinces
  }
)
export const fetchCities = createAsyncThunk(
  "address/fetchCities",
  async (selectedProvinces) => {
    const cities = await addressService.getCities(selectedProvinces)
    return cities
  }
)

export const addAddressAsync = createAsyncThunk(
  "address/addAddress",
  async (newAddress) => {
    const response = await addressService.createAddress(newAddress)
    return response
  }
)

export const updateAddressAsync = createAsyncThunk(
  "address/updateAddress",
  async ({ addressId, updatedAddress }) => {
    const response = await addressService.updateAddress(
      addressId,
      updatedAddress
    )
    return response
  }
)

export default addressSlice.reducer
