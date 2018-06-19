import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import globalStyles from '../../global_styles';
import autobind from 'autobind-decorator';
import * as request from 'superagent';
import Config from 'conv-tax-shared/config/config';
import RestConnection from './../../services/RestConnection';
import Wrapper from '../../shared/Wrapper';

interface IProps {
}

export default class Debug extends Component<IProps> {
  private restClient = new RestConnection();
  state = {
    resText: '',
    resStatus: '',
  };

  public render() {
    const buildDate = Config.BUILD_DATE.includes('WillBeReplacedAutomatically') ? 'Unkown' : Config.BUILD_DATE;
    return (
      <Wrapper>
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
          <View style={styles.topMargin}>
            <Button title="Emit a Notification to all connected users" onPress={this.emitNoti} />
          </View>
        </View>
      </Wrapper>
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

  @autobind
  private emitNoti() {
    this.restClient.emitDebugNotificationToAllUsers();
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
