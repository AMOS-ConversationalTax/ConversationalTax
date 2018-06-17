import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IProps {}

export default class BottomBar extends Component<IProps> {
  public render() {
    return (
      <View> 
        <View style={styles.topBar}>
          <Text/>
          <Ionicons name="md-qr-scanner" size={30} color="#fff" />
          <Text/>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});