import { server, config } from "./index";

export const getUsers = async (params) => {
  const response = await server.get("/users", {
    params: params,
    headers: config.headers,
  });
  return response.data;
};
