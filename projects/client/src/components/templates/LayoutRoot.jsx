import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../organisms/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer";

function LayoutRoot() {
  return (
    <Flex justifyContent="center" alignItems="center" w="full" flexDir="column">
      <Flex
        display="flex"
        pos="fixed"
        width="100%"
        top="0"
        py="4"
        px="4"
        bg="white"
        zIndex="10"
      >
        <Navbar />
      </Flex>
      <Flex
        w="100%"
        maxW={{ xl: "7xl", "2xl": "8xl" }}
        minH="90vh"
        h="100%"
        mt="135px"
        flexDir="column"
        alignItems="center"
        mb="20"
      >
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
}

export default LayoutRoot;
