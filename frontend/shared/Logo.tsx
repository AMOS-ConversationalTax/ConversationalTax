import React, { Component } from 'react';
import {
  Image,
} from 'react-native';

interface IProps {
  height?: number,
  width?: number,
  scaling?: number,
  style?: object,
}

export default class Logo extends Component<IProps> {
  public render() {
    const scaling = this.props.scaling || 1;
    const style = this.props.style || {};
    const height = (this.props.height || 106) * scaling;
    const width = (this.props.width || 170) * scaling;
    return (
        <Image
          style={[style, { width, height }]}
          source={require('../assets/logo.png')} 
        />
    );
  }
}
