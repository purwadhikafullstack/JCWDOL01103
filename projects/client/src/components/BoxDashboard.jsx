import React from "react"
import {
  Flex,
  VStack,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react"

const BoxDashboard = ({ name, number, type, addition, percentage }) => {
  return (
    <>
      <Flex direction={"column"}>
        <VStack align={"flex-start"} p={3} ml={2} w={"300px"}>
          <Box
            bg={"gray.100"}
            p={4}
            w={"100%"}
            textAlign={"center"}
            borderRadius={"lg"}
          >
            <Flex
              direction={"column"}
              align={"center"}
              justify={"center"}
              h={"100%"}
            >
              <Stat>
                <StatLabel>{name}</StatLabel>
                <StatNumber>
                  {addition} {number}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type={type} />
                  {percentage}
                </StatHelpText>
              </Stat>
            </Flex>
          </Box>
        </VStack>
      </Flex>
    </>
  )
}

export default BoxDashboard
