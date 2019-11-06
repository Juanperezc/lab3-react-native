import React from 'react';
import { View, Text } from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { Button } from '@kitten/ui';
import {
  ProfileInfo1,
  ProfileSocials,
  ProfileActivityList1,
} from '@src/components/social';
import {
  Profile as ProfileModel,
  ProfileSocials as ProfileSocialsModel,
  Post as PostModel,
} from '@src/core/model';
import {
  ContainerView,
  textStyle,
} from '@src/components/common';
import { BemProfile } from '@src/core/model/bem_profile.model';

interface ComponentProps {
  me: boolean;
  profile: BemProfile;
  socials: ProfileSocialsModel;
  posts: PostModel[];
  onFollowPress: () => void;
  onFollowersPress: () => void;
  onFollowingPress: () => void;
  onPostsPress: () => void;
  onPostPress: (index: number) => void;
  onPostLikePress: (index: number) => void;
}

export type Profile1Props = ThemedComponentProps & ComponentProps;

class Profile1Component extends React.Component<Profile1Props> {

  private onFollowersButtonPress = () => {
    this.props.onFollowersPress();
  };

  private onFollowingButtonPress = () => {
    this.props.onFollowingPress();
  };

  private onPostsButtonPress = () => {
    this.props.onPostsPress();
  };

  private onFollowButtonPress = () => {
    this.props.onFollowPress();
  };

  private onItemPress = (index: number) => {
    this.props.onPostPress(index);
  };

  private onItemLikePress = (index: number) => {
    this.props.onPostLikePress(index);
  };

  public render(): React.ReactNode {
    const { themedStyle, profile, socials, posts, me } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
 
        <ProfileInfo1
          style={themedStyle.profileInfo}
          photo={profile.photo}
          name={profile.full_name}
          location={profile.city}>
          <View style={themedStyle.parametersContainer}>
            <ProfileSocials
              followers={profile.followers.length}
              following={profile.following.length}
              posts={socials.posts}
              onFollowersPress={this.onFollowersButtonPress}
              onFollowingPress={this.onFollowingButtonPress}
              onPostsPress={this.onPostsButtonPress}
            />
            {
              !me && <Button
              style={themedStyle.followButton}
              textStyle={textStyle.button}
              onPress={this.onFollowButtonPress}
              >
              SEGUIR
            </Button>
            }
            {
              !me && <Button
              style={themedStyle.followButton}
              textStyle={textStyle.button}
              onPress={this.onFollowButtonPress}>
              ENVIAR MENSAJE
            </Button> 
            }
            
          </View>
        </ProfileInfo1>
        <ProfileActivityList1
          style={themedStyle.feed}
          data={posts}
          onItemPress={this.onItemPress}
          onItemLikePress={this.onItemLikePress}
        />
      </ContainerView>
    );
  }
}

export const Profile1 = withStyles(Profile1Component, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  parametersContainer: {
    marginTop: 24,
  },
  profileInfo: {
    paddingHorizontal: 24,
    backgroundColor: theme['background-basic-color-1'],
  },
  followButton: {
    height: 40,
    marginVertical: 16,
  },
  feed: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
}));

