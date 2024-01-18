import { server } from ".";

export const getProducts = async params => {
  const response = await server.get("/products", {
    params: params,
  });
  return response.data;
};

export const changeAddress = async data => {
  const response = await server.post("/addresses/primary", data);
  return response;
};

export const createAddress = async data => {
  const response = await server.post("/addresses", data);
  return response.data;
};

export const updateAddress = async (id, data) => {
  const idEncoded = encodeURIComponent(id);
  const response = await server.patch(`/addresses/${idEncoded}`, data);
  return response.data;
};

export const deleteAddress = async id => {
  const idEncoded = encodeURIComponent(id);
  const response = await server.delete(`/addresses/${idEncoded}`);
  return response.data;
};
