import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  textStyle,
  ValidationInput,
} from '@src/components/common';
import {
  EmailValidator,
  PasswordValidator,
} from '@src/core/validators';
import { SignInForm1Data } from './type';
import {Button} from '@kitten/ui'

interface ComponentProps {
  onForgotPasswordPress: () => void;
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (data: SignInForm1Data | undefined) => void;
}

export type SignInForm1Props = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  email: string | undefined;
  password: string | undefined;
}

class SignInForm1Component extends React.Component<SignInForm1Props, State> {

  public state: State = {
    email: undefined,
    password: undefined,
  };

  public componentDidUpdate(prevProps: SignInForm1Props, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const isStateChanged: boolean = this.state !== prevState;
    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    const remainValid: boolean = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  private onEmailInputTextChange = (email: string) => {
    this.setState({ email });
  };

  private onPasswordInputTextChange = (password: string) => {
    this.setState({ password });
  };

  private onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  private isValid = (value: SignInForm1Data): boolean => {
    const { email, password } = value;

    return email !== undefined
      && password !== undefined;
  };

  public render(): React.ReactNode {
    const { style, themedStyle, theme, ...restProps } = this.props;

    return (
      <View
        {...restProps}
        style={[themedStyle.container, style]}>
        <ValidationInput
          style={themedStyle.emailInput}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='Correo'
          placeholder='Correo_prueba@test.com'
          validator={EmailValidator}
          onChangeText={this.onEmailInputTextChange}
        />
        <ValidationInput
          style={themedStyle.passwordInput}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          secureTextEntry={true}
          placeholder='Contraseña'
          label='Contraseña'
          validator={PasswordValidator}
          onChangeText={this.onPasswordInputTextChange}
        />
        <View style={themedStyle.forgotPasswordContainer}>
            <Button
              style={themedStyle.forgotPasswordButton}
              textStyle={themedStyle.forgotPasswordText}
              appearance='ghost'
              activeOpacity={0.75}
              onPress={this.onForgotPasswordButtonPress}>
              ¿Olvidaste tu Contraseña?
            </Button>
          </View>
      </View>
    );
  }
}

export const SignInForm1 = withStyles(SignInForm1Component, (theme: ThemeType) => ({
  container: {},
  emailInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  passwordInput: {
    marginTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 15,
    color: theme['text-hint-color'],
    ...textStyle.subtitle,
  },
}));
