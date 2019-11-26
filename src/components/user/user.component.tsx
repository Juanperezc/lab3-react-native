import React from 'react';
import {
  ImageProps,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
/* import {
  BemProfile as UserModel,
  Message,
} from '@src/core/model'; */
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { Text } from '@kitten/ui';
import { textStyle } from '@src/components/common';

import { UserInterlocutor } from './userInterlocutor.component';
import { BemProfile } from '@src/core/model/bem_profile.model';

interface ComponentProps {
  index?: number;
  user: BemProfile;
  onUser: (index: number) => void;
}

export type UserProps = & ThemedComponentProps & TouchableOpacityProps & ComponentProps;

class UserComponent extends React.Component<UserProps> {

  private onUser = (): void => {
    this.props.onUser(this.props.index);
  };

 /*  private getLastMessageText = (): string => {
    const { user } = this.props;
    const lastMessage: string = user.messages[user.messages.length - 1].text;

    return lastMessage.length <= 37 ? lastMessage : `${lastMessage.substring(0, 32)}...`;
  }; */

/*   private getLastMessageDate = (): string => {
    const { user } = this.props;

    return user.messages[user.messages.length - 1].date;
  }; */

/*   private renderLastMessageIcon = (): React.ReactElement<ImageProps> | null => {
    const { user } = this.props;
    const lastMessage: Message = user.messages[user.messages.length - 1];

    return (
      <MessageIcon message={lastMessage}/>
    );
  }; */

  public render(): React.ReactNode {
    const { themedStyle, style, user } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        style={[themedStyle.container, style]}
        onPress={this.onUser}>
        <View style={themedStyle.leftSection}>
          <UserInterlocutor
            style={themedStyle.avatar}
            profile={user}/>
          <View style={themedStyle.messageContainer}>
            <Text
              style={themedStyle.userLabel}
              category='s2'>
              {`${user.full_name} `}
            </Text>
            <Text
              style={themedStyle.lastMessageLabel}
              appearance='hint'
              category='c1'
              adjustsFontSizeToFit={true}>
            {/*   {this.getLastMessageText()} */}
            </Text>
          </View>
        </View>
        <View style={themedStyle.rightSection}>
        {/*   {this.renderLastMessageIcon()} */}
          <Text
            style={themedStyle.dateLabel}
            appearance='hint'
            category='p2'>
           {/*  {this.getLastMessageDate()} */}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export const User = withStyles(UserComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  messageContainer: {
    // flex: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  userLabel: textStyle.subtitle,
  lastMessageLabel: textStyle.caption1,
  dateLabel: textStyle.paragraph,
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));
