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

/**
 * The property interface used in the class Debug
 * @interface IProps
 */
interface IProps {
}

/**
 * Implements the Debug view
 */
export default class Debug extends Component<IProps> {

  /**
   * An instance of the RestConnection
   * @type {RestConnection}
   */
  private restClient: RestConnection = new RestConnection();

  /**
   * The state of the DebugView
   * @type {any}
   */
  state: any = {
    resText: '',
    resStatus: '',
  };

  /**
   * Rendering function for the debug view
   * @returns {JSX.Element} The markup element that is displayed
   */
  public render(): JSX.Element {
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

  /**
   * Send a request to the backend to check whether it is running
   */
  @autobind
  private queryApi() {
    this.setState({ resText: 'Loading...', resStatus: '' });
    request
      .get(Config.SERVER_URL)
      .then((res:request.Response) => {
        this.setState({ resText: res.text, resStatus: res.status });
      });
  }

  /**
   * Emit the test notifications to all users
   */
  @autobind
  private emitNoti() {
    this.restClient.emitDebugNotificationToAllUsers();
  }

}

/**
 * The styles that are used by the class Debug
 * @type {any}
 */
const styles: any = StyleSheet.create({
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
