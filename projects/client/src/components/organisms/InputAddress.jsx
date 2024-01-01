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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UserAddress from "./UserAddress";
import { getAddresses } from "../../api/userAddress";

const InputAddress = ({ isInvalid, onChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null)
  const [address, setAddress] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getAddresses();
      const primaryAddress = response.data.find((dt) => dt.is_primary === true);
      setAddress(primaryAddress)
      setSelected(primaryAddress)
    })();
  }, []);
  return (
    <Flex>
      <FormControl isInvalid={isInvalid}>
        <Text>Address :</Text>
        <Box
          justifyContent="flex-end"
          border={isInvalid ? "2px" : "1px"}
          p="5"
          borderRadius="md"
          borderColor={isInvalid ? "#e53e3e" : "inherit"}
          id="warehouse_id"
        >
          <Text fontWeight="bold">{address?.name}</Text>
          <Text>{address?.street}</Text>
          <Text>{`${address?.region.city_name}, ${address?.region.province.province_name}, ${address?.region.postal_code}`}</Text>
          <Button
            bg="primaryColor"
            size="sm"
            color="white"
            onClick={onOpen}
          >
            Change
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent bg="gray.100" h="85vh" maxW="700px">
              <ModalHeader>Address List</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <UserAddress action="order" onChange={(val) => {onChange && onChange(val); setSelected(val)}} />
              </ModalBody>
              <ModalFooter>
                <Button bg="primaryColor" size="md" color="white" onClick={()=>{setAddress(selected); onClose()}}>
                  Choose Address
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </FormControl>
    </Flex>
  );
};

export default InputAddress;
