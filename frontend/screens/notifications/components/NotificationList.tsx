import React, { Component, ReactElement } from 'react'
import { Text, StyleSheet, View, FlatList, ListRenderItem, ListRenderItemInfo } from 'react-native'
import globalStyles from '../../../global_styles';
import autobind from 'autobind-decorator';
import NotificationListItem from './NotificationListItem';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';

interface IProps {
    notifications: NotificationMessage[]
}

export default class NotificationList extends Component<IProps> {
    public render() {
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

    @autobind
    private renderItem(item: ListRenderItemInfo<NotificationMessage>): ReactElement<any> | null {
        return <NotificationListItem notification={item.item} firstItem={item.index === 0} key={item.index}/>;
    }

    @autobind
    private keyExtractor(item: NotificationMessage, index: number): string {
        return index.toString();
    }
}

const styles = StyleSheet.create({
    noNotifications: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
});
