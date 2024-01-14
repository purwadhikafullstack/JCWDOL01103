import React, { useEffect, useState } from "react";
import { Center, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FormVerification from "../components/organisms/FormVerification";
import { verificationValidator } from "../api/auth";
import NotFound from "./NotFound";
import { checkAuthorized, fetchUserInfo, loginGoogle } from "../store/slicer/authSlice";
import { useDispatch } from "react-redux";

function Verification() {
  const [decodedToken, setDecodedToken] = useState(null);
  const param = useParams();
  const navigate = useNavigate();
  const [isLaptop] = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      console.log("trigereed")
      try {
        const response = await verificationValidator(param.token);
        if (response.data.verified === true) {
          return navigate("/");
        }
        setDecodedToken(jwtDecode(param.token));
        dispatch(loginGoogle(param.token))
        dispatch(checkAuthorized())
        // dispatch(fetchUserInfo())
      } catch (err) {
        return navigate("/notfound");
      }
    })();
  }, []);
  return (
    <>
      {decodedToken === null ? (
        <NotFound />
      ) : (
        <Center h="100vh" bg="gray.100" flexDir="column" rowGap="1rem">
          <Flex
            w="full"
            maxW="700px"
            minH={isLaptop ? "unset" : "full"}
            h="500px"
            borderRadius="2xl"
            overflow="hidden"
            position="relative"
            shadow="lg"
            bg="white"
            flexDir={isLaptop ? "row":'column'}
            justifyContent='center'
          >
            <Flex
              bg="primaryColor"
              h="full"
              w="50%"
              position="absolute"
              left="0"
              transition="all 0.3s ease-in-out"
              zIndex="0"
              display={isLaptop ? "flex" : "none"}
            />
            <Flex
              w="full"
              p="10"
              flexDir="column"
              gap="10px"
              justifyContent="center"
              zIndex="1"
              color={isLaptop ? "white" : "black"}
            >
              <Heading as="h2" size="lg">
                Account Verification
              </Heading>
              <Text>
                Horay last step, you need to fill the form to access all feature
                in this website!
              </Text>
            </Flex>
            <Flex
              w="full"
              p="10"
              flexDir="column"
              gap="1rem"
              justifyContent="center"
            >
              <FormVerification decodedToken={decodedToken} />
            </Flex>
          </Flex>
        </Center>
      )}
    </>
  );
}

export default Verification;
