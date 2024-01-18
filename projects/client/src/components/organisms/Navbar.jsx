import React, { useEffect, useState } from "react";
import soundsenseLogo from "../../assets/img/soundsense-dark.png";
import { server } from "../../api/index";
import { BiUser, BiCartAlt, BiSearch } from "react-icons/bi";
import {
  Container,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getUser, verificationValidator } from "../../api/auth";
import {
  checkAuthorized,
  logoutAuthorized,
} from "../../store/slicer/authSlice";
import { toastConfig } from "../../utils/toastConfig";
import SideMenu from "./SideMenu";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authState = useSelector(state => state.login.isAuthorized);
  const userState = useSelector(state => state.login.user);
  const [userInfo, setUserInfo] = useState(null);
  const reduxItemCount = useSelector(state => state.cart.itemCount);
  const [cartItemCount, setCartItemCount] = useState(0);

  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await verificationValidator(token);
          if (!response.data.verified) {
            dispatch(logoutAuthorized());
          }
          dispatch(checkAuthorized());
        }
      } catch (error) {
        dispatch(logoutAuthorized());
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        if (userState) {
          const userDecoded = jwtDecode(userState);
          const userDetails = await getUser(encodeURIComponent(userDecoded.id));
          setUserInfo(userDetails.data);
        }
      } catch (error) {
        toast(toastConfig("error", "Failed", error.message));
      }
    })();
  }, [authState, dispatch]);
  const onClickLogout = () => {
    dispatch(logoutAuthorized());
    setUserInfo(null);
    navigate("/login");
  };

  const onClickCart = () => {
    navigate("/cart");
  };

  const loadCartData = async () => {
    try {
      const response = await server.get("/cart");
      const cartData = response.data;

      let totalCount = 0;
      cartData.forEach(cart => {
        cart.detail.forEach(item => {
          totalCount += item.quantity;
        });
      });

      setCartItemCount(totalCount);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (authState) {
      loadCartData();
    }
  }, [authState]);

  return (
    <Container
      as="nav"
      maxW={{ xl: "7xl", "2xl": "8xl" }}
      mt={{ base: 7, xl: 9 }}
      zIndex={10}
      position="relative"
      bg={"white"}
    >
      <Flex justify="space-between" align="center">
        <Image
          src={soundsenseLogo}
          alt="Soundsense Logo"
          h={{ base: "40px", lg: "60px" }}
          objectFit="cover"
          onClick={() => {
            navigate("/");
          }}
          cursor="pointer"
        />
        {location.pathname.split("/")[1] !== "dashboard" &&
          location.pathname.split("/")[1] !== "checkout" && (
            <InputGroup mx={"150px"} display={{ base: "none", lg: "block" }}>
              <InputRightElement pointerEvents="none">
                <BiSearch color="black" fontSize="20px" />
              </InputRightElement>
              <Input
                placeholder="Search for Sense Gear"
                focusBorderColor="black"
                borderRadius={"xl"}
                border={"1px"}
              />
            </InputGroup>
          )}
        <Flex>
          <Menu>
            {!userInfo ? (
              <Button
                bg="black"
                size="sm"
                color="white"
                mr="2"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            ) : (
              <>
                <MenuButton>
                  <Flex
                    alignItems={"center"}
                    ml={2}
                    mr={{ base: "1", lg: "5" }}
                    pr={
                      userInfo?.role !== "admin" &&
                      userInfo?.role !== "master" && { base: "1", lg: "5" }
                    }
                    boxSizing="content-box"
                    borderRight={
                      userInfo?.role !== "admin" &&
                      userInfo?.role !== "master" &&
                      "2px"
                    }
                    borderColor={"blackAlpha.400"}
                  >
                    <BiUser color="black" size="30px" />
                    <Flex
                      flexDir="column"
                      alignItems="start"
                      ml={2}
                      maxW="130px"
                      w="fit-content"
                      display={{ base: "none", lg: "flex" }}
                    >
                      <Text
                        w="full"
                        fontSize={"md"}
                        fontWeight={"bold"}
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        textAlign="start"
                      >
                        {userInfo?.name
                          .split(" ")
                          .map(
                            word => word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </Text>
                      <Text fontSize={"sm"} mt={-2}>
                        {userInfo?.role}
                      </Text>
                    </Flex>
                  </Flex>
                </MenuButton>
                <SideMenu type="navbar" />
              </>
            )}
            <MenuList p="4" maxW="250px">
              {authState ? (
                <>
                  <Flex
                    mb="2"
                    display={{ base: "flex", lg: "none" }}
                    flexDir="column"
                  >
                    <Text noOfLines="1" fontWeight="bold">
                      {userInfo?.name}
                    </Text>
                    <Text noOfLines="1" size="sm" fontStyle="italic">
                      {userInfo?.role}
                    </Text>
                  </Flex>
                  {userInfo?.role === "user" && (
                    <MenuItem
                      bg="black"
                      color="white"
                      borderRadius="md"
                      justifyContent="center"
                      mb="2"
                      _hover={{ opacity: "0.2" }}
                      onClick={() => navigate("/account")}
                    >
                      Edit Profile
                    </MenuItem>
                  )}
                  {(userInfo?.role === "admin" ||
                    userInfo?.role === "master") && (
                    <MenuItem
                      mb="2"
                      bg="black"
                      color="white"
                      borderRadius="md"
                      justifyContent="center"
                      _hover={{ opacity: "0.2" }}
                      onClick={() =>
                        location.pathname.split("/")[1] !== "dashboard" &&
                        navigate("/dashboard")
                      }
                    >
                      Dashboard
                    </MenuItem>
                  )}
                  <MenuItem
                    bg="black"
                    color="white"
                    borderRadius="md"
                    justifyContent="center"
                    mb="2"
                    _hover={{ opacity: "0.2" }}
                    onClick={onClickLogout}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    bg="black"
                    color="white"
                    borderRadius="md"
                    justifyContent="center"
                    mb="2"
                    _hover={{ opacity: "0.2" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    bg="black"
                    color="white"
                    borderRadius="md"
                    justifyContent="center"
                    mb="2"
                    _hover={{ opacity: "0.2" }}
                  >
                    Register
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
          {userInfo?.role !== "admin" && userInfo?.role !== "master" && (
            <Menu>
              <MenuButton onClick={onClickCart}>
                <Flex alignItems={"center"}>
                  <BiCartAlt color="black" fontSize="30px" />
                  <Text
                    ml={2}
                    color="white"
                    fontSize={{ base: "9px", lg: "12px" }}
                    fontWeight={"bold"}
                    bg="black"
                    px={2}
                    py={1}
                    border={"2px"}
                    borderColor={"white"}
                    borderRadius={"full"}
                    position={"absolute"}
                    top={{ base: -1, lg: 1 }}
                    right={{ base: 2, lg: 0 }}
                  >
                    {reduxItemCount}
                  </Text>
                </Flex>
              </MenuButton>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
