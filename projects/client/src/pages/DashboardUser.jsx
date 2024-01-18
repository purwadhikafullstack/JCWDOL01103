import {
  Button,
  Flex,
  Heading,
  IconButton,
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
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toastConfig } from "../utils/toastConfig";
import FilterBar from "../components/organisms/FilterBar";
import { deleteAdmin, getUserAdmin } from "../api/adminWarehouse";
import { getProvinces } from "../api/region";
import FormAdmin from "../components/organisms/FormAdmin";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalUserDetails } from "../components/organisms/ModalUserDetails";
import { getUsers } from "../api/user";
import AlertConfirmation from "../components/organisms/AlertConfirmation";

const Users = () => {
  const toast = useToast();
  const [adminList, setAdminList] = useState(null);
  const [userList, setUserList] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [filterCategories, setFilterCategories] = useState(null);
  const [isLoadingBtnDelete, setIsLoadingBtnDelete] = useState(false);
  const [paramUser, setParamUser] = useState({
    search: "",
    sort: "",
  });
  const [paramObj, setParamObj] = useState({
    search: "",
    sort: "",
    province_id: "",
  });
  const {
    isOpen: isOpenModalAdmin,
    onOpen: onOpenModalAdmin,
    onClose: onCloseModalAdmin,
  } = useDisclosure();
  const {
    isOpen: isOpenModalUser,
    onOpen: onOpenModalUser,
    onClose: onCloseModalUser,
  } = useDisclosure();
  const {
    isOpen: isOpenAlertDelete,
    onOpen: onOpenAlertDelete,
    onClose: onCloseAlertDelete,
  } = useDisclosure();

  const [isLaptop] = useMediaQuery("(min-width: 768px)");
  const fetchData = async (action) => {
    try {
      const response = await getUserAdmin(action ? null : paramObj);
      setAdminList(response.data);
    } catch (error) {
      throw error;
    }
  };
  const fetchDataUsers = async (action) => {
    try {
      const response = await getUsers(action ? null : paramUser);
      return setUserList(response.data);
    } catch (error) {
      throw error;
    }
  };
  const fetchProvinces = async () => {
    try {
      const result = await getProvinces();
      return setFilterCategories(result.data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    (async () => {
      try {
        await fetchData();
        await fetchProvinces();
        const response = await getUsers();
        setUserList(response.data);
      } catch (error) {
        toast(toastConfig("error", "Failed", error.message));
      }
    })();
  }, []);
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      toast(toastConfig("error", "Failed", error.message));
    }
  }, [paramObj.sort, paramObj.province_id]);
  useEffect(() => {
    try {
      fetchDataUsers();
    } catch (error) {
      toast(toastConfig("error", "Failed", error.message));
    }
  }, [paramUser.sort]);
  const onClickEdit = (dt) => {
    setSelectedAdmin(dt);
  };
  const onClickDelete = async() => {
    try {
      setIsLoadingBtnDelete(true)
      const response = await deleteAdmin(selectedAdmin.user.id)
      toast(toastConfig("success", "Successfully", response.message))
      setTimeout(()=>{
        setIsLoadingBtnDelete(false)
        onCloseAlertDelete()
        fetchDataUsers()
      },1300)
    } catch (error) {
      setIsLoadingBtnDelete(false)
      toast(toastConfig("error", "Failed", error.message))
    }
  };
  const onClickRow = (val) => {
    setSelectedAdmin(val);
    onOpenModalUser();
  };
  useEffect(() => {
    if (selectedAdmin?.type === "edit") {
      return onOpenModalAdmin();
    }
    if (selectedAdmin?.type === "view") {
      return onOpenModalUser();
    }
  }, [selectedAdmin]);
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
            <Flex
              h="fit-content"
              flexDir={isLaptop ? "row" : "column"}
              w="full"
              rowGap="10"
              columnGap="4"
              justifyContent="center"
            >
              <FilterBar
                placeholderSearch="Search admin by email or name or city"
                filterValue={(value) => setParamObj(value)}
                onSearchPressEnter={fetchData}
                categories={filterCategories}
                categoriesName="province_name"
                categoriesId="province_id"
                defaultCategories="Filter by Province"
                onClickCross={() => fetchData("refresher")}
              />
              <Button
                alignSelf={isLaptop ? "unset" : "flex-end"}
                maxW="fit-content"
                bg="primaryColor"
                color="secondaryColor"
                cursor="pointer"
                onClick={onOpenModalAdmin}
              >
                Create
              </Button>
            </Flex>
            <TableContainer w="full" mt="5">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Warehouse</Th>
                    <Th>Location</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {adminList?.data.map((dt, idx) => {
                    return (
                      <Tr
                        key={idx}
                        cursor="pointer"
                        _hover={{ bg: "gray.100" }}
                        onClick={() => onClickRow({ ...dt, type: "view" })}
                      >
                        <Td>{dt.indexNumber}</Td>
                        <Td maxW="50px" isTruncated>{dt.user.name}</Td>
                        <Td>{dt.user.email}</Td>
                        <Td isTruncated>{dt.warehouse.name}</Td>
                        <Td>{dt.warehouse.city_name}</Td>
                        <Td
                          borderTopRightRadius="lg"
                          borderBottomRightRadius="lg"
                          maxW="50px"
                        >
                          <Flex columnGap="2" color="forthColor">
                            <IconButton
                              bg="transparent"
                              _hover={{ bg: "gray.500", color: "white" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onClickEdit({ ...dt, type: "edit" });
                              }}
                              icon={<HiOutlinePencil />}
                            />
                            <IconButton
                              bg="transparent"
                              _hover={{ bg: "gray.500", color: "white" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenAlertDelete();
                                setSelectedAdmin(dt);
                              }}
                              icon={<FaRegTrashAlt />}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <FilterBar
              placeholderSearch="Search by name or email"
              filterValue={(value) => setParamUser(value)}
              onSearchPressEnter={fetchDataUsers}
              onClickCross={() => fetchDataUsers("refresher")}
            />
            <TableContainer w="full" mt="5">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {userList?.data?.map((dt, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>{dt.indexNumber}</Td>
                        <Td>{dt.name}</Td>
                        <Td>{dt.email}</Td>
                        <Td>{dt.status}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <FormAdmin
        isOpen={isOpenModalAdmin}
        onClose={onCloseModalAdmin}
        data={selectedAdmin}
        onCloseComplete={() => {
          setSelectedAdmin(null);
          fetchData();
        }}
      />
      <ModalUserDetails
        isOpen={isOpenModalUser}
        onClose={onCloseModalUser}
        data={selectedAdmin}
        onCloseComplete={() => setSelectedAdmin(null)}
        size="xl"
      />
      <AlertConfirmation
        onClose={onCloseAlertDelete}
        isOpen={isOpenAlertDelete}
        buttonConfirm="Delete"
        buttonCancel="Cancel"
        header="Are you sure ?"
        description="This action will delete data permantently"
        onClickConfirm={onClickDelete}
        isLoading={isLoadingBtnDelete}
      />
    </Flex>
  );
};

export default Users;
