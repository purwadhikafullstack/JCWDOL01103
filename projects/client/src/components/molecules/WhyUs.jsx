import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { BiAlbum, BiAward, BiRocket, BiDollar } from "react-icons/bi";

const WhyUs = () => {
  return (
    <Container
      as="section"
      maxW={{ xl: "7xl", "2xl": "8xl" }}
      mt={{ base: "45px", xl: "100px" }}
      textAlign={"center"}
    >
      <Heading
        fontSize={{ base: "32px", xl: "4xl" }}
        fontWeight={"black"}
        as={"h1"}
        mt={5}
        mb={10}
        lineHeight="1"
      >
        Get More at Soundsense
      </Heading>
      <SimpleGrid columns={{ base: 1, xl: 4 }} gap={5}>
        <Box
          p={10}
          display="grid"
          placeContent={"center"}
          border={"1px"}
          borderRadius={"lg"}
          borderColor={"blackAlpha.300"}
          _hover={{
            borderColor: "blackAlpha.500",
            boxShadow: "md",
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
          borderColor={"blackAlpha.300"}
          _hover={{
            borderColor: "blackAlpha.500",
            boxShadow: "md",
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
          borderColor={"blackAlpha.300"}
          _hover={{
            borderColor: "blackAlpha.500",
            boxShadow: "md",
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
          borderColor={"blackAlpha.300"}
          _hover={{
            borderColor: "blackAlpha.500",
            boxShadow: "md",
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
