import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import TopBar from '../../shared/TopBar';
import BottomBar from '../../shared/BottomBar';
import globalStyles from '../../global_styles';
import NotificationList from './components/NotificationList';
import { NotificationService } from '../../services/NotificationService';
import { Subscription } from 'rxjs';

interface IProps {
  navigation: any
}

export default class Notifications extends Component<IProps> {
  private notificationSubscription: Subscription;
  state = {
    notifications: [],
  }

  componentWillMount() {
    const deepClone = JSON.parse(JSON.stringify(NotificationService.Instance.notifications));
    this.setState({ notifications: deepClone });

    this.notificationSubscription = NotificationService.Instance.newNotification.subscribe(() => {
      const deepClone = JSON.parse(JSON.stringify(NotificationService.Instance.notifications));
      this.setState({ notifications: deepClone });
      NotificationService.Instance.markAsRead();
    })
  }

  componentDidMount() {
    NotificationService.Instance.markAsRead();
  }

  componentWillUnmount() {
    this.notificationSubscription.unsubscribe();
  }

  public render() {
    return (
      <View style={globalStyles.container}>
        <TopBar navigation={this.props.navigation} />
        <NotificationList notifications={this.state.notifications}/>
        <BottomBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});