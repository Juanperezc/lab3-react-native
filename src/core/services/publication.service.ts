
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

  return data;
};
export class PublicationService {

  static index() : Promise<AxiosStatic>{
    return AxiosInstance.get('publications');
  }
  static show(id) : Promise<AxiosStatic>{
     return AxiosInstance.get('publications/' + id);
  }

  static like(data) : Promise<AxiosStatic>{
    return AxiosInstance.post('publication/like',data);
  }

  static store(data) : Promise<AxiosStatic>{
    return AxiosInstance.post('publications',data);
  }

  static share(data) : Promise<AxiosStatic>{
    return AxiosInstance.post('publication/share',data);
  }
 
  static me() : Promise<AxiosStatic>{
    /* console.log('http://' + apiUrl + '/api/me');// */
    return AxiosInstance.get('user/me');
  }

  static upload_photo(photo) : Promise<AxiosStatic>{
    const formData = createFormData(photo);
    console.log('formData', formData);
    return AxiosInstance.post('publication/upload_photo', formData);
  }

  static async update(data) : Promise<AxiosStatic>{
    const user = JSON.parse(await ConfigStorage.getUser());
    console.log('usuario', user);
    return AxiosInstance.put('users/' + user._id, data);

  }
 

}
