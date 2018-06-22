import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import globalStyles from '../../global_styles';
import Wrapper from '../../shared/Wrapper';

/**
 * The property interface used in the class Home
 * @interface IProps
 */
interface IProps {
  navigation: any
}

/**
 * Implements the home view
 */
export default class Home extends Component<IProps> {

  /**
   * Rendering function for the home view
   * @returns {JSX.Element} The markup element that is displayed
   */
  public render(): JSX.Element {
    return (
      <Wrapper>
        <View style={globalStyles.content}>
          <Text style={styles.welcome}>
            Home
          </Text>
        </View>
      </Wrapper>
    );
  }

}

/**
 * The styles that are used by the class Home
 * @type {any}
 */
const styles: any = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
