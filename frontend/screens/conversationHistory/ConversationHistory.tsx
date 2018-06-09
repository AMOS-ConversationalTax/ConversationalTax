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
import RestConnection from '../../services/RestConnection';

interface IProps {
  navigation: any,
}

export default class ConversationHistory extends Component<IProps> {

  private readonly restClient = new RestConnection();

  public async componentDidMount() {

    const conversationHistory: any = await this.getConversationHistory();

    // Id of the conversation entry
    // console.log(conversationHistory[0]._id);

  }

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

  /**
   * Get the current conversation history of the user
   * @returns {Promise<any>} - A promise containing the conversation history json as string
   */
  public async getConversationHistory(): Promise<any> {

    return await this.restClient.getConversationHistory();

  }

}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});