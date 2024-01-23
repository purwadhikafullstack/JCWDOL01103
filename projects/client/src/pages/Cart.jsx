import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setItemCount } from "../store/slicer/cartSlice";
import { server } from "../api/index";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Grid,
  GridItem,
  Flex,
  HStack,
  Image,
  Center,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { BiTrashAlt } from "react-icons/bi";
import { toastConfig } from "../utils/toastConfig";
import { jwtDecode } from "jwt-decode";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const toast = useToast();
  const imageURL = "http://localhost:8000/uploads/";

  const getCartItems = async () => {
    try {
      const response = await server.get("/cart");
      setCartItems(response.data);

      const totalItems = response.data.reduce((total, cart) => {
        return (
          total +
          cart.detail.reduce((detailTotal, detail) => {
            return detailTotal + detail.quantity;
          }, 0)
        );
      }, 0);
      dispatch(setItemCount(totalItems));
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleQuantityChange = (value, cartId, detailId) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.id === cartId) {
        return {
          ...cartItem,
          detail: cartItem.detail.map(detail => {
            if (detail.id === detailId) {
              let newQuantity = parseInt(value, 10);
              if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1;
              }
              return { ...detail, quantity: newQuantity };
            }
            return detail;
          }),
        };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);

    const totalItems = updatedCartItems.reduce((total, cart) => {
      return (
        total +
        cart.detail.reduce((detailTotal, detail) => {
          return detailTotal + detail.quantity;
        }, 0)
      );
    }, 0);
    dispatch(setItemCount(totalItems));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => {
      return (
        total +
        cartItem.detail.reduce((detailTotal, detail) => {
          return (
            detailTotal + parseFloat(detail.product.price) * detail.quantity
          );
        }, 0)
      );
    }, 0);
  };

  const removeItemFromCart = async cartItemId => {
    try {
      const response = await server.delete(`/cart/${cartItemId}`);

      if (response.status === 200) {
        const updatedCartItems = cartItems.filter(
          item => item.id !== cartItemId
        );
        setCartItems(updatedCartItems);
        toast(toastConfig("success", "Success", response.data.message));

        const totalItems = updatedCartItems.reduce((total, cart) => {
          return (
            total +
            cart.detail.reduce((detailTotal, detail) => {
              return detailTotal + detail.quantity;
            }, 0)
          );
        }, 0);
        dispatch(setItemCount(totalItems));

        getCartItems();
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
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

  const orderNow = async () => {
    if (!userRole) {
      toast(toastConfig("error", "Failed", "Please login first!"));
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <>
      <Container
        as="section"
        maxW={{ xl: "7xl", "2xl": "8xl" }}
        mt={{ base: 10, xl: "70px" }}
      >
        <Heading
          fontSize={{ base: "32px", xl: "3xl" }}
          fontWeight={"black"}
          as={"h1"}
          mb={10}
        >
          Your Cart
        </Heading>
        {cartItems.length === 0 ? (
          <Center>
            <Text fontSize="xl" fontWeight="bold">
              Your cart is empty
            </Text>
          </Center>
        ) : (
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", lg: "3fr 1fr" }}
            gap={5}
          >
            <GridItem p={5} shadow="md" rounded="md" mb={7}>
              {cartItems.map(
                cartItem =>
                  cartItem.detail &&
                  cartItem.detail.map(detailItem => (
                    <SimpleGrid
                      columns={{ base: 2, xl: 5 }}
                      gap={3}
                      alignItems="center"
                      key={detailItem.id}
                      py={5}
                      borderBottom="1px"
                      borderColor="blackAlpha.300"
                    >
                      <Image
                        name={detailItem.name}
                        src={`${imageURL}${detailItem.product.image}`}
                        alt={detailItem.name}
                        title={detailItem.name}
                        w={{ base: "100px", xl: "150px" }}
                        h={{ base: "100px", xl: "150px" }}
                      />
                      <Text fontSize="xl" fontWeight="bold" key={detailItem.id}>
                        {detailItem.product.product_name}
                      </Text>
                      <Text>
                        {detailItem.product.price
                          ? detailItem.product.price.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })
                          : "Price not available"}
                      </Text>
                      <HStack>
                        <Text>Quantity:</Text>
                        <NumberInput
                          value={detailItem.quantity}
                          min={1}
                          onChange={value =>
                            handleQuantityChange(
                              value,
                              cartItem.id,
                              detailItem.id
                            )
                          }
                          w={"70px"}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </HStack>
                      <Box textAlign="left">
                        <Flex>
                          <Box>
                            <Text mb={-2}>Total Price</Text>
                            <Text fontSize="lg" fontWeight="bold">
                              {parseFloat(
                                detailItem.product.price * detailItem.quantity
                              ).toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              })}
                            </Text>
                          </Box>
                          <Box>
                            <Button
                              onClick={() => removeItemFromCart(detailItem.id)}
                              variant="ghost"
                              color={"red.400"}
                              _hover={{ bg: "none", color: "red.800" }}
                              mr={10}
                            >
                              <BiTrashAlt size={25} />
                            </Button>
                          </Box>
                        </Flex>
                      </Box>
                    </SimpleGrid>
                  ))
              )}
            </GridItem>
            <GridItem p={10} shadow="md" rounded="md" mb={7}>
              <Heading fontSize="lg" fontWeight="bold">
                {" "}
              </Heading>
              <Text fontSize="xl" fontWeight="bold">
                Total Order
              </Text>
              <Text fontSize="xl" mt={-1}>
                {calculateTotalPrice().toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Button
                bg="black"
                w={"full"}
                color={"white"}
                _hover={{ bg: "gray.300", color: "gray.800" }}
                onClick={orderNow}
                mt={10}
                h={"50px"}
              >
                <Text fontSize="xl">Checkout</Text>
              </Button>
              <Text fontSize={"12px"} mt={2} textAlign={"center"}>
                Got a discount code? add in the next step.
              </Text>
            </GridItem>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Cart;
