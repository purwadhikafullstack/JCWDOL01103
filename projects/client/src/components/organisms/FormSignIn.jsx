import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Link,
  Collapse,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { loginGoogle, userLogin } from "../../store/slicer/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toastConfig } from "../../utils/toastConfig";
import {
  googleSignInInit,
  onClickGoogleSignIn,
} from "../../utils/googleSignIn";
import { googleLogin } from "../../api/auth";

function FormSignIn({ isLogin, onClickLogin, isLaptop }) {
  const [showPassword, setShowPassword] = useState(false);
  const authResponse = useSelector((state) => state.login.response);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleToken, setGoogleToken] = useState(null);
  const toast = useToast();

  useEffect(() => {
    googleSignInInit(handleGoogleLogin);
  }, []);
  useEffect(() => {
    (async () => {
      try{
        if (googleToken) {
          const encodedToken = encodeURIComponent(googleToken)
          const response = await googleLogin(encodedToken);
          if (response.data.is_verified === false) {
            return navigate(`/verification/${response.data.token}`,{state:{loginBy:'google', token:response.data.token}});
          }
          dispatch(loginGoogle(response.data.token));
          return navigate("/");
        }
      }
      catch (error){
        throw error
      }
    })();
  }, [googleToken]);
  const handleGoogleLogin = async (res) => {
    const token = await res;
    setGoogleToken(token.credential);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(
          userLogin({
            email: values.email,
            password: values.password,
          })
        );
      } catch (error) {
        toast(toastConfig("error", "Failed", error.response.data.message));
      }
    },
  });
  useEffect(() => {
    formik.resetForm();
    setGoogleToken(null);
  }, [isLogin]);
  useEffect(() => {
    const getResponse = () => {
      if (googleToken === null) {
        if (authResponse.status) {
          toast(
            toastConfig(
              authResponse.status === 200 ? "success" : "error",
              authResponse.status === 200 ? "Success" : "Failed",
              authResponse.message
            )
          );
          if (authResponse.status === 200) {
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        }
      }
    };
    getResponse();
  }, [authResponse, dispatch, navigate]);
  return (
    <Flex
      w="full"
      minW={isLaptop ? "unset" : "100vw"}
      p="10"
      flexDir="column"
      gap="10px"
      justifyContent="center"
    >
      <Heading
        as="h2"
        size="lg"
        zIndex="1"
        color={isLogin ? "blackColor" : "white"}
      >
        Welcome Back!
      </Heading>
      <Text zIndex="1" color="white" display={isLogin ? "none" : "block"}>
        Sign to your account
      </Text>
      <Button
        variant="outline"
        color="white"
        onClick={() => {
          onClickLogin(true);
        }}
        display={isLogin ? "none" : "block"}
        _hover={{ color: "primaryColor", bg: "white" }}
      >
        Sign In
      </Button>
      <Collapse in={isLogin} animateOpacity>
        <form onSubmit={formik.handleSubmit}>
          <Flex flexDir="column" gap="10px" justifyContent="center">
            <FormControl
              isInvalid={formik.errors.email && formik.touched.email}
            >
              <VStack alignItems="flex-start">
                <Text>Email</Text>
                <Input
                  id="email"
                  placeholder="Input your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </VStack>
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
                    placeholder="Enter password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
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
            <Link
              fontSize="sm"
              alignSelf="flex-end"
              color="blue"
            >
              Forgot your password ?
            </Link>
            <Button type="submit">Sign in</Button>
            <Text fontSize="small" alignSelf="center">
              Or
            </Text>
            <Button onClick={() => onClickGoogleSignIn()}>
              <FcGoogle /> <Text ml="1rem">Sign in with Google</Text>
            </Button>
            <Flex></Flex>
          </Flex>
        </form>
      </Collapse>
    </Flex>
  );
}

export default FormSignIn;
