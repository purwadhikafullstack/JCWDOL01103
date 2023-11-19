import React, { useState } from "react"
import { Text, Flex, VStack, Link, Divider, Box } from "@chakra-ui/react"
import LineChart from "../components/LineChart"
import BoxDashboard from "../components/BoxDashboard"

const MainDashboard = () => {
  const [isOverview, setIsOverview] = useState(false)
  // const [isUser, setIsUser] = useState(false)
  // const [isProduct, setIsProduct] = useState(false)
  // const [isMutation, setIsMutation] = useState(false)

  const handleClick = (section) => {
    // setIsOverview(false)
    // setIsUser(false)
    // setIsProduct(false)
    // setIsMutation(false)

    switch (section) {
      case "Overview":
        setIsOverview(true)
        break
      case "User":
        // setIsUser(true)
        break
      case "Product":
        // setIsProduct(true)
        break
      case "Mutation":
        // setIsMutation(true)
        break
      default:
        break
    }
  }
  return (
    <Flex>
      <Box position={"relative"}>
        <Flex direction={"row"}>
          <VStack align={"flex-start"} p={3} ml={2} w={"200px"}>
            <Link
              fontSize={"xl"}
              my={10}
              onClick={() => handleClick("Overview")}
              color={isOverview ? "blue.500" : "black"}
            >
              Overview
            </Link>
            <Divider />
            <Link
              fontSize={"xl"}
              my={10}
              // onClick={handleClick("User")}
              // color={isOverview ? "blue.500" : "black"}
            >
              User
            </Link>
            <Divider />
            <Link
              fontSize={"xl"}
              my={10}
              // onClick={handleClick("Product")}
              // color={isOverview ? "blue.500" : "black"}
            >
              Product
            </Link>
            <Divider />
            <Link
              fontSize={"xl"}
              my={10}
              // onClick={handleClick("Mutation")}
              // color={isOverview ? "blue.500" : "black"}
            >
              Mutation
            </Link>
            <Divider />
          </VStack>
          <Box
            position={"absolute"}
            top={0}
            bottom={0}
            left={"200px"}
            h="100vh"
            borderLeft={"1px solid"}
            borderColor={"gray.300"}
          />
          <Flex direction={"column"}>
            {isOverview && (
              <>
                <Text fontWeight={"bold"} fontSize={"3xl"} ml={4} mt={5}>
                  Dashboard
                </Text>
                <Divider borderWidth={"1px"} w={"100%"} mb={10} />
                <Flex
                  justify={"center"}
                  align={"center"}
                  w={"100%"}
                  textAlign={"center"}
                >
                  <BoxDashboard
                    name={"Total Revenue"}
                    number={1000}
                    type={"increase"}
                    addition={"$"}
                    percentage={"25%"}
                  />
                  <BoxDashboard
                    name={"Total User"}
                    number={100}
                    type={"decrease"}
                    addition={null}
                    percentage={"10%"}
                  />
                  <BoxDashboard
                    name={"Total Sales"}
                    number={500}
                    type={"decrease"}
                    addition={"$"}
                    percentage={"15%"}
                  />
                  <BoxDashboard
                    name={"Total Sales"}
                    number={500}
                    type={"increase"}
                    addition={"$"}
                    percentage={"20%"}
                  />
                </Flex>
                <Text fontWeight={"bold"} fontSize={"3xl"} mt={2} ml={4}>
                  User Charts
                </Text>
                <Divider borderWidth={"1px"} w={"100%"} mb={20} />
                <LineChart />
              </>
            )}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default MainDashboard
