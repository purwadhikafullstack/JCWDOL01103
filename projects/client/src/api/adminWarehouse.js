import { config, server } from "./index";

export const getAdminWarehouse = async (id) => {
  const idEncoded = encodeURIComponent(id)
  const response = await server.get(`/admin-warehouse/${idEncoded}`, config)
  return response.data;
}