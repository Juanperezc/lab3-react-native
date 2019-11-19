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
  PlusIconFill,
} from '@src/assets/icons';

interface ComponentProps {
  onBack: () => void;
  onAddPress: () => void;
}

export type ArticleList1Props = ThemedComponentProps & ComponentProps & NavigationScreenProps;

class ArticleList1HeaderComponent extends React.Component<ArticleList1Props> {

  private onAddPress = (): void => {
    this.props.onAddPress();
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
        icon={PlusIconFill}
        onPress={this.onAddPress}
      />,
    ]);
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <SafeAreaView style={themedStyle.container}>
        <TopNavigation
          alignment='center'
          title='Inicio'

         /*  leftControl={this.renderLeftControl()} */
          rightControls={this.renderRightControls()}
        />
      </SafeAreaView>
    );
  }
}

export const ArticleList1Header = withStyles(ArticleList1HeaderComponent, (theme: ThemeType) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));

