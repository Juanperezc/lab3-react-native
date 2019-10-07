import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SignInForm1Data } from '@src/components/auth';
import { SignIn1 } from './signIn1.component';

export class SignIn1Container extends React.Component<NavigationScreenProps> {

  private navigationKey: string = 'SignIn1Container';

  private onSignInPress = (data: SignInForm1Data) => {
      this.props.navigation.navigate({
        routeName: 'Home',
        key: this.navigationKey,
      });
  };

  private isLogin = () => {
    this.props.navigation.navigate({
      routeName: 'Home',
      key: this.navigationKey,
    });
  };

  private onSignUpPress = () => {
    this.props.navigation.navigate({
      routeName: 'Sign Up 1',
      key: this.navigationKey,
    });
  };
  private onForgotPasswordPress = () => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Forgot Password',
    });
  };
  public render(): React.ReactNode {
    return (
      
      <SignIn1
        isLogin={this.isLogin}
        onSignInPress={this.onSignInPress}
        onSignUpPress={this.onSignUpPress}
        onForgotPasswordPress={this.onForgotPasswordPress}
      />
    );
  }
}
