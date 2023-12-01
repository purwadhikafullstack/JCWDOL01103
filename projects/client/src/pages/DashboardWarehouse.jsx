import { Button, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FilterBar from "../components/organisms/FilterBar";
import TableWarehouse from "../components/molecules/TableWarehouse";
import Pagination from "../components/molecules/Pagination";
import ModalCreateWarehouse from "../components/organisms/ModalCreateWarehouse";
import { getWarehouses } from "../api/warehouses";
import { useDispatch } from "react-redux";
import { setSelectedWarehouse } from "../store/slicer/formWarehouseSlice";
import { toastConfig } from "../utils/toastConfig";
import { getProvinces } from "../api/region";

const DashboardWarehouse = () => {
  // const [selectedData, setSelectedData] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const [paramObj, setParamObj] = useState({
    name: "",
    province_id: "",
    sort: "name_ASC",
  });
  useEffect(() => {
    (async () => {
      const response = await getWarehouses(paramObj);
      const result = await getProvinces()
      setData(response.data);
      setCategories(result.data)
    })();
  }, []);

  const getWarehouseData = async (param = {}) => {
    const params = {
      ...paramObj,
      ...param,
    };
    setTableLoading(true);
    try {
      const resProduct = await getWarehouses(params);
      setData(resProduct.data);
    } catch (e) {
      console.log(e);
    }
    setTableLoading(false);
  };

  useEffect(() => {
    getWarehouseData();
  }, [paramObj]);

  async function onChangePageHandler(value) {
    await getWarehouseData({ page: value });
  }
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
      <Flex h="fit-content" pt="10" rowGap="10">
        <FilterBar
          filterValue={(value) => setParamObj(value)}
          onSearchPressEnter={getWarehouseData}
          categories={categories}
          categoriesName='province_name'
          categoriesId='province_id'
        />
        <Button
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
            onClickDelete={() => {
              console.log("aa");
            }}
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
          // setSelectedData(null);
          dispatch(setSelectedWarehouse(null));
        }}
      />
    </Flex>
  );
};

export default DashboardWarehouse;
