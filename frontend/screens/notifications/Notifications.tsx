import React, { Component } from 'react';
import NotificationList from './components/NotificationList';
import { NotificationService } from '../../services/NotificationService';
import { Subscription } from 'rxjs';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';
import Wrapper from '../../shared/Wrapper';
import RoundContentWrapper from '../../shared/RoundContentWrapper';

interface IProps {
  navigation: any;
}

interface IState {
  notifications: NotificationMessage[];
}

export default class Notifications extends Component<IProps, IState> {
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
      <Wrapper navigation={this.props.navigation}>
        <RoundContentWrapper title="Benachrichtigungen" navigation={this.props.navigation}>
          <NotificationList notifications={this.state.notifications}/>
        </RoundContentWrapper>
      </Wrapper>
    );
  }
}
