import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export const SearchInput = ({ placeholder, onChangeInput, onPressEnter }) => {
  const [filterInput, setFilterInput] = useState("");
  useEffect(() => {
    (() => {
        onChangeInput(filterInput)
    })();
  }, [filterInput]);

  async function handleSearch(e) {
    if (e.key === "Enter") {
        onPressEnter()
    }
  }
  return (
    <InputGroup
      minW="fit-content"
      maxW={{ base: "100%" }}
      bg="secondaryColor"
      borderRadius="lg"
    >
      <Input
        type="text"
        placeholder={placeholder}
        focusBorderColor="primaryColor"
        onChange={(e) => setFilterInput(e.target.value)}
        value={filterInput}
        onKeyDown={handleSearch}
      />
      <InputRightElement width="fit-content">
        {filterInput === "" ? (
          <Button
            h="100%"
            w="fit-content"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            cursor="default"
          >
            <FiSearch />
          </Button>
        ) : (
          <Button
            h="100%"
            w="fit-content"
            bg="transparent"
            _hover={{ bg: "transparent", color: "negativeColor" }}
            onClick={() => setFilterInput("")}
          >
            <FiX />
          </Button>
        )}
      </InputRightElement>
    </InputGroup>
  );
};
