import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { SignUpForm1Data } from '@src/components/auth';
import { NewArticle } from './newArticle.component';
import * as ImagePicker from 'expo-image-picker';
import { PublicationService } from '@src/core/services';
import { NewArticleForm1Data } from '@src/components/articles/newArticleForm1';
import { BemSelectModel } from '@src/core/model/bem_select.model';
import { CategoryService } from '@src/core/services/category.service';

interface State {
  backgroundImage: string;
  category_select: Array<BemSelectModel>
}

export class NewArticleContainer extends React.Component<NavigationScreenProps> {
  public state: State = {
    backgroundImage: null,
    category_select: new Array<BemSelectModel>()
  };
  private navigationKey: string = 'NewArticleContainer';

  private onCreatePress = (data: NewArticleForm1Data) => {
    PublicationService.share
    this.props.navigation.goBack();
  };
  public componentWillMount(): void {
   
    this.props.navigation.addListener('willFocus', this.load)
  }
  load = () => {
    CategoryService.index().then((res: any) =>{
      console.log('response', res.data)
      const categories = this.state.category_select.slice();
      res.data.categorias.forEach(element => {
       categories.push({_id: element._id, text: element.name})
      });
      this.setState({
        category_select: categories
      })
    },(err) =>{
      console.error('error', err)
    })
  }
  private onPhotoPress = () => {
    this._pickImage();
 /*    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Sign In 1',
    }); */
  };
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
      PublicationService.upload_photo(result.uri).then((res) =>{
        console.log('response', res);
        this.setState({
            backgroundImage: result.uri
        });
      },(err) =>{
        console.error('error', err)
      }).catch((err) =>{
        console.error('error', err);
      });

    }
  };
  public render(): React.ReactNode {
    return (
      <NewArticle
        onCreatePress={this.onCreatePress}
        onPhotoPress={this.onPhotoPress}
        backgroundImage={this.state.backgroundImage}
        category_select={this.state.category_select}
      />
    );
  }
}
