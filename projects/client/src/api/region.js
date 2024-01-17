import { server } from "./index";

export const getProvinces = async () => {
  const response = await server.get("/provinces");
  return response.data;
};

export const getCities = async (id) => {
    const response = await server.get(`/cities/${id}`);
    return response.data;
  };