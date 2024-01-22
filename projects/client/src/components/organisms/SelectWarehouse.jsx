import React, { useEffect, useState } from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
  useToast,
  Button,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchInput } from "../molecules/SearchInput";
import { getWarehouses } from "../../api/warehouses";
import { toastConfig } from "../../utils/toastConfig";
import Pagination from "../molecules/Pagination";

export const SelectWarehouse = ({
  except_id,
  onChange,
  selectedWarehouse,
  isInvalid,
  isDisabled,
}) => {
  const [warehouses, setWarehouses] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const fetchWarehouse = async (action) => {
    try {
      const queryFilter = {
        search: filterValue,
        page: page,
        exclude_id: except_id,
      };
      const response = await getWarehouses(
        action === "refresher" ? null : queryFilter
      );
      setWarehouses(response.data);
      return response.data;
    } catch (error) {
      toast(toastConfig("error", "Failed", error.message));
    }
  };
  useEffect(() => {
    (async () => {
      await fetchWarehouse();
    })();
  }, [page, except_id]);
  useEffect(() => {
    (async () => {
      try {
        const response = await getWarehouses({pageSize: 99999});
        if (selectedWarehouse) {
          const warehouseDetails = response.data.warehouses.find(
            obj => obj.id == selectedWarehouse
          );
          setWarehouse(warehouseDetails);
        }
      } catch (error) {
        toast(toastConfig("error", "Failed", error.message));
      }
    })();
  }, [selectedWarehouse]);
  const onSelectWarehouse = async (dt) => {
    onClose();
    setFilterValue("");
    onChange && onChange(dt);
    if(dt.id !== selectedWarehouse){
      await fetchWarehouse("refresher");
    }
  }
  return (
    <VStack w="full" justifyContent="start" alignItems="start">
      <Text>Warehouse :</Text>
      <Box
        w="full"
        justifyContent="flex-end"
        border={isInvalid ? "2px" : "1px"}
        p="5"
        borderRadius="md"
        borderColor={isInvalid ? "#e53e3e" : "inherit"}
        id="warehouse_id"
      >
        {selectedWarehouse ? (
          <Flex flexDir="column" opacity={isDisabled ? "0.5" : "1"}>
            <Text fontWeight="bold">{warehouse?.name}</Text>
            <Text>{warehouse?.street}</Text>
            <Text>{`${warehouse?.region.city_name}, ${warehouse?.region.province.province_name}, ${warehouse?.region.postal_code}`}</Text>
          </Flex>
        ) : (
          <Text mb="3" color="gray.500">
            Please select warehouse
          </Text>
        )}
        <Button
          bg="primaryColor"
          size="sm"
          color="white"
          isDisabled={isDisabled}
          onClick={onOpen}
        >
          {selectedWarehouse ? "Change" : "Select"}
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warehouse List</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" pb={6} gap="4" maxH="70vh">
            <SearchInput
              placeholder="Search warehouse name"
              onChangeInput={val => setFilterValue(val)}
              onPressEnter={fetchWarehouse}
            />
            <Flex overflow="auto" flexDir="column" gap="4">
              {warehouses?.warehouses?.map(dt => {
                return (
                  <Flex
                    key={dt.id}
                    cursor="pointer"
                    flexDir="column"
                    border="1px"
                    borderColor="#dadada"
                    borderRadius="md"
                    py="2"
                    px="4"
                    onClick={()=> onSelectWarehouse(dt)}
                  >
                    <Text fontWeight="semibold">{dt.name}</Text>
                    <Text>
                      {dt.region.city_name}, {dt.region.province.province_name},{" "}
                      {dt.region.postal_code}
                    </Text>
                    <Text>{dt.street}</Text>
                  </Flex>
                );
              })}
            </Flex>
            <Pagination
              totalPage={warehouses?.totalPages}
              currentPage={warehouses?.currentPage}
              onChangePage={num => setPage(num)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
