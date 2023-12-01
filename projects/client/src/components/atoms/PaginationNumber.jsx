import { Flex } from "@chakra-ui/react";
import React from "react";

function PaginationNumber(props) {
  return (
    <Flex
      flexDir="row"
      cursor="pointer"
      color={props.active ? "primaryColor" : "gray.300"}
      fontWeight={props.active ? "bold" : "regular"}
      columnGap="1"
      onClick={props.onClick}
      {...props}
      fontSize='sm'
    >
      {props.children}
    </Flex>
  );
}

export default PaginationNumber;
