import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
  Profile,
  ProfileSocials,
  Post,
} from '@src/core/model';
import {
  profile1,
  profileSocials1,
} from '@src/core/data/profile';
import { posts } from '@src/core/data/post';
import { Profile1 } from './profile1.component';
import { NavigationScreenConfig } from 'react-navigation';
import { ChatHeaderNavigationStateParams, ChatHeader } from '@src/components/messaging';
import { conversation5 } from '@src/core/data/conversation';
import { ProfileHeader } from './profile.header';
import { TopNavigationElement } from '@src/core/navigation/options';

interface State {
  profile: Profile;
  socials: ProfileSocials;
  posts: Post[];
}
interface ConversationsListNavigationStateParams {
  onBack: () => void;
  onConfigPress: () => void;
}

export class Profile1Container extends React.Component<NavigationScreenProps, State> {

  public state: State = {
    profile: profile1,
    socials: profileSocials1,
    posts: posts,
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
    this.props.navigation.setParams({
      onConfigPress: this.onConfigPress,

    });
  }
  private onConfigPress = (): void => {
    this.props.navigation.navigate({
      routeName: 'Ajuste Perfil'
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

  private onPostPress = (index: number) => {
  };

  private onPostLikePress = (index: number) => {
  };

  public render(): React.ReactNode {
    return (
      <Profile1
        profile={this.state.profile}
        socials={this.state.socials}
        posts={this.state.posts}
        onFollowersPress={this.onFollowersPress}
        onFollowingPress={this.onFollowingPress}
        onPostsPress={this.onPostsPress}
        onFollowPress={this.onFollowPress}
        onPostPress={this.onPostPress}
        onPostLikePress={this.onPostLikePress}
      />
    );
  }
}
