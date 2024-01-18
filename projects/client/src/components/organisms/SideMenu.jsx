import { useState, useRef, useEffect } from "react";
import { Flex, Button, useBreakpoint, useToast } from "@chakra-ui/react";
import MenuItem from "../molecules/MenuItem";
import {
  BiMusic,
  BiCategory,
  BiGroup,
  BiUser,
  BiBuildingHouse,
  BiBook,
  BiX,
  BiMenuAltLeft,
} from "react-icons/bi";
import { FaBoxes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../../api/auth";
import { useSelector } from "react-redux";
import { toastConfig } from "../../utils/toastConfig";

const SideMenu = ({ type }) => {
  const userState = useSelector(state => state.login.user);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [role, setRole] = useState(null);
  const menuBoxRef = useRef();
  const displaySize = useBreakpoint();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    setIsMenuVisible(false);
  }, [displaySize]);

  useEffect(() => {
    (async () => {
      try {
        if (userState) {
          const userDecoded = jwtDecode(userState);
          const userDetails = await getUser(encodeURIComponent(userDecoded.id));
          setRole(userDetails.data.role);
        }
      } catch (error) {
        toast(toastConfig("error", "Failed", error.message));
      }
    })();
  }, [userState]);

  const toggleMenuVisible = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  return (
    <>
      {type === "navbar" && (
        <Button
          onClick={toggleMenuVisible}
          display={
            location.pathname.split("/")[1] === "dashboard"
              ? { base: "block", xl: "none" }
              : "none"
          }
          shadow="xl"
        >
          <BiMenuAltLeft size={"20px"} />
        </Button>
      )}
      <Flex
        flexDir={"column"}
        maxW={{ base: "100%", xl: "600px" }}
        h="max-content"
        padding={"60px"}
        borderRadius="lg"
        shadow={"xl"}
        bgColor="secondaryColor"
        gap="4"
        justifyContent={{ base: "center" }}
        ref={menuBoxRef}
        position={{ base: "fixed", xl: "static" }}
        top="20px"
        right={isMenuVisible ? "10px" : "-100%"}
        display={
          type === "navbar"
            ? { base: "flex", xl: "none" }
            : { base: "none", xl: "flex" }
        }
        zIndex={100}
      >
        <Button
          onClick={toggleMenuVisible}
          position="absolute"
          display={{ base: "block", xl: "none" }}
          top="10px"
          right="10px"
          bg={"none"}
        >
          <BiX size={"30px"} />
        </Button>
        <MenuItem icon={<BiMusic />} name="Product" to="/dashboard/products" />
        <MenuItem
          icon={<BiCategory />}
          name="Categories"
          to="/dashboard/categories"
        />
        {role === "master" && (
          <MenuItem
            icon={<BiGroup />}
            name="Users"
            to="/dashboard/users"
            display={role === "master" ? "flex" : "none"}
          />
        )}
        {role === "master" && (
          <MenuItem
            icon={<BiBuildingHouse />}
            name="Warehouse"
            to="/dashboard/warehouses"
          />
        )}
        <MenuItem
          icon={<FaBoxes />}
          name="Stock"
          to="/dashboard/product-stock"
        />
        {role === "admin" && (
          <MenuItem
            icon={<BiBook />}
            name="Mutation"
            to="/dashboard/stock-mutation"
          />
        )}
      </Flex>
    </>
  );
};

export default SideMenu;
