import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import InputAddress from "../components/organisms/InputAddress";
import { useSelector } from "react-redux";
import InputShipping from "../components/organisms/InputShipping";
const steps = [
  { title: "Shipping", description: "Select Address & Shipping" },
  { title: "Payment", description: "Select Payment Method" },
  { title: "Review", description: "Review order" },
];
const Checkout = () => {
  const checkoutAddress = useSelector((state) => state.formCheckout.address);
  const checkoutShipping = useSelector((state) => state.formCheckout.shipping)
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [isDisableNext, setIsDisableNext] = useState(false);
  useEffect(() => {
    const nextHandler = () => {
      setIsDisableNext(false);
      if (checkoutAddress && checkoutShipping && activeStep === 0) {
        return setIsDisableNext(true);
      }
    };
    nextHandler();
  }, [checkoutAddress, checkoutShipping, activeStep]);
  return (
    <>
      <Stepper
        w="full"
        p="5"
        size={{ base: "sm", md: "md" }}
        index={activeStep}
        colorScheme="teal"
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
        <Heading size="md" mb="5">
          {steps[activeStep].description}
        </Heading>
        {/* Put Component Here */}
        <Flex flexDir="column" w="full" display={activeStep === 0 ? "flex" : "none"}>
          <InputAddress />
          <InputShipping />
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
        <Button
          maxW="fit-content"
          onClick={() => setActiveStep(activeStep + 1)}
          isDisabled={!isDisableNext}
        >
          Continue
        </Button>
      </HStack>
    </>
  );
};

export default Checkout;
