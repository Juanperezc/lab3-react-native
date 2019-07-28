import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SignInForm1Data } from '@src/components/auth';
import { SignIn1 } from './signIn1.component';

export class SignIn1Container extends React.Component<NavigationScreenProps> {

  private navigationKey: string = 'SignIn1Container';

  private onSignInPress = (data: SignInForm1Data) => {
 //   this.props.navigation.goBack();
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

  public render(): React.ReactNode {
    return (
      <SignIn1
        onSignInPress={this.onSignInPress}
        onSignUpPress={this.onSignUpPress}
      />
    );
  }
}
