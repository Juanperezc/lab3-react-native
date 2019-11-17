import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Profile } from '@src/core/model';
import { profile1 } from '@src/core/data/profile';
import { ProfileSettings1 } from './profileSettings1.component';
import AwesomeAlert from 'react-native-awesome-alerts';

// storage
import {
  ConfigStorage,
} from '@src/core/services/storage';
import {
  UserService,
} from '@src/core/services';

import Reactotron from 'reactotron-react-native';
import * as ImagePicker from 'expo-image-picker';
import { BemProfile } from '@src/core/model/bem_profile.model';
interface State {
  profile: BemProfile;
  formData: FormData;
  loading: boolean;
}

interface FormData {
  full_name: string | undefined;
  phone: string | undefined;

}


export class ProfileSettings1Container extends React.Component<NavigationScreenProps, State> {

  public state: State = {
    profile: null,
    formData: undefined,
    loading: false
  };
  constructor(props) {
    super(props);
  }
  private onFormDataChange = (formData: any) => {
    console.log('form data', formData);
     this.setState({ formData }); 
  };

  private onUploadPhotoButtonPress = () => {
    console.log('cambiar foto');
    this._pickImage();
  };

  public componentWillMount(): void {
    this.load()
    this.props.navigation.addListener('willFocus', this.load)
  }
  load = () => {
    console.log('props', this.props.navigation.getParam("profile"))
    this.setState({
      profile : this.props.navigation.getParam("profile")
    })
  }
  _pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      console.log('uri', result.uri);
      //! subir la foto
      UserService.upload_photo(result.uri).then((res) =>{
        console.log('response', res);
        this.setState({
          profile: {
            ...this.state.profile,
            photo: result.uri
          }
        });
      },(err) =>{
        console.error('error', err)
      }).catch((err) =>{
        console.error('error', err);
      });

    }
  };
  private onButtonPress = () => {
    console.log('profile state', this.state.formData);
    if (this.state.formData != undefined){
      this.setState({
        loading: true
      })
      UserService.update(this.state.formData).then((res: any) =>{
     //   console.log('response', res)
        const user = res.data.user
        console.log('user', user)
        this.setState({
          loading: false,
          profile : {
            ...this.state.profile,
            full_name: user.full_name,
            phone: user.phone
          } 
        })
      },(err) =>{
        this.setState({
          loading: false
        })
        console.error('error',err);
      })
    }
   
   // this.props.navigation.goBack();
  };
  private onLogoutPress = () => {
    ConfigStorage.removeToken();
    ConfigStorage.getToken().then((res)  =>{
      Reactotron.log({
        name: 'Response logout outside',
        value: res
    });
    this.props.navigation.navigate({
      routeName: 'Sign In 1',
    });
    /*  */
  });
}
  public render(): React.ReactNode {
    if (this.state.profile != null && !this.state.loading){
      return (
        <ProfileSettings1
          profile={this.state.profile}
          onUploadPhotoButtonPress={this.onUploadPhotoButtonPress}
          onButtonPress={this.onButtonPress}
          onLogoutPress={this.onLogoutPress}
          onDataChange={this.onFormDataChange}
        />
      );
    }else{
      return (<AwesomeAlert
        show={true}
        showProgress={true}
        />)
    }

    
  }
}
