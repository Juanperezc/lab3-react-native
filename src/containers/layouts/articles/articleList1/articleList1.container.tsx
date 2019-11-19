import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Article, BemArticle } from '@src/core/model';
/* import { articles } from '@src/core/data/article'; */
import { ArticleList1 } from './articleList1.component';
import { TopNavigationElement } from '@src/core/navigation/options';
import { AR } from 'expo';
import { ArticleList1Header } from './articleList1.header';
import { NavigationScreenConfig } from 'react-navigation';
import { PublicationService } from '@src/core/services';
import AwesomeAlert from 'react-native-awesome-alerts';
import { ToastAndroid } from 'react-native';
interface State {
  articles: BemArticle[];
}
interface ArticleListHeaderNavigationStateParams {
  onBack: () => void;
  onAddPress: () => void;
}
export class ArticleList1Container extends React.Component<NavigationScreenProps, State> {
  private navigationKey: string = 'ArticleList1Container';
  public state: State = {
    articles: null/* articles */,
  };
  static navigationOptions: NavigationScreenConfig<any> = ({ navigation, screenProps }) => {
    const conversationHeaderConfig: ArticleListHeaderNavigationStateParams = {
      onBack: navigation.getParam('onBack'),
      onAddPress: navigation.getParam('onAddPress'),
    };

    const renderHeader = (headerProps: NavigationScreenProps,
      config: ArticleListHeaderNavigationStateParams) => {

      return (
        <ArticleList1Header
          {...headerProps}
          onAddPress={config.onAddPress}
          onBack={config.onBack}
        />
      );
    };

    return {
      ...navigation,
      ...screenProps,
      header: (headerProps: NavigationScreenProps): TopNavigationElement => {
        return renderHeader(headerProps, conversationHeaderConfig);
      },
    };
  };
  private onItemPress = (article: BemArticle) => {
    console.log('test');
    this.props.navigation.navigate({
      routeName: 'Detalle publicación',
      params: {
        'article_id': article._id
      },
      key: this.navigationKey,
    });
  };
  public componentWillMount(): void {
    this.props.navigation.addListener('willFocus', this.load)
  }
  load = () => {
    this.props.navigation.setParams({
      onAddPress: this.onAddPress,
    });
    PublicationService.index().then((res: any) => {
      this.setState({
        articles: res.data.publications
      })
    }, (err) => console.error(err))
  }

  private onItemLikePress = (article: BemArticle) => {

    PublicationService.like({ publication_id: article._id }).then((res: any) => {
      console.log('response', res.data);
      /*  this.setState({loading: false}) */
      /*        ToastAndroid.show('Publicación compartida !', ToastAndroid.SHORT); */
      const action = res.data.action;
      const publication_like = res.data.publication_like;
      let publications = this.state.articles.slice();
      const index = publications.findIndex((pub) => pub._id == article._id);
      console.log('index', index);

      if (index !== -1) {
        if (action == "store") {
          publications[index].likes.push(publication_like);
        } else if (action == "delete") {
          publications[index].likes.splice(index, 1);
        }

        this.setState({
          articles: publications
        })
      }

    }, (err) => console.error(err))

    /*  this.state.profile */

    /*     this.load(); */
  };
  private onItemCommentPress = (article: BemArticle) => {
    this.onItemPress(article);
  };
  private onItemSharePress = (article: BemArticle) => {
    
    PublicationService.share({publication_id: article._id}).then((res) =>{
      /*  console.log('response', res); */
/*       this.setState({loading: false}) */
       ToastAndroid.show('Publicación compartida !', ToastAndroid.SHORT);
       this.load();
    
       },(err) => {
         console.error('err')
       })
  };
  private onAddPress = (): void => {
    console.log('on add press')
    this.props.navigation.navigate({
      routeName: 'Crear publicación',
      /*   params: {
         'profile' :  this.state.profile
        } */
    });
  }
  public render(): React.ReactNode {
    if (this.state.articles != null) {

      return (
        <ArticleList1
          articles={this.state.articles}
          onItemPress={this.onItemPress}
          onItemLikePress={this.onItemLikePress}
          onItemCommentPress={this.onItemCommentPress}
          onItemSharePress={this.onItemSharePress}
        />
      );
    } else {
      return (<AwesomeAlert
        show={true}
        showProgress={true}
      />)
    }
  }
}
