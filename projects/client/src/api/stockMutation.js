import { config, server } from "./index";

export const postRequestMutation = async (data) => {
  const response = await server.post("/stock-mutation", data, config);
  return response.data;
};

export const getMutations = async (params) => {
  const response = await server.get("/stock-mutation", {
    params: params,
    headers: config.headers,
  });
  return response.data;
};
