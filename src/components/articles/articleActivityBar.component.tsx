import React from 'react';
import {
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  ActivityBar,
  ActivityBarProps,
  CommentsButton,
  LikeButton,
  ShareButton,
  ReactionBar,
} from '@src/components/common';

interface ComponentProps {
  comments: number;
  likes: number;
  onCommentPress: () => void;
  onLikePress: () => void;
  onSharePress: () => void;
  textStyle?: StyleProp<TextStyle>;
}

export type ArticleActivityBarProps = ThemedComponentProps & ActivityBarProps & ComponentProps;

class ArticleActivityBarComponent extends React.Component<ArticleActivityBarProps> {

  public render(): React.ReactNode {
    const {
      themedStyle,
      textStyle,
      comments,
      likes,
      onCommentPress,
      onLikePress,
      onSharePress,
      children,
      ...restProps
    } = this.props;

    return (
      <ActivityBar {...restProps}>
        {children}
        <ReactionBar>
          <CommentsButton
            textStyle={textStyle}
            activeOpacity={0.75}
            onPress={onCommentPress}>
            {`${comments}`}
          </CommentsButton>
          <LikeButton
            textStyle={textStyle}
            activeOpacity={0.75}
            onPress={onLikePress}>
            {`${likes}`}
          </LikeButton>
          <ShareButton
            textStyle={textStyle}
            activeOpacity={0.75}
            onPress={onSharePress}>
            {null}
          </ShareButton>
        </ReactionBar>
      </ActivityBar>
    );
  }
}

export const ArticleActivityBar = withStyles(ArticleActivityBarComponent, (theme: ThemeType) => ({
}));
