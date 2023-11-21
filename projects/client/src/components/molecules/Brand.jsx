import brand1 from "../../assets/img/brand1.png";
import brand2 from "../../assets/img/brand2.png";
import brand3 from "../../assets/img/brand3.png";
import brand4 from "../../assets/img/brand4.png";
import brand5 from "../../assets/img/brand5.png";
import brand6 from "../../assets/img/brand6.png";
import brand7 from "../../assets/img/brand7.png";
import brand8 from "../../assets/img/brand8.png";
import brand9 from "../../assets/img/brand9.png";
import brand10 from "../../assets/img/brand10.png";
import brand11 from "../../assets/img/brand11.png";
import brand12 from "../../assets/img/brand12.png";
import { Container, SimpleGrid, Image, Heading } from "@chakra-ui/react";

const Brand = () => {
  return (
    <Container
      as="section"
      maxW={{ xl: "7xl", "2xl": "8xl" }}
      mt={"150px"}
      textAlign={"center"}
    >
      <Heading fontSize={"4xl"} fontWeight={"black"} as={"h1"} mt={5} mb={10}>
        Our Brands
      </Heading>
      <SimpleGrid
        columns={{ base: 2, xl: 6 }}
        gap={{ base: 4, xl: 10 }}
        textAlign={"center"}
      >
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand1}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand2}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand3}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand4}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand5}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand6}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand7}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand8}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand9}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand10}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand11}
          alt="Soundsense Logo"
        />
        <Image
          _hover={{
            transform: "scale(1.2)",
            transition: "all 0.1s ease-in-out",
          }}
          src={brand12}
          alt="Soundsense Logo"
        />
      </SimpleGrid>
    </Container>
  );
};

export default Brand;
