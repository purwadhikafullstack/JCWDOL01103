import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  Stack,
  Heading,
  List,
  ListItem,
  IconButton,
  Flex,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import addressService from "./../api/api"

const Address = () => {
  const [addresses, setAddresses] = useState([])
  const [newAddress, setNewAddress] = useState({
    province: "",
    city: "",
    subdistrict: "",
    full_address: "",
    postal_code: "",
    is_main_address: false,
  })

  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    getAddressList()
    getProvinces()
  }, [])

  const getAddressList = async () => {
    try {
      const addressList = await addressService.getAddresses()
      setAddresses(addressList)
    } catch (error) {
      console.error("Error fetching addresses: ", error.message)
    }
  }

  const addAddress = async () => {
    try {
      const createdAddress = await addressService.createAddress(newAddress)
      setAddresses((prevAddress) => [...prevAddress, createdAddress])
      setNewAddress({
        province: "",
        city: "",
        subdistrict: "",
        full_address: "",
        postal_code: "",
        is_main_address: false,
      })
    } catch (error) {
      console.error("Error creating address : ", error.message)
    }
  }

  const deleteAddress = async (index) => {
    try {
      const addressId = addresses[index].address_id
      await addressService.deleteAddress(addressId)

      setAddresses((prevAddress) => {
        const updateAddresses = [...prevAddress]
        updateAddresses.splice(index, 1)
        return updateAddresses
      })
    } catch (error) {
      console.error("Error deleting address: ", error.message)
    }
  }

  const getProvinces = async () => {
    try {
      const provinces = await addressService.getProvinces()
      setProvinces(provinces)
    } catch (error) {
      console.error("Error fetching provinces : ", error.message)
    }
  }
  const getCities = async (selectedProvince) => {
    try {
      const cities = await addressService.getCities(selectedProvince)
      setCities(cities)
    } catch (error) {
      console.error("Error fetching provinces : ", error.message)
    }
  }

  return (
    <Box>
      <Heading size="lg" mb={10}>
        User's Address
      </Heading>

      <Stack spacing={8} mb={8} mx={10}>
        <FormControl isRequired>
          <FormLabel>Provinsi</FormLabel>
          <Select
            placeholder="-- Provinsi --"
            value={newAddress.province}
            onChange={(e) => {
              const selectedProvince = e.target.value
              console.log(selectedProvince)
              setNewAddress({ ...newAddress, province: selectedProvince })
              getCities(selectedProvince)
            }}
          >
            {provinces.map((province) => (
              <option key={province.province_id} value={province.province_id}>
                {province.province_name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Kota</FormLabel>
          <Select
            placeholder="-- Kota --"
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
          >
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Kecamatan</FormLabel>
          <Input
            value={newAddress.subdistrict}
            onChange={(e) =>
              setNewAddress({ ...newAddress, subdistrict: e.target.value })
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Alamat Lengkap</FormLabel>
          <Textarea
            size="sm"
            variant={"outline"}
            value={newAddress.full_address}
            onChange={(e) =>
              setNewAddress({ ...newAddress, full_address: e.target.value })
            }
          />
        </FormControl>
        <Button colorScheme="teal" onClick={addAddress}>
          Tambah Alamat
        </Button>
      </Stack>
      <Box>
        <Heading size="md" mb={4} mx={10}>
          Daftar Alamat
        </Heading>
        <List>
          {addresses.map((address, index) => (
            <ListItem key={index} mb={2} mx={10}>
              <Flex align={"center"} gap={5}>
                {address.full_address}, {address.subdistrict}, {address.city},{" "}
                {address.province}
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => deleteAddress(index)}
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default Address
