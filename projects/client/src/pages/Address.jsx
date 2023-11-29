import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Text,
  Stack,
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import addressService from "./../api/api"

const Address = () => {
  const [addresses, setAddresses] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getAddressList()
  }, [])

  const getAddressList = async () => {
    try {
      const addressList = await addressService.getAddresses()
      setAddresses(addressList)
    } catch (error) {
      console.error("Error fetching addresses: ", error.message)
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

  const toUpdateAddress = (addressId) => {
    navigate(`/form-address/${addressId}`)
  }

  return (
    <Box>
      <Box>
        <Heading textAlign={"center"} my={5}>
          Daftar Alamat
        </Heading>
      </Box>
      <List>
        {addresses.map((address, index) => (
          <ListItem key={index} mb={2} mx={10} my={10}>
            <Flex align={"center"} justify={"center"} gap={5}>
              <Stack>
                <Card w="900px" h="200px">
                  <CardHeader>
                    <Heading>Alamat Rumah</Heading>
                  </CardHeader>
                  <Flex gap={5} mx={5} align={"center"}>
                    <CardBody py={5}>
                      <Text fontWeight={"bold"} fontSize={"xl"}>
                        {address.province} , {address.city} ,
                        {address.subdistrict} , {address.full_address} ,
                        {address.address_name} ,{address.postal_code}
                      </Text>
                    </CardBody>
                    <Button
                      colorScheme="red"
                      variant={"solid"}
                      size={"sm"}
                      width={"80px"}
                      height={"40px"}
                      onClick={() => deleteAddress(index)}
                    >
                      Delete
                    </Button>

                    <Button
                      colorScheme="green"
                      variant={"solid"}
                      size={"sm"}
                      width={"80px"}
                      height={"40px"}
                      onClick={() => toUpdateAddress(address.address_id)}
                    >
                      Edit
                    </Button>
                  </Flex>
                </Card>
              </Stack>
            </Flex>
          </ListItem>
        ))}
      </List>
      <Flex align={"center"} justify={"center"} my={5}>
        <Link to={"/add-address"}>
          <Button colorScheme="red" variant={"solid"} size={"md"}>
            Tambah Alamat
          </Button>
        </Link>
      </Flex>
    </Box>
  )
}

export default Address
