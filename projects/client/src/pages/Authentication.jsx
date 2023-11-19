import React, { useState } from "react";
import { Center, Flex } from "@chakra-ui/react";
import FormRegister from "../components/organisms/FormRegister";
import FormSignIn from "../components/organisms/FormSignIn";

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
          bg="primaryColor"
          h="full"
          w="50%"
          position="absolute"
          left="0"
          transition="all 0.3s ease-in-out"
          transform={isLogin ? `translateX(0%)` : `translateX(100%)`}
          zIndex="0"
        />
        <FormRegister
          isLogin={isLogin}
          onClickRegister={(e) => setIsLogin(e)}
        />
        <FormSignIn isLogin={isLogin} onClickLogin={(e) => setIsLogin(e)} />
      </Flex>
    </Center>
  );
}

export default Authentication;
