import { server } from "./index";

export const register = async (data) => {
  const response = await server.post("/register", data);
  return response.data;
};

export const getUser = async (id) => {
  const idEncoded = encodeURIComponent(id)
  const response = await server.get(`/users/${idEncoded}`)
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

export const checkResetToken = async (token) =>{
  const response = await server.get(`/reset/${token}`)
  return response
}

export const postResetPassword = async (data) => {
  const response = await server.post("/reset", data);
  return response
}

export const patchNewPassword = async (token, data) =>{
  const response = await server.patch(`/reset/${token}`, data)
  return response
}
