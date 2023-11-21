import React, { useState } from "react"
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

const Address = () => {
  const [addresses, setAddresses] = useState([])
  const [newAddress, setNewAddress] = useState({
    province: "",
    city: "",
    district: "",
    detail: "",
  })

  const addAddress = () => {
    if (
      newAddress.province &&
      newAddress.city &&
      newAddress.district &&
      newAddress.detail
    ) {
      setAddresses([...addresses, newAddress])
      setNewAddress({
        province: "",
        city: "",
        district: "",
        detail: "",
      })
    } else {
      alert("Lengkapi semua field sebelum menambahkan alamat")
    }
  }

  const deleteAddress = (index) => {
    const updateAddresses = [...addresses]
    updateAddresses.splice(index, 1)
    setAddresses(updateAddresses)
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
            onChange={(e) =>
              setNewAddress({ ...newAddress, province: e.target.value })
            }
          >
            <option value="province">Jakarta</option>
            <option value="province">Banten</option>
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
            <option value="city">Tangerang</option>
            <option value="city">Bandung</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Kecamatan</FormLabel>
          <Input
            value={newAddress.district}
            onChange={(e) =>
              setNewAddress({ ...newAddress, district: e.target.value })
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Detail Alamat</FormLabel>
          <Textarea
            size="sm"
            variant={"outline"}
            value={newAddress.detail}
            onChange={(e) =>
              setNewAddress({ ...newAddress, detail: e.target.value })
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
                {address.detail}, {address.district}, {address.city},{" "}
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
