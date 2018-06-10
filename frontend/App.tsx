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

export default DrawerNavigator({
  Notifications: {
    screen: Notifications,
  },
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
  Debug: {
    screen: Debug,
  }
});
