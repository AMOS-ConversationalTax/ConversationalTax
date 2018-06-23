import React, { Component, ReactElement } from 'react'
import { Text, StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native'
import globalStyles from '../../../global_styles';
import autobind from 'autobind-decorator';
import NotificationListItem from './NotificationListItem';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';

/**
 * The property interface used in the class NotificationList
 * @interface IProps
 */
interface IProps {
    notifications: NotificationMessage[]
}

/**
 * Implements the notification list used by the notications view
 */
export default class NotificationList extends Component<IProps> {

    /**
     * Rendering function for the notification list
     * @returns {JSX.Element} The markup element that is displayed
     */
    public render(): JSX.Element {
        if (this.props.notifications.length === 0) {
            return (
                <View style={globalStyles.content}>
                    <Text style={styles.noNotifications}>Keine Benachrichtigungen!</Text>
                </View>
            );
        } else {
            return (
                <FlatList data={this.props.notifications} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
            );
        }
    }

    /**
     * Render a single list item
     * @param {ListRenderItemInfo<NotificationMessage>} item The item to render
     * @returns {ReactElement<any> | null} The single rendered item
     */
    @autobind
    private renderItem(item: ListRenderItemInfo<NotificationMessage>): ReactElement<any> | null {
        return <NotificationListItem notification={item.item} firstItem={item.index === 0} key={item.index}/>;
    }

    /**
     * Extracts the key of a single item (dummy - index will be return, too)
     * @param {NotificationMessage} item The item that owns the key that should be extracted
     * @param {number} index A help parameter (is equal to the key)
     * @returns {string} The key that is equal to index
     */
    @autobind
    private keyExtractor(item: NotificationMessage, index: number): string {
        return index.toString();
    }
}

/**
 * The styles that are used by the class NotificationList
 * @type {any}
 */
const styles = StyleSheet.create({
    noNotifications: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
});
