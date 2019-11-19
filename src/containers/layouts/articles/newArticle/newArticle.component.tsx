import React from 'react';
import {
  ImageProps,
  View,
} from 'react-native';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  Button,
  Text,
} from '@kitten/ui';
/* import {
  SignUpForm1,
  SignUpForm1Data,
  SocialAuth,
} from '@src/components/auth'; */
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '@src/components/common';
import {
  ArrowForwardIconOutline,
  HeartIconFill,
  CameraIconFill,
} from '@src/assets/icons';
import {
  imageApartment1,
  ImageSource,
} from '@src/assets/images';
import { NewArticleForm1Data, NewArticleForm1 } from '@src/components/articles/newArticleForm1';

interface ComponentProps {
  backgroundImage : string;
 
  onCreatePress: (formData: NewArticleForm1Data) => void;
  onPhotoPress: () => void;
}

export type NewArticleProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: NewArticleForm1Data;
}

class NewArticleComponent extends React.Component<NewArticleProps, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = imageApartment1;

  private onFormDataChange = (formData: NewArticleForm1Data) => {
    this.setState({ formData });
  };

  private onCreateButtonPress = () => {
    this.props.onCreatePress(this.state.formData);
  };

  private onPhotoButtonPress = () => {
    this.props.onPhotoPress();
  };

  private renderSignInButtonIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { themedStyle } = this.props;

    return CameraIconFill({ ...style, ...themedStyle.signInButtonIcon });
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboard style={themedStyle.container}>
        <ImageOverlay
          style={themedStyle.headerContainer}
          source={{uri: this.props.backgroundImage}}>

          <View style={themedStyle.signUpContainer}>
            {/* <Text
              style={themedStyle.signInLabel}
              category='h4'>
              Registro
            </Text> */}
            <Button
              style={themedStyle.signInButton}
              textStyle={themedStyle.signInButtonText}
              appearance='ghost'
              size='giant'
              activeOpacity={0.75}
              icon={this.renderSignInButtonIcon}
              onPress={this.onPhotoButtonPress}>
              Cargar foto
            </Button>
          </View>
        </ImageOverlay>
        <NewArticleForm1
          style={themedStyle.formContainer}
          onDataChange={this.onFormDataChange}
        /> 
        <Button
          style={themedStyle.signUpButton}
          textStyle={textStyle.button}
          size='large'
          disabled={!this.state.formData}
          onPress={this.onCreateButtonPress}>
          Crear publicación
        </Button>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const NewArticle = withStyles(NewArticleComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
  },
  headerContainer: {
    minHeight: 200,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 44,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
  formContainer: {
    marginTop: 48,
    paddingHorizontal: 16,
  },
  signInLabel: {
    flex: 1,
    color: 'white',
    ...textStyle.headline,
  },
  signInButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  signInButtonText: {
    color: 'white',
    ...textStyle.button,
  },
  signInButtonIcon: {
    marginHorizontal: 0,
    tintColor: 'white',
  },
  signUpButton: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  socialAuthHint: {
    ...textStyle.paragraph,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 52,
  },
  orLabel: {
    marginHorizontal: 8,
    ...textStyle.headline,
  },
  emailSignLabel: {
    alignSelf: 'center',
    marginTop: 8,
    ...textStyle.paragraph,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme['background-basic-color-3'],
  },
}));

