import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SignUpForm1Data } from '@src/components/auth';
import { SignUp1 } from './signUp1.component';
import { LocationService } from '@src/core/services';
import { string } from 'prop-types';
import { BemSelectModel } from '@src/core/model/bem_select.model';


interface State {
  countries: Array<BemSelectModel>| undefined;
}
export class SignUp1Container extends React.Component<NavigationScreenProps> {
  
  private navigationKey: string = 'SignUp1Container';

  public state: State ={
    countries: undefined
  };

  private onSignUpPress = (data: SignUpForm1Data) => {
    this.props.navigation.goBack();
  };
  public componentWillMount(): void {
    this.load()
    this.props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    LocationService.index().then((resp : any) =>{
      let test = resp.data.countries;
      //console.log(test)
      let countries = this.state.countries.slice()
      for (let country of test){
        countries.push({_id:country.id,text:country.name})
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

  public render(): React.ReactNode {
    return (
      <SignUp1
        onSignUpPress={this.onSignUpPress}
        onSignInPress={this.onSignInPress}
        data={this.state.countries}
      />
    );
  }
}
