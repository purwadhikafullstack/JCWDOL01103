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
  Link,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

const Navbar = () => {
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
        />
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
        <Flex>
          <Menu>
            <MenuButton>
              <Flex alignItems={"center"}>
                <BiUser color="black" fontSize="30px" />
                {/* <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" /> */}
                <Text
                  fontSize={"md"}
                  fontWeight={"bold"}
                  ml={2}
                  mr={5}
                  pr={5}
                  borderRight={"2px"}
                  borderColor={"blackAlpha.400"}
                  display={{ base: "none", lg: "block" }}
                >
                  <Link>Account</Link>
                </Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem bg={"white"}>
                <Button bg="black" color={"white"} w={"100%"}>
                  Login
                </Button>
              </MenuItem>
              <MenuItem bg={"white"}>
                <Button bg="black" color={"white"} w={"100%"}>
                  Register
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
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
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
