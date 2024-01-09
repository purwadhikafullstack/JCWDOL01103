import { Button, Center, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound({ type }) {
  const navigate = useNavigate();
  return (
    <Center h="100vh" flexDir="column" p="10">
      <Text fontSize="xxx-large" fontWeight="bold" m="5">
        Oops!
      </Text>
      {type === "forbidden" ? (
        <Image
          src={require("../assets/img/403.png")}
          boxSize="full"
          objectFit="contain"
          maxW="650px"
          h="auto"
        />
      ) : (
        <Image
          src={require("../assets/img/404.png")}
          boxSize="full"
          objectFit="contain"
          maxW="650px"
          h="auto"
        />
      )}
      <Text fontSize="xx-large" fontWeight="bold" mt="5" textAlign="center">
        {type === "forbidden" ? "Forbidden" : "Page not found"}
      </Text>
      <Text fontSize="large" fontWeight="medium" mb="5" textAlign="center">
        {type === "forbidden"
          ? "You do not have permission to access this page"
          : "The page you are looking for does not exist or the session has expired."}
      </Text>
      <Button bg="black" color="white" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Center>
  );
}

export default NotFound;
