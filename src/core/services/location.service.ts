
import { AxiosStatic } from 'axios';
import AxiosInstance  from './interceptor';
/* const { apiUrl } = getEnvVars(); */
export class LocationService {

  static index() : Promise<AxiosStatic>{
     return AxiosInstance.get('locations');
  }

  static show(id) : Promise<AxiosStatic>{
    return AxiosInstance.get('locations/'+id);
  }

}
