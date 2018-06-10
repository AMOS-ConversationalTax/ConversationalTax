import React, { Component, ReactElement } from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { ConversationHistoryParametersInterface } from '../interfaces/ConversationHistoryParameters.interface';
import { ConversationHistoryInterface } from '../interfaces/ConversationHistory.interface';
import ListItem from './ListItem';
import autobind from 'autobind-decorator';

interface IProps {
  data: ConversationHistoryInterface[],
}

/**
 * This class implements the conversationHistory List and its functionality
 * @class List
 */
export default class List extends Component<IProps> {

  @autobind
  private keyExtractor (item: ConversationHistoryInterface): string {
    return item._id;
  } 

  @autobind
  private renderItem(item: ListRenderItemInfo<ConversationHistoryInterface>): ReactElement<any> | null {
    return (
      <ListItem
        query={item.item.query}
        answer={item.item.answer}
        intent={item.item.intent}
        parameters={item.item.parameters}
        timestamp={new Date(item.item.timestamp)}
      />
    )
  }

  public render() {

    // Only print a list if some entries are found
    if(this.props.data.length > 0) {

      return (
        <FlatList
          data={this.props.data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      );

    }

    return (
      <View>
        <Text style={styles.notfound}>
          Keine Einträge gefunden
        </Text>
      </View>
    );

  }

}

const styles = StyleSheet.create({
  notfound: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

