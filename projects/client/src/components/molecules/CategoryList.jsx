import guitar from "../../assets/img/guitars.webp";
import bass from "../../assets/img/bass.webp";
import dj from "../../assets/img/dj-equipment.webp";
import drums from "../../assets/img/drums-percussion.webp";
import keyboards from "../../assets/img/keyboards.webp";
import microphones from "../../assets/img/microphones.webp";
import orchestra from "../../assets/img/orchestra.webp";
import software from "../../assets/img/software.webp";
import sound from "../../assets/img/sound.webp";
import studio from "../../assets/img/studio-recording.webp";

import { Container, SimpleGrid, Box, Image, Heading } from "@chakra-ui/react";

const CategoryList = () => {
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
      >
        Popular Categories
      </Heading>
      <SimpleGrid
        columns={{ base: 2, xl: 5 }}
        gap={{ base: 4, xl: 10 }}
        textAlign={"center"}
      >
        <Box
          boxSize={"100%"}
          py={10}
          bg={"blackAlpha.100"}
          borderRadius={"lg"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow={"sm"}
          _hover={{
            border: "1px",
            boxShadow: "lg",
            borderColor: "blackAlpha.400",
            bg: "blackAlpha.300",
          }}
        >
          <Image
            src={guitar}
            alt="Soundsense Logo"
            h={{ base: "100px", xl: "150px" }}
            objectFit="cover"
          />
        </Box>
        <Box
          boxSize={"100%"}
          py={10}
          bg={"blackAlpha.100"}
          borderRadius={"lg"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow={"sm"}
          _hover={{
            border: "1px",
            boxShadow: "lg",
            borderColor: "blackAlpha.400",
            bg: "blackAlpha.300",
          }}
        >
          <Image
            src={bass}
            alt="Soundsense Logo"
            h={{ base: "100px", xl: "150px" }}
            objectFit="cover"
          />
        </Box>
        <Box
          boxSize={"100%"}
          py={10}
          bg={"blackAlpha.100"}
          borderRadius={"lg"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow={"sm"}
          _hover={{
            border: "1px",
            boxShadow: "lg",
            borderColor: "blackAlpha.400",
            bg: "blackAlpha.300",
          }}
        >
          <Image
            src={dj}
            alt="Soundsense Logo"
            h={{ base: "100px", xl: "150px" }}
            objectFit="cover"
          />
        </Box>
        <Box
          boxSize={"100%"}
          py={10}
          bg={"blackAlpha.100"}
          borderRadius={"lg"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow={"sm"}
          _hover={{
            border: "1px",
            boxShadow: "lg",
            borderColor: "blackAlpha.400",
            bg: "blackAlpha.300",
          }}
        >
          <Image
            src={drums}
            alt="Soundsense Logo"
            h={{ base: "100px", xl: "150px" }}
            objectFit="cover"
          />
        </Box>
        <Box
          boxSize={"100%"}
          py={10}
          bg={"blackAlpha.100"}
          borderRadius={"lg"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow={"sm"}
          _hover={{
            border: "1px",
            boxShadow: "lg",
            borderColor: "blackAlpha.400",
            bg: "blackAlpha.300",
          }}
        >
          <Image
            src={keyboards}
            alt="Soundsense Logo"
            h={{ base: "60px", xl: "100px" }}
            objectFit="cover"
          />
        </Box>
        <Box
          boxSize={"100%"}
          py={10}
          bg={"blackAlpha.100"}
          borderRadius={"lg"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow={"sm"}
          _hover={{
            border: "1px",
            boxShadow: "lg",
            borderColor: "blackAlpha.400",
            bg: "blackAlpha.300",
          }}
        >
          <Image
            src={microphones}
            alt="Soundsense Logo"
            h={{ base: "100px", xl: "150px" }}
            objectFit="cover"
          />
        </Box>
        <Box
          boxSize={"100%"}
          py={10}
          bg={"blackAlpha.100"}
          borderRadius={"lg"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow={"sm"}
          _hover={{
            border: "1px",
            boxShadow: "lg",
            borderColor: "blackAlpha.400",
            bg: "blackAlpha.300",
          }}
        >
          <Image
            src={orchestra}
            alt="Soundsense Logo"
            h={{ base: "60px", xl: "100px" }}
            objectFit="cover"
          />
        </Box>
        <Box
          boxSize={"100%"}
          py={10}
          bg={"blackAlpha.100"}
          borderRadius={"lg"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow={"sm"}
          _hover={{
            border: "1px",
            boxShadow: "lg",
            borderColor: "blackAlpha.400",
            bg: "blackAlpha.300",
          }}
        >
          <Image
            src={software}
            alt="Soundsense Logo"
            h={{ base: "100px", xl: "150px" }}
            objectFit="cover"
          />
        </Box>
        <Box
          boxSize={"100%"}
          py={10}
          bg={"blackAlpha.100"}
          borderRadius={"lg"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow={"sm"}
          _hover={{
            border: "1px",
            boxShadow: "lg",
            borderColor: "blackAlpha.400",
            bg: "blackAlpha.300",
          }}
        >
          <Image
            src={sound}
            alt="Soundsense Logo"
            h={{ base: "100px", xl: "150px" }}
            objectFit="cover"
          />
        </Box>
        <Box
          boxSize={"100%"}
          py={10}
          bg={"blackAlpha.100"}
          borderRadius={"lg"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow={"sm"}
          _hover={{
            border: "1px",
            boxShadow: "lg",
            borderColor: "blackAlpha.400",
            bg: "blackAlpha.300",
          }}
        >
          <Image
            src={studio}
            alt="Soundsense Logo"
            h={{ base: "100px", xl: "150px" }}
            objectFit="cover"
          />
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default CategoryList;
