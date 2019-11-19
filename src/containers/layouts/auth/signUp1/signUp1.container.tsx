import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SignUpForm1Data } from '@src/components/auth';
import { SignUp1 } from './signUp1.component';
import { LocationService, UserService } from '@src/core/services';
import { string } from 'prop-types';
import { BemSelectModel } from '@src/core/model/bem_select.model';
import { ConfigStorage } from '@src/core/services/storage';


interface State {
  countries: Array<BemSelectModel>| undefined;
  cities: Array<BemSelectModel>| undefined;
}
export class SignUp1Container extends React.Component<NavigationScreenProps> {
  
  private navigationKey: string = 'SignUp1Container';

  public state: State ={
    countries: new Array<BemSelectModel>(),
    cities: new Array<BemSelectModel>()
  };

  private onSignUpPress = (data: SignUpForm1Data) => {
    console.log('formulario', data);
    UserService.register({
      email: data.email,
      password : data.password,
      full_name: data.firstName,
      alias: data.username,
      birth_date: data.date,
      city: data.city,
      country: data.country
    }).then((res:any) =>{
      ConfigStorage.setToken(res.data.access_token.token);
      ConfigStorage.setUser(res.data.user);
      this.props.navigation.navigate({
        routeName: 'Home',
        key: this.navigationKey,
      });
    },(err) => console.log('error',err));

  };
  public componentWillMount(): void {
    this.props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    LocationService.index().then((resp : any) =>{
      let test = resp.data.countries;
      //console.log(test)
      let countries = this.state.countries.slice()
      for (let country of test){
        countries.push({_id:country._id, text:country.name})
      }
      this.setState({
        countries: countries
      })
    },(error)=>{
      console.error(error)
    })
  }
  private onSignInPress = () => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Sign In 1',
    });
  };
  private OnSelectedCountry = (data: any) => {
    //!consumir servicio
    console.log('data container', data)
    LocationService.show(data._id).then((res : any) =>{
      let cities = res.data.cities;
      const cities_select = new Array<BemSelectModel>();
      for (let city of cities){
        cities_select.push({_id:undefined, text:city.name})
      }
      this.setState({
        cities : cities_select
      })
    },(err) => console.error(err)) 
  };
  public render(): React.ReactNode {
    return (
      <SignUp1
        onSignUpPress={this.onSignUpPress}
        onSignInPress={this.onSignInPress}
        data={this.state.countries}
        city_data={this.state.cities}
        OnSelectedCountry={this.OnSelectedCountry}
      />
    );
  }
}
