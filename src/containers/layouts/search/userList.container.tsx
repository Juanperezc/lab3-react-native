import React from 'react';
import {
  NavigationScreenProps,
  NavigationScreenConfig,
} from 'react-navigation';
import { Conversation } from '@src/core/model';
import {
  conversation1,
  conversation2,
  conversation3,
  conversation4,
  conversation7,
  conversation8,
  conversation9,
  conversation10,
  conversation11,
  conversation12,
} from '@src/core/data/conversation';
import { UserList } from './userList.component';
import { TopNavigationElement } from '@src/core/navigation/options';
import { UserListHeader } from './userList.header';
import { BemProfile } from '@src/core/model/bem_profile.model';
import { UserService } from '@src/core/services';
import AwesomeAlert from 'react-native-awesome-alerts';
interface UserListNavigationStateParams {
  onBack: () => void;
  onSearchPress: () => void;
}

interface State {
  searchEnabled: boolean;
  users: BemProfile[];
}

/* const conversations: Conversation[] = [
  conversation1,
  conversation2,
  conversation3
]; */

export class UserListContainer extends React.Component<NavigationScreenProps, State> {

  static navigationOptions: NavigationScreenConfig<any> = ({ navigation, screenProps }) => {
    const conversationHeaderConfig: UserListNavigationStateParams = {
      onBack: navigation.getParam('onBack'),
      onSearchPress: navigation.getParam('onSearchPress'),
    };
    const renderHeader = (headerProps: NavigationScreenProps,
                          config: UserListNavigationStateParams) => {
      return (
        <UserListHeader
          {...headerProps}
          onSearchPress={config.onSearchPress}
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
  load = () => {

    /*
    this.props.navigation.setParams({
      onAddPress: this.onAddPress,
    }); */
     UserService.index().then((res: any) => {
      this.setState({
        users: res.data.users
      })
    }, (err) => console.error(err))
  }
  public componentWillMount(): void {
    this.props.navigation.addListener('willFocus', this.load)
    this.props.navigation.setParams({
      onSearchPress: this.onSearchPress,
      onBack: this.onBackPress,
    });
  };

  public state: State = {
    users: new Array<BemProfile>(),
    searchEnabled: false,
  };

  private navigationKey: string = 'UserListContainer';

  private onBackPress = (): void => {
    this.props.navigation.goBack(null);
  };

  private onSearchPress = (): void => {
    this.setState({ searchEnabled: !this.state.searchEnabled });
  };

  private onUserPress = (index: number) => {
    console.log('index', index)
   
    /* this.props.navigation.navigate('Perfil Usuario'); */
      this.props.navigation.navigate({

      params: {
        'profile_id':  this.state.users[index]._id
      },
      routeName: 'Perfil Usuario',
    });  
  };

  private onSearchStringChange = (searchString: string): void => {
    if (searchString && searchString.length) {
      const query: string = searchString.toUpperCase();
      const items: BemProfile[] = this.state.users
        .filter((item: BemProfile) => {
          const name: string = `${item.full_name}`.toUpperCase();
          return name.includes(query);
        });
      this.setState({ users: items });
    } else {
      this.setState({ users : this.state.users });
    }
  };

  public render(): React.ReactNode {
    if(this.state.users.length > 0 || this.state.searchEnabled) {
      return (
        <UserList
          searchEnabled={this.state.searchEnabled}
          users={this.state.users}
          onSearchStringChange={this.onSearchStringChange}
          onUser={this.onUserPress}
        />
      );
    }
    else {
      return (<AwesomeAlert
        show={true}
        showProgress={true}
      />)
    }
  }
}
