import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { Text } from '@kitten/ui';
import { ArticleActivityBar } from '@src/components/articles';
import {
  ActivityAuthoring,
  textStyle,
} from '@src/components/common';
import { Article, BemArticle } from '@src/core/model';
import { BemProfile } from '@src/core/model/bem_profile.model';

// @ts-ignore (override `onPress` prop)
interface ComponentProps extends TouchableOpacityProps {
  article: BemArticle;
 /*  author: BemProfile; */
  onPress: (article: BemArticle) => void;
  onCommentPress: (article: BemArticle) => void;
  onLikePress: (article: BemArticle) => void;
}

export type ArticleList1ItemProps = ThemedComponentProps & ComponentProps;

class ArticleList1ItemComponent extends React.Component<ArticleList1ItemProps> {

  private onPress = () => {
    this.props.onPress(this.props.article);
  };

  private onCommentsButtonPress = () => {
    this.props.onCommentPress(this.props.article);
  };

  private onLikeButtonPress = () => {
    this.props.onLikePress(this.props.article);
  };

  private renderAuthor = (): React.ReactElement<ViewProps> => {
    const { article } = this.props;

    if (article.author != null) {
      return (<ActivityAuthoring
        photo={{uri : article.author.photo}}
        name={`${article.author.full_name}`}
        date={article.create_at}
      /> )
    } else {
      return null;
    }
  };
  public render(): React.ReactNode {
    const { style, themedStyle, article, ...restProps } = this.props;
    const commentsCount: number = article.commentaries ? article.commentaries.length : 0;

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        {...restProps}
        style={[themedStyle.container, style]}
        onPress={this.onPress}>
        <ImageBackground
          style={themedStyle.image}
          source={{ uri: article.photo}}
        />
        <View style={themedStyle.infoContainer}>
          <Text
            style={themedStyle.titleLabel}
            category='h5'>
            {article.title}
          </Text>
          <Text
            style={themedStyle.descriptionLabel}
            appearance='hint'
            category='s1'>
            {article.body}
          </Text>
        </View>
        <ArticleActivityBar
          style={themedStyle.activityContainer}
          comments={commentsCount}
          likes={article.likes.length}
          onCommentPress={this.onCommentsButtonPress}
          onLikePress={this.onLikeButtonPress}>
            {this.renderAuthor()}
        
          
          
        </ArticleActivityBar>
      </TouchableOpacity>
    );
  }
}

export const ArticleList1Item = withStyles(ArticleList1ItemComponent, (theme: ThemeType) => ({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  activityContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  image: {
    height: 220,
  },
  titleLabel: textStyle.headline,
  descriptionLabel: {
    marginTop: 16,
    ...textStyle.subtitle,
  },
}));
