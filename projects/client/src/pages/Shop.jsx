import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { server } from "../api/index";
import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Heading,
  Image,
  Text,
  Input,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { BiSortZA, BiTime, BiCategory, BiX } from "react-icons/bi";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortField, setSortField] = useState("product_name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [productStocks, setProductStocks] = useState({});
  const categoryBoxRef = useRef();
  const imageURL = "http://localhost:8000/uploads/";

  const getProducts = useCallback(async () => {
    try {
      const sortParam = sortOrder === "ascending" ? "asc" : "desc";

      const response = await server.get("/products", {
        params: {
          search: searchQuery,
          categories: selectedCategories.join(","),
          sort: sortField,
          order: sortParam,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setProducts(
        response.data.data.map(product => ({
          ...product,
          categoryName: product.product_category?.name || "No Category",
          subCategoryName:
            product.product_sub_category?.name || "No Subcategory",
        }))
      );
      setTotalPages(response.data.totalPages);
    } catch (e) {
      console.error("Error fetching products:", e);
      setProducts([]);
    }
  }, [
    searchQuery,
    sortOrder,
    sortField,
    currentPage,
    itemsPerPage,
    selectedCategories,
  ]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await server.get("/categories");
        setCategories(response.data.data);
      } catch (e) {
        console.error("Failed to fetch categories", e);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = categoryId => {
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter(id => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    );
  };

  const fetchStocks = useCallback(async () => {
    try {
      const productIds = products
        .map(product => encodeURIComponent(product.id))
        .join(",");
      const response = await server.get(`/stock?product_id=${productIds}`);
      let stocks = {};
      response.data.data.warehouse.forEach(item => {
        stocks[item.product_id] = item.quantity;
      });
      setProductStocks(stocks);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      fetchStocks();
    }
  }, [products, fetchStocks]);

  const handlePageChange = page => {
    setCurrentPage(page);
    getProducts();
  };

  const toggleSortOrder = () => {
    setSortField("product_name");
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    getProducts();
  };

  const toggleTimeSort = () => {
    if (sortField !== "createdAt") {
      setSortField("createdAt");
      setSortOrder("descending");
    } else {
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }
    getProducts();
  };

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible(!isCategoryVisible);
  };

  return (
    <>
      <Container
        as="section"
        maxW={{ xl: "7xl", "2xl": "8xl" }}
        mt={{ base: 10, xl: "70px" }}
      >
        <Flex>
          <Box
            position={{ base: "fixed", xl: "static" }}
            top="0"
            left={isCategoryVisible ? "0" : "-100%"}
            transition="left 0.5s"
            w={{ base: "250px", xl: "350px" }}
            h={{ base: "100%", xl: "100%" }}
            mr={8}
            padding="6"
            borderRadius="lg"
            shadow="lg"
            bg="white"
            zIndex={{ base: "overlay", xl: "0" }}
            display={{ xl: "block" }}
            ref={categoryBoxRef}
          >
            <Button
              onClick={toggleCategoryVisibility}
              position="absolute"
              display={{ base: "block", xl: "none" }}
              top="20px"
              right="10px"
              bg={"none"}
            >
              <BiX size={"30px"} />
            </Button>
            <Heading fontSize={"xl"} mb={5} mt={{ base: 10, xl: 0 }}>
              Shop by Category
            </Heading>
            {categories.map(category => (
              <Box>
                <Checkbox
                  mb={1}
                  pos={"flex-start"}
                  colorScheme="blackAlpha"
                  size={"md"}
                  key={category.id}
                  isChecked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                >
                  {category.name
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Checkbox>
              </Box>
            ))}
          </Box>
          <Box w="100%">
            <Flex mb={5}>
              <Button
                onClick={toggleCategoryVisibility}
                display={{ base: "block", xl: "none" }}
                mr={5}
              >
                <BiCategory size={"20px"} />
              </Button>
              <Input
                w={"50%"}
                placeholder="Search Products"
                value={searchQuery}
                type="text"
                onChange={e => setSearchQuery(e.target.value)}
                mr={5}
                focusBorderColor="black"
              />
              <Button
                _hover={{ bg: "blackAlpha.600" }}
                onClick={toggleSortOrder}
                mr={3}
              >
                <BiSortZA size={"20px"} />
              </Button>
              <Button
                _hover={{ bg: "blackAlpha.600" }}
                onClick={toggleTimeSort}
              >
                <BiTime size={"20px"} />
              </Button>
            </Flex>
            {products.length === 0 ? (
              <Text>Product Not Found</Text>
            ) : (
              <>
                <SimpleGrid columns={{ base: 2, xl: 4 }} gap={5}>
                  {products.map((product, index) => (
                    <Link to={`product/${product.id}`} key={index}>
                      <Box
                        key={index}
                        h="max-content"
                        padding="6"
                        borderRadius="lg"
                        shadow={"lg"}
                        gap="4"
                        _hover={{
                          cursor: "pointer",
                          transform: "scale(1.05)",
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        <Image w="350px" src={`${imageURL}${product?.image}`} />
                        <Text fontSize={"sm"} mt={5}>
                          {product?.product_category?.name || "No Category"}
                        </Text>
                        <Heading
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          mt={1}
                          h={{ base: "100%", xl: "3.5em" }}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product?.product_name}
                        </Heading>
                        <Text
                          fontSize={"sm"}
                          mt={3}
                          color={
                            productStocks[product.id] ? "green.500" : "red.500"
                          }
                        >
                          {productStocks[product.id]
                            ? `Stock: ${productStocks[product.id]}`
                            : "Sold Out"}
                        </Text>
                        <Text
                          fontSize={{ base: "md", xl: "lg" }}
                          fontWeight={"bold"}
                        >
                          {product.price
                            ? product.price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              })
                            : "Loading price..."}
                        </Text>
                      </Box>
                    </Link>
                  ))}
                </SimpleGrid>
                <Flex mt={7}>
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    mx="1"
                    colorScheme="gray"
                    isDisabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    page => (
                      <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        mx="1"
                        color={currentPage === page ? "white" : "black"}
                        bg={currentPage === page ? "black" : "gray.200"}
                      >
                        {page}
                      </Button>
                    )
                  )}
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    mx="1"
                    colorScheme="gray"
                    isDisabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </Flex>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Shop;
