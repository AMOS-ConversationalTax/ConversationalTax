/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 */

import { DrawerNavigator } from 'react-navigation';
import Start from './screens/start/Start';
import Conversation from './screens/conversation/Conversation';
import ConversationHistory from './screens/conversationHistory/ConversationHistory';
import Notifications from './screens/notifications/Notifications';
import Debug from './screens/debug/Debug';

export default DrawerNavigator({

  Start: {
    screen: Start,
  },
  Conversation:  {
    screen: Conversation,
  },
  ConversationHistory:  {
    screen: ConversationHistory,
  },
  Notifications: {
    screen: Notifications,
  },
  Debug: {
    screen: Debug,
  }
});
