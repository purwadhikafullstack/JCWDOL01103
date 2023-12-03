import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FormWarehouse } from "./FormWarehouse";

function ModalCreateWarehouse({...props }) {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new warehouse</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" pb={6} gap="4">
          <FormWarehouse/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalCreateWarehouse;
