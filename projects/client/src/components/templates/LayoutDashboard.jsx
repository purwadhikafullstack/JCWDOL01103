import { Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

function LayoutDashboard() {
  return (
    <Flex w='full' gap='4' flexDir={{base: 'column', xl:'row'}}>
      <Flex w='full' maxW={{base:'full', xl:'280px'}}>
        {/* <SideMenu /> */}
      </Flex>
      <Flex w="100%">
        <Outlet />
      </Flex>
    </Flex>
  );
}

export default LayoutDashboard;
