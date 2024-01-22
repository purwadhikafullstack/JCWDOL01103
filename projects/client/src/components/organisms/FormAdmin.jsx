import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Text,
  InputRightElement,
  InputGroup,
  Box,
  useToast,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { SelectWarehouse } from "./SelectWarehouse";
import { toastConfig } from "../../utils/toastConfig";
import { createAdmin, updateAdmin } from "../../api/adminWarehouse";

const FormAdmin = ({ data, isOpen, onClose, onCloseComplete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      warehouse: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email format").required("Required"),
      password: !data
      ? Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required("Required")
      : Yup.string(),
      warehouse: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setBtnLoading(true);
        const { warehouse, ...rest } = values;
        const dataValues = {
          ...rest,
          warehouse_id: values.warehouse,
        };
        if (data) {
          dataValues.id = data.user.id;
          if(dataValues === ""){
            delete dataValues.password
          }
        }
        const response = data
          ? await updateAdmin(dataValues)
          : await createAdmin(dataValues);
        toast(toastConfig("success", "Success", response.message));
        setTimeout(() => {
          onClose();
          setBtnLoading(false);
        }, 2000);
      } catch (error) {
        setBtnLoading(false);
        toast(toastConfig("error", "Failed", error.message));
      }
    },
  });
  useEffect(() => {
    function fetchData() {
      if (data && !formik.dirty) {
        formik.setValues({
          name: data.user.name,
          email: data.user.email,
          password: "",
          warehouse: data.warehouse.id,
        });
      }
    }
    fetchData();
  }, [data, formik.dirty]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => (btnloading ? null : onClose())}
      onCloseComplete={() => {
        formik.resetForm();
        setShowPassword(false);
        onCloseComplete();
      }}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <form onSubmit={formik.handleSubmit}>
        <ModalContent>
          <ModalHeader>{data ? "Edit Admin" : "Create New Admin"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" pb={6} gap="4">
            <VStack alignItems="flex-start">
              <FormControl
                isInvalid={formik.errors.name && formik.touched.name}
              >
                <FormLabel htmlFor="name">Admin name</FormLabel>
                <Input
                  placeholder="Input admin name"
                  id="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  isDisabled={btnloading}
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.email && formik.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  placeholder="Input admin email"
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isDisabled={btnloading}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.password && formik.touched.password}
              >
                <VStack alignItems="flex-start">
                  <Text>Password</Text>
                  <InputGroup size="md">
                    <Input
                      id="password"
                      pr="4.5rem"
                      autoComplete="on"
                      type={showPassword ? "text" : "password"}
                      placeholder= {data ? "Change password" : "Enter password"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isDisabled={btnloading}
                    />
                    <InputRightElement width="30px" mr="2">
                      <Box
                        cursor="pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash color="grey" />
                        ) : (
                          <FaEye color="grey" />
                        )}
                      </Box>
                    </InputRightElement>
                  </InputGroup>
                </VStack>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <SelectWarehouse
                id="warehouse"
                selectedWarehouse={formik.values.warehouse}
                onChange={(val) => formik.setFieldValue("warehouse", val.id)}
                isInvalid={formik.errors.warehouse && formik.touched.warehouse}
                isDisabled={btnloading}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={btnloading} mr="2" type="submit">
              {data ? "Update" : "Create"}
            </Button>
            <Button bg="black" color="white" isDisabled={btnloading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default FormAdmin;
