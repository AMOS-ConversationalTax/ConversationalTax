import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import autobind from 'autobind-decorator'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { NotificationService } from '../services/NotificationService';
import { Subscription } from 'rxjs';
import { filter, delay } from 'rxjs/operators';

interface IProps {
  navigation: any
}

export default class TopBar extends Component<IProps> {
  private notificationSubscription: Subscription[] = [];

  state = {
    notificationCount: 0,
  }
  
  componentWillMount() {
    this.setState({ notificationCount: NotificationService.Instance.countUnread() });

    let subscription = NotificationService.Instance.notificationCount.pipe(filter(count => count !== 0)).subscribe(unreadNotifications => {
      this.setState({ notificationCount: unreadNotifications });
    })
    this.notificationSubscription.push(subscription);

    subscription = NotificationService.Instance.notificationCount.pipe(filter(count => count === 0), delay(1000)).subscribe(() => {
      this.setState({ notificationCount: 0 });
    })
    this.notificationSubscription.push(subscription);
  }

  componentWillUnmount() {
    this.notificationSubscription.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public render() {
    const notificationCountElement = this.state.notificationCount > 0 ? this.showNotificationCount() : null;
    return (
      <View style={styles.wrapper} >
        <View style={{ height: 20 }} />
        <View style={styles.topBar}>
          <TouchableWithoutFeedback onPress={this.openNavi}>
            <Entypo name="menu" size={35} color="#000" />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.navigateToNotifications}>
            <View style={styles.notificationIconWrapper}>
              <Ionicons name="md-notifications" size={30} color="#000" />
              {notificationCountElement}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  private showNotificationCount() {
    return (
      <View style={styles.notificationTextWrapper}>
        <Text style={styles.notificationText}>{this.state.notificationCount}</Text>
      </View>
    );
  }

  @autobind
  private openNavi() {
    this.props.navigation.navigate('DrawerOpen');
  }

  @autobind
  private navigateToNotifications() {
    this.props.navigation.navigate('Notifications');
  }

}

const styles = StyleSheet.create({
  topBar: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: '#fff', 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationIconWrapper: {
    position: 'relative',
  },
  notificationTextWrapper: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  notificationText: {
    color: '#fff',
  }
});