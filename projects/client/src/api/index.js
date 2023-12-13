import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:8000",
});

export const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
