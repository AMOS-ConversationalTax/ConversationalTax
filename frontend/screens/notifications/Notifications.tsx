import React, { Component } from 'react';
import NotificationList from './components/NotificationList';
import { NotificationService } from '../../services/NotificationService';
import { Subscription } from 'rxjs';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';
import Wrapper from '../../shared/Wrapper';
import RoundContentWrapper from '../../shared/RoundContentWrapper';

/**
 * The property interface used in the class Notifications
 * @interface IProps
 */
interface IProps {
}

/**
 * The state interface used in the class Notifications
 * @interface IState
 */
interface IState {
  notifications: NotificationMessage[];
}

/**
 * Implements the notification view
 */
export default class Notifications extends Component<IProps, IState> {

  /**
   * The subscription to the notification websocket
   * @type {Subscription}
   */
  private notificationSubscription: Subscription;

  /**
   * The state of the notifications
   */
  state: any = {
    notifications: [],
  }

  /**
   * Handler for the componentWillMount event
   */
  componentWillMount() {
    const deepClone = JSON.parse(JSON.stringify(NotificationService.notifications));
    this.setState({ notifications: deepClone });

    this.notificationSubscription = NotificationService.newNotification.subscribe(() => {
      const deepClone = JSON.parse(JSON.stringify(NotificationService.notifications));
      this.setState({ notifications: deepClone });
      NotificationService.markAsRead();
    })
  }

  /**
   * Handler for the componentDidMount event
   */
  componentDidMount() {
    NotificationService.markAsRead();
  }

  /**
   * Handler for the ComponentWillUnmount event
   */
  componentWillUnmount() {
    this.notificationSubscription.unsubscribe();
  }

  /**
   * Rendering function for the Notification view
   * @returns {JSX.Element} The markup element that is displayed
   */
  public render(): JSX.Element {
    return (
      <Wrapper>
        <RoundContentWrapper title="Benachrichtigungen">
          <NotificationList notifications={this.state.notifications}/>
        </RoundContentWrapper>
      </Wrapper>
    );
  }
}
