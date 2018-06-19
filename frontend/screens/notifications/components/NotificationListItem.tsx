import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';
import { Ionicons } from '@expo/vector-icons';
import autobind from 'autobind-decorator';
import { NavigationService } from './../../../services/NavigationService';
import { NavigatableRoutes } from 'conv-tax-shared/config/navigation.config';

interface IProps {
  notification: NotificationMessage;
  firstItem: boolean;
}

export default class NotificationListItem extends Component<IProps> {
  
  public render() {
    let viewStyles = [styles.container];
    if (!this.props.notification.read) {
      viewStyles.push(styles.unread);
    }

    return (
      <View style={viewStyles}>
        <View style={styles.itemContainer}>
          <Text style={[styles.text, styles.headline]}>{this.props.notification.title}</Text>
          <Text style={[styles.text]}>{this.props.notification.description}</Text>
        </View>
        {this.renderActionArrow()}
      </View>
    )
  }

  private renderActionArrow(): JSX.Element | null {
    if (this.props.notification.navigateTo === undefined && this.props.notification.textForDialogflow === undefined) {
      return null;
    }
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View style={styles.icon}>
          <Ionicons name="ios-arrow-forward" size={25} color="#FF6C1A" />
        </View>
      </TouchableOpacity>
    );
  }

  @autobind
  private handleClick(): void {
    if (this.props.notification.navigateTo !== undefined) {
      NavigationService.navigate(this.props.notification.navigateTo);
    }
    if (this.props.notification.textForDialogflow !== undefined) {
      NavigationService.navigate(
        NavigatableRoutes.Conversation, 
        {text: this.props.notification.textForDialogflow}
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.25)',
  },
  itemContainer: {
    flex: 1,
    padding: 20,
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 18,
    color: '#333'
  },
  headline: {
    fontWeight: 'bold'
  },
  unread: {
    backgroundColor: '#FFE7CB',
  },
  icon: {
    padding: 20,
  }
});
