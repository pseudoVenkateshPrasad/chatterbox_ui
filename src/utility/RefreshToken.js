import CustomAxios from "./axios"

const baseURL = "http://localhost:8080";
export const GenerateNewAccessTokenUsingRefreshToken = async() => {
    try {
        let response = await CustomAxios.get(`${baseURL}/refresh`);
        console.log(response);
        if(response.status === 401) {
            return response;
        }
        return response;
    }catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}