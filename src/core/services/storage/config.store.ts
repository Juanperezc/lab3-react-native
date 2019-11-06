import { AsyncStorage } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { State } from 'react-native-ui-kitten';
import React from 'react';
//import { ThemeKey } from '@src/core/themes';

export class ConfigStorage extends React.Component<NavigationScreenProps, State>{
  public that:any = this;
  constructor(props){
    super(props);

  }
  public static setToken(token: string) {
    AsyncStorage.setItem('token', token);
  }
  public static removeToken() {
    AsyncStorage.removeItem('token');
  }
  public static async getToken(): Promise<string> {
    return AsyncStorage.getItem('token');
  }

  public static setUser(user: string) {
    AsyncStorage.setItem('user', user);
  }
  public static removeUser() {
    AsyncStorage.removeItem('user');
  }
  public static clearSession(){
    this.removeToken();
    this.removeUser();
   
  }
  public static getUser(): Promise<string> {
    return AsyncStorage.getItem('user') as Promise<string>;
  }
}

/* export const ConfigStorage: ConfigStoreType = new ConfigStoreType(); */
