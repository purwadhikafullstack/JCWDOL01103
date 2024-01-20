import { server } from ".";

export const getProducts = async params => {
  const response = await server.get("/products", {
    params: params,
  });
  return response.data;
};
