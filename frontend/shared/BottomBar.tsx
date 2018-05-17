import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StatusBar,
  StyleSheet
} from 'react-native';

interface IProps {}

export default class BottomBar extends Component<IProps> {
  public render() {
    return (
      <View> 
        <View style={styles.topBar}>
          <Text>Left</Text>
          <Text>Center</Text>
          <Text>Right</Text>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});