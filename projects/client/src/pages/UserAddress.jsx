import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { changeAddress, deleteAddress, getAddresses } from "../api/userAddress";
import { SearchInput } from "../components/molecules/SearchInput";
import { BsPinAngle, BsThreeDots } from "react-icons/bs";
import AlertConfirmation from "../components/organisms/AlertConfirmation";
import { toastConfig } from "../utils/toastConfig";
import { BiPlus } from "react-icons/bi";
import ModalFormAddress from "../components/organisms/ModalFormAddress";

const UserAddress = () => {
  const [isLaptop] = useMediaQuery("(min-width: 768px)");
  const [data, setData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [filterInput, setFilterInput] = useState("");
  const toast = useToast();

  const handleChangeAddress = async (actionType) => {
    try {
      const response =
        actionType === "delete"
          ? await deleteAddress(selectedAddress.id)
          : await changeAddress({ id: selectedAddress.id });
      toast(
        toastConfig(
          "success",
          "Success",
          actionType === "delete" ? response.message : response.data.message
        )
      );
      setOpenAlert(false);
      setOpenAlertDelete(false);
      fetchAddress();
      setSelectedAddress(null);
    } catch (error) {
      toast(toastConfig("error", "Failed", error.response.data.message));
    }
  };
  const fetchAddress = async () => {
    try {
      const filter = {
        search: filterInput,
      };
      const response = await getAddresses(filter);
      setData(response.data);
    } catch (error) {
      toast(toastConfig("error", "Failed", error.response.data.message));
    }
  };
  useEffect(() => {
    fetchAddress();
  }, [filterInput]);
  return (
    <Flex
      h="full"
      minH="100vh"
      maxH="100vh"
      alignItems="center"
      flexDir="column"
      bg="gray.100"
      gap="3"
    >
      <HStack w="full" justify="space-between">
        <Heading as="h4" size="md">
          Addrest List
        </Heading>
        <Button
          bg="primaryColor"
          size="sm"
          color="white"
          onClick={() => setOpenModalForm(true)}
        >
          <BiPlus /> Add address
        </Button>
      </HStack>
      <SearchInput
        placeholder="Search here"
        onChangeInput={(val) => setFilterInput(val)}
      />
      <VStack w="full" gap="4">
        {data?.map((dt) => {
          return (
            <Flex
              key={dt.id}
              w="full"
              h="150px"
              shadow="sm"
              gap="3"
              flexDir={isLaptop ? "row" : "column"}
              justifyContent="space-between"
              alignItems={isLaptop ? "center" : "unset"}
              py="5"
              px="3"
              bg="white"
              borderRadius="md"
              border={dt.is_primary ? "1px" : "none"}
            >
              <Box pr="40px" position="relative">
                <Text fontSize="sm" fontWeight="bold">
                  {dt.is_primary && (
                    <Text
                      as="span"
                      bg="primaryColor"
                      color="secondaryColor"
                      py="0.5"
                      px="1"
                      borderRadius="md"
                      fontSize="small"
                      mr="2"
                    >
                      Main
                    </Text>
                  )}
                  {dt.name}
                </Text>
                <Text fontSize="sm" noOfLines="1">
                  {dt.street}
                </Text>
                <Text fontSize="sm" noOfLines="1">
                  {`${dt.region.city_name}, ${dt.region.province.province_name}`}
                </Text>
              </Box>
              <Flex gap="3" justifyContent="flex-end">
                <IconButton
                  icon={<HiOutlinePencil />}
                  onClick={() => {
                    setSelectedAddress(dt);
                    setOpenModalForm(true);
                  }}
                />
                {!dt.is_primary && (
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<BsThreeDots />}
                    />
                    <MenuList>
                      <MenuItem
                        icon={<HiOutlineTrash />}
                        onClick={() => {
                          setOpenAlertDelete(true);
                          setSelectedAddress(dt);
                        }}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem
                        icon={<BsPinAngle />}
                        onClick={() => {
                          setOpenAlert(true);
                          setSelectedAddress(dt);
                        }}
                      >
                        Set as main address
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Flex>
            </Flex>
          );
        })}
      </VStack>
      <AlertConfirmation
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        header="Do you want to change it ?"
        description="This action will change main address and you can change it again if you want"
        buttonConfirm="Yes"
        buttonCancel="Cancel"
        onClickConfirm={() => handleChangeAddress()}
      />
      <AlertConfirmation
        isOpen={openAlertDelete}
        onClose={() => setOpenAlertDelete(false)}
        header="Do you want to delete it ?"
        description="This action will delete this address permanently. You cannot undo this action."
        buttonConfirm="Delete"
        buttonCancel="Cancel"
        onClickConfirm={() => handleChangeAddress("delete")}
      />
      <ModalFormAddress
        data={selectedAddress}
        isOpen={openModalForm}
        onClose={() => setOpenModalForm(false)}
        onCloseComplete={fetchAddress}
      />
    </Flex>
  );
};

export default UserAddress;
