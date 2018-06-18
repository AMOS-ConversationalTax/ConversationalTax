import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import autobind from 'autobind-decorator';
import { NavigationService } from '../services/NavigationService';

interface IProps {
    title: string;
}

export default class RoundContentWrapper extends Component<IProps> {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <TouchableOpacity onPress={this.navigateToNotifications}>
                        <View style={[styles.icon]}>
                            <Ionicons name="ios-arrow-back" size={25} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
                {this.props.children}
            </View>
        )
    }

    @autobind
    private navigateToNotifications() {
        console.log('Test');
        NavigationService.goBack();
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        margin: 15,
        marginTop: 0,
        flex: 1,
        borderRadius: 5,
    },
    title: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.25)',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,1)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    titleText: {
        paddingTop: 20,
        fontSize: 20,
    },
    icon: {
        padding: 20
    }
});