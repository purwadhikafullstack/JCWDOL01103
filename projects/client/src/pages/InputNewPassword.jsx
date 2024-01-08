import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastConfig } from "../utils/toastConfig";
import { checkResetToken, getUser, patchNewPassword } from "../api/auth";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NotFound from "./NotFound";

function InputNewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [isLaptop] = useMediaQuery("(min-width: 768px)");
  const [isLinkValid, setIsLinkValid] = useState(true);
  const toast = useToast();
  const param = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Required")
        .min(8, "Password is too short - should be 8 chars minimum."),
      confirmNewPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords didn't match"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword,
        };
        const encodedToken = encodeURIComponent(param.token);
        const response = await patchNewPassword(encodedToken, data);
        toast(toastConfig("success", "Success", response.data.message));
        setTimeout(() => {
          navigate("/login", { state: { redirect: "/" } })
        }, 2000);
      } catch (error) {
        toast(toastConfig("error", "Failed", error.response.data.message));
      }
    },
  });
  useEffect(() => {
    (async () => {
      const token = jwtDecode(param.token);
      try {
        const checkToken = await checkResetToken(param.token);
        if (checkToken.status === 200) {
          const response = await getUser(token.id);
          response.data.status !== "reset" && setIsLinkValid(false)
        } else {
          return setIsLinkValid(false);
        }
      } catch (error) {
        setIsLinkValid(false);
      }
    })();
  }, []);
  return (
    <>
      {isLinkValid ? (
        <Center h="100vh" bg="gray.100" flexDir="column" rowGap="1rem">
          <Flex
            w="full"
            flexDir="column"
            maxW="500px"
            h="max-content"
            minH={isLaptop ? "unset" : "full"}
            borderRadius="2xl"
            shadow="lg"
            bg="white"
            p="10"
            justify="center"
          >
            <Heading mb="5">Change your password</Heading>
            <form onSubmit={formik.handleSubmit}>
              <Flex
                w="full"
                flexDir="column"
                rowGap="1rem"
                justifyContent="center"
              >
                <VStack alignItems="flex-start">
                  <FormControl
                    isInvalid={
                      formik.errors.newPassword && formik.touched.newPassword
                    }
                  >
                    <Text>New Password</Text>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.newPassword}
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
                    <FormErrorMessage>
                      {formik.errors.newPassword}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
                <VStack alignItems="flex-start">
                  <FormControl
                    isInvalid={
                      formik.errors.confirmNewPassword &&
                      formik.touched.confirmNewPassword
                    }
                  >
                    <Text>Confirm New Password</Text>
                    <InputGroup size="md">
                      <Input
                        id="confirmNewPassword"
                        pr="4.5rem"
                        type={showConfirmPwd ? "text" : "password"}
                        placeholder="Enter confirm new password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmNewPassword}
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
                    <FormErrorMessage>
                      {formik.errors.confirmNewPassword}
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
                <Button type="submit" mt="1rem" bg="primaryColor" color="white">
                  Submit
                </Button>
              </Flex>
            </form>
          </Flex>
        </Center>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default InputNewPassword;
