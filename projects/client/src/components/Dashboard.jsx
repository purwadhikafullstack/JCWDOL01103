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
  MenuDivider,
  Link,
} from "@chakra-ui/react"

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
          <MenuButton mx={3}>
            <Avatar name="Alexander" src="" size="sm" mx={2} />
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
