import React from "react";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

export const ModalUserDetails = ({data, ...props}) => {
  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" pb={6} gap="4">
          <Box>
            <Text fontSize="sm" fontWeight="semibold">
              ID:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.id}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              User ID:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.user?.id}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              Name:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.user?.name}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              Email:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.user?.email}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              Warehouse Name:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.warehouse?.name}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              Location:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.warehouse?.city_name + ", " + data?.warehouse?.province_name}
              </Text>
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              Street:{" "}
              <Text as="span" fontWeight="normal" color="primaryColor">
                {data?.warehouse?.street}
              </Text>
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
