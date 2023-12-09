import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { FormWarehouse } from "./FormWarehouse";

function ModalCreateWarehouse({ onClose, isOpen, onCloseComplete }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={onCloseComplete}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new warehouse</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" pb={6} gap="4">
          <FormWarehouse
            onClickCancel={onClose}
            onCloseComplete={(val) => {
              val === "success" && onClose();
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalCreateWarehouse;
