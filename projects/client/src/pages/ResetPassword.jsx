import React, { useState } from "react";
import { Button, Center, Flex, FormControl, FormErrorMessage, Heading, Input, Text, VStack, useMediaQuery, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastConfig } from "../utils/toastConfig";
import { postResetPassword } from "../api/auth";

const ResetPassword = () => {
  const [isLaptop] = useMediaQuery("(min-width: 768px)");
  const [resetSuccess, setResetSuccess] = useState(false);
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await postResetPassword({ email: values.email });
        toast(toastConfig("success", "Success", "Request reset password has been sent"));
        setResetSuccess(true);
      } catch (error) {
        if(error.response.data.status === 400){
          formik.setErrors({
            email: error.response.data.message,
          });
        }else{
          toast(toastConfig("error", "Failed", error.message));
        }
      }
    },
  });
  return (
    <Center h="100vh" bg="gray.100" flexDir="column" rowGap="1rem">
      <Flex
        w="full"
        flexDir='column'
        maxW="500px"
        h="max-content"
        minH={isLaptop ? "unset" : "full"}
        borderRadius="2xl"
        shadow="lg"
        bg="white"
        p='10'
        justify='center'
      >
        <Heading my="5">{!resetSuccess ? "Reset your password" : "Reset link has been sent!" }</Heading>
        <form onSubmit={formik.handleSubmit}>
          <Text>
            {resetSuccess
              ? "Check your email to verify"
              : "Enter your email address to reset password!"}
          </Text>
          <Flex
            py="20px"
            color="blackColor"
            alignItems="center"
            flexDir="column"
            gap='3'
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
                  isDisabled={resetSuccess}
                />
              </VStack>
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <Button type="submit" w="full" bg='primaryColor' color='white' isDisabled={resetSuccess}>Send</Button>
          </Flex>
        </form>
      </Flex>
    </Center>
  );
};

export default ResetPassword;
