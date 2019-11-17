import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { List } from '@kitten/ui';
import { Article, BemArticle } from '@src/core/model';
import {
  ArticleList1Item,
  ArticleList1ItemProps,
} from './articleList1Item.component';

interface ComponentProps {
  articles: BemArticle[];
  onItemPress: (article: BemArticle) => void;
  onItemLikePress: (article: BemArticle) => void;
  onItemCommentPress: (article: BemArticle) => void;
  onItemSharePress: (article: BemArticle) => void;
}

export type ArticleList1Props = ThemedComponentProps & ComponentProps;

class ArticleList1Component extends React.Component<ArticleList1Props> {

  private onItemPress = (article: BemArticle) => {
    this.props.onItemPress(article);
  };

  private onItemLikePress = (article: BemArticle) => {
    this.props.onItemLikePress(article);
  };

  private onItemCommentPress = (article: BemArticle) => {
    this.props.onItemCommentPress(article);
  };
  private onItemSharePress = (article: BemArticle) => {
    this.props.onItemSharePress(article);
  };
  private renderItem = (info: ListRenderItemInfo<BemArticle>): React.ReactElement<ArticleList1ItemProps> => {
    const { themedStyle } = this.props;

    return (
      <ArticleList1Item
        style={themedStyle.item}
        article={info.item}
        onPress={this.onItemPress}
        onSharePress={this.onItemSharePress}
        onLikePress={this.onItemLikePress}
        onCommentPress={this.onItemCommentPress}
      />
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, articles } = this.props;

    return (
      <List
        contentContainerStyle={themedStyle.container}
        data={articles}
        renderItem={this.renderItem}
      />
    );
  }
}

export const ArticleList1 = withStyles(ArticleList1Component, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme['background-basic-color-2'],
  },
  item: {
    marginVertical: 8,
    backgroundColor: theme['background-basic-color-1'],
  },
}));

