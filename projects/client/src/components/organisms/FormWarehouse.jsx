import {
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
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toastConfig } from "../../utils/toastConfig";
import { getCities, getProvinces } from "../../api/region";
import { createWarehouse, updateWarehouse } from "../../api/warehouses";
import ButtonConfirmation from "./ButtonConfirmation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FormWarehouse = () => {
  const [provinces, setProvinces] = useState(null);
  const [cities, setCities] = useState(null);
  const toast = useToast();
  const data = useSelector((state) => state.formWarehouse.selectedWarehouse);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      name: "",
      province_id: "",
      city_id: "",
      street: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      province_id: Yup.string().required("Required"),
      city_id: Yup.string().required("Required"),
      street: Yup.string(),
    }),
    onSubmit: () => {
      onOpen();
    },
  });
  const onConfirmHandler = async () => {
    try {
      const query = {
        name: formik.values.name,
        city_id: formik.values.city_id,
        street: formik.values.street,
      };
      const response = data
        ? await updateWarehouse(data.id, query)
        : await createWarehouse(query);
      console.log(response);
      toast(toastConfig("success", "Success", response.message));
      setTimeout(() => {
        // window.location.reload();
        onClose()
      }, 1000);
    } catch (error) {
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
      if (data && !formik.dirty) {
        const response = await getCities(data.region.province.province_id);
        setCities(response.data);
        formik.setValues({
          name: data.name,
          province_id: data.region.province.province_id,
          city_id: data.region.city_id,
          street: data.street,
        });
      }
    }
    fetchData();
  }, [data, formik.dirty]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex w="full" flexDir="column" rowGap="1rem" justifyContent="center">
        <VStack alignItems="flex-start">
          <FormControl isInvalid={formik.errors.name && formik.touched.name}>
            <FormLabel>Warehouse Name</FormLabel>
            <Input
              placeholder="Input warehouse name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
        </VStack>
        <FormControl
          isInvalid={formik.errors.province_id && formik.touched.province_id}
        >
          <FormLabel>Product Category</FormLabel>
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
          <FormLabel>Product Category</FormLabel>
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
            <FormLabel>Address</FormLabel>
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
            desc="This action will be creating a new data of warehouse"
            onClickConfirm={onConfirmHandler}
            onClick={formik.handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
          >
            {data ? "Update" : "Create"}
          </ButtonConfirmation>
          <Button bg="primaryColor" color="secondaryColor" cursor="pointer">
            Cancel
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
