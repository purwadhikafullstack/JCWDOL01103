import {
  Collapse,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../api/auth";
import { toastConfig } from "../../utils/toastConfig";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingState } from "../../store/slicer/authSlice";

function FormRegister({ isLogin, onClickRegister, isLaptop }) {
  const [regisSuccess, setRegisSuccess] = useState(false);
  const loadingState = useSelector((state) => state.login.loading)
  const toast = useToast();
  const dispatch = useDispatch()
  useEffect(()=>{
    const switchMode=()=>{
      formik.resetForm()
      setRegisSuccess(false)
    }
    switchMode()
  },[isLogin])
  const handleRegister = () => {
    if (isLogin) {
      onClickRegister(false);
      setRegisSuccess(false);
    } else {
      formik.handleSubmit();
    }
  };
  const formik = useFormik({
    initialValues: {
      emailRegis: "",
    },
    validationSchema: Yup.object({
      emailRegis: Yup.string().email().required("Required"),
    }),
    onSubmit: async (values) => {
      dispatch(setLoadingState(true))
      try {
        await register({ email: values.emailRegis });
        toast(toastConfig("success", "Success", "Registration Success"));
        setRegisSuccess(true);
        setTimeout(()=>{
          dispatch(setLoadingState(false))
          onClickRegister(true)
        },2000)
      } catch (error) {
        toast(toastConfig("error", "Failed", error.response.data.message));
        setTimeout(()=>{
          dispatch(setLoadingState(false))
        },1300)
      }
    },
  });
  return (
    <Flex
      w="full"
      p="10"
      minW={isLaptop ? "unset" : "100vw"}
      flexDir="column"
      gap="10px"
      justifyContent="center"
      zIndex="1"
    >
      <Heading as="h2" size="lg" color={isLogin ? "white" : "blackColor"}>
        {
          regisSuccess? 
          "Email has been sent!":
          "Don't have account ?"
      }
        
      </Heading>
      <Text
        color={isLogin ? "white" : "blackColor"}
        display={isLogin ? "block" : "none"}
      >
        Sign in with your account to access all features in this website
      </Text>

      <Collapse in={!isLogin} animateOpacity>
        <form onSubmit={formik.handleSubmit}>
          <Text>
            {regisSuccess
              ? "Check your email to verify!"
              : "To create an account just enter your email address"}
          </Text>
          <Flex
            py="20px"
            color="blackColor"
            alignItems="center"
            flexDir="column"
          >
            <FormControl
              isInvalid={formik.errors.emailRegis && formik.touched.emailRegis}
            >
              <VStack alignItems="flex-start" p="0" m="0" w="full">
                <Text>Email</Text>
                <Input
                  id="emailRegis"
                  placeholder="Input your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.emailRegis}
                />
              </VStack>
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
          </Flex>
        </form>
      </Collapse>
      <Button
        variant={isLogin ? "outline" : "solid"}
        color="white"
        bg={isLogin ? "transparent" : "primaryColor"}
        _hover={{
          color: isLogin ? "primaryColor" : "blackColor",
          bg: isLogin ? "white" : "gray.300",
        }}
        onClick={handleRegister}
        type="submit"
        isDisabled={regisSuccess || loadingState}
        isLoading={!isLogin && loadingState}
      >
        Create Account
      </Button>
    </Flex>
  );
}

export default FormRegister;
