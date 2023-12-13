import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalSelectWarehouse } from "../components/organisms/ModalSelectWarehouse";
import { FaRegTrashAlt } from "react-icons/fa";
import { getProducts } from "../api/stock";
import { toastConfig } from "../utils/toastConfig";

const Journal = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [warehouse, setWarehouse] = useState(null);
  const [openModalWarehouse, setOpenModalWarehouse] = useState(false);
  const [products, setProducts] = useState([]);
  const [updatedOpt, setUpdatedOpt] = useState([]);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      warehouse_id: "",
      journal_type: "",
      listedProduct: [
        {
          product_id: "",
          name: "",
          quantity_before: 0,
          quantity_after: 0,
          amount: 0,
        },
      ],
    },
    validationSchema: Yup.object({
      warehouse_id: Yup.string().required("Required"),
      journal_type: Yup.string().required("Required"),
      listedProduct: Yup.array().of(
        Yup.object({
          product_id: Yup.string().required("Required"),
          amount: Yup.number("must number")
            .min(1, "must > 0")
            .integer("must integer")
            .required("Required")
            .typeError("Must be a number"),
        })
      ),
    }),
    onSubmit: () => {
      setOpenAlert(true);
    },
  });
  useEffect(() => {
    (async () => {
      try {
        const response = await getProducts();
        const options = response.data.map((dt) => {
          return {
            ...dt,
            value: dt.id,
            label: dt.product_name,
          };
        });
        setProducts(options);
        setUpdatedOpt(options);
      } catch (error) {
        toast(toastConfig("error", "Failed", error.message));
      }
    })();
  }, []);

  useEffect(() => {
    const updatedOptions = products?.map((dt) => {
      return {
        ...dt,
        isDisabled: formik.values.listedProduct.some(
          (selectedOption) => selectedOption.product_id.value == dt.value
        ),
      };
    });
    setUpdatedOpt([...updatedOptions]);
  }, [formik.values.listedProduct]);

  const onChangeProductHandler = async (opt, idx) => {
    try {
      formik.setFieldValue(`listedProduct[${idx}].product_id`, opt);
      const query = {
        warehouse_id: formik.values.warehouse_id,
        product_id: opt.id,
      };
      const getQuantityBefore = await getProducts(query);
      console.log(getQuantityBefore)
      const quantityBefore = getQuantityBefore.data.length > 0 ? getQuantityBefore.data[0].stock : 0
      formik.setFieldValue(`listedProduct[${idx}].quantity_before`, quantityBefore);
    } catch (error) {
      toast(toastConfig("error", "Failed", error.message));
    }
  };
  const onAddHandler = () => {
    const listed = {
      product_id: "",
      name: "",
      quantity_before: 0,
      quantity_after: 0,
      amount: 0,
    };
    formik.setFieldValue("listedProduct", [
      ...formik.values.listedProduct,
      listed,
    ]);
  };
  const onDeleteHandler = (idx) => {
    const newArr = formik.values.listedProduct;
    newArr.splice(idx, 1);
    formik.setFieldValue("listedProduct", [...newArr]);
  };

  const onChangeAmountHandler = (value, idx) =>{
    let valueBefore = parseInt(formik.values.listedProduct[idx]?.quantity_before)
    let amount = formik.values.journal_type === "reducing" ? parseInt(value) * -1 : parseInt(value)
    const result = valueBefore + amount
    formik.setFieldValue(`listedProduct[${idx}].quantity_after`, result);
    formik.setFieldValue(`listedProduct[${idx}].amount`, value);
  }
  // useEffect(()=>{
  //   (async()=>{
  //     onChangeAmountHandler()
  //   })()
  // },[formik.values.warehouse_id])
  return (
    <Flex
      h="full"
      minH="100vh"
      maxH="100vh"
      flexDir="column"
      //   bg="gray.100"
      gap="2"
      p="5"
    >
      <Heading size="md">Journal Stock</Heading>
      <form onSubmit={formik.handleSubmit}>
        <Flex rowGap="5" flexDir="column">
          <FormControl
            isInvalid={
              formik.errors.journal_type && formik.touched.journal_type
            }
          >
            <FormLabel htmlFor="journal_type">Journal Type:</FormLabel>
            <Select
              id="journal_type"
              placeholder="Select option"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.journal_type}
            >
              <option value="adding">Addition Stock</option>
              <option value="reducing">Reduction Stock</option>
            </Select>
            <FormErrorMessage>{formik.errors.journal_type}</FormErrorMessage>
          </FormControl>

          <ModalSelectWarehouse
            isOpen={openModalWarehouse}
            onClose={() => setOpenModalWarehouse(false)}
            onClickRow={(val) => {
              setWarehouse(val);
              formik.setFieldValue("warehouse_id", val.id);
              setOpenModalWarehouse(false);
            }}
          />
          <FormControl isInvalid={formik.errors.warehouse_id}>
            <Text>Warehouse:</Text>
            <Box
              justifyContent="flex-end"
              border={formik.errors.warehouse_id ? "2px" : "1px"}
              p="2"
              borderRadius="md"
              borderColor={formik.errors.warehouse_id ? "#e53e3e" : "inherit"}
              id="warehouse_id"
            >
              {warehouse ? (
                <>
                  <Text fontWeight="bold">{warehouse?.name}</Text>
                  <Text>{warehouse?.street}</Text>
                  <Text>{`${warehouse?.region.city_name}, ${warehouse?.region.province.province_name}, ${warehouse?.region.postal_code}`}</Text>
                </>
              ) : (
                <Text>Please select warehouse</Text>
              )}
              <Button
                bg="black"
                color="white"
                size="sm"
                mt="2"
                onClick={() => setOpenModalWarehouse(true)}
              >
                {warehouse ? "Change" : "Select Warehouse"}
              </Button>
            </Box>
            <FormErrorMessage>{formik.errors.warehouse_id}</FormErrorMessage>
          </FormControl>
          <Flex
            overflowX="scroll"
            overflowY="hidden"
            border="1px"
            borderRadius="md"
            borderColor="inherit"
          >
            <Table>
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Before</Th>
                  <Th>After</Th>
                  <Th>Amount</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody pos="relative">
                {formik.values.listedProduct.map((dt, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td minW="300px">
                        <FormControl
                          isInvalid={
                            formik.errors.listedProduct?.[idx]?.product_id.id &&
                            formik.touched.listedProduct?.[idx]?.product_id.id
                          }
                        >
                          <ReactSelect
                            id={`listedProduct[${idx}].product_id.id`}
                            placeholder="Select Product"
                            onChange={(opt) => onChangeProductHandler(opt, idx)}
                            onBlur={formik.handleBlur}
                            value={formik.values.listedProduct[idx].product_id}
                            options={updatedOpt}
                            menuPortalTarget={document.querySelector("body")}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                          ></ReactSelect>
                          <FormErrorMessage>
                            {formik.errors.listedProduct?.[idx]?.product_id.id}
                          </FormErrorMessage>
                        </FormControl>
                      </Td>
                      <Td>{formik.values.listedProduct[idx].quantity_before}</Td>
                      <Td>{formik.values.listedProduct[idx].quantity_after}</Td>
                      <Td maxWidth="50px">
                        <FormControl
                          isInvalid={
                            formik.errors.listedProduct?.[idx]?.amount &&
                            formik.touched.listedProduct?.[idx]?.amount
                          }
                        >
                          <NumberInput
                            defaultValue={0}
                            min={0}
                            id={`listedProduct[${idx}].amount`}
                            name={`listedProduct[${idx}].amount`}
                            onChange={(value) => onChangeAmountHandler(value, idx)}
                            onBlur={formik.handleBlur}
                            value={formik.values.listedProduct?.[idx]?.amount}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <FormErrorMessage>
                            {formik.errors.listedProduct?.[idx]?.amount}
                          </FormErrorMessage>
                        </FormControl>
                      </Td>
                      <Td>
                        <IconButton
                          bg="transparent"
                          _hover={{ bg: "gray.500", color: "white" }}
                          onClick={() => {
                            onDeleteHandler(idx);
                          }}
                          isDisabled={formik.values.listedProduct.length < 2}
                          icon={<FaRegTrashAlt />}
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
          <Button maxW="150px" alignSelf="flex-start" onClick={onAddHandler}>
            Add product
          </Button>
        </Flex>
        <HStack>
          <Button mt="3" type="submit">
            Back
          </Button>
          <Button mt="3" bg="black" color="white" type="submit">
            Submit
          </Button>
        </HStack>
      </form>
    </Flex>
  );
};

export default Journal;
