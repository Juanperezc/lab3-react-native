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
  textStyle?: StyleProp<TextStyle>;
}

export type CommentActivityBarProps = ThemedComponentProps & ActivityBarProps & ComponentProps;

class CommentActivityBarComponent extends React.Component<CommentActivityBarProps> {

  public render(): React.ReactNode {
    const {
      themedStyle,
      textStyle,
      comments,
      likes,
      onCommentPress,
      onLikePress,
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
        </ReactionBar>
      </ActivityBar>
    );
  }
}

export const CommentActivityBar = withStyles(CommentActivityBarComponent, (theme: ThemeType) => ({
}));
