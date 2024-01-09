import { server } from "../api/index";
import { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastConfig } from "../utils/toastConfig";

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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  FormControl,
  FormLabel,
  useToast,
  Flex,
  Spinner,
  Avatar,
} from "@chakra-ui/react";
import { BiEditAlt, BiTrashAlt, BiSortZA, BiTime } from "react-icons/bi";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [isConfModalOpen, setIsConfModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortField, setSortField] = useState("product_name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const toast = useToast();

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const sortParam = sortOrder === "ascending" ? "asc" : "desc";
      const response = await server.get("/products", {
        params: {
          search: searchQuery,
          sort: sortField,
          order: sortParam,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setProducts(
        response.data.data.map(product => ({
          ...product,
          categoryName: product.product_category.name,
          subCategoryName: product.product_sub_category.name,
        }))
      );
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (e) {
      console.error(e + "gagal memuat data");
    }
  }, [searchQuery, sortOrder, sortField, currentPage, itemsPerPage]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handlePageChange = page => {
    setCurrentPage(page);
    getProducts();
  };

  const addFormik = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      product_category: "",
      product_sub_category: "",
      price: "",
      weight: "",
      image: null,
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      product_category: Yup.string()
        .required("Required")
        .matches(/^[A-Za-z ]*$/, "Product Category must only contain letters"),
      product_sub_category: Yup.string()
        .required("Required")
        .matches(
          /^[A-Za-z ]*$/,
          "Product Sub Category must only contain letters"
        ),
      price: Yup.number()
        .required("Required")
        .positive("Price must be a positive number")
        .integer("Price must be an integer"),
      weight: Yup.number()
        .required("Required")
        .positive("Price must be a positive number")
        .integer("Price must be an integer"),
      image: Yup.mixed()
        .nullable()
        .test(
          "fileSize",
          "File size should be less than 1 MB",
          value => !value || (value && value.size <= 1 * 1024 * 1024)
        )
        .test(
          "fileType",
          "Invalid file type. Please use JPEG, PNG, or JPG.",
          value =>
            !value ||
            (value &&
              ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
        ),
    }),
    onSubmit: async (values, { resetForm, setErrors }) => {
      const formData = new FormData();
      formData.append("product_name", values.product_name);
      formData.append("description", values.description);
      formData.append("product_category", values.product_category);
      formData.append("product_sub_category", values.product_sub_category);
      formData.append("price", values.price);
      formData.append("weight", values.weight);

      if (values.image) {
        formData.append("image", values.image);
      }

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await server.post(`/product`, formData, config);

        setIsAddModalOpen(false);
        resetForm();
        toast(toastConfig("success", "Success", response.data.message));
        getProducts();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrors({ product_name: error.response.data.message });
        } else {
          console.error("Error Add Product", error);
        }
      }
    },
  });

  const deleteHandler = async () => {
    if (deletingProductId !== null) {
      try {
        const response = await server.delete(`/product/${deletingProductId}`);
        setProducts(
          products.filter(product => product.id !== deletingProductId)
        );
        setIsConfModalOpen(false);
        toast(toastConfig("success", "Success", response.data.message));
      } catch (e) {
        console.error(e + "error");
      }
    }
  };

  const handleOpenEditModal = productId => {
    const productToEdit = products.find(product => product.id === productId);
    if (productToEdit) {
      editFormik.setValues({
        product_name: productToEdit.product_name,
        description: productToEdit.description,
        product_category: productToEdit.categoryName,
        product_sub_category: productToEdit.subCategoryName,
        price: productToEdit.price,
        weight: productToEdit.weight,
        image: null,
      });
      setEditingProductId(productId);
      setIsEditModalOpen(true);
    }
  };

  const editFormik = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      product_category: "",
      product_sub_category: "",
      price: "",
      weight: "",
      image: null,
    },
    validationSchema: Yup.object({
      product_name: Yup.string(),
      description: Yup.string(),
      product_category: Yup.string().matches(
        /^[A-Za-z ]*$/,
        "Product Category must only contain letters"
      ),
      product_sub_category: Yup.string().matches(
        /^[A-Za-z ]*$/,
        "Product Sub Category must only contain letters"
      ),
      price: Yup.number()
        .positive("Price must be a positive number")
        .integer("Price must be an integer"),
      weight: Yup.number()
        .positive("Price must be a positive number")
        .integer("Price must be an integer"),
      image: Yup.mixed()
        .nullable()
        .test(
          "fileSize",
          "File size should be less than 1 MB",
          value => !value || (value && value.size <= 1 * 1024 * 1024)
        )
        .test(
          "fileType",
          "Invalid file type. Please use JPEG, PNG, or JPG.",
          value =>
            !value ||
            (value &&
              ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
        ),
    }),
    onSubmit: async (values, { resetForm, setErrors }) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === "image" && values[key]) {
          formData.append(key, values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });

      if (editingProductId !== null) {
        try {
          const response = await server.patch(
            `/product/${editingProductId}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          toast(toastConfig("success", "Success", response.data.message));
          setIsEditModalOpen(false);
          resetForm();
          getProducts();
        } catch (error) {
          if (error.response && error.response.status === 409) {
            setErrors({ product_name: error.response.data.message });
          } else {
            console.error("Error Updating Product", error);
          }
        }
      }
    },
  });

  const toggleSortOrder = () => {
    setSortField("product_name");
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    getProducts();
  };

  const toggleTimeSort = () => {
    if (sortField !== "createdAt") {
      setSortField("createdAt");
      setSortOrder("descending");
    } else {
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }
    getProducts();
  };

  return (
    <>
      <Box ml={{ base: "0", xl: "50px" }} px={5} my={5}>
        <Heading
          fontSize={{ base: "25px", xl: "3xl" }}
          fontWeight={"black"}
          as={"h1"}
          mt={5}
          mb={10}
        >
          Products Data
        </Heading>
        <Flex mb={5}>
          <Button
            bg="black"
            color="white"
            w={"10%"}
            _hover={{ bg: "blackAlpha.600" }}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Product
          </Button>
          <Input
            w={"30%"}
            placeholder="Search Products"
            value={searchQuery}
            type="text"
            onChange={e => setSearchQuery(e.target.value)}
            mx={5}
            focusBorderColor="black"
          />
          <Button
            _hover={{ bg: "blackAlpha.600" }}
            onClick={toggleSortOrder}
            mr={2}
          >
            <BiSortZA size={"20px"} />
          </Button>
          <Button _hover={{ bg: "blackAlpha.600" }} onClick={toggleTimeSort}>
            <BiTime size={"20px"} />
          </Button>
        </Flex>
        <FormControl>
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            mx={5}
          >
            <form onSubmit={addFormik.handleSubmit}>
              <ModalOverlay />
              <ModalContent>
                {/* Modal Add Product */}
                <ModalHeader>Add Product</ModalHeader>
                <ModalBody>
                  <FormLabel fontSize={16} mt={1}>
                    Name
                  </FormLabel>
                  <Input
                    mb={3}
                    focusBorderColor="black"
                    placeholder="Name"
                    name="product_name"
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                  />
                  {addFormik.touched.product_name &&
                  addFormik.errors.product_name ? (
                    <Text mb={3} mt={-2} color={"red.500"} fontSize={"sm"}>
                      {addFormik.errors.product_name}
                    </Text>
                  ) : null}
                  <FormLabel fontSize={16} mt={1}>
                    Description
                  </FormLabel>
                  <Input
                    mb={3}
                    focusBorderColor="black"
                    placeholder="Description"
                    name="description"
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                  />
                  {addFormik.touched.description &&
                  addFormik.errors.description ? (
                    <Text mb={3} mt={-2} color={"red.500"} fontSize={"sm"}>
                      {addFormik.errors.description}
                    </Text>
                  ) : null}
                  <FormLabel fontSize={16} mt={1}>
                    Category
                  </FormLabel>
                  <Input
                    mb={3}
                    focusBorderColor="black"
                    placeholder="Category"
                    name="product_category"
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                  />
                  {addFormik.touched.product_category &&
                  addFormik.errors.product_category ? (
                    <Text mb={3} mt={-2} color={"red.500"} fontSize={"sm"}>
                      {addFormik.errors.product_category}
                    </Text>
                  ) : null}
                  <FormLabel fontSize={16} mt={1}>
                    Sub Category
                  </FormLabel>
                  <Input
                    mb={3}
                    focusBorderColor="black"
                    placeholder="Sub Category"
                    name="product_sub_category"
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                  />
                  {addFormik.touched.product_sub_category &&
                  addFormik.errors.product_sub_category ? (
                    <Text mb={3} mt={-2} color={"red.500"} fontSize={"sm"}>
                      {addFormik.errors.product_sub_category}
                    </Text>
                  ) : null}
                  <FormLabel fontSize={16} mt={1}>
                    Price
                  </FormLabel>
                  <Input
                    mb={3}
                    focusBorderColor="black"
                    placeholder="Price"
                    name="price"
                    type="number"
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                  />
                  {addFormik.touched.price && addFormik.errors.price ? (
                    <Text mb={3} mt={-2} color={"red.500"} fontSize={"sm"}>
                      {addFormik.errors.price}
                    </Text>
                  ) : null}
                  <FormLabel fontSize={16} mt={1}>
                    Weight
                  </FormLabel>
                  <Input
                    mb={3}
                    focusBorderColor="black"
                    placeholder="Weight"
                    name="weight"
                    type="number"
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                  />
                  {addFormik.touched.weight && addFormik.errors.weight ? (
                    <Text mb={3} mt={-2} color={"red.500"} fontSize={"sm"}>
                      {addFormik.errors.weight}
                    </Text>
                  ) : null}
                  <FormLabel fontSize={16} mt={1}>
                    Image
                  </FormLabel>
                  <Input
                    mb={3}
                    focusBorderColor="black"
                    placeholder="Image"
                    name="image"
                    type="file"
                    onChange={event => {
                      addFormik.setFieldValue(
                        "image",
                        event.currentTarget.files[0]
                      );
                    }}
                    onBlur={addFormik.handleBlur}
                  />
                  {addFormik.touched.image && addFormik.errors.image ? (
                    <Text mb={3} mt={-2} color={"red.500"} fontSize={"sm"}>
                      {addFormik.errors.image}
                    </Text>
                  ) : null}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="green" mr={3} type="submit">
                    Add
                  </Button>
                  <Button onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
        </FormControl>

        <TableContainer>
          {isLoading ? (
            <Spinner size="md" />
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Category</Th>
                  <Th>Sub Category</Th>
                  <Th>Price</Th>
                  <Th>Weight</Th>
                  <Th>Image</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.length === 0 ? (
                  <Tr>
                    <Td colSpan="3" textAlign="center">
                      Data Not Found
                    </Td>
                  </Tr>
                ) : (
                  products.map((product, index) => (
                    <Tr key={product.id}>
                      <Td>{index + 1}</Td>
                      <Td maxW="400px" isTruncated>
                        {product.product_name}
                      </Td>
                      <Td maxW="400px" isTruncated>
                        {product.description}
                      </Td>
                      <Td maxW="400px" isTruncated>
                        {product.categoryName}
                      </Td>
                      <Td maxW="400px" isTruncated>
                        {product.subCategoryName}
                      </Td>
                      <Td maxW="400px" isTruncated>
                        {product.price
                          ? product.price.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })
                          : "Loading price..."}
                      </Td>
                      <Td maxW="400px" isTruncated>
                        {`${product.weight} Kg`}
                      </Td>
                      <Td maxW="400px" isTruncated>
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
                          mr={4}
                          _hover={{ bg: "blackAlpha.600" }}
                          onClick={() => handleOpenEditModal(product.id)}
                        >
                          {/* Modal Edit Product */}
                          <Modal
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            mx={5}
                          >
                            <form onSubmit={editFormik.handleSubmit}>
                              <ModalOverlay />
                              <ModalContent>
                                <ModalHeader>Edit Product</ModalHeader>
                                <ModalBody>
                                  <FormLabel fontSize={16} mt={1}>
                                    Name
                                  </FormLabel>
                                  <Input
                                    mb={3}
                                    focusBorderColor="black"
                                    placeholder="Name"
                                    value={editFormik.values.product_name}
                                    name="product_name"
                                    onChange={editFormik.handleChange}
                                    onBlur={editFormik.handleBlur}
                                  />
                                  {editFormik.touched.product_name &&
                                  editFormik.errors.product_name ? (
                                    <Text
                                      mb={3}
                                      mt={-2}
                                      color={"red.500"}
                                      fontSize={"sm"}
                                    >
                                      {editFormik.errors.product_name}
                                    </Text>
                                  ) : null}
                                  <FormLabel fontSize={16} mt={1}>
                                    Description
                                  </FormLabel>
                                  <Input
                                    mb={3}
                                    focusBorderColor="black"
                                    placeholder="Description"
                                    value={editFormik.values.description}
                                    name="description"
                                    onChange={editFormik.handleChange}
                                    onBlur={editFormik.handleBlur}
                                  />
                                  {editFormik.touched.description &&
                                  editFormik.errors.description ? (
                                    <Text
                                      mb={3}
                                      mt={-2}
                                      color={"red.500"}
                                      fontSize={"sm"}
                                    >
                                      {editFormik.errors.description}
                                    </Text>
                                  ) : null}
                                  <FormLabel fontSize={16} mt={1}>
                                    Category
                                  </FormLabel>
                                  <Input
                                    mb={3}
                                    focusBorderColor="black"
                                    placeholder="Category"
                                    value={editFormik.values.product_category}
                                    name="product_category"
                                    onChange={editFormik.handleChange}
                                    onBlur={editFormik.handleBlur}
                                  />
                                  {editFormik.touched.product_category &&
                                  editFormik.errors.product_category ? (
                                    <Text
                                      mb={3}
                                      mt={-2}
                                      color={"red.500"}
                                      fontSize={"sm"}
                                    >
                                      {editFormik.errors.product_category}
                                    </Text>
                                  ) : null}
                                  <FormLabel fontSize={16} mt={1}>
                                    Sub Category
                                  </FormLabel>
                                  <Input
                                    mb={3}
                                    focusBorderColor="black"
                                    placeholder="Sub Category"
                                    value={
                                      editFormik.values.product_sub_category
                                    }
                                    name="product_sub_category"
                                    onChange={editFormik.handleChange}
                                    onBlur={editFormik.handleBlur}
                                  />
                                  {editFormik.touched.product_sub_category &&
                                  editFormik.errors.product_sub_category ? (
                                    <Text
                                      mb={3}
                                      mt={-2}
                                      color={"red.500"}
                                      fontSize={"sm"}
                                    >
                                      {editFormik.errors.product_sub_category}
                                    </Text>
                                  ) : null}
                                  <FormLabel fontSize={16} mt={1}>
                                    Price
                                  </FormLabel>
                                  <Input
                                    mb={3}
                                    focusBorderColor="black"
                                    placeholder="Price"
                                    value={editFormik.values.price}
                                    name="price"
                                    type="number"
                                    onChange={editFormik.handleChange}
                                    onBlur={editFormik.handleBlur}
                                  />
                                  {editFormik.touched.price &&
                                  editFormik.errors.price ? (
                                    <Text
                                      mb={3}
                                      mt={-2}
                                      color={"red.500"}
                                      fontSize={"sm"}
                                    >
                                      {editFormik.errors.price}
                                    </Text>
                                  ) : null}
                                  <FormLabel fontSize={16} mt={1}>
                                    Weight
                                  </FormLabel>
                                  <Input
                                    mb={3}
                                    focusBorderColor="black"
                                    placeholder="Weight"
                                    value={editFormik.values.weight}
                                    name="weight"
                                    type="number"
                                    onChange={editFormik.handleChange}
                                    onBlur={editFormik.handleBlur}
                                  />
                                  {editFormik.touched.weight &&
                                  editFormik.errors.weight ? (
                                    <Text
                                      mb={3}
                                      mt={-2}
                                      color={"red.500"}
                                      fontSize={"sm"}
                                    >
                                      {editFormik.errors.weight}
                                    </Text>
                                  ) : null}
                                  <FormLabel fontSize={16} mt={1}>
                                    Image
                                  </FormLabel>
                                  <Input
                                    mb={3}
                                    focusBorderColor="black"
                                    placeholder="Image"
                                    name="image"
                                    type="file"
                                    onChange={event => {
                                      editFormik.setFieldValue(
                                        "image",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                    onBlur={editFormik.handleBlur}
                                  />
                                  {editFormik.touched.image &&
                                  editFormik.errors.image ? (
                                    <Text
                                      mb={3}
                                      mt={-2}
                                      color={"red.500"}
                                      fontSize={"sm"}
                                    >
                                      {editFormik.errors.image}
                                    </Text>
                                  ) : null}
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    colorScheme="green"
                                    mr={3}
                                    type="submit"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() => setIsEditModalOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                </ModalFooter>
                              </ModalContent>
                            </form>
                          </Modal>
                          <BiEditAlt />
                        </Button>
                        <Button
                          bg="red"
                          color="white"
                          mt={1}
                          _hover={{ bg: "blackAlpha.600" }}
                          onClick={() => {
                            setDeletingProductId(product.id);
                            setIsConfModalOpen(true);
                          }}
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
                                onClick={deleteHandler}
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
                  ))
                )}
              </Tbody>
            </Table>
          )}
        </TableContainer>
        <Flex mt="5">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            mx="1"
            colorScheme="gray"
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              mx="1"
              color={currentPage === page ? "white" : "black"}
              bg={currentPage === page ? "black" : "gray.200"}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            mx="1"
            colorScheme="gray"
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Category;
