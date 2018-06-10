import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ConversationHistoryParametersInterface } from '../interfaces/ConversationHistoryParameters.interface';

interface IProps {
  query: string,
  answer: string,
  intent: string,
  parameters: Array<ConversationHistoryParametersInterface>,
  timestamp: Date,
}

/**
 * This class implements the conversationHistory ListItem and its functionality
 * @class ListItem
 */
export default class ListItem extends Component<IProps> {

  public render() {
    return (
      <View>
        <Text style={{ color: "black" }}>
          {this.props.query}
        </Text>
        <Text style={{ color: "black" }}>
          {this.props.answer}
        </Text>
        <Text style={{ color: "black" }}>
          {this.props.intent}
        </Text>
        <Text style={{ color: "black" }}>
          {this.props.timestamp}
        </Text>
      </View>
    );
  }

}

