import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ConversationHistoryParametersInterface } from '../interfaces/ConversationHistoryParameters.interface';
import { ConversationHistoryInterface } from '../interfaces/conversationHistory.interface';
import ListItem from './ListItem';

interface IProps {
  data: Array<ConversationHistoryInterface>,
}

/**
 * This class implements the conversationHistory List and its functionality
 * @class List
 */
export default class List extends Component<IProps> {

  public render() {

    let list: JSX.Element = <View></View>;

    for(let i = 0; i < this.props.data.length; i++) {

      list = <ListItem 
                query={this.props.data[i].query}
                answer={this.props.data[i].answer}
                intent={this.props.data[i].intent}
                parameters={this.props.data[i].parameters}
                timestamp={this.props.data[i].timestamp}
              />;

    }

    return list;
  }

}

