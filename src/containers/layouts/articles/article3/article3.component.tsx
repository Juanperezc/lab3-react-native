import React from 'react';
import {
  ImageBackground,
  View,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  Input,
  Text,
  Button,
  ButtonProps,
  TextProps,
} from '@kitten/ui';
import { CommentsList1 } from '@src/components/articles';
import {
  ContainerView,
  textStyle,
} from '@src/components/common';
import {
  BemArticle,
} from '@src/core/model';

import { StringValidator } from '@src/core/validators';
import { PaperPlaneIconFill } from '@src/assets/icons';

interface ComponentProps {
  article: BemArticle;

  currentCommentText: string;
  onCommentSubmit: () => void;
  onCommentTextChange: (text: string) => void;
  onCommentLikePress: (index: number) => void;
  onCommentMorePress: (index: number) => void;
  onCommentReplyMorePress: (index: number) => void;
}

export type Article3Props = ThemedComponentProps & ComponentProps;

class Article3Component extends React.Component<Article3Props> {

  private onLikePress = (index: number) => {
    this.props.onCommentLikePress(index);
  };

  private onMorePress = (index: number) => {
    this.props.onCommentMorePress(index);
  };

  private onReplyMorePress = (index: number) => {
    this.props.onCommentReplyMorePress(index);
  };

  private onCommentTextChange = (text: string): void => {
    this.props.onCommentTextChange(text);
  };

  private handleTextSubmit = () => {
    this.props.onCommentSubmit();
  };

  private shouldRenderSendButton = (): boolean => {
    const { currentCommentText } = this.props;

    return StringValidator(currentCommentText);
  };
  private renderArticleBodyText = (): string => {
    const { themedStyle,article } = this.props;
    if (article.parent != null){
      return article.parent.body;
    }else{
      return article.body
    }
  }
  private renderArticleTitleText = (): string => {
    const { themedStyle,article } = this.props;
    if (article.parent != null){
      return article.parent.title;
    }else{
      return article.title;
    }
  }
  private renderArticlePhotoString = (): string => {
    const { themedStyle,article } = this.props;
    if (article.parent != null){
      return article.parent.photo;
    }else{
      return article.photo;
    }
  }
  private renderSendMessageButton = (): React.ReactElement<ButtonProps> => {
    const { themedStyle } = this.props;

    return (
      <Button
        style={themedStyle.addMessageButton}
        appearance='ghost'
        size='large'
        icon={PaperPlaneIconFill}
        onPress={this.handleTextSubmit}
      />
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, article, currentCommentText } = this.props;
    const sendMessageButtonElement = this.shouldRenderSendButton() ? this.renderSendMessageButton() : null;
    return (
      <ContainerView style={themedStyle.container}>
        <Text
          style={themedStyle.titleLabel}
          category='h4'>
          {this.renderArticleTitleText()}
        </Text>
        <ImageBackground
          style={themedStyle.image}
          source={{ uri: this.renderArticlePhotoString() }}
        />
        <Text
          style={themedStyle.contentLabel}
          category='s1'>
            {this.renderArticleBodyText()}
        </Text>
        <View style={themedStyle.articleAuthorContainer}>
          <Text
            style={themedStyle.articleAuthorLabel}
            appearance='hint'
            category='p2'>
            {`Por ${article.author.full_name} `}
          </Text>

          <Text
            style={themedStyle.articleDateLabel}
            appearance='hint'
            category='p2'>
            {article.create_at}
          </Text>
        </View>
        <View style={themedStyle.inputContainer}>
        <Text
            style={[themedStyle.inputLabel, themedStyle.inputSpace]}
            category='s1'>
            Comentarios
          </Text>
        </View>
        
        <View style={themedStyle.inputContainer}>
       
          <Input
            style={themedStyle.messageInput}
            textStyle={textStyle.paragraph}
            placeholder='Escribe tu comentario'
            value={currentCommentText}
            onChangeText={this.onCommentTextChange}
            onSubmitEditing={this.handleTextSubmit}
          />
                {sendMessageButtonElement}
        </View>
        <CommentsList1
          data={article.commentaries}
          onLikePress={this.onLikePress}
          onMorePress={this.onMorePress}
          onReplyMorePress={this.onReplyMorePress}
        />
      </ContainerView>
    );
  }
}

export const Article3 = withStyles(Article3Component, (theme: ThemeType) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
  },
  image: {
    minHeight: 240,
  },
  authorPhoto: {
    position: 'absolute',
    left: 24,
    bottom: -32,
    margin: 0,
    borderWidth: 2,
    borderColor: theme['border-basic-color-2'],
  },
  titleLabel: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
    ...textStyle.headline,
  },
  descriptionLabel: {
    marginHorizontal: 24,
    marginVertical: 24,
    ...textStyle.subtitle,
  },
  contentLabel: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
    ...textStyle.paragraph,
  },
  articleAuthorContainer: {
    marginHorizontal: 24,
    flexDirection: 'row',
  },
  articleAuthorLabel: textStyle.paragraph,
  articleDateLabel: textStyle.paragraph,
  inputSpace: {
    marginHorizontal: 24,
  },
/*   inputContainer: {
    marginTop: 44,
    marginBottom: 24,
  }, */
  inputLabel: {
    marginBottom: 8,
    ...textStyle.subtitle,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  addMessageButton: {
    width: 26,
    height: 26,
    borderRadius: 26,
  },
  inputContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme['background-basic-color-1'],
  },
}));
