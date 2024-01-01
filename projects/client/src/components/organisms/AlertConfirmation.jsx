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
  onClose,
  header,
  description,
  buttonCancel,
  buttonConfirm,
  onClickConfirm,
  isLoading
}) => {
  const cancelRef = useRef();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              isLoading = {isLoading}
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
              isDisabled={isLoading}
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
