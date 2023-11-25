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
  useToast,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import addressService from "./../api/api"

const Address = () => {
  const toast = useToast()
  const [addresses, setAddresses] = useState([])
  const [newAddress, setNewAddress] = useState({
    province: "",
    city: "",
    subdistrict: "",
    full_address: "",
    postal_code: "",
    address_name: "",
    is_main_address: "",
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
      if (
        !newAddress.province ||
        !newAddress.city ||
        !newAddress.subdistrict ||
        !newAddress.full_address ||
        !newAddress.postal_code ||
        !newAddress.is_main_address ||
        !newAddress.address_name
      ) {
        toast({
          title: "Mohon isi semua field yang ada",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        })
        return
      }

      const createdAddress = await addressService.createAddress({
        ...newAddress,
        province: newAddress.province_name,
        city: newAddress.city_name,
      })
      setAddresses((prevAddress) => [...prevAddress, createdAddress])
      setNewAddress({
        province: "",
        province_name: "",
        city: "",
        city_name: "",
        subdistrict: "",
        full_address: "",
        postal_code: "",
        address_name: "",
        is_main_address: true,
      })

      toast({
        title: "Alamat berhasil ditambahkan",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    } catch (error) {
      console.error("Error creating address : ", error.message)
      toast({
        title: "Gagal menambahkan alamat. Silahkan coba lagi",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    }
  }

  const editAddress = async (index) => {
    try {
      const editedAddress = await addressService.updateAddress(
        addresses[index].address_id,
        {}
      )
      setAddresses((prevAddress) => {
        const updatedAddresses = [...prevAddress]
        updatedAddresses[index] = editedAddress
        return updatedAddresses
      })
      toast({
        title: "Alamat berhasil diupdate",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    } catch (error) {
      console.error("Error updating address : ", error.message)
      toast({
        title: "Gagal mengupdate alamat. Silahkan coba lagi",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
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
      // console.log("Cities : ", cities)
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
          <FormLabel>Nama Alamat</FormLabel>
          <Input
            value={newAddress.address_name}
            placeholder="Nama Alamat ..."
            onChange={(e) =>
              setNewAddress({ ...newAddress, address_name: e.target.value })
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Provinsi</FormLabel>
          <Select
            placeholder="-- Provinsi --"
            value={newAddress.province}
            onChange={(e) => {
              const selectedProvince = e.target.value
              const selectedProvinceName =
                e.target.options[e.target.selectedIndex].text
              setNewAddress({
                ...newAddress,
                province: selectedProvince,
                province_name: selectedProvinceName,
              })
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
            onChange={(e) => {
              // console.log("Selected City Id : ", e.target.value)
              // console.log(
              //   "Selected City Id : ",
              //   e.target.options[e.target.selectedIndex].text
              // )
              setNewAddress({
                ...newAddress,
                city: e.target.value,
                city_name: e.target.options[e.target.selectedIndex].text,
              })
            }}
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
        <FormControl isRequired>
          <FormLabel>Kode Pos</FormLabel>
          <Input
            value={newAddress.postal_code}
            onChange={(e) =>
              setNewAddress({ ...newAddress, postal_code: e.target.value })
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Alamat Utama</FormLabel>
          <Select
            placeholder="-- Pilih Salah Satu --"
            value={newAddress.is_main_address}
            onChange={(e) =>
              setNewAddress({ ...newAddress, is_main_address: e.target.value })
            }
          >
            <option value={true}>Ya</option>
            <option value={false}>Tidak</option>
          </Select>
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
                <Button
                  colorScheme="teal"
                  variant={"outline"}
                  size={"sm"}
                  onClick={(e) => editAddress(index)}
                >
                  Edit
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default Address
