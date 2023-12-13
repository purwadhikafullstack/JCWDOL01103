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
  useToast,
} from "@chakra-ui/react";
import { SearchInput } from "../molecules/SearchInput";
import { getWarehouses } from "../../api/warehouses";
import { toastConfig } from "../../utils/toastConfig";
import Pagination from "../molecules/Pagination";

export const ModalSelectWarehouse = ({ isOpen, onOpen, onClose, onClickRow}) => {
  const [data, setData] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState();
  const toast = useToast();
  useEffect(() => {
    (async () => {
      try {
        const response = await getWarehouses({ search: filterValue, page: page });
        setData(response.data);
      } catch (error) {
        toast(toastConfig("error", "Failed", error.data.message));
      }
    })();
  }, [filterValue, page]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Warehouse List</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" pb={6} gap="4" maxH="70vh">
          <SearchInput
            placeholder="Search warehouse name"
            onChangeInput={(val) => setFilterValue(val)}
          />
          <Flex overflow="scroll" flexDir="column" gap="4">
            {data?.warehouses?.map((dt) => {
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
                  onClick={()=>onClickRow(dt)}
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
            totalPage={data?.totalPages}
            currentPage={data?.currentPage}
            onChangePage={(num) => setPage(num)}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
