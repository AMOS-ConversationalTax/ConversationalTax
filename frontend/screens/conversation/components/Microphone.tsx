import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import autobind from 'autobind-decorator';

interface IProps {
}

export default class Microphone extends Component<IProps> {
    public render() {
        return (
            <View style={styles.view}>
                <TouchableWithoutFeedback 
                    onPressIn={this.onPressIn} 
                    onPressOut={this.onPressOut}
                    >
                    <View style={styles.circle}>
                        <Ionicons name="md-mic" size={75} color="#000" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    @autobind
    private onPressIn() {
        // console.log("Press in");
    }

    @autobind
    private onPressOut() {
        // console.log("Press out");
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    circle: {
        borderRadius: 75,
        width: 150,
        height: 150,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
    }
});