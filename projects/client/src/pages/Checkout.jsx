import React from "react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box
} from "@chakra-ui/react";
const steps = [
  { title: "Shipping", description: "Select Address & Shipping" },
  { title: "Payment", description: "Select Payment Method" },
  { title: "Review", description: "Review order" },
];
const Checkout = () => {
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  return (
    <Stepper w="full" p="5" colorScheme='blue' index={activeStep}>
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
            <StepDescription>{step.description}</StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default Checkout;
