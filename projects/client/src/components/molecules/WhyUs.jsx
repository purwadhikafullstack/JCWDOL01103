import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { BiAlbum, BiAward, BiRocket, BiDollar } from "react-icons/bi";

const WhyUs = () => {
  return (
    <Container as="section" maxW="8xl" mt={16} textAlign={"center"}>
      <Heading fontSize={"4xl"} fontWeight={"black"} as={"h1"} mt={5} mb={10}>
        Get More at Soundsense
      </Heading>
      <SimpleGrid columns={{ base: 1, xl: 4 }} gap={5}>
        <Box
          p={10}
          display="grid"
          placeContent={"center"}
          border={"1px"}
          borderRadius={"lg"}
          borderColor={"gray.200"}
          _hover={{
            borderColor: "gray.400",
            boxShadow: "md",
            transform: "scale(1.01)",
            transition: "all 0.1s ease-in-out",
          }}
        >
          <BiAlbum color="black" fontSize="50px" style={{ margin: "0 auto" }} />
          <Heading fontSize={"2xl"} as={"h2"} mt={5}>
            Premium Quality Instruments
          </Heading>
          <Text mt={3} p={2}>
            Discover instruments of exceptional quality for musical excellence.
          </Text>
        </Box>
        <Box
          p={10}
          display="grid"
          placeContent={"center"}
          border={"1px"}
          borderRadius={"lg"}
          borderColor={"gray.200"}
          _hover={{
            borderColor: "gray.400",
            boxShadow: "md",
            transform: "scale(1.01)",
            transition: "all 0.1s ease-in-out",
          }}
        >
          <BiAward color="black" fontSize="50px" style={{ margin: "0 auto" }} />
          <Heading fontSize={"2xl"} as={"h2"} mt={5}>
            10 Years Warranty
          </Heading>
          <Text mt={3} p={2}>
            Assurance for a decade with our comprehensive 10-year warranty.
          </Text>
        </Box>
        <Box
          p={10}
          display="grid"
          placeContent={"center"}
          border={"1px"}
          borderRadius={"lg"}
          borderColor={"gray.200"}
          _hover={{
            borderColor: "gray.400",
            boxShadow: "md",
            transform: "scale(1.01)",
            transition: "all 0.1s ease-in-out",
          }}
        >
          <BiRocket
            color="black"
            fontSize="50px"
            style={{ margin: "0 auto" }}
          />
          <Heading fontSize={"2xl"} as={"h2"} mt={5}>
            Fast & Free Shipping
          </Heading>
          <Text mt={3} p={2}>
            Swift, no-cost shipping ensures your order arrives promptly and
            worry-free.
          </Text>
        </Box>
        <Box
          p={10}
          display="grid"
          placeContent={"center"}
          border={"1px"}
          borderRadius={"lg"}
          borderColor={"gray.200"}
          _hover={{
            borderColor: "gray.400",
            boxShadow: "md",
            transform: "scale(1.01)",
            transition: "all 0.1s ease-in-out",
          }}
        >
          <BiDollar
            color="black"
            fontSize="50px"
            style={{ margin: "0 auto" }}
          />
          <Heading fontSize={"2xl"} as={"h2"} mt={5}>
            Simple Payment Options
          </Heading>
          <Text mt={3} p={2}>
            Streamlined payments for your convenience, hassle-free and
            accessible.
          </Text>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default WhyUs;
