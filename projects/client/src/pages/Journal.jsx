import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,import React, { useEffect, useState } from "react";
  import {
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
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
  } from "@chakra-ui/react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import { SelectWarehouse } from "../components/organisms/SelectWarehouse";
  import { FaRegTrashAlt } from "react-icons/fa";
  import { getProductStock, postStock } from "../api/stock";
  import { toastConfig } from "../utils/toastConfig";
  import { getProducts } from "../api/product";
  import CustomSelect from "../components/atoms/CustomSelect";
  import AlertConfirmation from "../components/organisms/AlertConfirmation";
  import { jwtDecode } from "jwt-decode";
  import { getAdminWarehouse } from "../api/adminWarehouse";
  
  const Journal = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [warehouse, setWarehouse] = useState(null);
    const [openModalWarehouse, setOpenModalWarehouse] = useState(false);
    const [products, setProducts] = useState([]);
    const [updatedOpt, setUpdatedOpt] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [adminInfo, setAdminInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const formik = useFormik({
      initialValues: {
        warehouse_id: "",
        type: "",
        listedProduct: [
          {
            product: {
              value: "",
              label: "Select product...",
              isDisabled: true,
            },
            quantity_before: 0,
            quantity_after: 0,
            amount: 0,
          },
        ],
      },
      validationSchema: Yup.object({
        warehouse_id: Yup.string().required("Required"),
        type: Yup.string().required("Required"),
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
          const userData = jwtDecode(localStorage.getItem("token"));
          const options = response.data.map((dt) => {
            return {
              value: dt.id,
              label: dt.product_name,
            };
          });
          if (userData.role === "admin") {
            const getAdmin = await getAdminWarehouse(userData.id);
            setAdminInfo(getAdmin.data);
            formik.setFieldValue("warehouse_id", getAdmin.data.warehouse_id);
          }
          setUserInfo(userData);
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
            (selectedOption) => selectedOption.product.value == dt.value
          ),
        };
      });
      setUpdatedOpt([...updatedOptions]);
    }, [formik.values.listedProduct]);
  
    useEffect(() => {
      formik.setFieldValue("listedProduct", formik.initialValues.listedProduct);
    }, [formik.values.type, formik.values.warehouse_id]);
  
    const onChangeProductHandler = async (opt, idx) => {
      try {
        formik.setFieldValue(`listedProduct[${idx}].product`, opt);
        const query = {
          warehouse_id: formik.values.warehouse_id,
          product_id: opt.value,
        };
        const response = await getProductStock(query);
        const quantityBefore =
          formik.values.warehouse_id && response.data.warehouse.length > 0
            ? response.data.warehouse[0].quantity
            : 0;
        formik.setFieldValue(
          `listedProduct[${idx}].quantity_before`,
          quantityBefore
        );
        formik.setFieldValue(
          `listedProduct[${idx}].quantity_after`,
          parseInt(formik.values.listedProduct[idx].amount) + quantityBefore
        );
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
      let valueBefore = parseInt(
        formik.values.listedProduct[idx]?.quantity_before
      );
      let amount =
        formik.values.type === "reducing"
          ? parseInt(value) * -1
          : parseInt(value);
      let result = valueBefore + amount;
      formik.setFieldValue(
        `listedProduct[${idx}].quantity_after`,
        isNaN(result) ? 0 : result
      );
      formik.setFieldValue(
        `listedProduct[${idx}].amount`,
        isNaN(result) ? 0 : parseInt(value)
      );
    };
    const onClickConfirmHandler = async () => {
      setIsLoading(true);
      try {
        const value = formik.values;
        const products = value.listedProduct.map((dt) => {
          return {
            product_id: dt.product.value,
            amount: dt.amount,
          };
        });
        const data = {
          warehouse_id: value.warehouse_id,
          type: value.type,
          products: products,
        };
        const updateStock = await postStock(data);
        toast(toastConfig("success", "Success", updateStock.message));
        setTimeout(async () => {
          setIsLoading(false);
          setOpenAlert(false);
          formik.handleReset();
          userInfo.role === "admin" &&
            formik.setFieldValue("warehouse_id", adminInfo.warehouse_id);
          setWarehouse(null);
        }, 3000);
      } catch (error) {
        toast(toastConfig("error", "Failed", error.message));
        setIsLoading(false);
      }
    };
  
    return (
      <Flex w="full" flexDir="column" mb="40px" gap="2">
        <Heading size="lg">Manage Stock</Heading>
        <form onSubmit={formik.handleSubmit}>
          <Flex rowGap="5" flexDir="column">
            <FormControl isInvalid={formik.errors.type && formik.touched.type}>
              <FormLabel htmlFor="type">Type:</FormLabel>
              <Select
                id="type"
                placeholder="Select option"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
              >
                <option value="adding">Addition Stock</option>
                <option value="reducing">Reduction Stock</option>
              </Select>
              <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
            </FormControl>
            {userInfo?.role === "master" && (
              <SelectWarehouse
                isOpen={openModalWarehouse}
                onClose={() => setOpenModalWarehouse(false)}
                onClickRow={(val) => {
                  setWarehouse(val);
                  formik.setFieldValue("warehouse_id", val.id);
                  setOpenModalWarehouse(false);
                }}
                selectedWarehouse={formik.values.warehouse_id}
                isInvalid={
                  formik.errors.warehouse_id && formik.touched.warehouse_id
                }
                onChange={(val) => formik.setFieldValue("warehouse_id", val.id)}
              />
            )}
            <TableContainer
              pos="relative"
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
                              styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              }}
                              menuPosition="fixed"
                              menuPortalTarget={document.querySelector("body")}
                              value={formik.values.listedProduct[idx].product}
                              options={updatedOpt}
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
                        <Td>
                          {formik.values.listedProduct[idx].quantity_before}
                        </Td>
                        <Td>{formik.values.listedProduct[idx].quantity_after}</Td>
                        <Td w="150px" minW="150px">
                          <FormControl
                            isInvalid={
                              formik.errors.listedProduct?.[idx]?.amount &&
                              formik.touched.listedProduct?.[idx]?.amount
                            }
                          >
                            <NumberInput
                              defaultValue={0}
                              min={0}
                              max={
                                formik.values.type === "reducing"
                                  ? formik.values.listedProduct[idx]
                                      .quantity_before
                                  : undefined
                              }
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
            </TableContainer>
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
          header="Are you sure ?"
          description="This action will add stock and journal in database, You cannot undo this change"
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
  
  export default Journal;  
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
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SelectWarehouse } from "../components/organisms/SelectWarehouse";
import { FaRegTrashAlt } from "react-icons/fa";
import { getProductStock, postStock } from "../api/stock";
import { toastConfig } from "../utils/toastConfig";
import { getProducts } from "../api/product";
import CustomSelect from "../components/atoms/CustomSelect";
import AlertConfirmation from "../components/organisms/AlertConfirmation";
import { jwtDecode } from "jwt-decode";
import { getAdminWarehouse } from "../api/adminWarehouse";

const Journal = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [warehouse, setWarehouse] = useState(null);
  const [openModalWarehouse, setOpenModalWarehouse] = useState(false);
  const [products, setProducts] = useState([]);
  const [updatedOpt, setUpdatedOpt] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      warehouse_id: "",
      type: "",
      listedProduct: [
        {
          product: {
            value: "",
            label: "Select product...",
            isDisabled: true,
          },
          quantity_before: 0,
          quantity_after: 0,
          amount: 0,
        },
      ],
    },
    validationSchema: Yup.object({
      warehouse_id: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
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
        const options = response.data.map((dt) => {
          return {
            value: dt.id,
            label: dt.product_name,
          };
        });
        if (userData.role === "admin") {
          const getAdmin = await getAdminWarehouse(userData.id);
          setAdminInfo(getAdmin.data);
          formik.setFieldValue("warehouse_id", getAdmin.data.warehouse_id);
        }
        setUserInfo(userData);
        setProducts(options);
        setUpdatedOpt(options);
      } catch (error) {
        toast(toastConfig("error", "Failed", error.message));
      }
    })();
  }, []);
  useEffect(() => {
    const updatedOptions = products?.map(dt => {
      return {
        ...dt,
        isDisabled: formik.values.listedProduct.some(
          (selectedOption) => selectedOption.product_id.value == dt.value
        ),
      };
    });
    setUpdatedOpt([...updatedOptions]);
  }, [formik.values.listedProduct]);

  useEffect(() => {
    formik.setFieldValue("listedProduct", formik.initialValues.listedProduct);
  }, [formik.values.type, formik.values.warehouse_id]);

  const onChangeProductHandler = async (opt, idx) => {
    try {
      formik.setFieldValue(`listedProduct[${idx}].product`, opt);
      const query = {
        warehouse_id: formik.values.warehouse_id,
        product_id: opt.value,
      };
      const getQuantityBefore = await getProducts(query);
      const quantityBefore = getQuantityBefore.data.length > 0 ? getQuantityBefore.data[0].stock : 0
      formik.setFieldValue(`listedProduct[${idx}].quantity_before`, quantityBefore);
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

  const onChangeAmountHandler = (value, idx) =>{
    let valueBefore = parseInt(formik.values.listedProduct[idx]?.quantity_before)
    let amount = formik.values.journal_type === "reducing" ? parseInt(value) * -1 : parseInt(value)
    const result = valueBefore + amount
    formik.setFieldValue(`listedProduct[${idx}].quantity_after`, result);
    formik.setFieldValue(`listedProduct[${idx}].amount`, value);
  }
  // useEffect(()=>{
  //   (async()=>{
  //     await onChangeProductHandler()
  //     onChangeAmountHandler()
  //   })()
  // },[formik.values.journal_type, formik.values.warehouse_id])
  return (
    <Flex w="full" flexDir="column" mb="40px" gap="2">
      <Heading size="lg">Manage Stock</Heading>
      <form onSubmit={formik.handleSubmit}>
        <Flex rowGap="5" flexDir="column">
          <FormControl isInvalid={formik.errors.type && formik.touched.type}>
            <FormLabel htmlFor="type">Type:</FormLabel>
            <Select
              id="type"
              placeholder="Select option"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            >
              <option value="adding">Addition Stock</option>
              <option value="reducing">Reduction Stock</option>
            </Select>
            <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
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
                            onBlur={formik.handleBlur}
                            value={formik.values.listedProduct[idx].product_id}
                            options={updatedOpt}
                            menuPortalTarget={document.querySelector("body")}
                            value={formik.values.listedProduct[idx].product}
                            options={updatedOpt}
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
                      <Td>
                        {formik.values.listedProduct[idx].quantity_before}
                      </Td>
                      <Td>{formik.values.listedProduct[idx].quantity_after}</Td>
                      <Td w="150px" minW="150px">
                        <FormControl
                          isInvalid={
                            formik.errors.listedProduct?.[idx]?.amount &&
                            formik.touched.listedProduct?.[idx]?.amount
                          }
                        >
                          <NumberInput
                            defaultValue={0}
                            min={0}
                            max={
                              formik.values.type === "reducing"
                                ? formik.values.listedProduct[idx]
                                    .quantity_before
                                : undefined
                            }
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
          </TableContainer>
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
        header="Are you sure ?"
        description="This action will add stock and journal in database, You cannot undo this change"
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

export default Journal;
