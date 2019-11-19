import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Article, BemArticle } from '@src/core/model';
/* import { articles } from '@src/core/data/article'; */
import { ArticleList1 } from './articleList1.component';
import { TopNavigationElement } from '@src/core/navigation/options';
import { AR } from 'expo';
import { ArticleList1Header } from './articleList1.header';
import { NavigationScreenConfig } from 'react-navigation';

interface State {
  articles: BemArticle[];
}
interface ArticleListHeaderNavigationStateParams {
  onBack: () => void;
  onAddPress: () => void;
}
export class ArticleList1Container extends React.Component<NavigationScreenProps, State> {
  private navigationKey: string = 'ArticleList1Container';
  public state: State = {
    articles: null/* articles */,
  };
  static navigationOptions: NavigationScreenConfig<any> = ({ navigation, screenProps }) => {
    const conversationHeaderConfig: ArticleListHeaderNavigationStateParams = {
      onBack: navigation.getParam('onBack'),
      onAddPress: navigation.getParam('onAddPress'),
    };

    const renderHeader = (headerProps: NavigationScreenProps,
                          config: ArticleListHeaderNavigationStateParams) => {

      return (
        <ArticleList1Header
          {...headerProps}
          onAddPress={config.onAddPress}
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
  private onItemPress = (article: BemArticle) => {
    console.log('test');
    this.props.navigation.navigate({
      routeName: 'Detalle publicación',
      key: this.navigationKey,
    });
  };
  public componentWillMount(): void {
    this.load()
    this.props.navigation.addListener('willFocus', this.load)
  }
  load = () => {
    this.props.navigation.setParams({
      onAddPress: this.onAddPress,
    });
  }
  private onItemLikePress = (article: BemArticle) => {

  };

  private onItemCommentPress = (article: BemArticle) => {

  };
  private onItemSharePress = (article: BemArticle) => {

  };
  private onAddPress = (): void => {
    console.log('on add press')
  }
  public render(): React.ReactNode {
    return (
      <ArticleList1
        articles={null}
        onItemPress={this.onItemPress}
        onItemLikePress={this.onItemLikePress}
        onItemCommentPress={this.onItemCommentPress}
        onItemSharePress={this.onItemSharePress}
      />
    );
  }
}
