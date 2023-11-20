import soundsenseLogo from "../../assets/img/soundsense-dark.png";
import { Container, Flex, Heading, Image } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Container as="nav" maxW="8xl" mt={5}>
      <Flex justify="space-between" align="center">
        <Image
          src={soundsenseLogo}
          alt="Soundsense Logo"
          h={{ base: "40px", lg: "60px" }}
          objectFit="cover"
        />
        <Flex>
          <Heading>C</Heading>
          <Heading>M</Heading>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
