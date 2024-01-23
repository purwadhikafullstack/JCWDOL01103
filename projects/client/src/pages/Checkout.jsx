import React, { useEffect, useState } from "react";
import { server } from "../api/index";
import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Flex,
  Button,
  HStack,
  Heading,
  FormLabel,
  Input,
  RadioGroup,
  Stack,
  Radio,
  Image,
  Center,
  Text,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import bca from "../assets/img/bank-bca.png";
import bsi from "../assets/img/bsi.png";
import bni from "../assets/img/bni.png";
import bri from "../assets/img/bri.png";
import jago from "../assets/img/jago.png";
import jenius from "../assets/img/bank-jenius.png";
import InputAddress from "../components/organisms/InputAddress";
import { useSelector } from "react-redux";
import InputShipping from "../components/organisms/InputShipping";
const steps = [
  { title: "Shipping Info", description: "Contact Info" },
  { title: "Payment", description: "Select Payment Method" },
  { title: "Review", description: "Review Order" },
];
const Checkout = () => {
  const checkoutAddress = useSelector(state => state.formCheckout.address);
  const checkoutShipping = useSelector(state => state.formCheckout.shipping);
  const [profileData, setProfileData] = useState(null);
  const [isRadioSelected, setIsRadioSelected] = useState(false);
  const imageURL = "http://localhost:8000/uploads/";
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [isDisableNext, setIsDisableNext] = useState(false);
  useEffect(() => {
    const nextHandler = () => {
      setIsDisableNext(false);
      if (
        (checkoutAddress && checkoutShipping && activeStep === 0) ||
        isRadioSelected
      ) {
        return setIsDisableNext(true);
      }
    };
    nextHandler();
  }, [checkoutAddress, checkoutShipping, activeStep, isRadioSelected]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await server.get(`/profile`);
        setProfileData(response.data);
      } catch (e) {
        console.error("Error: ", e);
      }
    };

    getProfile();
  }, []);

  return (
    <>
      <Stepper
        w="full"
        p="5"
        size={{ base: "sm", md: "md" }}
        index={activeStep}
        colorScheme="red"
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Flex w="full" h="full" minH="60vh" px="10" flexDir="column">
        <Heading size="md" my="5">
          {steps[activeStep].description}
        </Heading>
        {/* Put Component Here */}
        <Flex
          flexDir="column"
          w="full"
          display={activeStep === 0 ? "flex" : "none"}
        >
          {profileData && profileData.data ? (
            <>
              <FormLabel fontSize={16} mt={1} fontWeight={"semibold"}>
                Name
              </FormLabel>
              <Input
                mb={3}
                focusBorderColor="black"
                value={profileData.data?.name}
                name="name"
              />
              <FormLabel fontSize={16} mt={1} fontWeight={"semibold"}>
                Email
              </FormLabel>
              <Input
                mb={3}
                focusBorderColor="black"
                value={profileData.data?.email}
                name="email"
              />
            </>
          ) : (
            <Center>
              <Text fontSize="xl" fontWeight="bold">
                Your cart is empty
              </Text>
            </Center>
          )}
          <InputAddress />
          <InputShipping />
        </Flex>
        <Flex
          flexDir="column"
          w="full"
          display={activeStep === 1 ? "flex" : "none"}
          mb={10}
        >
          <RadioGroup>
            <Stack>
              <Radio value="1" onChange={() => setIsRadioSelected(true)}>
                <Flex alignItems="center" mt={-2}>
                  <Image src={bca} mr={2} w="200px" />
                </Flex>
              </Radio>
              <Radio value="2" onChange={() => setIsRadioSelected(true)}>
                <Flex alignItems="center" mt={-2}>
                  <Image src={bsi} mr={2} w="200px" />
                </Flex>
              </Radio>
              <Radio value="3" onChange={() => setIsRadioSelected(true)}>
                <Flex alignItems="center" mt={-2}>
                  <Image src={bri} mr={2} w="200px" />
                </Flex>
              </Radio>
              <Radio value="4" onChange={() => setIsRadioSelected(true)}>
                <Flex alignItems="center" mt={-2}>
                  <Image src={bni} mr={2} w="200px" />
                </Flex>
              </Radio>
              <Radio value="5" onChange={() => setIsRadioSelected(true)}>
                <Flex alignItems="center" mt={-2}>
                  <Image src={jago} mr={2} w="200px" />
                </Flex>
              </Radio>
              <Radio value="6" onChange={() => setIsRadioSelected(true)}>
                <Flex alignItems="center" mt={-2}>
                  <Image src={jenius} mr={2} w="200px" />
                </Flex>
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        <Flex
          flexDir="column"
          w="full"
          display={activeStep === 2 ? "flex" : "none"}
          mb={10}
        >
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", lg: "3fr 1fr" }}
            gap={5}
          >
            <GridItem p={5} shadow="md" rounded="md" mb={7}>
              <SimpleGrid
                columns={{ base: 2, xl: 5 }}
                gap={3}
                alignItems="center"
                py={5}
                borderBottom="1px"
                borderColor="blackAlpha.300"
              >
                <Image
                  name="image"
                  src=""
                  w={{ base: "100px", xl: "150px" }}
                  h={{ base: "100px", xl: "150px" }}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Gitar
                </Text>
                <Text>2000</Text>
                <HStack>
                  <Text>Quantity:</Text>
                  <Text>2</Text>
                </HStack>
                <Box textAlign="left">
                  <Flex>
                    <Box>
                      <Text mb={-2}>Total Price</Text>
                      <Text fontSize="lg" fontWeight="bold">
                        2.000.000
                      </Text>
                    </Box>
                    <Box></Box>
                  </Flex>
                </Box>
              </SimpleGrid>
            </GridItem>
            <GridItem p={10} shadow="md" rounded="md" mb={7}>
              <Heading fontSize="lg" fontWeight="bold">
                {" "}
              </Heading>
              <Text fontSize="xl" fontWeight="bold">
                Sub Total
              </Text>
              <Text fontSize="xl" mt={-1}>
                2.000.000
              </Text>
              <Text fontSize="xl" fontWeight="bold" mt={5}>
                Shipping
              </Text>
              <Text fontSize="xl" mt={-1}>
                2.000.000
              </Text>
              <Text fontSize="xl" fontWeight="bold" mt={5}>
                Total Order
              </Text>
              <Text fontSize="xl" mt={-1}>
                2.000.000
              </Text>
              <Text fontSize="lg" fontWeight="bold" mt={5}>
                Upload Payment Proof
              </Text>
              <Input
                mb={3}
                focusBorderColor="black"
                placeholder="Image"
                name="image"
                type="file"
              ></Input>
              <Button
                bg="black"
                w={"full"}
                color={"white"}
                _hover={{ bg: "gray.300", color: "gray.800" }}
                mt={7}
                h={"50px"}
              >
                <Text fontSize="xl">Order</Text>
              </Button>
            </GridItem>
          </Grid>
        </Flex>
        {/* ============ */}
      </Flex>
      <HStack justifySelf="flex-end">
        {activeStep !== 0 && (
          <Button
            onClick={() => setActiveStep(activeStep - 1)}
            maxW="fit-content"
          >
            Back
          </Button>
        )}
        {activeStep !== 2 && (
          <Button
            maxW="fit-content"
            onClick={() => setActiveStep(activeStep + 1)}
            isDisabled={!isDisableNext}
          >
            Continue
          </Button>
        )}
      </HStack>
    </>
  );
};

export default Checkout;
