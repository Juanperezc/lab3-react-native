import axios from 'axios'
import {path} from 'ramda'
import getEnvVars from '../../../environment';

const { apiUrl } = getEnvVars();
import { ConfigStorage } from './storage/config.store' // ... Just a service to refresh auth tokens

const AxiosInstance = axios.create({
    baseURL: 'http://' + apiUrl,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

AxiosInstance.interceptors.response.use((response) =>{
    return response;
}, (error) => {
    const originalRequest = error.config;
    if (!error.response) {
       return Promise.reject('Network Error')
    }
    else if ((error.response.status === 401) && !originalRequest._retry) {
        originalRequest._retry = true;
        return ConfigStorage.getToken()
            .then(token => {
                const authTokenResponse = path(['data', 'response'], token)
                AxiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authTokenResponse;
                originalRequest.headers['Authorization'] = 'Bearer ' + authTokenResponse;
                return axios(originalRequest);
            })
            .catch(err => err)
    } else {
        return error.response
    }

})

export default AxiosInstance