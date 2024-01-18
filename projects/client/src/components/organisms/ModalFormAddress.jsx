import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  useToast,
  FormLabel,
  Select,
  Textarea,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastConfig } from "../../utils/toastConfig";
import { getCities, getProvinces } from "../../api/region";
import ButtonConfirmation from "./ButtonConfirmation";
import { createAddress, updateAddress } from "../../api/userAddress";
function ModalFormAddress({ data, isOpen, onClose, onCloseComplete }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false)
  const [provinces, setProvinces] = useState(null);
  const [cities, setCities] = useState(null);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      city_id: "",
      street: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      city_id: Yup.string().required("Required"),
      street: Yup.string().required("Required"),
    }),
    onSubmit: () => {
      setOpenAlert(true);
    },
  });
  const onConfirmHandler = async () => {
    try {
      setLoading(true)
      const query = {
        name: formik.values.name,
        city_id: formik.values.city_id,
        street: formik.values.street,
      };
      const response = data
        ? await updateAddress(data.id, query)
        : await createAddress(query);
      toast(toastConfig("success", "Success", response.message));
      setOpenAlert(false);
      setLoading(false)
      formik.resetForm();
      onClose();
    } catch (error) {
      setLoading(false)
      toast(toastConfig("error", "Failed", error.response.data.message));
    }
  };
  useEffect(() => {
    (async () => {
      const response = await getProvinces();
      setProvinces(response.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (provinces !== null && formik.values.province_id !== "") {
        const response = await getCities(formik.values.province_id);
        setCities(response.data);
      }
    })();
  }, [formik.values.province_id]);

  useEffect(() => {
    async function fetchData() {
      if (data) {
        const response = await getCities(data.region.province.province_id);
        setCities(response.data);
        formik.setValues({
          name: data.name,
          province_id: data.region.province.province_id,
          city_id: data.region.city_id,
          street: data.street,
        });
      }
      if(!data){
        formik.resetForm()
      }
    }
    fetchData();
  }, [data]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        formik.resetForm();
        onClose();
      }}
      onCloseComplete={onCloseComplete}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data ? "Edit Address" : "Create new address"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" pb={6} gap="4">
          <form onSubmit={formik.handleSubmit}>
            <Flex
              w="full"
              flexDir="column"
              rowGap="1rem"
              justifyContent="center"
            >
              <VStack alignItems="flex-start">
                <FormControl
                  isInvalid={formik.errors.name && formik.touched.name}
                >
                  <FormLabel htmlFor="name">Address name</FormLabel>
                  <Input
                    placeholder="Input address name"
                    id="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
              </VStack>
              <FormControl
                isInvalid={
                  formik.errors.province_id && formik.touched.province_id
                }
              >
                <FormLabel htmlFor="province_id">Province</FormLabel>
                <Select
                  id="province_id"
                  placeholder="Select option"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.province_id}
                >
                  {provinces?.map((dt, idx) => {
                    return (
                      <option key={idx} value={dt.province_id}>
                        {dt.province_name}
                      </option>
                    );
                  })}
                </Select>
                <FormErrorMessage>{formik.errors.province_id}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.city_id && formik.touched.city_id}
              >
                <FormLabel htmlFor="city_id">City</FormLabel>
                <Select
                  id="city_id"
                  placeholder="Select option"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city_id}
                >
                  {cities?.map((dt, idx) => {
                    return (
                      <option key={idx} value={dt.city_id}>
                        {dt.city_name}
                      </option>
                    );
                  })}
                </Select>
                <FormErrorMessage>{formik.errors.city_id}</FormErrorMessage>
              </FormControl>
              <VStack alignItems="flex-start">
                <FormControl
                  isInvalid={formik.errors.street && formik.touched.street}
                >
                  <FormLabel htmlFor="street">Address</FormLabel>
                  <Textarea
                    size="md"
                    resize="none"
                    borderRadius="md"
                    placeholder="Input street address detail"
                    id="street"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.street}
                  />
                  <FormErrorMessage>{formik.errors.street}</FormErrorMessage>
                </FormControl>
              </VStack>
              <Flex alignSelf="flex-end" columnGap="1rem">
                <ButtonConfirmation
                  variant="secondary"
                  type="submit"
                  buttonTitle="Create"
                  buttonConfirm="Yes"
                  buttonDiscard="No"
                  title="Are you sure ?"
                  desc="This action will be creating or updating a new data of address"
                  onClickConfirm={onConfirmHandler}
                  onClick={formik.handleSubmit}
                  isOpen={openAlert}
                  onClose={() => setOpenAlert(false)}
                  isLoading={loading}
                >
                  {data ? "Update" : "Create"}
                </ButtonConfirmation>
                <Button
                  bg="primaryColor"
                  color="secondaryColor"
                  cursor="pointer"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalFormAddress;
