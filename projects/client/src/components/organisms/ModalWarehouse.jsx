import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function ModalWarehouse({ data, ...props }) {
  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Warehouse Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" pb={6} gap="4">
          <Box>
            <Text fontSize="sm" fontWeight="semibold">
              Warehouse ID:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.id}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              Warehouse Name:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.name}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              Province:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.region.province.province_name}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              City:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.region.city_name}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              Street:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.street}
              </Text>
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalWarehouse;
