import axios from "axios";

const BASE_URL = "https://blog-app-api-b3n3.onrender.com";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});