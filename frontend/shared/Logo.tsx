import React, { Component } from 'react';
import {
  Image, Dimensions,
} from 'react-native';

/**
 * The property interface used in the class Logo
 * @interface IProps
 */
interface IProps {
  scaling?: number,
  style?: object,
}

/**
 * The width of the used device
 * @type {number}
 */
const DEVICE_WIDTH = Dimensions.get('window').width;

/**
 * Implements the Logo that can be seen a several views
 */
export default class Logo extends Component<IProps> {

  /**
   * The rendering function for the logo
   * @returns {JSX.Element} The markup element that is displayed
   */
  public render(): JSX.Element {
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
