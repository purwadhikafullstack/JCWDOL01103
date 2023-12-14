import { server } from "../api/index";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Input,
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfModalOpen, setIsConfModalOpen] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await server.get("/products");
        setProducts(response.data.data);
      } catch (e) {
        console.error(e + "error");
      }
    };
    getProducts();
  }, []);

  const deleteHandler = async id => {
    try {
      await server.delete(`/product/${id}`);
      setProducts(products.filter(product => product.product_id !== id));
      setIsConfModalOpen(false);
    } catch (e) {
      console.error(e + "error");
    }
  };

  const addFormik = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      stock: "",
      price: "",
      product_category_id: "",
      weight: "",
      active: "",
      warehouse_id: "",
      image: null,
    },
    validationSchema: Yup.object({
      product_name: Yup.string(),
      description: Yup.string(),
      stock: Yup.number(),
      price: Yup.number(),
      product_category_id: Yup.number(),
      weight: Yup.number(),
      active: Yup.boolean(),
      warehouse_id: Yup.number(),
      image: Yup.mixed()
        .test("fileSize", "File size should be less than 1 MB", value => {
          return value && value.size <= 1 * 1024 * 1024;
        })
        .test(
          "fileType",
          "Invalid file type. Please use JPEG, PNG, or JPG.",
          value => {
            return (
              value &&
              ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
            );
          }
        ),
    }),
    onSubmit: async values => {
      try {
        await server.post(`/product`, {
          product_name: values.product_name,
          description: values.description,
          stock: values.stock,
          price: values.price,
          product_category_id: values.product_category_id,
          weight: values.weight,
          active: values.active,
          warehouse_id: values.warehouse_id,
          image: values.image,
        });
        setIsAddModalOpen(false);
      } catch (e) {
        console.error(e + "error");
      }
    },
  });

  const editFormik = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      stock: "",
      price: "",
      product_category_id: "",
      weight: "",
      active: "",
      warehouse_id: "",
      image: null,
    },
    validationSchema: Yup.object({
      product_name: Yup.string(),
      description: Yup.string(),
      stock: Yup.number(),
      price: Yup.number(),
      product_category_id: Yup.number(),
      weight: Yup.number(),
      active: Yup.boolean(),
      warehouse_id: Yup.number(),
      image: Yup.mixed()
        .test("fileSize", "File size should be less than 1 MB", value => {
          return value && value.size <= 1 * 1024 * 1024;
        })
        .test(
          "fileType",
          "Invalid file type. Please use JPEG, PNG, or JPG.",
          value => {
            return (
              value &&
              ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
            );
          }
        ),
    }),
  });

  const editHandler = async (id, values) => {
    try {
      await server.patch(`/product/${id}`, {
        product_name: values.product_name,
        description: values.description,
        stock: values.stock,
        price: values.price,
        product_category_id: values.product_category_id,
        weight: values.weight,
        active: values.active,
        warehouse_id: values.warehouse_id,
        image: values.image,
      });
      setIsEditModalOpen(false);
    } catch (e) {
      console.error(e + "error");
    }
  };

  return (
    <>
      <Box ml={"180px"}>
        <Heading
          fontSize={{ base: "25px", xl: "3xl" }}
          fontWeight={"black"}
          as={"h1"}
          mt={5}
          mb={10}
        >
          Product Data
        </Heading>
        <Button
          bg="black"
          color="white"
          my={2}
          type="submit"
          _hover={{ bg: "blackAlpha.600" }}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Product
        </Button>
        <form onSubmit={addFormik.handleSubmit}>
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Product</ModalHeader>
              <ModalBody>
                <Text fontSize={16} mt={1}>
                  Product Name
                </Text>
                <Input
                  my={2}
                  focusBorderColor="black"
                  placeholder="Product Name"
                  name="product_name"
                  onChange={addFormik.handleChange}
                  onBlur={addFormik.handleBlur}
                />
                <Text mb={1} color={"red.500"} fontSize={"sm"}>
                  {addFormik.errors.product_name}
                </Text>
                <Text fontSize={16} mt={1}>
                  Description
                </Text>
                <Input
                  my={2}
                  focusBorderColor="black"
                  placeholder="Description"
                  name="description"
                  onChange={addFormik.handleChange}
                  onBlur={addFormik.handleBlur}
                />
                <Text mb={1} color={"red.500"} fontSize={"sm"}>
                  {addFormik.errors.description}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="green" mr={3} type="submit">
                  Add
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </form>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Product Name</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Image</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product, index) => (
                <Tr key={product.product_id}>
                  <Td>{index + 1}</Td>
                  <Td maxW="400px" isTruncated>
                    {product.product_name}
                  </Td>
                  <Td maxW="200px" isTruncated>
                    {product.description}
                  </Td>
                  <Td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.price)}
                  </Td>
                  <Td>
                    {" "}
                    <Avatar
                      name={product.product_name}
                      src={`http://localhost:8000/uploads/${product?.image}`}
                    />
                  </Td>
                  <Td>
                    <Button
                      bg="green"
                      color="white"
                      mt={1}
                      _hover={{ bg: "blackAlpha.600" }}
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      <BiEditAlt />
                    </Button>
                    <form onSubmit={editFormik.handleSubmit}>
                      <Modal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Edit Product</ModalHeader>
                          <ModalBody>
                            <Text fontSize={16} mt={1}>
                              Product Name
                            </Text>
                            <Input
                              my={2}
                              focusBorderColor="black"
                              placeholder={product?.product_name}
                              name="product_name"
                              onChange={editFormik.handleChange}
                              onBlur={editFormik.handleBlur}
                            />
                            <Text mb={1} color={"red.500"} fontSize={"sm"}>
                              {editFormik.errors.product_name}
                            </Text>
                          </ModalBody>
                          <ModalFooter>
                            <Button colorScheme="green" mr={3} type="submit">
                              Save
                            </Button>
                            <Button onClick={() => setIsEditModalOpen(false)}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </form>
                  </Td>
                  <Td>
                    <Button
                      bg="red"
                      color="white"
                      mt={1}
                      _hover={{ bg: "blackAlpha.600" }}
                      onClick={() => setIsConfModalOpen(true)}
                    >
                      <BiTrashAlt />
                    </Button>

                    <Modal
                      isOpen={isConfModalOpen}
                      onClose={() => setIsConfModalOpen(false)}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Confirmation</ModalHeader>
                        <ModalBody>
                          Are you sure you want to delete this product?
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme="red"
                            mr={3}
                            onClick={() => deleteHandler(product.product_id)}
                          >
                            Delete
                          </Button>
                          <Button onClick={() => setIsConfModalOpen(false)}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Product;
