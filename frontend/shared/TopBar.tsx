import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import autobind from 'autobind-decorator'
import { Ionicons, Entypo } from '@expo/vector-icons';

interface IProps {
  navigation: any
}

export default class TopBar extends Component<IProps> {
  public render() {
    return (
      <View> 
        <View style={{ height: 20 }} />
        <View style={styles.topBar}>
          <TouchableWithoutFeedback onPress={this.openNavi}>
            <Entypo name="menu" size={30} color="#000" />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.navigateToNotifications}>
            <Ionicons name="md-notifications" size={25} color="#000" />
          </TouchableWithoutFeedback>
          
        </View>
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
    backgroundColor: '#fff', 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});