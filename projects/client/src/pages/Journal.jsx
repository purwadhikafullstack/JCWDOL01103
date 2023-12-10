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
  Input,
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
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalSelectWarehouse } from "../components/organisms/ModalSelectWarehouse";
import { FaRegTrashAlt } from "react-icons/fa";

const Journal = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [warehouse, setWarehouse] = useState(null);
  const [openModalWarehouse, setOpenModalWarehouse] = useState(false);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const response = await getWarehouses();
  //       } catch (error) {}
  //     })();
  //   }, []);
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
      console.log(formik.values)
    },
  });
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
              <option value="adding">Stock Addition</option>
              <option value="reducing">Stock Reduction</option>
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
            overflow="scroll"
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
                  <Th>Difference</Th>
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
                            formik.errors.listedProduct?.[idx]?.product_id &&
                            formik.touched.listedProduct?.[idx]?.product_id
                          }
                        >
                          <Select
                            id={`listedProduct[${idx}].product_id`}
                            placeholder="Select Product"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.listedProduct[idx].product_id}
                          >
                            <option value="tambah">Monitor 24 inch</option>
                            <option value="kurang">
                              Keyboard 10 keys less
                            </option>
                          </Select>
                          <FormErrorMessage>
                            {formik.errors.listedProduct?.[idx]?.product_id}
                          </FormErrorMessage>
                        </FormControl>
                      </Td>
                      <Td>504</Td>
                      <Td>504</Td>
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
                            // onChange={formik.handleChange}
                            onChange={(value) =>
                              formik.handleChange(
                                `listedProduct[${idx}].amount`
                              )(value)
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
