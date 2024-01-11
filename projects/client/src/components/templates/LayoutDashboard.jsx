import { Flex, Container } from "@chakra-ui/react";
import SideMenu from "../organisms/SideMenu";
import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";

function LayoutDashboard() {
  return (
    <Container
      // as="section"
      maxW={{ xl: "7xl", "2xl": "8xl" }}
      mt={{ base: "110px", xl: "150px" }}
      textAlign={"left"}
    >
      <Flex
        display="flex"
        pos="fixed"
        width="100%"
        top="0"
        left="0"
        right="0"
        py="4"
        bg="white"
        alignSelf="center"
        zIndex="101"
      >
        <Navbar />
      </Flex>
      <Flex>
        <Flex>
          <SideMenu />
        </Flex>
        <Flex w="100%" pl="5">
          <Outlet />
        </Flex>
      </Flex>
    </Container>
  );
}

export default LayoutDashboard;
