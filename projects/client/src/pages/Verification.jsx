import React, { useEffect, useState } from "react";
import {
  Center,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FormVerification from "../components/organisms/FormVerification";
import { verificationValidator } from "../api/auth";
import NotFound from "./NotFound";

function Verification() {
  const [decodedToken, setDecodedToken] = useState(null)
  const param = useParams()
  const navigate = useNavigate()
  useEffect(()=>{
    (async ()=>{
      try{
        const response = await verificationValidator(param.token)
        console.log(response)
        if(response.data.verified === true){
          return navigate("/")
        }
        setDecodedToken(jwtDecode(param.token))
      } catch (err){
        console.log(err)
      }
    })();
  },[])
  return (
      <>
      {decodedToken === null ? <NotFound/> :
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
          bg="primaryColor"
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
          <FormVerification decodedToken={decodedToken}/>
        </Flex>
      </Flex>
    </Center>
}</>
    );
}

export default Verification;
