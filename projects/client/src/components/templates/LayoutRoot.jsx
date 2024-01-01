import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "../organisms/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../organisms/Footer";

function LayoutRoot() {
  const location = useLocation();

  return (
    <Flex justifyContent='center' alignItems='center' w='100vw' flexDir='column'>
      <Flex
        display="flex"
        pos="fixed"
        width="100%"
        top="0"
        py="4"
        px="4"
        bg="white"
        zIndex="10"
        maxW='1440px'
      >
        <Navbar />
      </Flex>
      <Flex w="100%" maxW='1440px' h="100%" mt="120px" flexDir='column' justifyContent="center" alignItems='center'>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
}

export default LayoutRoot;
