import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import globalStyles from '../../global_styles';
import Wrapper from '../../shared/Wrapper';

interface IProps {
  navigation: any
}

export default class Home extends Component<IProps> {

  public render() {
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

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
