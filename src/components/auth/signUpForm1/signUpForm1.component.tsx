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
import { CheckBox } from '@kitten/ui';
import {
  textStyle,
  ValidationInput,
  SelectComponent,
} from '@src/components/common';
import {
  DOBValidator,
  EmailValidator,
  NameValidator,
  PhoneNumberValidator,
  PasswordValidator,
} from '@src/core/validators';
import { SignUpForm1Data } from './type';
import { BemSelectModel } from '@src/core/model/bem_select.model';
import { BemCountryModel } from '@src/core/model/bem_country.model';
import { BemCityModel } from '@src/core/model/bem_city.model';
//import {Picker} from 'react-native'
//import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
//import { Button } from '@kitten/ui';
/*var  pais  = [
	{
		value: '1',
		label: 'Canada'
	},
	{
		value: '2',
		label: 'Colombia'
	},
	{
		value: '3',
		label: 'Mexico'
	},
	{
		value: '4',
		label: 'Venezuela'
	},
];*/

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: SignUpForm1Data | undefined) => void;
  data: Array<BemSelectModel>
}

export type SignUpForm1Props = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  firstName: string | undefined;
  lastName: string | undefined;
  date: string | undefined;
  email: string | undefined;
  password: string | undefined;
  username: string | undefined;
  phone: string | undefined;
  country: string | undefined;
  city: string | undefined;
  termsAccepted: boolean;
  cityDisabled: boolean;
}

class SignUpForm1Component extends React.Component<SignUpForm1Props, State> {
  //public paises: Array<Pais> = pais;

  //seeders paises

  public state: State = {
    firstName: undefined,
    lastName: undefined,
    date: undefined,
    email: undefined,
    phone: undefined,
    country: undefined,
    city: undefined,
    password: undefined,
    username: undefined,
    termsAccepted: false,
    cityDisabled: true
  };
  
  public componentDidUpdate(prevProps: SignUpForm1Props, prevState: State) {
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

  private onFirstNameInputTextChange = (firstName: string) => {
    this.setState({ firstName });
  };

  private onDateInputTextChange = (date: string) => {
    this.setState({ date });
  };

  private onEmailInputTextChange = (email: string) => {
    this.setState({ email });
  };

  private onPasswordInputTextChange = (password: string) => {
    this.setState({ password });
  };

  private onUsernameInputTextChange = (username: string) => {
    this.setState({ username });
  };

  private onPhoneInputTextChange = (phone: string) => {
    this.setState({ phone });
  };

  private onCountryInputTextChange = (country: string) => {
    this.setState({ country });
  };

  private onCityInputTextChange = (city: string) => {
    this.setState({ city });
  };

  /* private onTermsAcceptChange = (termsAccepted: boolean) => {
    this.setState({ termsAccepted });
  }; */

  private onSelectedOption = (country: string) => {
    this.setState({ country });
  };


  private isValid = (value: SignUpForm1Data): boolean => {
    const { firstName,username, date, email,country,city, phone, password} = value;

    return firstName !== undefined
      && username != undefined
      && date !== undefined
      && email !== undefined
      && country != undefined
      && city != undefined
      && phone !== undefined
      && password !== undefined
  };

  private passwordCaption = (): string => {
    return this.state.password ? '✓' : 'La constraseña no cumple con los requisitos de seguridad';
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;
    /* telefono pais ciudad username */
    return (
      <View
        style={[themedStyle.container, style]}
        {...restProps}>
        <ValidationInput
          style={[themedStyle.input, themedStyle.firstNameInput]}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder='Amazon LLC'
          label='Nombre Completo'
          autoCapitalize='words'
          validator={NameValidator}
          onChangeText={this.onFirstNameInputTextChange}
        />
        <ValidationInput
          style={[themedStyle.input, themedStyle.usernameInput]}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder='Amazon1234'
          label='Nombre de usuario/Alias'
          autoCapitalize='words'
          validator={NameValidator}
          onChangeText={this.onUsernameInputTextChange}
        />
        {/* <SinglePickerMaterialDialog
          title={'Pick one element!'}
          items={this.paises.map((row) => ({ value: row.value, label: row.label }))}
          visible={ this.state.visible_country}
          selectedItem={{ value: this.paises[0].value, label: this.paises[0].label }}
          onCancel={() => this.state.visible_country = false}
          onOk={result => {
           this.state.visible_country = false;
          }}
        /> */}
        {/* <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder='Watsan'
          label='LAST NAME'
          autoCapitalize='words'
          validator={NameValidator}
          onChangeText={this.onLastNameValidationResult}
        /> */}
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder='18/10/1995'
          label='Fecha Nacimiento/Creación'
          validator={DOBValidator}
          onChangeText={this.onDateInputTextChange}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder='northwest.1-s3@amazon.com'
          label='Correo'
          validator={EmailValidator}
          onChangeText={this.onEmailInputTextChange}
        />
        {/* Pais */}
        <SelectComponent
        data={this.props.data}
        style={themedStyle.input}
        themedStyle={themedStyle}
        title="País"
        disabled={false}
        //onSelectedCountry = {this.onSelectedOption}
        />
        {/* Ciudad */}
        <SelectComponent
        data={[]}
        style={themedStyle.input}
        themedStyle={themedStyle}
        title="Ciudad"
        disabled={true}
        /> 
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          captionTextStyle={textStyle.paragraph}
          label='Contraseña'
          placeholder='Contraseña'
          caption={this.passwordCaption()}
          secureTextEntry={true}
          validator={PasswordValidator}
          onChangeText={this.onPasswordInputTextChange}
        />
        {/* <CheckBox
          style={themedStyle.termsCheckBox}
          textStyle={themedStyle.termsCheckBoxText}
          checked={this.state.termsAccepted}
          text={'By creating an account, I agree to the Terms of\nUse and Privacy Policy'}
          onChange={this.onTermsAcceptChange}
        /> */}
      </View>
    );
  }
}

export const SignUpForm1 = withStyles(SignUpForm1Component, (theme: ThemeType) => ({
  container: {},
  input: {
    marginTop: 16,
  },
  firstNameInput: {
    marginTop: 0,
  },
  termsCheckBox: {
    marginTop: 20,
  },
  termsCheckBoxText: {
    fontSize: 11,
    color: theme['text-hint-color'],
    ...textStyle.paragraph,
  },
}));
