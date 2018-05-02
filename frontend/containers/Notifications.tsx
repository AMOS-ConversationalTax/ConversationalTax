import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar
} from 'react-native';
import TopBar from '../components/TopBar';
import globalStyles from '../global_styles';
import BottomBar from './../components/BottomBar';

interface IProps {
  navigation: any
}

export default class Notifications extends Component<IProps> {
  public render() {
    return (
      <View style={globalStyles.container}>
        <TopBar navigation={this.props.navigation} />
        <View style={globalStyles.content}>
          <Text style={styles.welcome}>
            Notifications
          </Text>
        </View>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  statusBar: {
    height: 22,
  }
});