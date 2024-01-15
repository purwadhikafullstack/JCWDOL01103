import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
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
  const [isLaptop, isMobile] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 450px)",
  ]);
  const [data, setData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressOrder, setSelectedAddressOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadState, setLoadState] = useState(true);
  const [filterInput, setFilterInput] = useState("");
  const toast = useToast();

  const handleChangeAddress = async (actionType) => {
    try {
      setLoading(true);
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
      setTimeout(() => {
        setLoading(false);
        setOpenAlert(false);
        setOpenAlertDelete(false);
        fetchAddress();
        setSelectedAddress(null);
      }, 1300);
    } catch (error) {
      setLoading(false);
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
      setTimeout(() => {
        setLoadState(false);
      }, 1000);
    })();
  }, []);

  useEffect(() => {
    onChange && onChange(selectedAddressOrder);
  }, [selectedAddressOrder]);
  return (
    <Flex pb='20' w="full" flexDir='column'>
      <HStack
        w="full"
        h="max-content"
        justify="center"
        alignItems="center"
        wrap={isMobile && "wrap"}
        position="sticky"
        bg="white"
        zIndex="2"
        top="0"
        pt="1"
      >
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
          leftIcon={<BiPlus />}
        >
          Add New
        </Button>
      </HStack>
      <Flex alignItems="center" flexDir="column" gap="3" w="100%" pt="3" >
        {loadState ? (
          <Spinner />
        ) : (
            <VStack w="100%" gap="4">
              {data?.length === 0 ? (
                <Text alignSelf="self-start">No Address Found</Text>
              ) : (
                data?.map((dt) => {
                  return (
                    <Flex
                      key={dt.id}
                      w="full"
                      h="150px"
                      shadow="md"
                      gap="3"
                      flexDir={isLaptop ? "row" : "column"}
                      justifyContent="space-between"
                      alignItems={isLaptop ? "center" : "unset"}
                      py="5"
                      px="3"
                      bg="white"
                      borderRadius="md"
                      border="1px solid"
                      borderColor={
                        action === "order"
                          ? dt.id === selectedAddressOrder?.id
                            ? "black"
                            : "inherit"
                          : dt.is_primary
                          ? "black"
                          : "inherit"
                      }
                      cursor={action === "order" && "pointer"}
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
                                onClick={() =>
                                  selectedAddressHandler(dt, "delete")
                                }
                              >
                                Delete
                              </MenuItem>
                              <MenuItem
                                icon={<BsPinAngle />}
                                onClick={() =>
                                  selectedAddressHandler(dt, "select")
                                }
                              >
                                Set as main address
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        )}
                      </Flex>
                    </Flex>
                  );
                })
              )}
            </VStack>
        )}
        <AlertConfirmation
          isOpen={openAlert}
          onClose={() => setOpenAlert(false)}
          header="Do you want to change it ?"
          description="This action will change main address and you can change it again if you want"
          buttonConfirm="Yes"
          buttonCancel="Cancel"
          isLoading={loading}
          onClickConfirm={() => {
            handleChangeAddress();
          }}
          onCloseComplete={() => setSelectedAddress(null)}
        />
        <AlertConfirmation
          isOpen={openAlertDelete}
          onClose={() => setOpenAlertDelete(false)}
          header="Do you want to delete it ?"
          description="This action will delete this address permanently. You cannot undo this action."
          buttonConfirm="Delete"
          buttonCancel="Cancel"
          isLoading={loading}
          onClickConfirm={() => {
            handleChangeAddress("delete");
          }}
          onCloseComplete={() => setSelectedAddress(null)}
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
    </Flex>
  );
};

export default UserAddress;
