import { server } from "./index";
export const checkShippingCost = async data => {
  const response = await server.post("/shipping", data);
  return response.data;
};
