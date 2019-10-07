import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  TopNavigationActionProps,
  TopNavigationAction,
  TopNavigation,
} from '@kitten/ui';
import { SafeAreaView } from '@src/core/navigation';
import {
  ArrowIosBackFill,
  SettingsIconFill,
} from '@src/assets/icons';

interface ComponentProps {
  onBack: () => void;
  onConfigPress: () => void;
}

export type ProfileHeaderProps = ThemedComponentProps & ComponentProps & NavigationScreenProps;

class ProfileHeaderComponent extends React.Component<ProfileHeaderProps> {

  private onConfigPress = (): void => {
    this.props.onConfigPress();
  };

  private onBack = (): void => {
    this.props.onBack();
  };

  private renderLeftControl = (): React.ReactElement<TopNavigationActionProps> => {
    return (
      <TopNavigationAction
        icon={ArrowIosBackFill}
        onPress={this.onBack}
      />
    );
  };

  private renderRightControls = (): React.ReactElement<TopNavigationActionProps>[] => {
    return ([
      <TopNavigationAction
        icon={SettingsIconFill}
        onPress={this.onConfigPress}
      />,
    ]);
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <SafeAreaView style={themedStyle.container}>
        <TopNavigation
          alignment='center'
          title='Mensajes'
         /*  leftControl={this.renderLeftControl()} */
          rightControls={this.renderRightControls()}
        />
      </SafeAreaView>
    );
  }
}

export const ProfileHeader = withStyles(ProfileHeaderComponent, (theme: ThemeType) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));

