import { server } from "../api/index";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  const params = useParams();
  const [profileData, setProfileData] = useState([]);
  const [successNameMessage, setSuccessNameMessage] = useState(null);
  const [errorNameMessage, setErrorNameMessage] = useState(null);
  const [successPasswordMessage, setSuccessPasswordMessage] = useState(null);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState(null);
  const [successImageMessage, setSuccessImageMessage] = useState(null);
  const [errorImageMessage, setErrorImageMessage] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await server.get(`/profile/${params.id}`);
        setProfileData(response.data);
      } catch (e) {
        console.error(e + "error");
      }
    };
    getProfile();
  }, [params.id]);

  const imageFormik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .test("fileSize", "File size should be less than 1 MB", value => {
          return value && value.size <= 1 * 1024 * 1024;
        })
        .test(
          "fileType",
          "Invalid file type. Please use JPEG, PNG, or JPG.",
          value => {
            return (
              value &&
              ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
            );
          }
        ),
    }),
    onSubmit: async values => {
      const selectedFile = imageFormik.values.image;

      if (selectedFile) {
        const imageData = new FormData();
        imageData.append("image", selectedFile);

        try {
          const response = await server.put(
            `/profile/${params.id}/image`,
            imageData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setSuccessImageMessage(response.data.message);
        } catch (e) {
          setErrorImageMessage(e.response.data.message);
        }
      }
    },
  });

  const nameFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(
        /^[a-zA-Z\s]+$/,
        "Name should only contain letters and spaces"
      ),
    }),
    onSubmit: async values => {
      try {
        const response = await server.put(`/profile/${params.id}/name`, {
          name: nameFormik.values.name,
        });
        setSuccessNameMessage(response.data.message);
      } catch (e) {
        setErrorNameMessage(e.response.data.message);
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confNewPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old Password is required"),
      newPassword: Yup.string()
        .required("New Password is required")
        .min(6, "New Password should be at least 6 characters"),
      confNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm New Password is required"),
    }),
    onSubmit: async values => {
      try {
        const response = await server.put(`/profile/${params.id}/password`, {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confNewPassword: values.confNewPassword,
        });
        setSuccessPasswordMessage(response.data.message);
      } catch (e) {
        setErrorPasswordMessage(e.response.data.message);
      }
    },
  });

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
            {profileData && (
              <Avatar
                size="2xl"
                name={profileData.data?.name}
                src={`http://localhost:8000/uploads/${profileData.data?.image}`}
                bg="black"
                color="white"
                boxShadow="lg"
              />
            )}
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
        <Divider my={{ base: "40px", xl: "80px" }} />
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
          <form onSubmit={imageFormik.handleSubmit}>
            <Heading
              fontSize={"lg"}
              fontWeight={"black"}
              as={"h1"}
              mt={8}
              mb={1}
            >
              Profile Picture
            </Heading>
            <Text fontSize={16} mt={1}>
              Change your profile picture.
            </Text>
            <Input
              my={2}
              py="auto"
              type="file"
              name="image"
              focusBorderColor="transparent"
              onChange={e => {
                imageFormik.setFieldValue("image", e.currentTarget.files[0]);
              }}
            />
            <Text mb={1} color={"red.500"} fontSize={"sm"}>
              {imageFormik.errors.image}
            </Text>
            <Button
              bg="black"
              color="white"
              mt={1}
              type="submit"
              _hover={{ bg: "blackAlpha.600" }}
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
          </form>
        </Box>
        <Box>
          <form onSubmit={nameFormik.handleSubmit}>
            <Heading
              fontSize={"lg"}
              fontWeight={"black"}
              as={"h1"}
              mt={8}
              mb={1}
            >
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
              onChange={nameFormik.handleChange}
              onBlur={nameFormik.handleBlur}
            />
            <Text mb={1} color={"red.500"} fontSize={"sm"}>
              {nameFormik.errors.name}
            </Text>
            <Button
              bg="black"
              color="white"
              mt={1}
              type="submit"
              _hover={{ bg: "blackAlpha.600" }}
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
          </form>
        </Box>
        <Divider my={7} />
        <Box>
          <form onSubmit={passwordFormik.handleSubmit}>
            <Heading
              fontSize={"lg"}
              fontWeight={"black"}
              as={"h1"}
              mt={8}
              mb={1}
            >
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
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
            />
            <Text mb={1} color={"red.500"} fontSize={"sm"}>
              {passwordFormik.errors.oldPassword}
            </Text>
            <Input
              my={2}
              focusBorderColor="black"
              type="password"
              placeholder="New Password"
              name="newPassword"
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
            />
            <Text mb={1} color={"red.500"} fontSize={"sm"}>
              {passwordFormik.errors.newPassword}
            </Text>
            <Input
              my={2}
              focusBorderColor="black"
              type="password"
              placeholder="Confirm New Password"
              name="confNewPassword"
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
            />
            <Text mb={1} color={"red.500"} fontSize={"sm"}>
              {passwordFormik.errors.confNewPassword}
            </Text>
            <Button
              bg="black"
              color="white"
              mt={1}
              type="submit"
              _hover={{ bg: "blackAlpha.600" }}
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
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
