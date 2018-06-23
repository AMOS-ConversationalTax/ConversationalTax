import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConversationHistoryParametersInterface } from '../interfaces/ConversationHistoryParameters.interface';

/**
 * The property interface used in the class ListItem
 * @interface IProps
 */
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

  /**
   * The rendering function for a single ListItem
   * @returns {JSX.Element} The markup element that is displayed
   */
  public render() {

    let parameters: string = '';

    if (this.props.parameters.length === 0 ) {

      parameters = 'Keine Parameter erkannt';

    }

    for (let i = 0; i < this.props.parameters.length; i++) {

      if (i !== 0) {

        parameters = parameters + '\n';

      }

      const parameter = this.props.parameters[i].name + ' : ' + this.props.parameters[i].value;

      parameters = parameters + parameter;

    }

    return (
      <View style={styles.listitem}>
        <Text style={styles.time}>
          {this.props.timestamp.toLocaleString('de-DE')}
        </Text>
        <Text style={styles.description}>
          Gestellte bzw. verstandene Anfrage:
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
        <Text style={styles.description}>
          Erkannte Parameter:
        </Text>
        <Text style={styles.value}>
          {parameters}
        </Text>
      </View>
    );
  }

}

/**
 * The styles that are used by the class ListItem
 * @type {any}
 */
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
    color: '#333',
  },
  description: {
    fontSize: 10,
    textAlign: 'center',
    margin: 5,
    color: 'grey',
  },
});

