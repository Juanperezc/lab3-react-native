import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SignUpForm1Data } from '@src/components/auth';
import { SignUp1 } from './signUp1.component';

export class SignUp1Container extends React.Component<NavigationScreenProps> {

  private navigationKey: string = 'SignUp1Container';

  private onSignUpPress = (data: SignUpForm1Data) => {
    this.props.navigation.goBack();
  };

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
      />
    );
  }
}
