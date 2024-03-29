import {
  Button,
  Flex,
  Heading,
  MenuItem,
  Modal,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useMediaQuery,
  useToast,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListBox from "../components/organisms/ListBox";
import { SearchInput } from "../components/molecules/SearchInput";
import { BsClipboard2X } from "react-icons/bs";
import { MdCheck, MdOutlineCancel } from "react-icons/md";
import Pagination from "../components/molecules/Pagination";
import { useNavigate } from "react-router-dom";
import { getMutations, patchMutationStatus } from "../api/stockMutation";
import { jwtDecode } from "jwt-decode";
import { getAdminWarehouse } from "../api/adminWarehouse";
import { toastConfig } from "../utils/toastConfig";
import FormMutation from "../components/organisms/FormMutation";

const Mutation = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [mutations, setMutations] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterInput, setFilterInput] = useState({
    search: "",
    status: "",
    sort: "",
  });
  const [isTablet] = useMediaQuery("(min-width: 505px)");
  const navigate = useNavigate();
  const toast = useToast();

  const fetchData = async (filterOpt) => {
    try {
      const response = await getMutations({ ...filterInput, ...filterOpt });
      setMutations([...response.data.mutations]);
      setTimeout(() => {
        setIsLoadingList(false);
      }, 1500);
    } catch (error) {
      toast(toastConfig("error", "Failed", error.message));
    }
  };
  useEffect(() => {
    (async () => {
      setIsLoadingList(true);
      try {
        await fetchDataTabs()
      } catch (error) {
        navigate("/forbidden");
      }
    })();
  }, [selectedMenu, filterInput]);

  const fetchDataTabs = async () => {
    const userData = jwtDecode(localStorage.getItem("token"));
    const response = await getAdminWarehouse(userData.id);
    const filter = {};
    if (selectedMenu === 0) {
      filter.from = response.data.warehouse_id;
    }
    if (selectedMenu === 1) {
      filter.to = response.data.warehouse_id;
    }
    await fetchData(filter);
  };
  const changeStatusHandler = async (id, status) => {
    try {
      const data = {
        status: status,
      };
      const userData = jwtDecode(localStorage.getItem("token"));
      const response = await getAdminWarehouse(userData.id);
      const filter = {};
      if (selectedMenu === 0) {
        filter.from = response.data.warehouse_id;
      }
      if (selectedMenu === 1) {
        filter.to = response.data.warehouse_id;
      }
      const response2 = await patchMutationStatus(id, data);
      await fetchData(filter);
      toast(toastConfig("success", "Success", response2.message));
    } catch (error) {
      toast(toastConfig("error", "Failed", error.message));
    }
  };
  return (
    <Flex w="full" minH="80vh" flexDir="column">
      <Heading size="lg" mb="4">
        Stock Mutation
      </Heading>
      <Tabs w="full" onChange={(val) => setSelectedMenu(val)}>
        <TabList>
          <Tab>Outgoing Request</Tab>
          <Tab>Incoming Request</Tab>
        </TabList>
        <Flex w="full" gap="4" p="4" wrap={isTablet ? "unset" : "wrap"}>
          <Flex w="100%">
            <SearchInput
              placeholder="Search"
              onChangeInput={(val) =>
                setFilterInput((prev) => ({ ...prev, search: val }))
              }
            />
          </Flex>
          <Select
            maxW="max-content"
            bg="white"
            onChange={(e) =>
              setFilterInput((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="">All</option>
            <option value="waiting">Waiting</option>
            <option value="accepted">Accepted</option>
            <option value="auto">Auto</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </Select>
          <Select
            maxW="max-content"
            bg="white"
            onChange={(e) =>
              setFilterInput((prev) => ({ ...prev, sort: e.target.value }))
            }
          >
            <option value="createdAt_DESC">Newest</option>
            <option value="createdAt_ASC">Oldest</option>
          </Select>
          {selectedMenu === 0 && (
            <Button bg="primaryColor" color="white" onClick={() => onOpen()}>
              Request
            </Button>
          )}
        </Flex>
        <TabPanels position="relative">
          <TabPanel>
            <VStack>
              {mutations?.map((dt, idx) => {
                return (
                  <ListBox
                    isLoading={isLoadingList}
                    data={dt}
                    key={idx}
                    requestType={selectedMenu}
                  >
                    <MenuItem
                      icon={<BsClipboard2X size="20px" />}
                      isDisabled={dt.status !== "waiting"}
                      onClick={() => changeStatusHandler(dt.id, "cancelled")}
                    >
                      Cancel Request
                    </MenuItem>
                  </ListBox>
                );
              })}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              {mutations?.map((dt, idx) => {
                return (
                  <ListBox
                    isLoading={isLoadingList}
                    data={dt}
                    key={idx}
                    requestType={selectedMenu}
                  >
                    <MenuItem
                      icon={<MdCheck size="20px" />}
                      isDisabled={dt.status !== "waiting"}
                      onClick={() => changeStatusHandler(dt.id, "accepted")}
                    >
                      Accept Request
                    </MenuItem>
                    <MenuItem
                      icon={<MdOutlineCancel size="20px" />}
                      isDisabled={dt.status !== "waiting"}
                      onClick={() => changeStatusHandler(dt.id, "rejected")}
                    >
                      Reject Request
                    </MenuItem>
                  </ListBox>
                );
              })}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Pagination />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Stock Mutation</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" pb={6} gap="4">
            <FormMutation onClose={() => {onClose(); fetchDataTabs()}} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Mutation;
