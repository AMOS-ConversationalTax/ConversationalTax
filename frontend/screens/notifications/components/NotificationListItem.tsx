import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';

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
    return (
      <View style={viewStyles}>
        <Text style={[styles.text, styles.headline]}>{this.props.notification.title}</Text>
        <Text style={styles.text}>{this.props.notification.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  firstItem: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  text: {
    fontSize: 18,
  },
  headline: {
    fontWeight: 'bold'
  }
});
