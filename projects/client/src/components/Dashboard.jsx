import React from "react"
import {
  Text,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Icon,
  MenuDivider,
  HStack,
  Link,
} from "@chakra-ui/react"
// import { HamburgerIcon } from "@chakra-ui/icons"
import { LuUser2 } from "react-icons/lu"

const Dashboard = () => {
  return (
    <header className="">
      <Flex alignItems="center">
        <Text fontSize="3xl" color="orange.500" mx={2}>
          SoundSense
        </Text>
        <Text fontSize="2xl" mx={2}>
          Home
        </Text>
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} mx={3}>
            <HStack spacing={1} ml={2}>
              <Icon as={LuUser2} boxSize={7} />
              <Avatar name="Alexander" src="" size="sm" mx={2} />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link href="/settings">Settings</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </MenuItem>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </header>
  )
}

export default Dashboard
