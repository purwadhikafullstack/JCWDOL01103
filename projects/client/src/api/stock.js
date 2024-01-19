import { server } from "./index";

export const getStock = async param => {
  const response = await server.get("/stock", {
    params: param,
  });
  return response.data;
};

export const postStock = async data => {
  const response = await server.post("/stock", data);
  return response.data;
};

export const getProductStock = async params => {
  const response = await server.get("/stock", {
    params: params,
  });
  return response.data;
};
