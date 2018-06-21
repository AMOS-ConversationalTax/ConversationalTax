import React, { Component } from 'react';
import {
  Image, Dimensions,
} from 'react-native';

interface IProps {
  scaling?: number,
  style?: object,
}

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Logo extends Component<IProps> {
  public render() {
    const scaling = this.props.scaling || 1;
    const style = this.props.style || {};
    const internalScaling = DEVICE_WIDTH / 170
    const height = 106 * internalScaling * scaling;
    const width = 170 * internalScaling * scaling;
    return (
        <Image
          style={[style, { width, height }]}
          source={require('../assets/logo.png')} 
        />
    );
  }
}
