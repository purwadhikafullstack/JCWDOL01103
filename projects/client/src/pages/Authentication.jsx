import React, { useEffect, useState } from "react";
import { Button, Center, Flex, useMediaQuery } from "@chakra-ui/react";
import FormRegister from "../components/organisms/FormRegister";
import FormSignIn from "../components/organisms/FormSignIn";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthorized } from "../store/slicer/authSlice";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const authState = useSelector((state) => state.login.isAuthorized);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      dispatch(checkAuthorized());
      if (authState) {
        return navigate("/");
      }
    }
    )()
  }, [authState]);
  const [isLaptop] = useMediaQuery("(min-width: 768px)");
  return (
    <Center h="100vh" bg="gray.100" flexDir="column" rowGap="1rem">
      <Flex
        w="full"
        maxW="700px"
        h="500px"
        minH={isLaptop ? "unset" : "full"}
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
          display={isLaptop ? "flex" : "none"}
        />
        <Flex
          position="absolute"
          h="full"
          overflow="hidden"
          transform={
            !isLaptop && isLogin ? `translateX(-50%)` : `translateX(0%)`
          }
        >
          <FormRegister
            isLogin={isLogin}
            onClickRegister={(e) => setIsLogin(e)}
            isLaptop={isLaptop}
          />
          <FormSignIn
            isLogin={isLogin}
            onClickLogin={(e) => setIsLogin(e)}
            isLaptop={isLaptop}
          />
        </Flex>
        {!isLaptop && (
          <Button
            position="absolute"
            bottom="10%"
            left="50%"
            transform="translate(-50%, 0)"
            variant="outline"
            colorScheme="blue"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have account ?" : "Already have an account ?"}
          </Button>
        )}
      </Flex>
    </Center>
  );
}

export default Authentication;
