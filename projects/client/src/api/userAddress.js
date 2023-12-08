import { config, server } from ".";

export const getAddresses = async (params) => {
  const response = await server.get("/addresses", {
    params: params,
    headers: config.headers,
  });
  return response.data;
};

export const changeAddress = async (data) => {
  const response = await server.post("/addresses/primary", data, config);
  return response;
};

export const createAddress = async (data) => {
  const response = await server.post("/addresses", data, config);
  return response.data;
};

export const updateAddress = async (data, id) => {
  const response = await server.post(`/addresses/${id}`, data, config);
  return response.data;
};
