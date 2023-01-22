import axios from "axios";

// const BASE_URL = "https://blog-app-api-b3n3.onrender.com/api";

// export const publicRequest = axios.create({
//     baseURL: BASE_URL,
// });
const BASE_URL = "http://localhost:5000/api/";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
