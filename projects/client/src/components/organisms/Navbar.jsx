import React, { useEffect, useState } from "react";
import soundsenseLogo from "../../assets/img/soundsense-dark.png";
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
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authState = useSelector((state) => state.login.isAuthorized);
  const userState = useSelector((state) => state.login.user);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if(token){
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
        {location.pathname.split("/")[1] !== "dashboard" && (
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
                  {/* <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" /> */}
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
                      {userInfo?.name}
                    </Text>
                    <Text fontSize={"sm"}>{userInfo?.role}</Text>
                  </Flex>
                </Flex>
              </MenuButton>
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
                  {(userInfo?.role === "admin" || userInfo?.role === "master") && (
                    <MenuItem
                      mb="2"
                      bg="black"
                      color="white"
                      borderRadius="md"
                      justifyContent="center"
                      _hover={{ opacity: "0.2" }}
                      onClick={()=> location.pathname.split("/")[1] !== "dashboard" && navigate("/dashboard")}
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
              <MenuButton>
                <Flex alignItems={"center"}>
                  <BiCartAlt color="black" fontSize="30px" />
                </Flex>
              </MenuButton>
              <MenuList>
                <Text mx={"auto"} fontWeight={"bold"} textAlign="center" my={3}>
                  Your Cart Is Empty
                </Text>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
