import { useState, useRef } from "react";
import { Flex, Button } from "@chakra-ui/react";
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

const SideMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuBoxRef = useRef();

  const toggleMenuVisible = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <Button
        onClick={toggleMenuVisible}
        display={{ base: "block", xl: "none" }}
        position="fixed"
        top="20px"
        right="20px"
        shadow="xl"
      >
        <BiMenuAltLeft size={"20px"} />
      </Button>
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
        right={isMenuVisible ? "0" : "-100%"}
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
        <MenuItem
          icon={<BiUser fontSize={"20px"} />}
          name="Profile"
          to={`/dashboard/profile/${localStorage.getItem("id")}`}
        />
        <MenuItem icon={<BiMusic />} name="Product" to="/dashboard/products" />
        <MenuItem
          icon={<BiCategory />}
          name="Categories"
          to="/dashboard/categories"
        />
        <MenuItem icon={<BiGroup />} name="Users" to="/dashboard/users" />
        <MenuItem
          icon={<BiBuildingHouse />}
          name="Warehouse"
          to="/dashboard/warehouses"
        />
        <MenuItem icon={<BiBook />} name="Stock" to="/dashboard/product-stock" />
        <MenuItem icon={<BiBook />} name="Mutation" to="/dashboard/stock-mutation" />
        {/* <MenuItem icon={<BiBook />} name="Journal" to="/dashboard/stock-mutation" /> */}
      </Flex>
    </>
  );
};

export default SideMenu;