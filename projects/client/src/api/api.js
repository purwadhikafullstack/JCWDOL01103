import axios from "axios"

const API_URL = "http://localhost:8000"

const addressService = {
  getAddresses: async () => {
    try {
      const response = await axios.get(`${API_URL}/address`)
      return response.data
    } catch (error) {
      console.error("Error fetching address : ", error.message)
      throw error
    }
  },

  createAddress: async (newAddressData) => {
    try {
      const response = await axios.post(`${API_URL}/address`, newAddressData)
      return response.data
    } catch (error) {
      console.error("Error creating address : ", error.message)
      throw error
    }
  },

  updateAddress: async (addressId, data) => {
    try {
      const response = await axios.put(`${API_URL}/address/${addressId}`, data)
      return response.data
    } catch (error) {
      console.error("Error updating address : ", error.message)
      throw error
    }
  },

  deleteAddress: async (addressId) => {
    try {
      const response = await axios.delete(`${API_URL}/address/${addressId}`)
      return response.data
    } catch (error) {
      console.error("Error deleting address : ", error.message)
      throw error
    }
  },
  getProvinces: async () => {
    try {
      const response = await axios.get(`${API_URL}/province`)
      return response.data
    } catch (error) {
      console.error("Error fetching provinces : ", error.message)
      throw error
    }
  },
  getCities: async (province_id) => {
    try {
      const response = await axios.get(`${API_URL}/cities/${province_id}`)
      return response.data
    } catch (error) {
      console.error("Error fetching cities : ", error.message)
      throw error
    }
  },
}

export default addressService
