import React, { Component } from 'react';
import { LinearGradient, Constants } from 'expo';
import globalStyles, { BackgroundColors } from '../global_styles';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { RegisteredStyle, ViewStyle, StatusBar, View } from 'react-native';

interface IProps {
    showBars?: boolean,
    navigation: any
}

export default class Wrapper extends Component<IProps> {
    public render() {
        let topBar = null;
        let bottomBar = null;
        if (this.props.showBars !== false) {
            topBar = <TopBar navigation={this.props.navigation} />;
            bottomBar = <BottomBar />;
        }
        let statusbarStyles: any = { height: 24 };
        if (Constants.platform.ios !== undefined) {
            statusbarStyles = { height: 20, backgroundColor: 'rgba(0,0,0,0.2)' };
        }
        return (
            <LinearGradient 
                colors={BackgroundColors} 
                style={globalStyles.gardient}
            >
                <StatusBar barStyle="light-content"/>
                <View style={statusbarStyles} />
                {topBar}
                {this.props.children}
                {bottomBar}
            </LinearGradient>
        );
    }
}
