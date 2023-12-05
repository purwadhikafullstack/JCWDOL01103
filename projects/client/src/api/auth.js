import { server } from "./index";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const register = async (data) => {
  const response = await server.post("/register", data);
  return response.data;
};

export const getUser = async (id) => {
  const response = await server.get(`/users/${id}`, config)
  return response.data;
}

export const verificationValidator = async (token) => {
  const response = await server.get(`/verification/${token}`)
  return response
}

export const verification = async (data) => {
  const response = await server.patch("/verification", data);
  return response.data;
}

export const postLogin = async (data) => {
  const response = await server.post("/login", data);
  return response
}

export const googleLogin = async (token) => {
  const response = await server.post(`/login/google/${token}`)
  return response
}

export const verifyGoogleLogin = async (token) => {
  const response = await server.get(`/verification/google/${token}`)
  return response.data
}


