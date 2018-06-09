import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar
} from 'react-native';
import TopBar from '../../shared/TopBar';
import BottomBar from '../../shared/BottomBar';
import globalStyles from '../../global_styles';

interface IProps {
  navigation: any
}

export default class ConversationHistory extends Component<IProps> {
  public render() {
    return (
      <View style={globalStyles.container}>
        <TopBar navigation={this.props.navigation} />
        <View style={globalStyles.content}>
          <Text style={styles.welcome}>
            Conversation History
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
});