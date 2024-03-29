import {
  Box,
  Button,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UserAddress from "./UserAddress";
import { getAddresses } from "../../api/userAddress";
import ModalFormAddress from "./ModalFormAddress";
import { useDispatch } from "react-redux";
import { setAddressCheckout } from "../../store/slicer/checkoutSlice";

const InputAddress = ({ isInvalid, onChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState(null);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await getAddresses();
      const primaryAddress = response.data.find(dt => dt.is_primary === true);
      setAddress(primaryAddress);
      setSelected(primaryAddress);
      dispatch(setAddressCheckout(primaryAddress));
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Flex w="full">
      <FormControl isInvalid={isInvalid}>
        <FormLabel fontSize={16} mt={2} fontWeight={"semibold"}>
          Address
        </FormLabel>
        <Box
          justifyContent="flex-end"
          border={isInvalid ? "2px" : "1px"}
          p="5"
          borderRadius="md"
          borderColor={isInvalid ? "#e53e3e" : "inherit"}
          id="warehouse_id"
        >
          {address ? (
            <>
              <Text fontWeight="bold">{address?.name}</Text>
              <Text>{address?.street}</Text>
              <Text>{`${address?.region.city_name}, ${address?.region.province.province_name}, ${address?.region.postal_code}`}</Text>
            </>
          ) : (
            <Text color="gray.500">Please create address first</Text>
          )}
          <Button
            bg="primaryColor"
            size="sm"
            color="white"
            mt="3"
            onClick={() => (address ? onOpen() : onOpenForm())}
          >
            {address ? "Change" : "Create address"}
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent h="85vh" maxW="700px">
              <ModalHeader>Address List</ModalHeader>
              <ModalCloseButton />
              <ModalBody pt="0" pos="relative">
                <UserAddress
                  action="order"
                  onChange={val => {
                    dispatch(setAddressCheckout(val));
                    onChange && onChange(val);
                    setSelected(val);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  bg="primaryColor"
                  size="md"
                  color="white"
                  onClick={() => {
                    dispatch(setAddressCheckout(selected));
                    setAddress(selected);
                    onClose();
                  }}
                >
                  Choose Address
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </FormControl>
      <ModalFormAddress
        onCloseComplete={() => fetchData()}
        isOpen={isOpenForm}
        onClose={onCloseForm}
      />
    </Flex>
  );
};

export default InputAddress;
