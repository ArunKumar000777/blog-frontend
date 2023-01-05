import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:'https://blog-app-api-b3n3.onrender.com'
})