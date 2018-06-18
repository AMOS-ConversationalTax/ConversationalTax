/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 */

import React from 'react';
import { Asset, AppLoading, Font, LinearGradient, Constants } from 'expo';
import autobind from 'autobind-decorator';
import Start from './screens/start/Start';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Conversation from './screens/conversation/Conversation';
import ConversationHistory from './screens/conversationHistory/ConversationHistory';
import Notifications from './screens/notifications/Notifications';
import Debug from './screens/debug/Debug';
import Scanner from './screens/scanner/Scanner';
import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import globalStyles, { BackgroundColors } from './global_styles';
import { View, StatusBar } from 'react-native';
import CustomDrawerContentComponent from './shared/DrawerNavigationContent';
import { NavigationService } from './services/NavigationService';
import Credits from './screens/credits/Credits';

// Add screens that should be routable. 
const DrawerNavigation = createDrawerNavigator({
    Start,
    Conversation,
    Notifications,
    ConversationHistory,
    Scanner,
    Debug,
    Credits,
  }, {
    contentComponent: CustomDrawerContentComponent
});

/**
 * Preloades everthing
 */
export default class App extends React.Component {
  state = {
    isReady: false,
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={this.setReady}
          onError={console.warn}
        />
      );
    }

    let statusbarStyles: any = { height: 24 };
    if (Constants.platform.ios !== undefined) {
      statusbarStyles = { height: 20, backgroundColor: 'rgba(0,0,0,0.2)' };
    }

    return (
    <LinearGradient
      colors={BackgroundColors}
      style={globalStyles.gardient}
    >
      <StatusBar barStyle="light-content" />
      <View style={statusbarStyles} />
      <DrawerNavigation
          ref={(navigatorRef: any) => {NavigationService.setTopLevelNavigator(navigatorRef)}}
      />
    </LinearGradient>
  );
  }

  @autobind
  private setReady() {
    this.setState({ isReady: true });
  }

  private async _cacheResourcesAsync(): Promise<void> {
    const images = [
      require('./assets/logo.png'),
      require('./assets/scanner.png'),
    ];
    const fonts = [
      (Ionicons as any).font,
      (Entypo as any).font,
      (MaterialCommunityIcons as any).font,
    ];

    const cacheFont = fonts.map(font => Font.loadAsync(font));

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
    await Promise.all(cacheFont);
  }
}
