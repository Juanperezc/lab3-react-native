import { AsyncStorage } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { State } from 'react-native-ui-kitten';
import React from 'react';
import { BemProfile } from '@src/core/model/bem_profile.model';
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

  public static setUser(user: any) {
    console.log('user', user);
   
    AsyncStorage.setItem('user',  JSON.stringify(user));
  }
  public static removeUser() {
    AsyncStorage.removeItem('user');
  }
  public static clearSession(){
    this.removeToken();
    this.removeUser();
   
  }
  public static async getUser(): Promise<any> {
    return AsyncStorage.getItem('user') as Promise<any>;
  }
  public static async getUserAwait(): Promise<any>{
    return  AsyncStorage.getItem('user');
  }
}

/* export const ConfigStorage: ConfigStoreType = new ConfigStoreType(); */
