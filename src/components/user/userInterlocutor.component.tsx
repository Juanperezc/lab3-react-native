import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { Avatar } from '@kitten/ui';

import { BemProfile } from '@src/core/model/bem_profile.model';

interface ComponentProps {
  profile: BemProfile;
}

export type UserInterlocutorProps = & ThemedComponentProps & ViewProps & ComponentProps;

class UserInterlocutorComponent extends React.Component<UserInterlocutorProps> {

  private renderOnlineIndicator = (): React.ReactElement<ViewProps> | null => {
    const { themedStyle, profile } = this.props;

   /*  if (profile.onLine !== null) {
      return profile.onLine ? (
        <View style={themedStyle.onlineIndicator}/>
      ) : null;
    } */
    return null;
  };

  public render(): React.ReactNode {
    const { themedStyle, profile, style } = this.props;

    return (
      <View style={[themedStyle.container, style]}>
        <Avatar
          source={{ uri : profile.photo}}
          style={themedStyle.avatar}/>
        {this.renderOnlineIndicator()}
      </View>
    );
  }
}

export const UserInterlocutor = withStyles(UserInterlocutorComponent, (theme: ThemeType) => ({
  container: {
    justifyContent: 'flex-end',
  },
  avatar: {
    alignSelf: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme['color-success-default'],
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 2,
    right: 2,
  },
}));
