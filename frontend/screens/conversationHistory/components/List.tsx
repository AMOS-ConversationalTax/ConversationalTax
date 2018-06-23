import React, { Component, ReactElement } from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { ConversationHistoryInterface } from '../interfaces/ConversationHistory.interface';
import ListItem from './ListItem';
import autobind from 'autobind-decorator';

/**
 * The property interface used in the class List
 * @interface IProps
 */
interface IProps {
  data: ConversationHistoryInterface[],
}

/**
 * This class implements the conversationHistory List and its functionality
 * @class List
 */
export default class List extends Component<IProps> {

  /**
   * Extract the key of a single list item
   * @param {ConversationHistoryInterface} item The list item we want the key of
   * @returns {string} The key of the item
   */
  @autobind
  private keyExtractor (item: ConversationHistoryInterface): string {
    return item._id;
  } 

  /**
   * Render a single item
   * @param {ListRenderItemInfo<ConversationHistoryInterface>} item The item that is to be rendered 
   * @returns {ReactElement<any> | null} The rendered element
   */
  @autobind
  private renderItem(item: ListRenderItemInfo<ConversationHistoryInterface>): ReactElement<any> | null {
    return (
      <ListItem
        query={item.item.query}
        answer={item.item.answer}
        intent={item.item.intent.displayName}
        parameters={item.item.parameters}
        timestamp={new Date(item.item.timestamp)}
      />
    )
  }

  /**
   * The rendering function for the list
   * @returns {JSX.Element} The markup element that is displayed
   */
  public render(): JSX.Element {

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

/**
 * The styles that are used by the class List
 * @type {any}
 */
const styles: any = StyleSheet.create({
  notfound: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

