import { server } from "./index";

export const getAdminWarehouse = async id => {
  const idEncoded = encodeURIComponent(id);
  const response = await server.get(`/admin-warehouse/${idEncoded}`);
  return response.data;
};

export const getUserAdmin = async params => {
  const response = await server.get("/admin", {
    params: params,
  });
  return response.data;
};

export const createAdmin = async data => {
  const response = await server.post("/admin", data);
  return response.data;
};

export const updateAdmin = async data => {
  const response = await server.patch("/admin", data);
  return response.data;
};

export const deleteAdmin = async id => {
  const response = await server.delete(`/admin/${id}`);
  return response.data;
};
