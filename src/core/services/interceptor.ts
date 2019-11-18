import axios from 'axios'
import {path} from 'ramda'
import getEnvVars from '../../../environment';
import { AsyncStorage } from 'react-native';

import NavigationService from './navigation.service';
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
//
AxiosInstance.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
        const token = await ConfigStorage.getToken();
      config.headers["Authorization"] = "Bearer " + token;
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

AxiosInstance.interceptors.response.use(  async (response) => {
   // config.headers.authorization = await AsyncStorage.getItem('token');
    return response;
  }, (error) => {
    const originalRequest = error.config;
    if (!error.response) {
       return Promise.reject('Network Error')
    }
    else if ((error.response.status === 401) ){
        ConfigStorage.clearSession();
        NavigationService.navigate('Login',{});
        return Promise.reject('Invalid Token')
    }
     else {
        console.log('test')
        return error.response
     }


})

export default AxiosInstance