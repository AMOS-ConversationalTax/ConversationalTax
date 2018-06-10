import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ConversationHistoryParametersInterface } from '../interfaces/ConversationHistoryParameters.interface';
import { ConversationHistoryInterface } from '../interfaces/ConversationHistory.interface';
import ListItem from './ListItem';

interface IProps {
  data: Array<ConversationHistoryInterface>,
}

/**
 * This class implements the conversationHistory List and its functionality
 * @class List
 */
export default class List extends Component<IProps> {

  _keyExtractor = (item: ConversationHistoryInterface) => item._id;

  _renderItem = (item: ConversationHistoryInterface) => (
    <ListItem 
      query={item.query}
      answer={item.answer}
      intent={item.intent}
      parameters={item.parameters}
      timestamp={item.timestamp}
    />
  );

  public render() {

    // Only print a list if some entries are found
    if(this.props.data.length > 0)
    {
      /*
      return (
        <FlatList
          data={this.props.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      );
      */
      return(this._renderItem(this.props.data[0]));

    }

    return (
      <View>
        <Text style={styles.notfound}>
          Keine Einträge gefunden
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  notfound: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

