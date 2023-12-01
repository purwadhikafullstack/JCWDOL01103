import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const AlertConfirmation = ({
  isOpen,
  onOpen,
  onClose,
  header,
  description,
  buttonCancel,
  buttonConfirm,
  onClickConfirm,
}) => {
  const cancelRef = useRef();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              borderColor="primaryColor"
              cursor="pointer"
              _hover={{ bg: "primaryColor", color: "secondaryColor" }}
              onClick={onClickConfirm}
            >
              {buttonConfirm}
            </Button>
            <Button
              ml={3}
              bg="primaryColor"
              color="white"
              ref={cancelRef}
              onClick={onClose}
            >
              {buttonCancel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertConfirmation;
