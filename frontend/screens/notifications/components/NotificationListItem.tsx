import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';
import global_styles from '../../../global_styles';

interface IProps {
  notification: NotificationMessage;
  firstItem: boolean;
}

export default class NotificationListItem extends Component<IProps> {
  public render() {
    let viewStyles = [styles.itemContainer];
    if (this.props.firstItem) {
      viewStyles.push(styles.firstItem);
    }
    if (!this.props.notification.read) {
      viewStyles.push(styles.unread);
    }

    return (
      <View style={viewStyles}>
        <Text style={[styles.text, styles.headline, global_styles.shadowLight]}>{this.props.notification.title}</Text>
        <Text style={[styles.text, global_styles.shadowLight]}>{this.props.notification.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    //backgroundColor: '#fff',
    padding: 20,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.25)',
  },
  firstItem: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.25)',
  },
  text: {
    fontSize: 18,
    color: '#fff'
  },
  headline: {
    fontWeight: 'bold'
  },
  unread: {
    backgroundColor: 'rgba(0,0,0,0.075)',
  }
});
