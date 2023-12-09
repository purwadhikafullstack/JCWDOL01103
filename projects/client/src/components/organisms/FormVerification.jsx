import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { verification } from "../../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../../store/slicer/authSlice";
import { toastConfig } from "../../utils/toastConfig";

function FormVerification({ decodedToken }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      name: decodedToken.name ? decodedToken.name : "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password is too short - should be 8 chars minimum."),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords didn't match"
      ),
    }),
    onSubmit: async (values) => {
      try {
        await verification({
            id: decodedToken.id,
            email: decodedToken.email,
            name: values.name,
            password: values.password,
            confirmPassword: values.confirmPassword
        })
        toast(toastConfig("success", "Success","Verification Success"));
        setTimeout(() => {
          if (location.state && location.state.loginBy === "google") {
            dispatch(loginGoogle(location.state.token));
            return navigate("/");
          }
          return navigate("/login");
        }, 2000);
      } catch (error) {
        toast(toastConfig("error", "Failed", error.response.data.message));
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex w="full" flexDir="column" rowGap="1rem" justifyContent="center">
        <VStack alignItems="flex-start">
          <FormControl isInvalid={formik.errors.name && formik.touched.name}>
            <Text>Fullname</Text>
            <Input
              placeholder="Input your name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack alignItems="flex-start">
          <FormControl
            isInvalid={formik.errors.password && formik.touched.password}
          >
            <Text>Password</Text>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                autoComplete="off"
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
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack alignItems="flex-start">
          <FormControl
            isInvalid={
              formik.errors.confirmPassword && formik.touched.confirmPassword
            }
          >
            <Text>Confirm Password</Text>
            <InputGroup size="md">
              <Input
                id="confirmPassword"
                pr="4.5rem"
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Enter confirm password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                autoComplete="off"
              />
              <InputRightElement width="30px" mr="2">
                <Box
                  cursor="pointer"
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                >
                  {showConfirmPwd ? (
                    <FaEyeSlash color="grey" />
                  ) : (
                    <FaEye color="grey" />
                  )}
                </Box>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
          </FormControl>
        </VStack>
        <Button type="submit" mt="1rem">
          Submit
        </Button>
      </Flex>
    </form>
  );
}

export default FormVerification;
