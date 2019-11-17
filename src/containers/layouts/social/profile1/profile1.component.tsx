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
import { BemArticle }from '@src/core/model';
interface ComponentProps {
  me: boolean;
  profile: BemProfile;
  socials: ProfileSocialsModel;

  onFollowPress: () => void;
  onFollowersPress: () => void;
  onFollowingPress: () => void;
  onPostsPress: () => void;
  onPostPress: (article: BemArticle) => void;
  onPostLikePress: (article: BemArticle) => void;
  onItemCommentPress: (article: BemArticle) => void;
  onItemSharePress: (article: BemArticle) => void;
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
  private onItemCommentPress = (article: BemArticle) => {
    this.props.onItemCommentPress(article);
  };

  private onItemPress = (article: BemArticle) => {
    this.props.onPostPress(article);
  };
  private onItemSharePress = (article: BemArticle) => {
    this.props.onItemSharePress(article);
  };
  private onItemLikePress = (article: BemArticle) => {
    this.props.onPostLikePress(article);
  };

  public render(): React.ReactNode {
    const { themedStyle, profile, me } = this.props;

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
              posts={profile.publications.length}
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
          data={profile.publications}
          onItemPress={this.onItemPress}
          onItemLikePress={this.onItemLikePress}
          onItemCommentPress={this.onItemCommentPress}
          onItemSharePress={this.onItemSharePress}
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

