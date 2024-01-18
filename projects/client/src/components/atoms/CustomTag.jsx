import { Tag } from "@chakra-ui/react";
import React, { useEffect } from "react";

const CustomTag = ({ value }) => {
  const colorSchemeHandler = () => {
    let colorScheme = "gray";
    if (value === "waiting") {
      colorScheme = "blue";
    } else if (value === "accepted") {
      colorScheme = "teal";
    } else if (value === "rejected") {
      colorScheme = "red";
    }else if (value === "auto") {
        colorScheme = "green";
    }else if (value === "cancelled") {
        colorScheme = "gray";
    }
    return colorScheme
  };
  return (
    <Tag size="md" w="fit-content" key="sm" variant="solid" colorScheme={colorSchemeHandler()}>
      {value}
    </Tag>
  );
};

export default CustomTag;
