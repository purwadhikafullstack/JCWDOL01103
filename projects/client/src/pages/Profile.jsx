import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import {
  Avatar,
  Container,
  Heading,
  Grid,
  GridItem,
  Text,
  Divider,
} from "@chakra-ui/react";

const Profile = () => {
  const params = useParams();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/profile/${params.id}`
        );
        setProfileData(response.data);
      } catch (e) {
        console.error(e + "error");
      }
    };
    getProfile();
  }, [params]);
  console.info(profileData);

  return (
    <>
      <Navbar />
      <Container
        as="section"
        mt={{ base: "45px", xl: "100px" }}
        textAlign={"center"}
      >
        <Heading
          fontSize={{ base: "25px", xl: "3xl" }}
          fontWeight={"black"}
          as={"h1"}
          mt={5}
          mb={10}
        >
          Profile
        </Heading>
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "repeat(2, 1fr)",
          }}
          gap={{ base: 4, xl: 4 }}
          textAlign={"center"}
        >
          <GridItem>
            <Avatar
              size="2xl"
              name={profileData.data?.name}
              src={profileData.data?.image}
              bg="black"
              color="white"
            />
          </GridItem>
          <GridItem textAlign={"left"}>
            <Heading fontSize={"xl"} as={"h2"}>
              Name:
            </Heading>
            <Text mt={1} textTransform="capitalize">
              {profileData.data?.name}
            </Text>
            <Divider my={4} />
            <Heading fontSize={"xl"} as={"h2"}>
              Email:
            </Heading>
            <Text mt={1}>{profileData.data?.email}</Text>
            <Divider my={4} />
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
