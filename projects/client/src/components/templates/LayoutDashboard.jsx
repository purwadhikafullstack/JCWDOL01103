import { Flex, Container } from "@chakra-ui/react";
import SideMenu from "../organisms/SideMenu";
import { Outlet } from "react-router-dom";

function LayoutDashboard() {
  return (
    <>
      <Container
        as="section"
        maxW={{ xl: "7xl", "2xl": "8xl" }}
        mt={{ base: "45px", xl: "100px" }}
        textAlign={"left"}
      >
        <Flex>
          <Flex>
            <SideMenu />
          </Flex>
          <Flex>
            <Outlet />
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export default LayoutDashboard;
