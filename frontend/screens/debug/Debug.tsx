import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Picker
} from 'react-native';
import TopBar from '../../shared/TopBar';
import BottomBar from '../../shared/BottomBar';
import globalStyles from '../../global_styles';
import autobind from 'autobind-decorator';
import * as request from 'superagent';
import Config from '../../config/config';

interface IProps {
  navigation: any
}

export default class Debug extends Component<IProps> {
  state = {
    resText: '',
    resStatus: '',
  };

  public render() {
    const buildDate = Config.BUILD_DATE.includes('WillBeReplacedAutomatically') ? 'Unkown' : Config.BUILD_DATE;
    return (
      <View style={globalStyles.container}>
        <TopBar navigation={this.props.navigation} />
        <View style={globalStyles.content}>
          <Text style={styles.welcome}>
            Backend IP: {Config.SERVER_URL}
          </Text >
          <Text style={styles.welcome}>
            Build date: {buildDate}
          </Text >
          <View style={styles.topMargin}>
            <Button title="Check if Backend is running" onPress={this.queryApi} />
            <Text style={styles.welcome}>
              Response:
            </Text >
            <Text >
              Status-Code: {this.state.resStatus}
            </Text >
            <Text >
              {this.state.resText}
            </Text >
          </View>
        </View>
        <BottomBar />
      </View>
    );
  }

  @autobind
  private queryApi() {
    this.setState({ resText: 'Loading...', resStatus: '' });
    request
      .get(Config.SERVER_URL)
      .then((res:request.Response) => {
        this.setState({ resText: res.text, resStatus: res.status });
      });
  }

}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  picker: {
    width: 300,
  },
  topMargin: {
    marginTop: 50,
  }
});
