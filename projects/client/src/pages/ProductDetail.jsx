import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../api/index";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
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
import { BiCartAdd, BiShoppingBag } from "react-icons/bi";
import { useToast } from "@chakra-ui/toast";
import { jwtDecode } from "jwt-decode";
import { toastConfig } from "../utils/toastConfig";

const ProductDetail = () => {
  const toast = useToast();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [userRole, setUserRole] = useState(null);
  const [productStocks, setProductStocks] = useState(0);
  const imageURL = "http://localhost:8000/uploads/";

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await server.get(`/product/${params.id}`);
        setProduct(response.data.data);
        console.info(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
  }, [params.id]);

  const handleQuantityChange = e => {
    setQuantity(Math.max(1, parseInt(e.target.value)));
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
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
    try {
      const response = await server.post("/cart", {
        product_id: product.id,
        quantity: quantity,
      });
      toast(toastConfig("success", "Success", response.data.message));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const orderNow = () => {
    console.log("Order Now", product.product_name, quantity);
  };

  return (
    <>
      <Navbar />
      <Container
        as="section"
        maxW={{ xl: "7xl", "2xl": "8xl" }}
        mt={{ base: 10, xl: "100px" }}
        mx={{ base: 4, xl: "200px" }}
      >
        <Flex w={"full"} flexDir={{ base: "column", xl: "row" }}>
          <Box w={{ base: "100%", xl: "50%" }}>
            <Image
              w="600px"
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
            <Flex mt={8} alignItems="center">
              <Text mr={3} fontWeight={"semibold"}>
                Quantity:
              </Text>
              <Button onClick={decrementQuantity} mr={1}>
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                w="60px"
                mr={1}
              />
              <Button onClick={incrementQuantity} mr={8}>
                +
              </Button>
              <Text fontWeight={"semibold"} w={"100px"} lineHeight={"1"}>
                Only 10 Items Left
              </Text>
            </Flex>
            <Flex alignItems="center" mt={10}>
              <Button
                bg="gray.600"
                color={"white"}
                onClick={orderNow}
                px={8}
                mr={5}
                hidden={userRole === "master" && "admin"}
              >
                <BiShoppingBag mr={2} />
                Buy Now
              </Button>
              <Button
                bg="black"
                color={"white"}
                onClick={addToCart}
                px={8}
                hidden={userRole === "master" && "admin"}
              >
                <BiCartAdd /> Add to Cart
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
