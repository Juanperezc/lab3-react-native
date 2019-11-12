import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
  Profile,
  ProfileSocials,
  Post,
  BemArticle,
} from '@src/core/model';
import {
  profile1,
  profileSocials1,
} from '@src/core/data/profile';
/* import { posts } from '@src/core/data/post'; */
import { Profile1 } from './profile1.component';
import { NavigationScreenConfig } from 'react-navigation';
import { ChatHeaderNavigationStateParams, ChatHeader } from '@src/components/messaging';
import { conversation5 } from '@src/core/data/conversation';
import { ProfileHeader } from './profile.header';
import { TopNavigationElement } from '@src/core/navigation/options';
import Reactotron from 'reactotron-react-native';
import AwesomeAlert from 'react-native-awesome-alerts';


import {
  UserService,
} from '@src/core/services';
import { BemProfile } from '@src/core/model/bem_profile.model';


interface State {
  profile: BemProfile;
  socials: ProfileSocials;

}
interface ConversationsListNavigationStateParams {
  onBack: () => void;
  onConfigPress: () => void;
}

export class Profile1Container extends React.Component<NavigationScreenProps, State> {

  public state: State = {
    profile: null,
    socials: profileSocials1,
   
  };
  static navigationOptions: NavigationScreenConfig<any> = ({ navigation, screenProps }) => {
    const conversationHeaderConfig: ConversationsListNavigationStateParams = {
      onBack: navigation.getParam('onBack'),
      onConfigPress: navigation.getParam('onConfigPress'),
    };

    const renderHeader = (headerProps: NavigationScreenProps,
                          config: ConversationsListNavigationStateParams) => {

      return (
        <ProfileHeader
          {...headerProps}
          onConfigPress={config.onConfigPress}
          onBack={config.onBack}
        />
      );
    };

    return {
      ...navigation,
      ...screenProps,
      header: (headerProps: NavigationScreenProps): TopNavigationElement => {
        return renderHeader(headerProps, conversationHeaderConfig);
      },
    };
  };

  public componentWillMount(): void {
    this.load()
    this.props.navigation.addListener('willFocus', this.load)
    
  }
  load = () => {
    console.log('on view');
    console.log('mount profile');
    UserService.me().then( (res: any) => {
      //console.log('response', res);
      Reactotron.log({
        name: 'mount profile',
        value: res
      });
      this.setState({
        profile: res.data.user
      })
    }).catch((err) => {
      console.log('error', err);
    });
    this.props.navigation.setParams({
      onConfigPress: this.onConfigPress,
    });
  }
  public componentDidUpdate(): void{
/*     console.log('update profile'); */
  }
  private onConfigPress = (): void => {
    this.props.navigation.navigate({
      routeName: 'Ajuste Perfil',
      params: {
       'profile' :  this.state.profile
      }
    });
  };
  private onFollowersPress = () => {
  };

  private onFollowingPress = () => {
  };

  private onPostsPress = () => {
  };

  private onFollowPress = () => {
  };

  private onPostPress = (article: BemArticle) => {
  };
  private onItemCommentPress = (article: BemArticle) => {
  };

  private onPostLikePress = (article: BemArticle) => {
  };

  public render(): React.ReactNode {
    if (this.state.profile != null){
      return (
        <Profile1
          me={true}
          profile={this.state.profile}
          socials={this.state.socials}
        
          onFollowersPress={this.onFollowersPress}
          onFollowingPress={this.onFollowingPress}
          onPostsPress={this.onPostsPress}
          onFollowPress={this.onFollowPress}
          onPostPress={this.onPostPress}
          onItemCommentPress={this.onItemCommentPress}
          onPostLikePress={this.onPostLikePress}
        />
      );
    }else{
      return (<AwesomeAlert
        show={true}
        showProgress={true}
        />)
    }
   
  }
}
