import {
  Flex,
  Heading,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUser } from "../api/auth";
import { toastConfig } from "../utils/toastConfig";
import FilterBar from "../components/organisms/FilterBar";

const Users = () => {
  const toast = useToast();
  const [paramObj, setParamObj] = useState({
    search: "",
    sort: "",
    province_id: "",
  });
  useEffect(() => {
    (async () => {
      try {
      } catch (error) {
        toast(toastConfig("error", "Failed", error.message));
      }
    })();
  }, []);
  return (
    <Flex w="full" flexDir="column" alignItems="start">
      <Heading size="lg" mb="5">
        Manage Users
      </Heading>
      <Tabs w="full">
        <TabList>
          <Tab _selected={{ color: "black" }}>Admin</Tab>
          <Tab _selected={{ color: "black" }}>User</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="black" borderRadius="1px" />
        <TabPanels>
          <TabPanel>
            <FilterBar
              placeholderSearch="Search admin id or name"
              filterValue={(value) => setParamObj(value)}
              // onSearchPressEnter={getWarehouseData}
              // categories={categories}
              categoriesName="province_name"
              categoriesId="province_id"
              defaultCategories="Filter by Province"
              // onClickCross={() => getWarehouseData(undefined, "refresher")}
            />
            <TableContainer w="full" mt="5">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Name</Th>
                    <Th>Warehouse</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody></Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Users;
