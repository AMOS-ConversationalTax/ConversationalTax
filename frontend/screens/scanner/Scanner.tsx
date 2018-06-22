import React, { Component } from 'react'
import { Image, View, Dimensions } from 'react-native'
import Wrapper from '../../shared/Wrapper';
import globalStyles from '../../global_styles';

/**
 * The property interface used in the class Scanner
 * @interface IProps
 */
interface IProps {
}

/**
 * The width of the used device
 * @type {number}
 */
const DEVICE_WIDTH: number = Dimensions.get('window').width;

/**
 * Implements the Scanner view of the app
 */
export default class Scanner extends Component<IProps> {

    /**
     * The rendering function for the scanner view
     * @returns {JSX.Element} The markup element that is displayed
     */
    render() {
        const scaling = 0.75
        const screenScaling = DEVICE_WIDTH / 375;
        const height = 667 * screenScaling * scaling;
        const width = 375 * screenScaling * scaling;
        return (
            <Wrapper>
                <View style={[globalStyles.content, { justifyContent: 'center'}]}>
                    <Image style={{ width, height }} source={require('../../assets/scanner.png')}/>
                </View>
            </Wrapper>
        );
    }
}