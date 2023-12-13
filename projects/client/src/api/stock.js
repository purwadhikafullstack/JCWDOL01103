import { config, server } from "./index";

export const getStock = async (param) => {
  const response = await server.get("/stock", {
    params: param,
    headers: config.headers
  });
  return response.data;
};

export const createJournal = async (data) => {
    const response = await server.post("/stock", data, config)
    return response.data
}

export const getProducts = async (params) => {
  const response = await server.get("/products", {
    params: params
  });
  return response.data;
};
