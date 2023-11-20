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
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../api/auth";

function FormRegister({ isLogin, onClickRegister }) {
  const [regisSuccess, setRegisSuccess] = useState(false);
  const toast = useToast();
  const handleRegister = () => {
    if (isLogin) {
      onClickRegister(false);
      setRegisSuccess(false);
      formik.resetForm();
    } else {
      formik.handleSubmit();
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
    }),
    onSubmit: async (values) => {
      //   setIsLoading(true);
      try {
        await register({ email: values.email });
        toast({
          title: "Success",
          description: `Registration Success`,
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        setRegisSuccess(true);
      } catch (error) {
        toast({
          title: "Failed",
          description: error.response.data.message,
          status: "error",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      }
      //   setIsLoading(false);
    },
  });
  return (
    <Flex
      w="full"
      p="10"
      flexDir="column"
      gap="10px"
      justifyContent="center"
      zIndex="1"
    >
      <Heading as="h2" size="lg" color={isLogin ? "white" : "blackColor"}>
        Don't have account ?
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
              isInvalid={formik.errors.email && formik.touched.email}
            >
              <VStack alignItems="flex-start" p="0" m="0" w="full">
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
        isDisabled={regisSuccess}
      >
        Create Account
      </Button>
    </Flex>
  );
}

export default FormRegister;
