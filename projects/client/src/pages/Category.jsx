import { server } from "../api/index";
import { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastConfig } from "../utils/toastConfig";
import { jwtDecode } from "jwt-decode";

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
} from "@chakra-ui/react";
import { BiEditAlt, BiTrashAlt, BiSortZA, BiTime } from "react-icons/bi";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);
  const [isConfModalOpen, setIsConfModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortField, setSortField] = useState("name");
  const [userRole, setUserRole] = useState(null);

  const toast = useToast();

  const getCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const sortParam = sortOrder === "ascending" ? "asc" : "desc";
      const response = await server.get("/categories", {
        params: {
          search: searchQuery,
          sort: sortField,
          order: sortParam,
        },
      });
      console.log(response.data.data); // Tambahkan baris ini
      setCategories(response.data.data);
    } catch (e) {
      console.error(e + "gagal memuat data");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, sortOrder, sortField]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const addFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .nullable()
        .required("Required")
        .matches(/^[A-Za-z ]*$/, "Product Category must only contain letters"),
    }),
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        const response = await server.post(`/category`, {
          name: values.name,
        });
        setIsAddModalOpen(false);
        resetForm();
        toast(toastConfig("success", "Success", response.data.message));
        getCategories();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrors({ name: error.response.data.message });
        } else {
          console.error("Error Add Category", error);
        }
      }
    },
  });

  const deleteHandler = async () => {
    if (deletingCategoryId !== null) {
      try {
        const response = await server.delete(`/category/${deletingCategoryId}`);
        setCategories(
          categories.filter(category => category.id !== deletingCategoryId)
        );
        setIsConfModalOpen(false);
        toast(toastConfig("success", "Success", response.data.message));
      } catch (e) {
        console.error(e + "error");
      }
    }
  };

  const handleOpenEditModal = categoryId => {
    const categoryToEdit = categories.find(
      category => category.id === categoryId
    );
    if (categoryToEdit) {
      editFormik.setValues({ name: categoryToEdit.name });
      setEditingCategoryId(categoryId);
      setIsEditModalOpen(true);
    }
  };

  const editFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .nullable()
        .required("Required")
        .matches(/^[A-Za-z ]*$/, "Product Category must only contain letters"),
    }),
    onSubmit: async (values, { setErrors }) => {
      if (editingCategoryId !== null) {
        try {
          const response = await server.patch(
            `/category/${editingCategoryId}`,
            { name: values.name }
          );
          toast(toastConfig("success", "Success", response.data.message));
          setIsEditModalOpen(false);
          getCategories();
        } catch (error) {
          if (error.response && error.response.status === 409) {
            setErrors({ name: error.response.data.message });
          } else {
            console.error("Error Updating Category", error);
          }
        }
      }
    },
  });

  const toggleSortOrder = () => {
    setSortField("name");
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    getCategories();
  };

  const toggleTimeSort = () => {
    if (sortField !== "createdAt") {
      setSortField("createdAt");
      setSortOrder("descending");
    } else {
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }
    getCategories();
  };

  const getUserRoleFromToken = token => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.role;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = getUserRoleFromToken(token);
    setUserRole(role);
  }, []);

  return (
    <>
      <Box ml={{ base: "0", xl: "50px" }} my={5}>
        <Heading
          fontSize={{ base: "25px", xl: "3xl" }}
          fontWeight={"black"}
          as={"h1"}
          mt={5}
          mb={10}
        >
          Category Data
        </Heading>
        <Flex mb={5}>
          <Button
            bg="black"
            color="white"
            w={"70%"}
            _hover={{ bg: "blackAlpha.600" }}
            onClick={() => setIsAddModalOpen(true)}
            isDisabled={userRole !== "master"}
          >
            Add Category
          </Button>
          <Input
            w={"100%"}
            placeholder="Search Categories"
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
            <BiSortZA size={"50px"} />
          </Button>
          <Button _hover={{ bg: "blackAlpha.600" }} onClick={toggleTimeSort}>
            <BiTime size={"50px"} />
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
                <ModalHeader>Add Category</ModalHeader>
                <ModalBody>
                  <FormLabel fontSize={16} mt={1}>
                    Product Category
                  </FormLabel>
                  <Input
                    my={2}
                    focusBorderColor="black"
                    placeholder="Product Category"
                    name="name"
                    onChange={addFormik.handleChange}
                    onBlur={addFormik.handleBlur}
                  />
                  {addFormik.touched.name && addFormik.errors.name ? (
                    <Text mb={1} color={"red.500"} fontSize={"sm"}>
                      {addFormik.errors.name}
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
                  <Th>Product Category</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories.length === 0 ? (
                  <Tr>
                    <Td colSpan="3" textAlign="center">
                      Data Not Found
                    </Td>
                  </Tr>
                ) : (
                  categories.map((categories, index) => (
                    <Tr key={categories.id}>
                      <Td>{index + 1}</Td>
                      <Td maxW="400px" isTruncated>
                        {categories.name}
                      </Td>
                      <Td>
                        <Button
                          bg="green"
                          color="white"
                          mt={1}
                          mr={4}
                          _hover={{ bg: "blackAlpha.600" }}
                          onClick={() => handleOpenEditModal(categories.id)}
                          isDisabled={userRole !== "master"}
                        >
                          <Modal
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            mx={5}
                          >
                            <form onSubmit={editFormik.handleSubmit}>
                              <ModalOverlay />
                              <ModalContent>
                                <ModalHeader>Edit Category</ModalHeader>
                                <ModalBody>
                                  <FormLabel fontSize={16} mt={1}>
                                    Product Category
                                  </FormLabel>
                                  <Input
                                    my={2}
                                    focusBorderColor="black"
                                    value={editFormik.values.name}
                                    name="name"
                                    onChange={editFormik.handleChange}
                                    onBlur={editFormik.handleBlur}
                                  />
                                  {editFormik.touched.name &&
                                  editFormik.errors.name ? (
                                    <Text
                                      mb={1}
                                      color={"red.500"}
                                      fontSize={"sm"}
                                    >
                                      {editFormik.errors.name}
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
                            setDeletingCategoryId(categories.id);
                            setIsConfModalOpen(true);
                          }}
                          isDisabled={userRole !== "master"}
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
      </Box>
    </>
  );
};

export default Category;
