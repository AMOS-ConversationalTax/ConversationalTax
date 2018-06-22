import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import autobind from 'autobind-decorator';
import global_styles from '../global_styles';
import { NavigationService } from '../services/NavigationService';

/**
 * The property interface used in the class BottomBar
 * @interface IProps
 */
interface IProps {
}

/**
 * Implements the BottomBar used in multiple views
 */
export default class BottomBar extends Component<IProps> {

  /**
   * The rendering function for the bottom bar
   * @returns {JSX.Element} The markup element that is displayed
   */
  public render(): JSX.Element {
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
  
  /**
   * Change view to/navigate to Scanner
   */
  @autobind
  private navigateToScanner() {
    NavigationService.navigate('Scanner');
  }
  
  /**
   * Change view to/navigate to Conversation
   */
  @autobind
  private navigateToConversation() {
    NavigationService.navigate('Conversation');
  }
  
  /**
   * Change view to/navigate to ConversationHistory
   */
  @autobind
  private navigateToHistory() {
    NavigationService.navigate('ConversationHistory');
  }
}

/**
 * The styles that are used by the class BootomBar
 * @type {any}
 */
const styles: any = StyleSheet.create({
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