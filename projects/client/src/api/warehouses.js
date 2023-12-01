import { config, server } from "./index";

export const getWarehouses = async (params) => {
  const response = await server.get("/warehouses", {
    params: params,
    //   headers: config.headers,
  });
  return response.data;
};

export const createWarehouse = async (data) => {
  const response = await server.post("/warehouses", data, config);
  return response.data;
};

export const updateWarehouse = async (id, data) => {
  const response = await server.patch(`/warehouses/${id}`, data, config);
  return response.data;
};

export const deleteWarehouse = async (id) => {
  const response = await server.delete(`/warehouses/${id}`, config);
  return response.data
}