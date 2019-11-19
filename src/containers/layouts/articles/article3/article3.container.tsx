import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import {
  Article,
  Comment,
  Profile,
  BemArticle,
} from '@src/core/model';

import {
  profile1,
  profile2,
  profile3,
  profile4,
} from '@src/core/data/profile';
import { comments } from '@src/core/data/comment';
import { Article3 } from './article3.component';
import AwesomeAlert from 'react-native-awesome-alerts';
import { PublicationService, CommentaryService } from '@src/core/services';
const profiles: Profile[] = [
  profile1,
  profile2,
  profile3,
  profile4,
];

interface State {
  article: BemArticle;
  currentCommentText: string;
}

export class Article3Container extends React.Component<NavigationScreenProps, State> {

  public state: State = {
    article: null,
    currentCommentText: '',

  };
 //on comment like press
  private onLikePress = (index: number) => {
    console.log('index', index);
    CommentaryService.like
    ({commentary_id:this.state.article.commentaries[index]._id}).then((res: any) =>{
      let commentaries = this.state.article.commentaries.slice();
      const findIndexLike = commentaries[index].likes.findIndex((lik) => lik._id == res.data.commentary_like._id)
      if (findIndexLike == -1){
        commentaries[index].likes.push(res.data.commentary_like)
      }else{
        commentaries[index].likes.splice(findIndexLike,1)
      }
        this.setState({
          article : {
            ...this.state.article,
            commentaries
          }});
    },(err) =>{

    })

  };

  private onMorePress = (index: number) => {

  };

  private onReplyMorePress = (index: number) => {

  };

  private onCommentTextChange = (text: string) => {
    this.setState({ currentCommentText: text });
  };

  private onCommentSubmit = () => {
    console.log('text', this.state.currentCommentText);
    CommentaryService.store(
      {publication_id: this.props.navigation.getParam("article_id"),
       body: this.state.currentCommentText}).then((res: any) =>{

      this.setState({
      currentCommentText: null
      })

      let commentaries = this.state.article.commentaries.slice();
       commentaries.push(res.data.commentary);
       this.setState({
            article : {
            ...this.state.article,
            commentaries
          }
        })
      
      console.log('response', res.data.commentary);
    },(err) =>{
      console.error('error', err)
    })
    //consumir service aqui
    /* const articleCopy: Article = this.state.article;
    articleCopy.comments.push({
      author: profiles[Math.floor(Math.random() * profiles.length)],
      text: this.state.currentCommentText,
      likesCount: 1,
      date: 'Hoy 10:36 pm',
    });
    this.setState({
      article: articleCopy,
      currentCommentText: '',
    }); */
  };
  public componentWillMount(): void {
    this.load()
    this.props.navigation.addListener('willFocus', this.load)
  }
  load = () => {
    console.log('props', this.props.navigation.getParam("article_id"))
    const article_id=  this.props.navigation.getParam("article_id")
    
    PublicationService.show(article_id).then((res: any) => {
    //  console.log('response', res.data);
     /*  Reactotron.log({
        name: 'mount profile',
        value: res
      });*/
     
       this.setState({
        article: res.data
      }) 
    }).catch((err) => {
      console.log('error', err);
    });
  }
  public render(): React.ReactNode {
    if (this.state.article != null){
    return (
      <Article3
        article={this.state.article}
     
        currentCommentText={this.state.currentCommentText}
        onCommentTextChange={this.onCommentTextChange}
        onCommentSubmit={this.onCommentSubmit}
        onCommentLikePress={this.onLikePress}
        onCommentMorePress={this.onMorePress}
        onCommentReplyMorePress={this.onReplyMorePress}
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
