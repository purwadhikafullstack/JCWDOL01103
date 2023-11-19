import React from "react"
import {
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Icon,
  MenuDivider,
  HStack,
  Flex,
  Text,
  Link,
  Divider,
} from "@chakra-ui/react"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { MdLogout } from "react-icons/md"
import { LuUser2 } from "react-icons/lu"

const NavbarDashboard = () => {
  return (
    <Flex direction={"column"}>
      <Flex alignItems="center" p={3}>
        <Text fontSize="3xl" color="orange.500" mx={2}>
          SoundSense
        </Text>
        <Spacer />
        <Menu>
          <MenuButton mx={3}>
            <Avatar name="Alexander" src="" size="md" mx={2} />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <HStack spacing={1} justifyContent={"center"}>
                <Icon as={LuUser2} boxSize={5} />
                <Link href="/settings">Settings</Link>
              </HStack>
            </MenuItem>
            <MenuItem>
              <HStack spacing={1} justifyContent={"center"}>
                <Icon as={MdOutlineSpaceDashboard} boxSize={5} />
                <Link href="/dashboard">Dashboard</Link>
              </HStack>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <HStack spacing={1} justifyContent={"center"}>
                <Icon as={MdLogout} boxSize={5} ml={1} />
                <Link href="/logout">Logout</Link>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Divider />
    </Flex>
  )
}

export default NavbarDashboard
