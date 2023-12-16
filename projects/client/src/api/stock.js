import { config, server } from "./index";

export const getStock = async (param) => {
  const response = await server.get("/stock", {
    params: param,
    headers: config.headers
  });
  return response.data;
};

export const postStock = async (data) => {
  console.log(data)
    const response = await server.post("/stock", data, config)
    return response.data
}

export const getProductStock = async (params) => {
  const response = await server.get("/stock", {
    params: params
  });
  return response.data;
};
