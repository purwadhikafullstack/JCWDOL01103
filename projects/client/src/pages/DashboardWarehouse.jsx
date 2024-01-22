import {
  Button,
  Flex,
  Heading,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FilterBar from "../components/organisms/FilterBar";
import TableWarehouse from "../components/molecules/TableWarehouse";
import Pagination from "../components/molecules/Pagination";
import ModalCreateWarehouse from "../components/organisms/ModalCreateWarehouse";
import { deleteWarehouse, getWarehouses } from "../api/warehouses";
import { useDispatch } from "react-redux";
import { setSelectedWarehouse } from "../store/slicer/formWarehouseSlice";
import { toastConfig } from "../utils/toastConfig";
import { getProvinces } from "../api/region";
import AlertConfirmation from "../components/organisms/AlertConfirmation";

const DashboardWarehouse = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [data, setData] = useState(null);
  const [deleteDataId, setDeleteDataId] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLaptop] = useMediaQuery("(min-width: 768px)");
  const [paramObj, setParamObj] = useState({
    search: "",
    sort: "",
    province_id: "",
  });
  const fetchData = async () => {
    const result = await getProvinces();
    setCategories(result.data);
  };
  useEffect(() => {
    fetchData();
    getWarehouseData();
  }, [paramObj.sort, paramObj.province_id]);

  const getWarehouseData = async (param = {}, action) => {
    const params = {
      ...paramObj,
      ...param,
    };
    setTableLoading(true);
    try {
      const resProduct = await getWarehouses(action ? null : params);
      setData(resProduct.data);
    } catch (error) {
      toast(toastConfig("error", "Failed", error.message));
    }
    setTableLoading(false);
  };

  async function onChangePageHandler(value) {
    await getWarehouseData({ page: value });
  }
  const onClickDelete = async (id) => {
    try {
      setBtnLoading(true);
      const response = await deleteWarehouse(id);
      toast(toastConfig("success", "Success", response.message));
      setTimeout(() => {
        setDeleteDataId(null);
        setOpenDeleteDialog(false);
        fetchData();
        setBtnLoading(false);
      }, 1500);
    } catch (error) {
      toast(toastConfig("error", "Failed", error.response.data.message));
    }
  };

  return (
    <Flex
      h="full"
      w="100%"
      // minH="100vh"
      maxH="80vh"
      alignItems="center"
      flexDir="column"
      gap="5"
    >
      <Heading size="lg" mb="5" alignSelf="start">
        Manage Warehouses
      </Heading>
      <Flex
        h="fit-content"
        flexDir={isLaptop ? "row" : "column"}
        w="full"
        rowGap="10"
        columnGap="4"
        justifyContent="center"
      >
        <FilterBar
          placeholderSearch="Search warehouse by name or city"
          filterValue={(value) => setParamObj(value)}
          onSearchPressEnter={getWarehouseData}
          categories={categories}
          categoriesName="province_name"
          categoriesId="province_id"
          defaultCategories="Filter by Province"
          onClickCross={() => getWarehouseData(undefined, "refresher")}
        />

        <Button
          alignSelf={isLaptop ? "unset" : "flex-end"}
          maxW="fit-content"
          bg="primaryColor"
          color="secondaryColor"
          cursor="pointer"
          onClick={() => setOpenCreateModal(true)}
        >
          Create
        </Button>
      </Flex>
      <Flex
        bg="white"
        w="full"
        minH="50%"
        pb='5'
        borderRadius="lg"
        flexDir="column"
        rowGap="3"
        boxSizing="border-box"
      >
        <Flex overflow="auto">
          <TableWarehouse
            data={data?.warehouses}
            onClickEdit={(e) => {
              setOpenCreateModal(true);
            }}
            onClickDelete={(dt) => {
              setDeleteDataId(dt.id);
              setOpenDeleteDialog(true);
            }}
            onClickConfirm={() => {}}
          />
        </Flex>
        <Pagination
          totalPage={data?.totalPages}
          currentPage={data?.currentPage}
          onChangePage={onChangePageHandler}
        />
      </Flex>
      <ModalCreateWarehouse
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
          dispatch(setSelectedWarehouse(null));
        }}
        onCloseComplete={getWarehouseData}
      />
      <AlertConfirmation
        header="Are you sure ?"
        description="This action will delete data permantently"
        buttonConfirm="Delete"
        buttonCancel="Cancel"
        isOpen={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setDeleteDataId(null);
        }}
        onOpen={() => setOpenDeleteDialog(true)}
        onClickConfirm={() => onClickDelete(deleteDataId)}
        onCloseComplete={getWarehouseData}
        isLoading={isBtnLoading}
      />
    </Flex>
  );
};

export default DashboardWarehouse;
