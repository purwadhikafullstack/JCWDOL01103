import { Flex, Show } from "@chakra-ui/react";
import MenuItem from "../molecules/MenuItem";
import {
  BiMusic,
  BiCategory,
  BiGroup,
  BiUser,
  BiBuildingHouse,
  BiBook,
} from "react-icons/bi";
// import { useEffect, useState } from "react";

function SideMenu() {
  //   const [role, setRole] = useState("");

  //   useEffect(() => {
  //     const user = parseToken(localStorage.getItem("token"));
  //     setRole(user.role);
  //   }, []);

  return (
    <Show above="md">
      <Flex
        flexDir={{ base: "row", xl: "column" }}
        w="100%"
        maxW={{ base: "100%", xl: "280px" }}
        h="max-content"
        padding="6"
        borderRadius="lg"
        shadow={"xl"}
        bgColor="secondaryColor"
        gap="4"
        pos={{ base: "sticky", xl: "fixed" }}
        justifyContent={{ base: "center" }}
      >
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
        <MenuItem icon={<BiBook />} name="Journal" to="/dashboard/journals" />
      </Flex>
    </Show>
  );
}

export default SideMenu;
