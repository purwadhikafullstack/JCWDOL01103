import React, { useState } from "react";
import {
  Flex,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import ModalWarehouse from "../organisms/ModalWarehouse";
import { useDispatch } from "react-redux";
import { setSelectedWarehouse } from "../../store/slicer/formWarehouseSlice";

function TableWarehouse({ data, tableLoading, onClickRow, onClickEdit, onClickDelete }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState(null)
  const dispatch = useDispatch()
  return (
    <>
    <Table
      size="sm"
      style={{ borderCollapse: "separate", borderSpacing: "0 .5em" }}
    >
      <Thead position="sticky" top="0" bg="white" zIndex="3">
        <Tr>
          <Th>No</Th>
          <Th>Id</Th>
          <Th>Warehouse Name</Th>
          <Th>Province</Th>
          <Th>City</Th>
          <Th>Street</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody pos="relative">
        {tableLoading ? (
          <Tr>
            <Td>
              <Spinner
                position="absolute"
                left="50%"
                top="30px"
                color="primaryColor"
              />
            </Td>
          </Tr>
        ) : data?.length === 0 ? (
          <Tr>
            <Td>Data Not Found</Td>
          </Tr>
        ) : (
          data?.map((dt, idx) => {
            return (
              <Tr
                cursor="pointer"
                bg="secondaryColor"
                h="100px"
                key={idx}
                _hover={{ bg: "gray.100" }}
                onClick={() => {
                  onOpen();setSelectedData(dt)}}
              >
                <Td borderTopLeftRadius="lg" borderBottomLeftRadius="lg">
                  {dt.indexNumber}
                </Td>
                <Td fontWeight="semibold">{dt.id}</Td>
                <Td fontWeight="semibold">{dt.name}</Td>
                <Td>{dt.region.province.province_name}</Td>
                <Td>{dt.region.city_name}</Td>
                <Td isTruncated>
                  {dt.street}
                </Td>
                <Td borderTopRightRadius="lg" borderBottomRightRadius="lg" maxW="50px">
                  <Flex columnGap="2" color="forthColor">
                    <IconButton
                      bg='transparent'
                      _hover={{bg:"gray.500", color:"white"}}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(dt)
                        dispatch(setSelectedWarehouse(dt))
                        onClickEdit(e);
                      }}
                      icon={<HiOutlinePencil />}
                    />
                    <IconButton
                      bg='transparent'
                      _hover={{bg:"gray.500", color:"white"}}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickDelete(dt);
                      }}
                      icon={ <FaRegTrashAlt/>}
                    />
                  </Flex>
                </Td>
              </Tr>
            );
          })
        )}
      </Tbody>
    </Table>
    <ModalWarehouse
        isOpen={isOpen}
        onClose={()=> {setSelectedData(null); onClose()}}
        data={selectedData}
      />
    </>
  );
}

export default TableWarehouse;
