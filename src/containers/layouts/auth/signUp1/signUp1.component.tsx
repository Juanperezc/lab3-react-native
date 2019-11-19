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
import {
  SignUpForm1,
  SignUpForm1Data,
  SocialAuth,
} from '@src/components/auth';
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '@src/components/common';
import {
  ArrowForwardIconOutline,
  HeartIconFill,
} from '@src/assets/icons';
import {
  imageSignUp1Bg,
  ImageSource,
} from '@src/assets/images';
import {BemSelectModel} from '@src/core/model/bem_select.model'

interface ComponentProps {
  onSignUpPress: (formData: SignUpForm1Data) => void;
  onSignInPress: () => void;
  OnSelectedCountry: (data :any) => void;
  data: Array<BemSelectModel>
  city_data: Array<BemSelectModel>
}

export type SignUp1Props = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignUpForm1Data;
}

class SignUp1Component extends React.Component<SignUp1Props, State> {
  
  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = imageSignUp1Bg;

  private onFormDataChange = (formData: SignUpForm1Data) => {
    this.setState({ formData });
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress(this.state.formData);
  };

  private onSignInButtonPress = () => {
    this.props.onSignInPress();
  };
  private OnSelectedCountry = (data :any) => {
    this.props.OnSelectedCountry(data);
  };
  private renderSignInButtonIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { themedStyle } = this.props;

    return ArrowForwardIconOutline({ ...style, ...themedStyle.signInButtonIcon });
  };

  public render(): React.ReactNode {
    const { data, themedStyle } = this.props;
    return (
      <ScrollableAvoidKeyboard style={themedStyle.container}>
        <ImageOverlay
          style={themedStyle.headerContainer}
          source={this.backgroundImage.imageSource}>

          <View style={themedStyle.signUpContainer}>
            <Text
              style={themedStyle.signInLabel}
              category='h4'>
              Registro
            </Text>
            <Button
              style={themedStyle.signInButton}
              textStyle={themedStyle.signInButtonText}
              appearance='ghost'
              size='giant'
              activeOpacity={0.75}
              icon={this.renderSignInButtonIcon}
              onPress={this.onSignInButtonPress}>
              Ingresar
            </Button>
          </View>
        </ImageOverlay>
        <SignUpForm1
          style={themedStyle.formContainer}
          onDataChange={this.onFormDataChange}
          OnSelectedCountry={this.OnSelectedCountry}
          data={this.props.data}
          city_data={this.props.city_data}
        />
        <Button
          style={themedStyle.signUpButton}
          textStyle={textStyle.button}
          size='large'
          disabled={!this.state.formData}
          onPress={this.onSignUpButtonPress}>
          Registrarse
        </Button>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignUp1 = withStyles(SignUp1Component, (theme: ThemeType) => ({
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

