import React from 'react';
import {
  View,
  ListRenderItemInfo,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  List,
  Input,
  InputProps,
} from '@kitten/ui';
import {
  User,
  UserProps,
} from '@src/components/user';
import { Conversation as ConversationModel } from '@src/core/model';
import { SearchIconOutline } from '@src/assets/icons';
import { textStyle } from '@src/components/common';
import { BemProfile } from '@src/core/model/bem_profile.model';

interface ComponentProps {
  searchEnabled: boolean;
  users: BemProfile[];
  onSearchStringChange: (text: string) => void;
  onUser: (index: number) => void;
}

export type UserListProps = ThemedComponentProps & ComponentProps;

class UserListComponent extends React.Component<UserListProps> {

  private onUser = (index: number): void => {
    this.props.onUser(index);
  };

  private onSearchStringChange = (text: string): void => {
    this.props.onSearchStringChange(text);
  };

  private renderItem = (info: ListRenderItemInfo<BemProfile>): React.ReactElement<UserProps> => {
    const { themedStyle } = this.props;

    return (
      <User
        style={themedStyle.item}
        user={info.item}
        index={info.index}
        onUser={this.onUser}
      />
    );
  };

  private  renderSearchInput = (): React.ReactElement<InputProps> | null => {
    const { themedStyle, searchEnabled } = this.props;

    return searchEnabled ? (
      <Input
        style={themedStyle.input}
        textStyle={textStyle.paragraph}
        icon={SearchIconOutline}
        placeholder='Buscar usuario con...'
        onChangeText={this.onSearchStringChange}
      />
    ) : null;
  };

  public render(): React.ReactNode {
    const { themedStyle, users } = this.props;
    return (
      <View style={themedStyle.container}>
        {this.renderSearchInput()}
        <List
          style={themedStyle.container}
          data={users}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export const UserList = withStyles(UserListComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  item: {
    backgroundColor: theme['background-basic-color-1'],
    marginVertical: 0.5,
  },
  input: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
}));

