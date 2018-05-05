import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import autobind from 'autobind-decorator';

interface IProps {
}

export default class Microphone extends Component<IProps> {
    public render() {
        return (
            <View style={styles.view}>
                <TouchableOpacity onPress={this.onPress}>
                    <View style={styles.circle}>
                        <Ionicons name="md-mic" size={75} color="#000" />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    @autobind
    private onPress() {
        
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