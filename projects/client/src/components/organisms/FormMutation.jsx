import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalSelectWarehouse } from "../organisms/ModalSelectWarehouse";
import { FaRegTrashAlt } from "react-icons/fa";
import { getProductStock, postStock } from "../../api/stock";
import { toastConfig } from "../../utils/toastConfig";
import { getProducts } from "../../api/product";
import CustomSelect from "../../components/atoms/CustomSelect";
import AlertConfirmation from "../../components/organisms/AlertConfirmation";
import { jwtDecode } from "jwt-decode";
import { getAdminWarehouse } from "../../api/adminWarehouse";
import { postRequestMutation } from "../../api/stockMutation";
import { useNavigate } from "react-router-dom";

const FormMutation = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [warehouse, setWarehouse] = useState(null);
  const [openModalWarehouse, setOpenModalWarehouse] = useState(false);
  const [products, setProducts] = useState([]);
  const [warehouseId, setWarehouseId] = useState(null)
  const [updatedOpt, setUpdatedOpt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      warehouse_id: "",
      listedProduct: [
        {
          product: {
            value: "",
            label: "Select product...",
            isDisabled: true,
          },
          originStock: 0,
          amount: 0,
        },
      ],
    },
    validationSchema: Yup.object({
      warehouse_id: Yup.string().required("Required"),
      listedProduct: Yup.array().of(
        Yup.object({
          product: Yup.object({ value: Yup.string().required("Required") }),
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
        const userData = jwtDecode(localStorage.getItem("token"))
        const response2 = await getAdminWarehouse(userData.id)
        const options = response.data.map((dt) => {
          return {
            value: dt.id,
            label: dt.product_name,
          };
        });
        setProducts(options);
        setWarehouseId(response2.data.warehouse_id)
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
          (selectedOption) => selectedOption.product.value == dt.value
        ),
      };
    });
    setUpdatedOpt([...updatedOptions]);
  }, [formik.values.listedProduct]);

  useEffect(() => {
    formik.setFieldValue("listedProduct", formik.initialValues.listedProduct);
  }, [formik.values.warehouse_id]);

  const onChangeProductHandler = async (opt, idx) => {
    try {
      formik.setFieldValue(`listedProduct[${idx}].product`, opt);
      const query = {
        warehouse_id: formik.values.warehouse_id,
        product_id: opt.value,
      };
      const response = await getProductStock(query);
      const originStock =
        formik.values.warehouse_id && response.data.length > 0
          ? response.data[0].quantity
          : 0;
      formik.setFieldValue(`listedProduct[${idx}].originStock`, originStock);
    } catch (error) {
      toast(toastConfig("error", "Failed", error.message));
    }
  };
  const onAddHandler = () => {
    formik.setFieldValue("listedProduct", [
      ...formik.values.listedProduct,
      formik.initialValues.listedProduct[0],
    ]);
  };

  const onDeleteHandler = (idx) => {
    const newArr = formik.values.listedProduct;
    newArr.splice(idx, 1);
    formik.setFieldValue("listedProduct", [...newArr]);
  };

  const onChangeAmountHandler = (value, idx) => {
    formik.setFieldValue(`listedProduct[${idx}].amount`, parseInt(value));
  };
  const onClickConfirmHandler = async () => {
    setIsLoading(true);
    try {
      const value = formik.values;
      const products = value.listedProduct.map((dt) => {
        return {
          product_id: dt.product.value,
          quantity: dt.amount,
        };
      });
      const data = {
        from_warehouse_id: warehouseId,
        to_warehouse_id: value.warehouse_id,
        products: products,
      };
      const requestMutation = postRequestMutation(data)
      toast(toastConfig("success", "Success", requestMutation.message));
      setTimeout(() => {
        setIsLoading(false);
        setOpenAlert(false);
        formik.handleReset();
        setWarehouse(null);
        navigate(-1)
      }, 1500);
    } catch (error) {
      toast(toastConfig("error", "Failed", error.message));
      setIsLoading(false);
    }
  };
  return (
    <Flex h="full" minH="100vh" maxH="100vh" flexDir="column" gap="2" p="5">
      <Heading size="md">Mutation Request</Heading>
      <form onSubmit={formik.handleSubmit}>
        <Flex rowGap="5" flexDir="column">
          <ModalSelectWarehouse
            isOpen={openModalWarehouse}
            onClose={() => setOpenModalWarehouse(false)}
            onClickRow={(val) => {
              setWarehouse(val);
              formik.setFieldValue("warehouse_id", val.id);
              setOpenModalWarehouse(false);
            }}
            except_id={warehouseId}
          />
          <FormControl isInvalid={formik.errors.warehouse_id}>
            <Text>To Warehouse:</Text>
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
                  <Th>Origin Stock</Th>
                  <Th>Request Amount</Th>
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
                            formik.errors.listedProduct?.[idx]?.product
                              ?.value &&
                            formik.touched.listedProduct?.[idx]?.product
                          }
                        >
                          <CustomSelect
                            id={`listedProduct[${idx}].product.value`}
                            name={`listedProduct[${idx}].product.value`}
                            placeholder="Select Product"
                            onChange={(opt) => onChangeProductHandler(opt, idx)}
                            onBlur={() =>
                              formik.setFieldTouched(
                                `listedProduct[${idx}].product.value`,
                                true
                              )
                            }
                            value={formik.values.listedProduct[idx].product}
                            options={updatedOpt}
                            menuPortalTarget={document.querySelector("body")}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            isInvalid={
                              formik.errors.listedProduct?.[idx]?.product
                                ?.value &&
                              formik.touched.listedProduct?.[idx]?.product
                            }
                          />
                          <FormErrorMessage>
                            {formik.errors.listedProduct?.[idx]?.product?.value}
                          </FormErrorMessage>
                        </FormControl>
                      </Td>
                      <Td>{formik.values.listedProduct[idx].originStock}</Td>
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
                            max={formik.values.listedProduct?.[idx]?.originStock}
                            id={`listedProduct[${idx}].amount`}
                            name={`listedProduct[${idx}].amount`}
                            onChange={(value) =>
                              onChangeAmountHandler(value, idx)
                            }
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
        </Flex>
        <HStack mt="3" justify="space-between">
          <Button maxW="150px" alignSelf="flex-start" onClick={onAddHandler}>
            Add product
          </Button>
          <HStack>
            <Button bg="black" color="white" type="submit">
              Submit
            </Button>
            <Button type="submit">Back</Button>
          </HStack>
        </HStack>
      </form>
      <AlertConfirmation
        header="Send this mutation request ?"
        description="This action will request mutation to destination warehouse, You cannot undo this change."
        buttonConfirm="Yes"
        buttonCancel="Cancel"
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        onClickConfirm={onClickConfirmHandler}
        isLoading={isLoading}
      />
    </Flex>
  );
};

export default FormMutation;
