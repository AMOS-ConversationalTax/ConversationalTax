/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 */

import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import Home from './screens/home/Home';
import Start from './screens/start/Start';
import Conversation from './screens/conversation/Conversation';
import ConversationHistory from './screens/conversationHistory/ConversationHistory';
import Notifications from './screens/notifications/Notifications';
import Debug from './screens/debug/Debug';
import { WebSocketClient } from './services/WebSocketClient';

// Temporary fix to supress warnings
// https://stackoverflow.com/questions/49789150/warning-ismounted-is-deprecated-in-plain-javascript-classes
import { YellowBox } from 'react-native';
import SpeechService from './services/SpeechService';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const websocketClient = new WebSocketClient();
websocketClient.subscribeToNotifications();

const speech = new SpeechService();
speech.speak('Hello Gabriel');

export default DrawerNavigator({
  Start: {
    screen: Start,
  },
  Home: {
    screen: Home,
  },
  Conversation:  {
    screen: Conversation,
  },
  ConversationHistory:  {
    screen: ConversationHistory,
  },
  Notifications:  {
    screen: Notifications,
  },
  Debug: {
    screen: Debug,
  }
});
