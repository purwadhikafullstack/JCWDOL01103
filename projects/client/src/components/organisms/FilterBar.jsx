import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { FiSearch, FiX } from "react-icons/fi";
const FilterBar = ({ filterValue, onSearchPressEnter, categories, categoriesId, categoriesName, defaultCategories, onClickCross }) => {
  const [category, setCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    setCategoryData(categories);
  }, [categories]);

  useEffect(() => {
    filterValue({
      search: searchInput,
      [categoriesId]: category,
      sort: sortValue,
    });
  }, [category, sortValue, searchInput]);

  async function handleSearch(e) {
    if (e.key === "Enter") {
      onSearchPressEnter && onSearchPressEnter();
    }
  }

  return (
    <Flex gap="4" w="full" flexWrap={{ base: "wrap", xl: "nowrap" }}>
      <InputGroup
        minW="fit-content"
        maxW={{ base: "100%" }}
        bg="secondaryColor"
        borderRadius="lg"
      >
        <Input
          type="text"
          placeholder="Search Warehouse Name"
          focusBorderColor="primaryColor"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          onKeyDown={handleSearch}
        />
        <InputRightElement width="fit-content">
          {searchInput === "" ? (
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
              onClick={() => {setSearchInput(""); onClickCross && onClickCross()}}
            >
              <FiX />
            </Button>
          )}
        </InputRightElement>
      </InputGroup>
      <Flex gap="4">
        <Select
          fontSize="sm"
          bg="secondaryColor"
          maxW={{ base: "100%", sm: "max-content" }}
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option key="0" value="">
            {defaultCategories}
          </option>
          {categoryData?.map((dt, idx) => {
            return (
              <option key={idx} value={dt[categoriesId]}>
                {dt[categoriesName]}
              </option>
            );
          })}
        </Select>
        <Select
          fontSize="sm"
          bg="secondaryColor"
          maxW={{ base: "100%", sm: "max-content" }}
          onChange={(e) => setSortValue(e.target.value)}
          value={sortValue}
        >
          <option value="">Sort</option>
          <option value="name_ASC">Name (A-Z)</option>
          <option value="name_DESC">Name (Z-A)</option>
        </Select>
      </Flex>
    </Flex>
  );
};

export default FilterBar;
