import soundsenseLogoWhite from "../../assets/img/soundsense-light.png";
import appDownload from "../../assets/img/app-download.png";
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
  Link,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container as="footer" maxW="100vw" color={"white"} bg={"black"}>
      <Container
        maxW={{ xl: "7xl", "2xl": "8xl" }}
        py={{ base: "50px", xl: "100px" }}
        mt={"100px"}
      >
        <SimpleGrid columns={{ base: 1, lg: 4 }} gap={3}>
          <Box>
            <Image
              src={soundsenseLogoWhite}
              alt="Soundsense Logo"
              h="55px"
              objectFit="cover"
            />
            <Text fontSize={"sm"} mt={5} lineHeight={"1.4"} pr={10}>
              Explore Soundsense's musical haven – quality instruments, expert
              guidance, vibrant community. Elevate your journey with us.
            </Text>
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
          <Box mt={{ base: 5, xl: 0 }}>
            <Heading as={"h3"} fontSize={"xl"} fontWeight={"bold"} mb={5}>
              Information
            </Heading>
            <Text fontSize={"md"} mb={2}>
              <Link>About Us</Link>
            </Text>
            <Text fontSize={"md"} mb={2}>
              <Link>Blog</Link>
            </Text>
            <Text fontSize={"md"} mb={2}>
              <Link>Contact</Link>
            </Text>
            <Text fontSize={"md"} mb={2}>
              <Link>Pricing</Link>
            </Text>
            <Text fontSize={"md"} mb={2}>
              <Link>Testimonials</Link>
            </Text>
          </Box>
          <Box mt={{ base: 5, xl: 0 }}>
            <Heading as={"h3"} fontSize={"xl"} fontWeight={"bold"} mb={5}>
              Services
            </Heading>
            <Text fontSize={"md"} mb={2}>
              <Link>How to Order</Link>
            </Text>
            <Text fontSize={"md"} mb={2}>
              <Link>How to Payment</Link>
            </Text>
            <Text fontSize={"md"} mb={2}>
              <Link>Shipping Information</Link>
            </Text>
            <Text fontSize={"md"} mb={2}>
              <Link>Order Tracking</Link>
            </Text>
            <Text fontSize={"md"} mb={2}>
              <Link>Transaction Cancellation</Link>
            </Text>
          </Box>
          <Box mt={{ base: 5, xl: 0 }}>
            <Heading as={"h3"} fontSize={"xl"} fontWeight={"bold"} mb={4}>
              Install Soundsense App
            </Heading>
            <Image
              src={appDownload}
              alt="Soundsense Logo"
              h="150px"
              objectFit="cover"
            />
          </Box>
        </SimpleGrid>
      </Container>
      <Text
        textAlign={"center"}
        fontSize={"sm"}
        pb={5}
        color={"white"}
        borderTop={"1px"}
        borderColor={"whiteAlpha.300"}
        pt={3}
      >
        &#169; Soundsense 2023 | All Rights Reserved
      </Text>
    </Container>
  );
};

export default Footer;
