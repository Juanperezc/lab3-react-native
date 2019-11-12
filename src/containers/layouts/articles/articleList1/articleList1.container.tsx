import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Article, BemArticle } from '@src/core/model';
/* import { articles } from '@src/core/data/article'; */
import { ArticleList1 } from './articleList1.component';

interface State {
  articles: BemArticle[];
}

export class ArticleList1Container extends React.Component<NavigationScreenProps, State> {
  private navigationKey: string = 'ArticleList1Container';
  public state: State = {
    articles: null/* articles */,
  };

  private onItemPress = (article: BemArticle) => {
    console.log('test');
    this.props.navigation.navigate({
      routeName: 'Detalle publicación',
      key: this.navigationKey,
    });
  };

  private onItemLikePress = (article: BemArticle) => {

  };

  private onItemCommentPress = (article: BemArticle) => {

  };

  public render(): React.ReactNode {
    return (
      <ArticleList1
        articles={null}
        onItemPress={this.onItemPress}
        onItemLikePress={this.onItemLikePress}
        onItemCommentPress={this.onItemCommentPress}
      />
    );
  }
}
