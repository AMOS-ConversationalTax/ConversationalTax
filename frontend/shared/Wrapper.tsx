import React, { Component } from 'react';
import { LinearGradient, Constants } from 'expo';
import globalStyles, { BackgroundColors } from '../global_styles';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { StatusBar, View } from 'react-native';

interface IProps {
    showBars?: boolean,
}

export default class Wrapper extends Component<IProps> {
    public render() {
        return (
            <View style={globalStyles.gardient}>
                <TopBar/>
                {this.props.children}
                <BottomBar/>
            </View>
        );
    }
}
