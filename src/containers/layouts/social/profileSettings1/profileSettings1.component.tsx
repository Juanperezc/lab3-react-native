import React from 'react';
import {
  ButtonProps,
  View,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { Button } from '@kitten/ui';
import {
  ProfileSetting,
  ProfilePhoto,
} from '@src/components/social';
import { CameraIconFill } from '@src/assets/icons';
import { Profile } from '@src/core/model';
import {
  ContainerView,
  textStyle,
} from '@src/components/common';
import Reactotron from 'reactotron-react-native';
import moment from "moment";
import { BemProfile } from '@src/core/model/bem_profile.model';

import {
  ValidationInput,
} from '@src/components/common';

import {
  DOBValidator,
  EmailValidator,
  NameValidator,
  PhoneNumberValidator,
  PasswordValidator,
} from '@src/core/validators';
import { profile1 } from '@src/core/data/profile';


interface ComponentProps {
  profile: BemProfile;
  onUploadPhotoButtonPress: () => void;
  onButtonPress: () => void;
  onLogoutPress: () => void;
}

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: any | undefined) => void;
}
export type ProfileSettings1Props = ThemedComponentProps & ComponentProps;

interface State {
  full_name: string | undefined;
  phone: string | undefined;
 
}

class ProfileSettings1Component extends React.Component<ProfileSettings1Props, State> {

  private onButtonPress = () => {
    this.props.onButtonPress();
  };

   public state: State = {
    full_name: undefined,
    phone: undefined,

  };

  private onLogoutPress = () => {
     this.props.onLogoutPress();
  };
  private onPhotoButtonPress = () => {
    this.props.onUploadPhotoButtonPress();
  };
  private onFullnameInputTextChange = (full_name: string) => {

    this.setState({ full_name : full_name });
  };
  private onPhoneInputTextChange = (phone: string) => {
    this.setState({ phone: phone });
  };

  private renderPhotoButton = (): React.ReactElement<ButtonProps> => {
    const { themedStyle } = this.props;

    return (
      <Button
        style={themedStyle.photoButton}
        activeOpacity={0.95}
        icon={CameraIconFill}
        onPress={this.onPhotoButtonPress}
      />
    );
  };
  public componentWillMount(): void {
  console.log('didMount');
  this.setState({ 
  full_name : this.props.profile.full_name ,
  phone: this.props.profile.phone,
  });
  }

  public componentDidUpdate(prevProps: ProfileSettings1Props, prevState: State) {
    console.log('update', this.state); 
  /*   this.setState({
      photo: this.props.profile.photo
    }); */
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

  private isValid = (value: State): boolean => {
    const { full_name, phone } = value;

    return full_name !== undefined
    && phone !== undefined
/*       && username != undefined
      && date !== undefined
      && email !== undefined
      && country != undefined
      && city != undefined
      && phone !== undefined
      && password !== undefined */
  };

  public render(): React.ReactNode {
    const { themedStyle, profile } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
        <View style={themedStyle.photoSection}>
          <ProfilePhoto
            style={themedStyle.photo}
            source={{uri :profile.photo}}
            button={this.renderPhotoButton}
          />
        </View>
        <View style={themedStyle.infoSection}>
      {/*     <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Nombre Completo'
            value={profile.full_name}
          /> */}
          <ValidationInput
          style={[themedStyle.input, themedStyle.fullnameInput, textStyle.label]}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder=''
          value={this.state.full_name}
          label='Nombre Completo'
          autoCapitalize='words'
          validator={NameValidator}
          onChangeText={this.onFullnameInputTextChange}
        />
 
          <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Nombre de Usuario'
            value={profile.alias}
          />
          <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Fecha de nacimiento'
            value={`${moment(profile.birth_date).format("DD/MM/YYYY")}`}
          />
          {/* <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Weight'
            value={`${profile.weight} kg`}
          />
          <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Height'
            value={`${profile.height} cm`}
          /> */}
        </View>
        <View style={themedStyle.contactSection}>
          <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Correo'
            value={profile.email}
          />
          <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Pais'
            value={profile.country}
          />
          <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Ciudad'
            value={profile.city}
          />
           <ValidationInput
          style={[themedStyle.input, themedStyle.fullnameInput, textStyle.label]}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder=''
          value={this.state.phone}
          label='Telefono'
          autoCapitalize='words'
          validator={PhoneNumberValidator}
          onChangeText={this.onPhoneInputTextChange}
        />
        {/*   <ProfileSetting
            style={themedStyle.profileSetting}
            hint='Numero de Telefono'
            value={profile.phone}
          /> */}
        </View>
        <Button
          style={themedStyle.button}
          textStyle={textStyle.button}
          size='large'
          onPress={this.onButtonPress}>
          Guardar Cambios
        </Button>
        <Button
          style={themedStyle.buttonRed}
          textStyle={textStyle.button}
          size='large'
          onPress={this.onLogoutPress}>
          Cerrar sesión
        </Button>
      </ContainerView>
    );
  }
}

export const ProfileSettings1 = withStyles(ProfileSettings1Component, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  photoSection: {
    marginVertical: 40,
  },
  infoSection: {
    marginTop: 24,
    backgroundColor: theme['background-basic-color-1'],
  },
  contactSection: {
    marginTop: 24,
    backgroundColor: theme['background-basic-color-1'],
  },
  profileSetting: {
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  photo: {
    width: 124,
    height: 124,
    alignSelf: 'center',
  },
  photoButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    transform: [{ translateY: 82 }],
    borderColor: theme['border-basic-color-4'],
    backgroundColor: theme['background-basic-color-4'],
  },
  button: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
  buttonRed: {
    backgroundColor: '#ff0000',
    marginHorizontal: 24,
    marginVertical: 24,
  },
  input: {
    marginTop: 16,
  },
  fullnameInput: {
    marginTop: 10,
  },
  termsCheckBox: {
    marginTop: 20,
  },
  termsCheckBoxText: {
    fontSize: 11,
    color: theme['text-hint-color'],
    ...textStyle.paragraph,
  },
  label:{
    marginTop: 16
  }
}));
