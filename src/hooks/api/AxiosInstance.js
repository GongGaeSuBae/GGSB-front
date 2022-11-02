import axios from 'axios';

const BASE_URL = '/'

const axiosAPI = (url, options) => {
    const instance = axios.create({ baseURL: url, ...options })
    return instance
}

export const axiosInstance = axiosAPI(BASE_URL);