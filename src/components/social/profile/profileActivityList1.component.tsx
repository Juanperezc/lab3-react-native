import React from 'react';
import {
  ImageSourcePropType,
  ListRenderItemInfo,
  ToastAndroid,
} from 'react-native';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  List,
  ListProps,
} from '@kitten/ui';
import { Post, BemArticle } from '@src/core/model';
import {
  ProfileActivityList1Item,
  ProfileActivityList1ItemProps,
} from './profileActivityList1Item.component';
import { ArticleList1Item } from '@src/containers/layouts/articles/articleList1/articleList1Item.component';
import { BemProfile } from '@src/core/model/bem_profile.model';
import { PublicationService } from '@src/core/services';
import AwesomeAlert from 'react-native-awesome-alerts';
// @ts-ignore (override `renderItem` prop)


interface ComponentProps extends ListProps {
  data: BemArticle[];
  onItemPress: (article: BemArticle) => void;
  onItemLikePress: (article: BemArticle, publication_like: any, action: any) => void;
  onItemCommentPress: (article: BemArticle) => void;
  onItemSharePress: (article: BemArticle) => void;
  renderItem?: (info: ListRenderItemInfo<ImageSourcePropType>, style: StyleType) => React.ReactElement<any>;
}
interface State {
  loading: boolean;
}
type ListItemElement = React.ReactElement<ProfileActivityList1ItemProps>;

export type ProfileActivityList1Props = ThemedComponentProps & ComponentProps;

class ProfileActivityList1Component extends React.Component<ProfileActivityList1Props> {
  public state: State = {
    loading:false,
  };
/*   private onItemPress = (index: number) => {
    this.props.onItemPress(index);
  }; */

/*   private onItemLikePressPress = (index: number) => {
     this.props.onItemPress(index);
  }; */
  private onItemPress = (article: BemArticle) => {
    this.props.onItemPress(article);
  };

  private onItemLikePress = (article: BemArticle) => {
   /*  this.setState({loading: true}) */
    PublicationService.like({publication_id: article._id}).then((res: any) =>{
       console.log('response', res.data);
     /*  this.setState({loading: false}) */
/*        ToastAndroid.show('Publicación compartida !', ToastAndroid.SHORT); */
        this.props.onItemLikePress(article,res.data.publication_like, res.data.action); 
      /*  this.load(); */
       },(err) => {
         console.error('err')
       })
    };
  


  private onItemSharePress = (article: BemArticle) => {
    this.setState({loading: true})
    PublicationService.share({publication_id: article._id}).then((res) =>{
      /*  console.log('response', res); */
      this.setState({loading: false})
       ToastAndroid.show('Publicación compartida !', ToastAndroid.SHORT);
       this.props.onItemSharePress(article);
      /*  this.load(); */
       },(err) => {
         console.error('err')
       })
  };
  private onItemCommentPress = (article: BemArticle) => {
    this.props.onItemCommentPress(article);
  };

  private renderListItemElement = (item: BemArticle): ListItemElement => {
    const { themedStyle } = this.props;
    /* const { photo, create_at, likes } = item; */
    if (this.state.loading == false){
      return (
        <ArticleList1Item
        style={themedStyle.item}
        article={item}
        onPress={this.onItemPress}
        onLikePress={this.onItemLikePress}
        onCommentPress={this.onItemCommentPress}
        onSharePress={this.onItemSharePress}
      />
      );
    }else{
      return (<AwesomeAlert
        show={true}
        showProgress={true}
        />)
    }

    /*   <ProfileActivityList1Item
        style={themedStyle.item}
        photo={{ uri: photo }} 
        
        profilePhoto={{ uri: photo }} 
        authorName={'Juan perez `${author.firstName} ${author.lastName}` }
        date={create_at}
        likes={likes.length}
        onPress={this.onItemPress}
        onLikePress={this.onItemLikePressPress}
      /> */
 
  };

  private renderItem = (info: ListRenderItemInfo<BemArticle>): ListItemElement => {
    const { item, index } = info;

    const listItemElement: ListItemElement = this.renderListItemElement(item);

    return React.cloneElement(listItemElement, { index });
  };

  public render(): React.ReactNode {
    return (
      <List
        {...this.props}
        renderItem={this.renderItem}
      />
    );
  }
}

export const ProfileActivityList1 = withStyles(ProfileActivityList1Component, (theme: ThemeType) => ({
  item: {
    marginVertical: 8,
    backgroundColor: theme['background-basic-color-1'],
  },
}));
