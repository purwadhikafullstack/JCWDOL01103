import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:5001",
});

// export const config = {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// };
