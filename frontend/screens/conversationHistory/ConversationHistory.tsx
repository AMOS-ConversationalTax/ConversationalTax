import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  FlatList,
} from 'react-native';
import TopBar from '../../shared/TopBar';
import BottomBar from '../../shared/BottomBar';
import globalStyles from '../../global_styles';
import RestConnection from '../../services/RestConnection';
import List from './components/List';
import { ConversationHistoryParametersInterface } from './interfaces/ConversationHistoryParameters.interface';
import { ConversationHistoryInterface } from './interfaces/ConversationHistory.interface';

interface IProps {
  navigation: any,
}

interface IState {
  data: ConversationHistoryInterface[],
}

/**
 * This class implements the ConversationHistory and its functionality
 * @class ConversationHistory
 */
export default class ConversationHistory extends Component<IProps, IState> {

  private readonly restClient: RestConnection = new RestConnection();

  /**
   * Initializes an instance of ConversationHistory
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      data: [],
    };
  }

  /**
   * Handler that is called short before the component is mounted
   */
  async componentWillMount() {

    let history: ConversationHistoryInterface[] = await this.getConversationHistory();

    this.setState({
      data: history,
    });

  }

  /**
   * Rendering function for the ConversationHistory
   */
  public render() {

    return (
      <View style={globalStyles.container}>
        <TopBar navigation={this.props.navigation} />
        <View style={globalStyles.content}>
          <List data={this.state.data} />
        </View>
        <BottomBar />
      </View>
    );
  }

  /**
   * Get the current conversation history of the user
   * @returns {Promise<Array<ConversationHistoryInterface>>} - A promise containing the conversation history json as string
   */
  private async getConversationHistory(): Promise<Array<ConversationHistoryInterface>> {

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