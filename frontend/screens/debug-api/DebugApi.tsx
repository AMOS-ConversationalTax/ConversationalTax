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

interface IProps {
  navigation: any
}

export default class DebugApi extends Component<IProps> {
  state = {
    path: '/',
    resText: '',
    resStatus: '',
  };

  public render() {
    return (
      <View style={globalStyles.container}>
        <TopBar navigation={this.props.navigation} />
        <View style={globalStyles.content}>
          <Text style={styles.welcome}>
            Path:
          </Text >
          <Picker 
            style={styles.picker}
            selectedValue={this.state.path}
            onValueChange={this.onPathSelected}
          >
            <Picker.Item label="GET:/" value="/" />
            <Picker.Item label="GET:/notImplemented" value="/notImplemented" />
          </Picker>
          <Button title="Query API" onPress={this.queryApi} />
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
        <BottomBar />
      </View>
    );
  }

  @autobind
  private onPathSelected(itemValue: string) {
    this.setState({ path: itemValue });
  }

  @autobind
  private queryApi() {
    this.setState({ resText: 'Loading...', resStatus: '' });
    request
      .get(`http://88.99.211.215:3010${this.state.path}`)
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
  }
});
