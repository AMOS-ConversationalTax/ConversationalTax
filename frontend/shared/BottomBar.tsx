import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import autobind from 'autobind-decorator';
import global_styles from '../global_styles';

interface IProps {
  navigation: any
}

export default class BottomBar extends Component<IProps> {
  public render() {
    return (
      <View> 
        <View style={styles.topBar}>
          <TouchableOpacity onPress={this.navigateToScanner}>
            <View style={global_styles.touchableIcon}>
              <Ionicons name="md-qr-scanner" size={30} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToConversation}>
            <View style={global_styles.touchableIcon}>
              <Ionicons name="ios-mic" size={30} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToHistory}>
            <View style={global_styles.touchableIcon}>
              <MaterialCommunityIcons name="message-reply-text" size={30} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
  
  @autobind
  private navigateToScanner() {
    this.props.navigation.navigate('Scanner');
  }
  
  @autobind
  private navigateToConversation() {
    this.props.navigation.navigate('Conversation');
  }
  
  @autobind
  private navigateToHistory() {
    this.props.navigation.navigate('ConversationHistory');
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingLeft: 10,
    paddingRight: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});