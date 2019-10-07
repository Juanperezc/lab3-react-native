import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Profile } from '@src/core/model';
import { profile1 } from '@src/core/data/profile';
import { ProfileSettings1 } from './profileSettings1.component';
// storage
import {
  ConfigStorage,
} from '@src/core/services/storage';
import Reactotron from 'reactotron-react-native';
interface State {
  profile: Profile;
}

export class ProfileSettings1Container extends React.Component<NavigationScreenProps, State> {

  public state: State = {
    profile: profile1,
  };

  private onUploadPhotoButtonPress = () => {
  };

  private onButtonPress = () => {
    this.props.navigation.goBack();
  };
  private onLogoutPress = () => {
    ConfigStorage.removeToken();
    ConfigStorage.getToken().then((res)  =>{
      Reactotron.log({
        name: 'Response logout outside',
        value: res
    });
    this.props.navigation.navigate({
      routeName: 'Sign In 1',
    });
    /*  */
  });
}
  public render(): React.ReactNode {
    return (
      <ProfileSettings1
        profile={this.state.profile}
        onUploadPhotoButtonPress={this.onUploadPhotoButtonPress}
        onButtonPress={this.onButtonPress}
        onLogoutPress={this.onLogoutPress}
      />
    );
  }
}
