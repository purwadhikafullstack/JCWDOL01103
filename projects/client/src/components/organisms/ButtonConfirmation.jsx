import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

function ButtonConfirmation({
  variant,
  title,
  desc,
  buttonDiscard,
  buttonConfirm,
  onClickConfirm,
  onClick,
  children,
  isOpen,
  onClose,
}) {
  const cancelRef = React.useRef();
  const onClickHandler = () => {
    const result = onClick()
    result && onClose()
  }
  return (
    <>
      {variant === "secondary" ? (
        <Button
          borderColor="primaryColor"
          cursor="pointer"
          _hover={{ bg: "primaryColor", color: "secondaryColor" }}
          onClick={onClickHandler}
        >
          {children}
        </Button>
      ) : (
        <Button bg="primaryColor" color="white" onClick={onClickHandler}>
          {children}
          asdasaksjdnk
        </Button>
      )}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{desc}</AlertDialogBody>
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
              {buttonDiscard}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ButtonConfirmation;
