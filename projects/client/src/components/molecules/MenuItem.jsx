import { Center } from "@chakra-ui/react";
import React from "react";
import { NavLink as ReactRouterNavLink, useLocation } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

function MenuItem(props) {
  const location = useLocation();
  const pathNow = location.pathname.split("/")[2];
  const path = props.to.split("/")[2];
  return (
    <ChakraLink
      as={ReactRouterNavLink}
      display="flex"
      fontSize="md"
      fontWeight="semibold"
      alignItems="center"
      padding="2"
      paddingX="4"
      borderRadius="lg"
      border="1px"
      borderColor="transparent"
      bgColor={path === pathNow ? "primaryColor" : "none"}
      color={path === pathNow ? "secondaryColor" : "forthColor"}
      cursor="pointer"
      _hover={{
        borderColor: "primaryColor",
        cursor: "pointer",
      }}
      to={props.to}
    >
      <Center w="22px" h="22px" marginRight="2">
        {props.icon}
      </Center>
      {props.name}
    </ChakraLink>
  );
}

export default MenuItem;