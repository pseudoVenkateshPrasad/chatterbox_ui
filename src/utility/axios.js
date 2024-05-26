import axios from "axios";
import { GenerateNewAccessTokenUsingRefreshToken } from "./RefreshToken";


const CustomAxios = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 10000,
    headers: {
        "Content-type": "application/json",
        "Accept": 'application/json'
    }
});

CustomAxios.interceptors.request.use(function (config) {
    config.withCredentials = true;
    console.log("config at request", config);
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
CustomAxios.interceptors.response.use(function (response) {
    console.log('interceptor recieving the response', response);
    return response;
}, async function (error) {
    console.log("error at axios response", error);
    const originalRequest = error.config;

    if (error.response.status === 401) {
        const response = await GenerateNewAccessTokenUsingRefreshToken();
        return CustomAxios(originalRequest);
    }

    return Promise.reject(error);
});


export default CustomAxios;