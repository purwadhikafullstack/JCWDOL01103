import { config, server } from ".";

export const getAddresses = async (params) => {
  console.log(params)
  const response = await server.get("/addresses", {
    params: params,
    headers: config.headers,
  });
  console.log(response)
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

export const updateAddress = async (id, data) => {
  const idEncoded = encodeURIComponent(id);
  const response = await server.patch(`/addresses/${idEncoded}`, data, config);
  return response.data;
};

export const deleteAddress = async (id) => {
    const idEncoded = encodeURIComponent(id);
    const response = await server.delete(`/addresses/${idEncoded}`)
    return response.data;
}
