import React from 'react';
import {
  ImageBackground,
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
  SignInForm1,
  SignInForm1Data,
} from '@src/components/auth';
import {
  ScrollableAvoidKeyboard,
  textStyle,
} from '@src/components/common';
import {
  ArrowForwardIconOutline,
} from '@src/assets/icons';
import {
  imageSignIn1Bg,
  ImageSource,
} from '@src/assets/images';

// servicios
import {
  UserService,
} from '@src/core/services';

// storage
import {
  ConfigStorage,
} from '@src/core/services/storage';
interface ComponentProps {
  onForgotPasswordPress: () => void;
  onSignInPress: (formData: SignInForm1Data) => void;
  onSignUpPress: () => void;
}

export type SignIn1Props = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignInForm1Data | undefined;
}

class SignIn1Component extends React.Component<SignIn1Props, State> {

  public state: State = {
    formData: undefined,
  };

  private backgroundImage: ImageSource = imageSignIn1Bg;

  private onSignInButtonPress = () => {
    UserService.login(this.state.formData).then( (res: any) => {
      ConfigStorage.getToken().then((res) => {
        console.log('token saved', res);
      });
      console.log('response', res);
      ConfigStorage.setToken(res.data.access_token.token);
      ConfigStorage.getToken().then((res) => {
        console.log('token saved', res);
      });

    }).catch((err) => {
      console.log('error', err);
    })
    console.log('data', this.state.formData)
  //  this.props.onSignInPress(this.state.formData);
  };

  private onSignUpButtonPress = () => {
    this.props.onSignUpPress();
  };

  private onFormDataChange = (formData: SignInForm1Data) => {
    this.setState({ formData });
  };

  private onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };


  private renderSignUpButtonIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { themedStyle } = this.props;

    return ArrowForwardIconOutline({ ...style, ...themedStyle.signUpButtonIcon });
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboard>
        <ImageBackground
          style={themedStyle.container}
          source={this.backgroundImage.imageSource}>
          <View style={themedStyle.signInContainer}>
            <Text
              style={themedStyle.signInLabel}
              category='h4'>
              Bienvenido
            </Text>
            <Button
              style={themedStyle.signUpButton}
              textStyle={themedStyle.signUpButtonText}
              activeOpacity={0.75}
              appearance='ghost'
              size='giant'
              icon={this.renderSignUpButtonIcon}
              onPress={this.onSignUpButtonPress}>
              Registrarse
            </Button>
          </View>
          <SignInForm1
            style={themedStyle.formContainer}
            onForgotPasswordPress={this.onForgotPasswordButtonPress}
            onDataChange={this.onFormDataChange}
          />
          <Button
            size='large'
            textStyle={textStyle.button}
            disabled={!this.state.formData}
            onPress={this.onSignInButtonPress}>
            INGRESAR
          </Button>
        </ImageBackground>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignIn1 = withStyles(SignIn1Component, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  formContainer: {
    flex: 1,
    marginTop: 48,
  },
  signInLabel: {
    flex: 1,
    ...textStyle.headline,
    color: 'white',
  },
  signUpButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  signUpButtonText: {
    color: 'white',
  },
  signUpButtonIcon: {
    marginHorizontal: 0,
    tintColor: 'white',
  },
}));


