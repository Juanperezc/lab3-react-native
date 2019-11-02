//import { ThemeKey } from '@src/core/themes';
import axios, { AxiosStatic } from 'axios';
//import { REACT_APP_API } from 'react-native-dotenv'
import getEnvVars from '../../../environment';
import AxiosInstance  from './interceptor';

const { apiUrl } = getEnvVars();
export class UserService {


   static login(values) : Promise<AxiosStatic>{
     console.log('http://' + apiUrl + '/auth/login');
     return AxiosInstance.post('http://' + apiUrl + '/auth/login', values);
   /*  return axios.post('http://' + apiUrl + '/auth/login', values, {
      headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
    }); */
    
  }

  static me() : Promise<AxiosStatic>{
    console.log('http://' + apiUrl + '/auth/login');
   return axios.get('http://' + apiUrl + '/user/me',  {
     headers:{
         'Content-Type': 'application/json',
         'Accept': 'application/json'}
   });
   
 }
 /*  public static select = <T>(config: { [key in ThemeKey | 'default']?: T },
                             currentTheme: ThemeKey): T | null => {

    if (config[currentTheme]) {
      return config[currentTheme];
    } else if (config.default) {
      return config.default;
    } else {
      return null;
    }
  }; */

}
