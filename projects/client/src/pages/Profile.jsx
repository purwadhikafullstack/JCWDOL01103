import { useState, useEffect, useRef } from "react";
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
  Box,
  Button,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const Profile = () => {
  const image = useRef(null);
  const params = useParams();
  const [profileData, setProfileData] = useState({});
  const [newImage, setNewImage] = useState("");
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confNewPassword: "",
  });
  const [successNameMessage, setSuccessNameMessage] = useState(null);
  const [errorNameMessage, setErrorNameMessage] = useState(null);
  const [successPasswordMessage, setSuccessPasswordMessage] = useState(null);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState(null);
  const [successImageMessage, setSuccessImageMessage] = useState(null);
  const [errorImageMessage, setErrorImageMessage] = useState(null);

  const setPasswordData = e => {
    const { name, value } = e.target;

    setPassword({ ...password, [name]: value });
  };

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
  }, [params.id]);

  const changeImage = async () => {
    const selectedFile = image.current.files[0];

    if (selectedFile) {
      const imageData = new FormData();
      imageData.append("image", selectedFile);

      try {
        const response = await axios.put(
          `http://localhost:5001/profile/${params.id}/image`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuccessImageMessage(response.data.message);
        console.info(newImage);
      } catch (e) {
        setErrorImageMessage(e.response.data.message);
      }
    }
  };

  const changeName = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/profile/${params.id}/name`,
        {
          name: newName,
        }
      );
      setSuccessNameMessage(response.data.message);
    } catch (e) {
      setErrorNameMessage(e.response.data.message);
    }
  };

  const changePassword = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/profile/${params.id}/password`,
        password
      );
      setSuccessPasswordMessage(response.data.message);
    } catch (e) {
      setErrorPasswordMessage(e.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <Container
        as="section"
        mt={{ base: "45px", xl: "100px" }}
        textAlign={"left"}
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
        >
          <GridItem>
            <Avatar
              size="2xl"
              name={profileData.data?.name}
              src={profileData.data?.image}
              bg="black"
              color="white"
              boxShadow="lg"
            />
          </GridItem>
          <GridItem>
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
          </GridItem>
        </Grid>
        <Divider my={"80px"} />
        <Box>
          <Heading
            fontSize={{ base: "20px", xl: "2xl" }}
            fontWeight={"black"}
            as={"h1"}
            mt={5}
            mb={1}
          >
            Change Profile Data
          </Heading>
          <Text fontSize={16} mt={1}>
            Change your profile data below.
          </Text>
        </Box>
        <Box>
          <Heading fontSize={"lg"} fontWeight={"black"} as={"h1"} mt={8} mb={1}>
            Profile Picture
          </Heading>
          <Text fontSize={16} mt={1}>
            Change your profile picture.
          </Text>
          <Input
            my={2}
            py={"auto"}
            type="file"
            ref={image}
            name="image"
            value={newImage}
            focusBorderColor="transparent"
            onChange={e => setNewImage(e.target.value)}
          />
          <Button
            bg="black"
            color="white"
            mt={1}
            _hover={{ bg: "blackAlpha.600" }}
            onClick={changeImage}
          >
            Change Image
          </Button>
          {successImageMessage && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              {successImageMessage}
            </Alert>
          )}
          {errorImageMessage && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {errorImageMessage}
            </Alert>
          )}
        </Box>
        <Box>
          <Heading fontSize={"lg"} fontWeight={"black"} as={"h1"} mt={8} mb={1}>
            Name
          </Heading>
          <Text fontSize={16} mt={1}>
            Change your profile name.
          </Text>
          <Input
            my={2}
            focusBorderColor="black"
            placeholder={profileData.data?.name}
            name="name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <Button
            bg="black"
            color="white"
            mt={1}
            _hover={{ bg: "blackAlpha.600" }}
            onClick={changeName}
          >
            Change Name
          </Button>
          {successNameMessage && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              {successNameMessage}
            </Alert>
          )}
          {errorNameMessage && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {errorNameMessage}
            </Alert>
          )}
        </Box>
        <Divider my={7} />
        <Box>
          <Heading fontSize={"lg"} fontWeight={"black"} as={"h1"} mt={8} mb={1}>
            Password
          </Heading>
          <Text fontSize={16} mt={1}>
            Change your password.
          </Text>
          <Input
            my={2}
            focusBorderColor="black"
            type="password"
            placeholder="Old Password"
            name="oldPassword"
            onChange={setPasswordData}
          />
          <Input
            my={2}
            focusBorderColor="black"
            type="password"
            placeholder="New Password"
            name="newPassword"
            onChange={setPasswordData}
          />
          <Input
            my={2}
            focusBorderColor="black"
            type="password"
            placeholder="Confirm New Password"
            name="confNewPassword"
            onChange={setPasswordData}
          />
          <Button
            bg="black"
            color="white"
            mt={1}
            _hover={{ bg: "blackAlpha.600" }}
            onClick={changePassword}
          >
            Change Password
          </Button>
          {successPasswordMessage && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              {successPasswordMessage}
            </Alert>
          )}
          {errorPasswordMessage && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {errorPasswordMessage}
            </Alert>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
