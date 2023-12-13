import {
  AlertDialog,
  Button,
  Flex,
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
  // const [selectedData, setSelectedData] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
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
    province_id:""
  });
  const fetchData = async() => {
    const result = await getProvinces();
    setCategories(result.data);
  }
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
      const response = await deleteWarehouse(id);
      toast(toastConfig("success", "Success", response.message));
      setDeleteDataId(null);
      setOpenDeleteDialog(false);
      fetchData();
    } catch (error) {
      toast(toastConfig("error", "Failed", error.response.data.message));
    }
  };
  
  return (
    <Flex
      h="full"
      minH="100vh"
      maxH="100vh"
      alignItems="center"
      flexDir="column"
      bg="gray.100"
      gap="5"
    >
      <Flex
        h="fit-content"
        flexDir={isLaptop ? "row" : "column"}
        pt="10"
        rowGap="10"
        columnGap="4"
        justifyContent="center"
      >
        <FilterBar
          filterValue={(value) => setParamObj(value)}
          onSearchPressEnter={getWarehouseData}
          categories={categories}
          categoriesName="province_name"
          categoriesId="province_id"
          defaultCategories="Filter by Province"
          onClickCross={()=> getWarehouseData(undefined, "refresher")}
        />

        <Button
          alignSelf={isLaptop ? "unset" :"flex-end"}
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
        h="50%"
        p="10"
        borderRadius="lg"
        flexDir="column"
        rowGap="3"
        boxSizing="border-box"
      >
        <Flex overflow="scroll">
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
      />
    </Flex>
  );
};

export default DashboardWarehouse;
