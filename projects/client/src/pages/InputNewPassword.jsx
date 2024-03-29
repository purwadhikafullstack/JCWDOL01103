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
  Spinner,
  Text,
  VStack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastConfig } from "../utils/toastConfig";
import { checkResetToken, patchNewPassword } from "../api/auth";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";

function InputNewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
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
    onSubmit: async values => {
      try {
        setBtnLoading(true);
        const data = {
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword,
        };
        const encodedToken = encodeURIComponent(param.token);
        const response = await patchNewPassword(encodedToken, data);
        toast(toastConfig("success", "Success", response.data.message));
        setTimeout(() => {
          setBtnLoading(false);
          navigate("/login", { state: { redirect: "/" } });
        }, 2000);
      } catch (error) {
        toast(toastConfig("error", "Failed", error.response.data.message));
      }
    },
  });
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const checkToken = await checkResetToken(param.token);
        if (checkToken.status !== 200) {
          setIsLinkValid(false);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1300);
      } catch (error) {
        setTimeout(() => {
          setIsLinkValid(false);
          setLoading(false);
        }, 1300);
      }
    })();
  }, []);
  return (
    <>
      {loading && (
        <Center h="100vh" zIndex="10">
          <Spinner />
        </Center>
      )}
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
                <Button
                  isLoading={btnLoading}
                  loadingText="Submitting"
                  type="submit"
                  mt="1rem"
                  bg="primaryColor"
                  color="white"
                >
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
