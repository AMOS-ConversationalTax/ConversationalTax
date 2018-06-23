import React, { Component } from 'react';
import globalStyles from '../global_styles';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { View } from 'react-native';

/**
 * The property interface used in the class Wrapper
 * @interface IProps
 */
interface IProps {
    showBars?: boolean,
}

/**
 * A general wrapper to use top and bottom bar by only adding one extra element to the other views
 */
export default class Wrapper extends Component<IProps> {

    /**
     * The rendering function for the Wrapper
     * @returns {JSX.Element} The markup element that is displayed
     */
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
