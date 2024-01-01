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
import { BsPinAngle, BsThreeDots } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import {
  changeAddress,
  deleteAddress,
  getAddresses,
} from "../../api/userAddress";
import { toastConfig } from "../../utils/toastConfig";
import { SearchInput } from "../../components/molecules/SearchInput";
import AlertConfirmation from "../../components/organisms/AlertConfirmation";
import ModalFormAddress from "../../components/organisms/ModalFormAddress";

const UserAddress = ({ onChange, action }) => {
  const [isLaptop, isMobile] = useMediaQuery(["(min-width: 768px)", "(max-width: 450px)"]);
  const [data, setData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressOrder, setSelectedAddressOrder] = useState(null);
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

  const selectedAddressHandler = (dt, action) => {
    setSelectedAddress(dt);
    if (action === "edit") {
      setOpenModalForm(true);
    }
    if (action === "delete") {
      setOpenAlertDelete(true);
    }
    if (action === "select") {
      setOpenAlert(true);
    }
  };
  const fetchAddress = async (action) => {
    try {
      const filter = {
        search: action ? "" : filterInput,
      };
      const response = await getAddresses(filter);
      const primaryAddress = response.data.find((dt) => dt.is_primary === true);
      selectedAddressOrder === null && setSelectedAddressOrder(primaryAddress);
      setData(response.data);
    } catch (error) {
      toast(toastConfig("error", "Failed", error.response.data.message));
    }
  };
  useEffect(() => {
    (async () => {
      await fetchAddress();
    })();
  }, []);

  useEffect(() => {
    onChange && onChange(selectedAddressOrder);
  }, [selectedAddressOrder]);
  return (
    <Flex
      h="max-content"
      maxH="100vh"
      alignItems="center"
      flexDir="column"
      gap="3"
      w="full"
    >
      <HStack w="full" justify="center" alignItems='center' wrap={isMobile && "wrap"}>
        <SearchInput
          placeholder="Search here"
          onChangeInput={(val) => setFilterInput(val)}
          onPressEnter={fetchAddress}
          onClickCross={() => fetchAddress("refresh")}
        />
        <Button
          bg="primaryColor"
          w={isMobile && "full"}
          size="md"
          color="white"
          onClick={() => setOpenModalForm(true)}
          leftIcon={<BiPlus/>}
        >
          Add New
        </Button>
      </HStack>
      <VStack w="full" gap="4">
        {data?.map((dt) => {
          return (
            <Flex
              key={dt.id}
              w="full"
              h="150px"
              shadow="lg"
              gap="3"
              flexDir={isLaptop ? "row" : "column"}
              justifyContent="space-between"
              alignItems={isLaptop ? "center" : "unset"}
              py="5"
              px="3"
              bg="white"
              borderRadius="md"
              border={
                action === "order"
                  ? dt.id === selectedAddressOrder?.id
                    ? "1px solid"
                    : "none"
                  : dt.is_primary
                  ? "1px solid"
                  : "none"
              }
              cursor={ action === "order" && "pointer"}
              onClick={() => {
                action === "order" && setSelectedAddressOrder(dt);
              }}
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
                  onClick={() => selectedAddressHandler(dt, "edit")}
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
                        onClick={() => selectedAddressHandler(dt, "delete")}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem
                        icon={<BsPinAngle />}
                        onClick={() => selectedAddressHandler(dt, "select")}
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
        onClickConfirm={() => {
          handleChangeAddress();
        }}
      />
      <AlertConfirmation
        isOpen={openAlertDelete}
        onClose={() => setOpenAlertDelete(false)}
        header="Do you want to delete it ?"
        description="This action will delete this address permanently. You cannot undo this action."
        buttonConfirm="Delete"
        buttonCancel="Cancel"
        onClickConfirm={() => {
          handleChangeAddress("delete");
        }}
      />
      <ModalFormAddress
        data={selectedAddress}
        isOpen={openModalForm}
        onClose={() => {
          setOpenModalForm(false);
          setSelectedAddress(null);
        }}
        onCloseComplete={fetchAddress}
      />
    </Flex>
  );
};

export default UserAddress;
