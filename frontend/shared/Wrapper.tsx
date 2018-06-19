import React, { Component } from 'react';
import globalStyles from '../global_styles';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { View } from 'react-native';

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
