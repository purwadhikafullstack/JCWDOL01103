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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function FormSignIn({ isLogin, onClickLogin }) {
  const [showPassword, setShowPassword] = useState(false);
//   const handleClickSignIn = () => {
//     onClickLogin(true)
//   }
  return (
    <Flex w="full" p="10" flexDir="column" gap="10px" justifyContent="center">
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
        onClick={() => onClickLogin(true)}
        display={isLogin ? "none" : "block"}
        _hover={{ color: 'primaryColor', bg: "white"}}
      >
        Sign In
      </Button>
      <Collapse in={isLogin} animateOpacity>
        <Flex flexDir="column" gap="10px" justifyContent="center">
          <VStack alignItems="flex-start">
            <Text>Email</Text>
            <Input placeholder="Input your email" />
          </VStack>
          <VStack alignItems="flex-start">
            <Text>Password</Text>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
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
          <Link fontSize="sm" alignSelf="flex-end" color="blue">
            Forgot your password ?
          </Link>
          <Button>Sign in</Button>
          <Text fontSize="small" alignSelf="center">
            Or
          </Text>
          <Button>
            <FcGoogle /> <Text ml="1rem">Sign in with Google</Text>
          </Button>
        </Flex>
      </Collapse>
    </Flex>
  );
}

export default FormSignIn;
