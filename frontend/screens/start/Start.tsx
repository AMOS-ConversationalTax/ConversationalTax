import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import Logo from '../../shared/Logo';
import autobind from 'autobind-decorator';
import Wrapper from '../../shared/Wrapper';
import { Constants } from 'expo';
import global_styles from '../../global_styles';

interface IProps {
  navigation: any
}

export default class Start extends Component<IProps> {

  public render() {
    let buttonColor = '#EA9361';
    if (Constants.platform.ios !== undefined) {
      buttonColor = '#fff';
    }
    return (
      <Wrapper showBars={false} navigation={this.props.navigation}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={[styles.convText, global_styles.shadow]}>conversational</Text>
            <Text style={[styles.taxText, global_styles.shadow]}>Tax</Text>
          </View>
          <Logo style={styles.logo} scaling={0.9}/>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.goHome}
              title="Los geht's"
              color={buttonColor}
            />
          </View>

        </View>
      </Wrapper>
    );
  }

  @autobind
  private goHome() {
    this.props.navigation.navigate('Conversation');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
  },
  textContainer: {
    position: 'absolute',
    top: 50,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  convText: {
    fontSize: 35,
    color: '#fff',
    textAlign: 'right',
    lineHeight: 35,
  },
  taxText: {
    fontSize: 55,
    lineHeight: 60,
    color: '#fff',
    textAlign: 'right'
  },
  logo: {
    margin: 60,
  }

});
