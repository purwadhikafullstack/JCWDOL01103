// import { config, server } from ".";

// export const getCategories = async params => {
//   console.log(params);
//   const response = await server.get("/categories", {
//     params: params,
//     headers: config.headers,
//   });
//   console.log(response);
//   return response.data;
// };

// export const createProduct = async data => {
//   const response = await server.post("/addresses", data, config);
//   return response.data;
// };

// export const updateAddress = async (id, data) => {
//   const idEncoded = encodeURIComponent(id);
//   const response = await server.patch(`/addresses/${idEncoded}`, data, config);
//   return response.data;
// };

// export const deleteAddress = async id => {
//   const idEncoded = encodeURIComponent(id);
//   const response = await server.delete(`/addresses/${idEncoded}`);
//   return response.data;
// };
