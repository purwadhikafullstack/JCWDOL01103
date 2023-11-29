import React, { useEffect, useState } from "react"
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  Stack,
  Button,
  useToast,
  Checkbox,
} from "@chakra-ui/react"
import addressService from "../api/api"
import { useParams, useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  address_name: Yup.string().required("Nama Alamat wajib diisi"),
  province: Yup.string().required("Provinsi wajib dipilih"),
  city: Yup.string().required("Kota wajib dipilih"),
  subdistrict: Yup.string().required("Kecamatan wajib diisi"),
  full_address: Yup.string().required("Alamat lengkap wajib diisi"),
  postal_code: Yup.string()
    .matches(/^[0-9]{5}$/, "Kode Pos harus terdiri dari 5 digit angka")
    .required("Kode Pos wajib diisi"),
  is_main_address: Yup.mixed().oneOf(["true", "false"]),
})

const UpdateAddress = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { addressId } = useParams()
  // console.log(addressId)
  // const [newAddress, setNewAddress] = useState({
  //   province: "",
  //   city: "",
  //   subdistrict: "",
  //   full_address: "",
  //   postal_code: "",
  //   address_name: "",
  //   is_main_address: "",
  // })

  // const { setFieldValue } = useFormikContext()
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])

  const getAddressData = async (id) => {
    try {
      const response = await addressService.getAddressesById(id)
      console.log(response)
      // const addressData = response.data
      // setFieldValue("province", addressData.province)
      // setFieldValue("city", addressData.city)
      // setFieldValue("subdistrict", addressData.subdistrict)
      // setFieldValue("full_address", addressData.full_address)
      // setFieldValue("postal_code", addressData.postal_code)
      // setFieldValue("address_name", addressData.address_name)
      // setFieldValue("is_main_address", addressData.is_main_address)
    } catch (error) {
      console.error("Error fetching address : ", error.message)
    }
  }
  useEffect(() => {
    if (addressId) {
      getAddressData(addressId)
    }
    getProvinces()
  }, [addressId])

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

  const updateAddress = async (values) => {
    try {
      const response = await addressService.updateAddress(addressId, values)

      toast({
        title: "Alamat berhasil diupdate",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      })

      navigate("/address")
    } catch (error) {
      console.error("Error updating address: ", error.message)

      toast({
        title: "Gagal mengupdate alamat. Silahkan coba lagi",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    }
  }

  return (
    <Box>
      <Heading size="lg" mb={10}>
        Update Address
      </Heading>
      <Formik
        initialValues={{
          province: "",
          city: "",
          subdistrict: "",
          full_address: "",
          postal_code: "",
          address_name: "",
          is_main_address: true,
        }}
        validationSchema={validationSchema}
        onSubmit={updateAddress}
      >
        {({ values, setFieldValue, handleBlur, errors }) => (
          <Form>
            <Stack spacing={8} mb={8} mx={10}>
              <FormControl isRequired>
                <FormLabel>Nama Alamat</FormLabel>
                <Input
                  border={errors.address_name && "1px red solid"}
                  type="text"
                  name="address_name"
                  onChange={(e) =>
                    setFieldValue("address_name", e.target.value)
                  }
                  onBlur={handleBlur}
                  value={values.address_name}
                  placeholder="Nama Alamat"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Provinsi</FormLabel>
                <Select
                  border={errors.province && "1px red solid"}
                  name="province"
                  onBlur={handleBlur}
                  value={values.province}
                  placeholder="-- Pilih Provinsi --"
                  onChange={(e) => {
                    const selectedProvince = e.target.value
                    const selectedProvinceName =
                      e.target.options[e.target.selectedIndex].text
                    setFieldValue("province", selectedProvince)
                    setFieldValue("province_name", selectedProvinceName)
                    getCities(selectedProvince)
                  }}
                >
                  {provinces.map((province) => (
                    <option
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province_name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Kota</FormLabel>
                <Select
                  border={errors.city && "1px red solid"}
                  name="city"
                  onBlur={handleBlur}
                  value={values.city}
                  placeholder="-- Kota --"
                  onChange={(e) => {
                    setFieldValue("city", e.target.value)
                    setFieldValue(
                      "city_name",
                      e.target.options[e.target.selectedIndex].text
                    )
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
                  border={errors.subdistrict && "1px red solid"}
                  type="text"
                  name="subdistrict"
                  onBlur={handleBlur}
                  value={values.subdistrict}
                  onChange={(e) => {
                    setFieldValue("subdistrict", e.target.value)
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Alamat Lengkap</FormLabel>
                <Textarea
                  border={errors.full_address && "1px red solid"}
                  type="text"
                  name="full_address"
                  value={values.full_address}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setFieldValue("full_address", e.target.value)
                  }
                  size="sm"
                  variant="outline"
                  placeholder="Alamat Lengkap ..."
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Kode Pos</FormLabel>
                <Input
                  border={errors.postal_code && "1px red solid"}
                  type="text"
                  name="postal_code"
                  onBlur={handleBlur}
                  value={values.postal_code}
                  onChange={(e) => {
                    setFieldValue("postal_code", e.target.value)
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Alamat Utama</FormLabel>

                <Stack>
                  <Checkbox
                    name="is_main_address"
                    value={values.is_main_address}
                    defaultChecked
                    onChange={(e) => {
                      setFieldValue("is_main_address", e.target.value)
                    }}
                  >
                    Apakah ini adalah alamat utamamu ?
                  </Checkbox>
                </Stack>
              </FormControl>

              <Button colorScheme="teal" type="submit">
                Tambah Alamat
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default UpdateAddress
