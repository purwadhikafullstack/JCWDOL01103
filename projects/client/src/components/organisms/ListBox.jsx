import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Skeleton,
  SkeletonText,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { dateFormatter } from "../../utils/dateFormatter";
import CustomTag from "../atoms/CustomTag";

const ListBox = ({ data, children, isLoading, requestType }) => {
  const [isLaptop, isMobile] = useMediaQuery([
    "(min-width: 505px)",
    "(max-width: 425px)",
  ]);
  return (
    <Flex
      w="full"
      h={isLaptop ? "170px" : "max-content"}
      maxH="250px"
      bg="white"
      shadow="md"
      border="1px solid"
      borderColor="inherit"
      borderRadius="lg"
      p="5"
      justify="space-between"
      flexWrap="wrap"
      columnGap="50px"
      rowGap="3"
    >
      {isLoading ? (
        <Flex w="full" flexDir="row" justify="space-between" columnGap="4">
          <Box w="full">
            <SkeletonText
              w="60%"
              mb="5"
              noOfLines={1}
              spacing={3}
              skeletonHeight="3"
            />
            <SkeletonText
              w="10%"
              mb="5"
              noOfLines={1}
              spacing={3}
              skeletonHeight="3"
            />
            <SkeletonText
              w="10%"
              mb="5"
              noOfLines={1}
              spacing={3}
              skeletonHeight="3"
            />
            <SkeletonText
              w="50%"
              noOfLines={2}
              spacing={3}
              skeletonHeight="3"
            />
          </Box>
          <Box>
            <SkeletonText
              w="100px"
              my="4"
              noOfLines={1}
              spacing={3}
              skeletonHeight="3"
            />
            <Skeleton h="20px" w="80px" />
          </Box>
        </Flex>
      ) : (
        <>
          <Flex flexDir="column">
            <Heading as="h3" size="sm" noOfLines={2}>
              {data?.product.product_name}
            </Heading>
            <Text mb="10px">{`Amount: ${data?.quantity}`}</Text>
            <Text>{!requestType ? "To:" : "From:"} </Text>
            <Text fontWeight="bold" noOfLines={1}>
              {!requestType
                ? data?.to_warehouse.name
                : data?.from_warehouse.name}
            </Text>
            <Text noOfLines={1}>
              {!requestType
                ? `${data?.to_warehouse.region.city_name}, ${data?.to_warehouse.region.province.province_name}`
                : `${data?.from_warehouse.region.city_name}, ${data?.from_warehouse.region.province.province_name}`}
            </Text>
          </Flex>
          <Flex
            w={isLaptop ? "fit-content" : "full"}
            flexDir={isLaptop ? "column" : "row"}
            justify="space-between"
          >
            <Flex flexDir="column" alignItems={isLaptop ? "self-end" : "unset"}>
              <Text>{dateFormatter(data?.createdAt)}</Text>
              <CustomTag value={data?.status}></CustomTag>
            </Flex>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BsThreeDots />}
                alignSelf="end"
                size="sm"
                variant="outline"
                w="20px"
              />
              <MenuList>{children}</MenuList>
            </Menu>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ListBox;
