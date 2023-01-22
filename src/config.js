import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:'https://blog-app-api-b3n3.onrender.com/api'
})

export const LS = 'https://blog-app-api-b3n3.onrender.com/images/'
// baseURL:'http://localhost:5000/api/'

// import axios from 'axios'

// export const axiosInstance = axios.create({
//     baseURL:'http://localhost:5000/api/'
// })

// export const LS = 'http://localhost:5000/images/'