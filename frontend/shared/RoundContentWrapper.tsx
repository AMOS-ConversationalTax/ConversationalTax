import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import autobind from 'autobind-decorator';
import { NavigationService } from '../services/NavigationService';

/**
 * The property interface used in the class RoundContentWrapper
 * @interface IProps
 */
interface IProps {
    title: string;
}

/**
 * A round wrapper to display content in a more beautiful way (e.g. the conversation history)
 */
export default class RoundContentWrapper extends Component<IProps> {

    /**
     * The rendering function for the roundContentWrapper
     * @returns {JSX.Element} The markup element that is displayed
     */
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.title}>
                    <TouchableOpacity onPress={this.navigateBack}>
                        <View style={[styles.icon]}>
                            <Ionicons name="ios-arrow-back" size={25} color="#FF6C1A" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
                {this.props.children}
            </View>
        )
    }

    /**
     * Close the roundContentWrapper and navigate back to the last seen screen
     */
    @autobind
    private navigateBack() {
        NavigationService.goBack();
    }
}

/**
 * The styles that are used by the class RoundContentWrapper
 * @type {any}
 */
const styles: any = StyleSheet.create({
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