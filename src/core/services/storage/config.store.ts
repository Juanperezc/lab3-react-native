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

  public setUser(user: string) {
    AsyncStorage.setItem('user', user);
  }
  public removeUser() {
    AsyncStorage.removeItem('user');
  }
  public getUser(): Promise<string> {
    return AsyncStorage.getItem('user') as Promise<string>;
  }
}

export const ConfigStorage: ConfigStoreType = new ConfigStoreType();
