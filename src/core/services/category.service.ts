
import { AxiosStatic } from 'axios';
import AxiosInstance  from './interceptor';
/* const { apiUrl } = getEnvVars(); */
export class CategoryService {

  static store(data) : Promise<AxiosStatic>{
     return AxiosInstance.post('commentaries', data);
  }

  static like(data) : Promise<AxiosStatic>{
    return AxiosInstance.post('commentary/like',data);
  }

}
