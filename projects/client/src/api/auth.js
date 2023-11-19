import { server } from "./index";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const register = async (data) => {
  console.log(data)
  const response = await server.post("/register", data);
  return response.data;
};
