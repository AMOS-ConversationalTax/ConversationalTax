import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import Logo from '../../shared/Logo';
import TopBar from '../../shared/TopBar';
import BottomBar from '../../shared/BottomBar';
import globalStyles from '../../global_styles';
import autobind from 'autobind-decorator';

interface IProps {
  navigation: any
}

export default class Start extends Component<IProps> {

  public render() {
    return (
      <View style={[globalStyles.container, styles.container]}>
        <Text style={styles.logoText}>Conversational Tax</Text>
        <Logo style={styles.logo} scaling={1.5}/>
        <Button
          onPress={this.goHome}
          title="Los geht's"
        />
      </View>
    );
  }

  @autobind
  private goHome() {
    this.props.navigation.navigate('Conversation');
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 35,
  },
  logo: {
    margin: 60,
  }

});
