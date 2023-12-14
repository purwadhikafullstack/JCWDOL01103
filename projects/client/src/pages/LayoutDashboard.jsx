import { Flex, Container } from "@chakra-ui/react";
import SideMenu from "../components/organisms/SideMenu";
import { Outlet } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

function LayoutDashboard() {
  return (
    <>
      <Navbar />
      <Container
        as="section"
        maxW={{ xl: "7xl", "2xl": "8xl" }}
        mt={{ base: "45px", xl: "100px" }}
        textAlign={"left"}
      >
        <Flex>
          <Flex w={{ base: "100%", xl: "10%" }}>
            <SideMenu />
          </Flex>
          <Flex w="90%">
            <Outlet />
          </Flex>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}

export default LayoutDashboard;
