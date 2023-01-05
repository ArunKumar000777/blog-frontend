import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:'https://blog-app-arun.onrender.com/api'
})