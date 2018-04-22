import React, { Component } from 'react';
import {
  Image,
} from 'react-native';

interface IProps {}

export default class App extends Component<IProps> {
  public render() {
    return (
        <Image
            style={{width: 170, height: 106}}
            source={require('../assets/logo.png')} />
    );
  }
}
