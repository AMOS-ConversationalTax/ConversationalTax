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
import Microphone from './components/Microphone';

interface IProps {
  navigation: any
}

export default class Conversation extends Component<IProps> {
  public render() {
    return (
      <View style={globalStyles.container}>
        <TopBar navigation={this.props.navigation} />
        <View style={globalStyles.content}>
          <Microphone />
        </View>
        <BottomBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});