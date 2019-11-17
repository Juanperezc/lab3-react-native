
import axios, { AxiosStatic } from 'axios';
import getEnvVars from '../../../environment';
 import AxiosInstance  from './interceptor'; 
 import { Platform } from 'react-native';
 import FormData from 'form-data';
import { ConfigStorage } from './storage';
/* const { apiUrl } = getEnvVars(); */

const createFormData = (photo) => {
  const data = new FormData();
  data.append('file', {
       type: 'image/jpeg', // <-- this
      name:'IMG_' + Math.random().toString(10).slice(2),
      uri: Platform.OS === 'android' ? photo : photo.replace('file://', ''),
  });

 /*  Object.keys(body).forEach(key => {
      data.append(key, body[key]);
  });
 */
  return data;
};
export class PublicationService {


   static show(id) : Promise<AxiosStatic>{
/*      console.log('http://' + apiUrl + '/auth/login'); */
     return AxiosInstance.get('publications/' + id);
  }

  static me() : Promise<AxiosStatic>{
    /* console.log('http://' + apiUrl + '/api/me');// */
    return AxiosInstance.get('user/me');
  }

  static upload_photo(photo) : Promise<AxiosStatic>{
    const formData = createFormData(photo);
    console.log('formData', formData);
    return AxiosInstance.post('user/upload_photo', formData);
  }

  static async update(data) : Promise<AxiosStatic>{
    const user = JSON.parse(await ConfigStorage.getUser());
    console.log('usuario', user);
    return AxiosInstance.put('users/' + user._id, data);

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
