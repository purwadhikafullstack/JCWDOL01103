import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../api/index";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Input,
  Heading,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import { BiCartAdd } from "react-icons/bi";
import { useToast } from "@chakra-ui/toast";
import { jwtDecode } from "jwt-decode";
import { toastConfig } from "../utils/toastConfig";

const ProductDetail = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [userRole, setUserRole] = useState(null);
  const imageURL = "http://localhost:8000/uploads/";

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await server.get(`/product/${params.id}`);
        const productData = response.data.data;
        const totalStock = productData.stock.reduce(
          (sum, stockItem) => sum + stockItem.quantity,
          0
        );
        setProduct({ ...productData, totalStock });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
  }, [params.id]);

  const handleQuantityChange = e => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(Math.max(0, newQuantity));
  };

  const incrementQuantity = () => {
    if (quantity < product.totalStock) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const getUserRoleFromToken = token => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.role;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = getUserRoleFromToken(token);
    setUserRole(role);
  }, []);

  const addToCart = async () => {
    if (!userRole) {
      toast(toastConfig("error", "Failed", "Please login first!"));
      navigate("/login");
      return;
    }

    try {
      const response = await server.post("/cart", {
        product_id: product.id,
        quantity: quantity,
      });
      toast(toastConfig("success", "Success", response.data.message));
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <Container
        as="section"
        maxW={{ xl: "7xl", "2xl": "8xl" }}
        mt={{ base: 10, lg: "100px" }}
        mx={{ base: 0, lg: "200px" }}
      >
        <Flex
          w={"full"}
          flexDir={{ base: "column", lg: "row" }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box w={{ base: "100%", lg: "50%" }}>
            <Image
              w={{ base: "100%", xl: "550px" }}
              src={`${imageURL}${product?.image}`}
              alt={product?.product_name}
              title={product?.product_name}
              _hover={{
                transform: "scale(1.1)",
                transition: "all 0.2s ease-in-out",
              }}
            />
          </Box>
          <Box zIndex={1} mt={{ base: 0, xl: 10 }}>
            <Text fontSize={"sm"} mb={3} mt={{ base: 10, xl: 0 }}>
              {product?.product_category?.name
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ") || "No Category"}
            </Text>
            <Heading
              fontSize={{ base: "32px", xl: "3xl" }}
              fontWeight={"black"}
              as={"h1"}
              w={{ base: "full", xl: "600px" }}
            >
              {product?.product_name}
            </Heading>
            <Text
              fontSize={{ base: "lg", xl: "2xl" }}
              fontWeight={"bold"}
              mt={5}
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
            <Text mt={5} w={{ base: "90%", xl: "600px" }}>
              {product?.description}
            </Text>
            <Box>
              <Flex alignItems={"center"} mt={8}>
                <Flex alignItems="center">
                  <Text mr={3} fontWeight={"semibold"}>
                    Quantity:
                  </Text>
                  <Button
                    onClick={decrementQuantity}
                    mr={1}
                    isDisabled={product.totalStock === 0}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    w="60px"
                    mr={1}
                    min={0}
                    max={product.totalStock}
                  />
                  <Button
                    onClick={incrementQuantity}
                    mr={8}
                    isDisabled={product.totalStock === 0}
                  >
                    +
                  </Button>
                </Flex>
                <Text
                  fontWeight={"semibold"}
                  w={"100px"}
                  lineHeight={"1"}
                  color={product.totalStock > 0 ? "black" : "red.500"}
                >
                  {product.totalStock > 0
                    ? `Only ${product.totalStock} Items Left`
                    : "Out of Stock"}
                </Text>
              </Flex>
            </Box>

            <Flex mt={10}>
              <Button
                w={{ base: "full", lg: "40%" }}
                bg="black"
                color={"white"}
                onClick={addToCart}
                px={8}
                hidden={userRole === "master" && "admin"}
                isDisabled={product.totalStock === 0}
              >
                <BiCartAdd /> Add to Cart
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default ProductDetail;
