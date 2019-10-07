import { AsyncStorage } from 'react-native';
//import { ThemeKey } from '@src/core/themes';

class ConfigStoreType {

  public setToken(token: string) {
    AsyncStorage.setItem('token', token);
  }
  public removeToken() {
    AsyncStorage.removeItem('token');
  }
  public getToken(): Promise<string> {
    return AsyncStorage.getItem('token') as Promise<string>;
  }
}

export const ConfigStorage: ConfigStoreType = new ConfigStoreType();
