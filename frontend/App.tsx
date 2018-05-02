/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 */

import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import Home from './containers/Home';
import Start from './containers/Start';
import Conversation from './containers/Conversation';
import Notifications from './containers/Notifications';

// Temporary fix to supress warnings
// https://stackoverflow.com/questions/49789150/warning-ismounted-is-deprecated-in-plain-javascript-classes
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

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
  Notifications:  {
    screen: Notifications,
  }
});
