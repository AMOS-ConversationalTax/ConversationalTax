import React, { Component } from 'react'
import { Image, View, Dimensions } from 'react-native'
import Wrapper from '../../shared/Wrapper';
import globalStyles from '../../global_styles';

interface IProps {
    navigation: any;
}

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Scanner extends Component<IProps> {
    render() {
        const scaling = 0.75
        const screenScaling = DEVICE_WIDTH / 375;
        const height = 667 * screenScaling * scaling;
        const width = 375 * screenScaling * scaling;
        return (
            <Wrapper navigation={this.props.navigation}>
                <View style={[globalStyles.content, { justifyContent: 'center'}]}>
                    <Image style={{ width, height }} source={require('../../assets/scanner.png')}/>
                </View>
            </Wrapper>
        );
    }
}