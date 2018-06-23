import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import autobind from 'autobind-decorator'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { NotificationService } from '../services/NotificationService';
import { Subscription } from 'rxjs';
import { filter, delay } from 'rxjs/operators';
import global_styles from '../global_styles';
import { NavigationService } from '../services/NavigationService';

/**
 * The property interface used in the class TopBar
 * @interface IProps
 */
interface IProps {
}

/**
 * Implements the top bar used at many screens
 */
export default class TopBar extends Component<IProps> {

  /**
   * The notifaction subscription(s)
   * @type {Subscription[]}
   */
  private notificationSubscription: Subscription[] = [];

  /**
   * The current state of the TopBar
   */
  state: any = {
    notificationCount: 0,
  }
  
  /**
   * A handler for the componentWillMount event
   */
  componentWillMount() {
    this.setState({ notificationCount: NotificationService.countUnread() });

    let subscription = NotificationService.notificationCount.pipe(filter(count => count !== 0)).subscribe(unreadNotifications => {
      this.setState({ notificationCount: unreadNotifications });
    })
    this.notificationSubscription.push(subscription);

    subscription = NotificationService.notificationCount.pipe(filter(count => count === 0), delay(1000)).subscribe(() => {
      this.setState({ notificationCount: 0 });
    })
    this.notificationSubscription.push(subscription);
  }

  /**
   * A handler for the componentWillUnmount event
   */
  componentWillUnmount() {
    this.notificationSubscription.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  /**
   * The rendering function for the TopBar
   * @returns {JSX.Element} The markup element that is displayed
   */
  public render(): JSX.Element {
    const notificationCountElement = this.state.notificationCount > 0 ? this.showNotificationCount() : null;
    return (
      <View>
        
        <View style={styles.topBar}>
          <TouchableOpacity onPress={this.openNavi}>
            <View style={global_styles.touchableIcon}>
              <Text style={global_styles.shadow}>
                <Entypo name="menu" size={35} color="#fff" />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToNotifications}>
            <View style={[styles.notificationIconWrapper, global_styles.touchableIcon]}>
              <Text style={[global_styles.shadow]}>
                <Ionicons name="md-notifications" size={30} color="#fff" />
              </Text>
              {notificationCountElement}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /**
   * A private method to update the notification count in the top right corner
   * @returns {JSX.Element} The markup element that is displayed as notification count
   */
  private showNotificationCount(): JSX.Element {
    return (
      <View style={styles.notificationTextWrapper}>
        <Text style={styles.notificationText}>{this.state.notificationCount}</Text>
      </View>
    );
  }

  /**
   * A method to open the navigation drawer
   */
  @autobind
  private openNavi() {
    NavigationService.openDrawer();
  }

  /**
   * A "link" handler to open the notifications view
   */
  @autobind
  private navigateToNotifications() {
    NavigationService.navigate('Notifications');
  }

}

/**
 * The styles that are used by the class TopBar
 * @type {any}
 */
const styles: any = StyleSheet.create({
  topBar: {
    paddingLeft: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {

  },
  notificationIconWrapper: {
    position: 'relative',
  },
  notificationTextWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
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