import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:8000",
});
if(localStorage.getItem("token")){
  server.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
}


// export const config = {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// };
