import { server } from "./index";

export const postRequestMutation = async (data) => {
  const response = await server.post("/stock-mutation", data);
  return response.data;
};

export const getMutations = async (params) => {
  const response = await server.get("/stock-mutation", {
    params: params,
  });
  return response.data;
};

export const patchMutationStatus = async (id, data) => {
  const response = await server.patch(`/stock-mutation/${id}`, data);
  return response.data;
};
