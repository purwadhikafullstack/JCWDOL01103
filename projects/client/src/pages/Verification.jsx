import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Verification() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  return (
    <Center h="100vh" bg="gray.100">
      <Flex
        w="700px"
        h="500px"
        borderRadius="2xl"
        overflow="hidden"
        position="relative"
        shadow="lg"
        bg="white"
      >
        <Flex
          bg="green"
          h="full"
          w="50%"
          position="absolute"
          left="0"
          transition="all 0.3s ease-in-out"
          zIndex="0"
        />
        <Flex
          w="full"
          p="10"
          flexDir="column"
          gap="10px"
          justifyContent="center"
          zIndex="1"
        >
          <Heading as="h2" size="lg" color="white">
            Account Verification
          </Heading>
          <Text
            color="white"
          >
            Horay last step, you need to fill the form to access all feature in
            this website!
          </Text>
        </Flex>
        <Flex
          w="full"
          p="10"
          flexDir="column"
          gap="1rem"
          justifyContent="center"
        >
          <VStack alignItems="flex-start">
            <Text>Fullname</Text>
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
          <VStack alignItems="flex-start">
            <Text>Confirm Password</Text>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Enter confirm password"
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
          </VStack>
          <Button mt='1rem'>Submit</Button>
        </Flex>
      </Flex>
    </Center>
  );
}

export default Verification;
