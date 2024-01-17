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
import { useSelector } from "react-redux";

function ModalCreateWarehouse({ onClose, isOpen, onCloseComplete }) {
  const data = useSelector((state) => state.formWarehouse.selectedWarehouse);
  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={onCloseComplete}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data ? "Edit Warehouse" : "Create new warehouse"}</ModalHeader>
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
