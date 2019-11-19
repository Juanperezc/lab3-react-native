
import { AxiosStatic } from 'axios';
import AxiosInstance  from './interceptor';
/* const { apiUrl } = getEnvVars(); */
export class CategoryService {

  static index() : Promise<AxiosStatic>{
     return AxiosInstance.get('categorys');
  }

 /*  static like(data) : Promise<AxiosStatic>{
    return AxiosInstance.post('commentary/like',data);
  } */

}
