import { server } from "./index";

export const getUsers = async (params) => {
  const response = await server.get("/users", {
    params: params,
  });
  return response.data;
};
