import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      <View style={styles.listitem}>
        <Text style={styles.time}>
          {this.props.timestamp}
        </Text>
        <Text style={styles.description}>
          Gestellte Anfrage:
        </Text>
        <Text style={styles.value}>
          {this.props.query}
        </Text>
        <Text style={styles.description}>
          Antwort von Dialogflow:
        </Text>
        <Text style={styles.value}>
          {this.props.answer}
        </Text>
        <Text style={styles.description}>
          Erkannter Intent:
        </Text>
        <Text style={styles.value}>
          {this.props.intent}
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  listitem: {
    margin: 10,
    paddingBottom: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  time: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    color: 'grey',
  },
  value: {
    fontSize: 15,
    textAlign: 'center',
    margin: 5,
    color: 'black',
  },
  description: {
    fontSize: 10,
    textAlign: 'center',
    margin: 5,
    color: 'grey',
  },
});

