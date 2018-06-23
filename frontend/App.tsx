/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 */

import React from 'react';
import { Asset, AppLoading, Font, LinearGradient, Constants, Audio } from 'expo';
import autobind from 'autobind-decorator';
import Start from './screens/start/Start';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Conversation from './screens/conversation/Conversation';
import ConversationHistory from './screens/conversationHistory/ConversationHistory';
import Notifications from './screens/notifications/Notifications';
import Debug from './screens/debug/Debug';
import Scanner from './screens/scanner/Scanner';
import { createDrawerNavigator, NavigationContainer } from 'react-navigation';
import globalStyles, { BackgroundColors } from './global_styles';
import { View, StatusBar } from 'react-native';
import CustomDrawerContentComponent from './shared/DrawerNavigationContent';
import { NavigationService } from './services/NavigationService';
import Credits from './screens/credits/Credits';

//Set up Audio
Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
});

/**
 * A simple navigation container
 * (Add screens that should be routable.)
 * @type {NavigationContainer}
 */
const DrawerNavigation: NavigationContainer = createDrawerNavigator({
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
 * The main class that loads the whole application
 */
export default class App extends React.Component {

  /**
   * The state of the app
   */
  state: any = {
    isReady: false,
  };

  /**
   * The rendering function for the app
   * @returns {JSX.Element} The markup element that is displayed
   */
  render(): JSX.Element {
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

  /**
   * Function to set the app on state ready
   */
  @autobind
  private setReady() {
    this.setState({ isReady: true });
  }

  /**
   * This loads the needed images an other ressources into cache
   */
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
