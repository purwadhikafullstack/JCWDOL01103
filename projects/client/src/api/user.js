import { server, config } from "./index";

export const getAddresses = async (params) => {
  const response = await server.get("/user", {
    params: params,
    headers: config.headers,
  });
  return response.data;
};
