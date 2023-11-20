import soundsenseLogoWhite from "../../assets/img/soundsense-light.png";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
} from "react-icons/bi";

import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container as="footer" maxW="100vw" color={"white"} bg={"black"}>
      <Container maxW="8xl" py={10} mt={20}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={3}>
          <Box>
            <Image
              src={soundsenseLogoWhite}
              alt="Soundsense Logo"
              h="55px"
              objectFit="cover"
            />
            <Flex gap={4} mt={5}>
              <Box
                w={"40px"}
                h={"40px"}
                bg={"white"}
                borderRadius={"lg"}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <BiLogoFacebook color="black" fontSize={"25px"} />
              </Box>
              <Box
                w={"40px"}
                h={"40px"}
                bg={"white"}
                borderRadius={"lg"}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <BiLogoInstagram color="black" fontSize={"25px"} />
              </Box>
              <Box
                w={"40px"}
                h={"40px"}
                bg={"white"}
                borderRadius={"lg"}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <BiLogoLinkedin color="black" fontSize={"25px"} />
              </Box>
            </Flex>
          </Box>
          <Box>
            <Heading as={"h3"} fontSize={"xl"} fontWeight={"bold"} mb={4}>
              About
            </Heading>
            <Text>d reprehenderit numquam aperiam dignissimos dolorum.</Text>
          </Box>
          <Box>
            <Heading as={"h3"} fontSize={"xl"} fontWeight={"bold"} mb={4}>
              Sitemap
            </Heading>
            <Text>d reprehenderit numquam aperiam dignissimos dolorum.</Text>
          </Box>
          <Box>
            <Heading as={"h3"} fontSize={"xl"} fontWeight={"bold"} mb={4}>
              Contact
            </Heading>
            <Text>d reprehenderit numquam aperiam dignissimos dolorum.</Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Container>
  );
};

export default Footer;
