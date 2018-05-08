import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Logo from '../components/Logo';
import RestConnection from '../services/RestConnection';

interface IProps {}

export default class App extends Component<IProps> {

  public bar = new RestConnection();

public componentDidMount() {
  this.bar.read().then(
    (val) => {console.log(val);}
  );
  const dummydataCreate = {title: 'foo', body: 'bar', userId: 1};
  this.bar.create(dummydataCreate).then(
    (val) => {console.log(val);}
  );
  const dummydataUpdate = {id: 1, title: 'foo', body: 'bar', userId: 1};
  this.bar.update(dummydataUpdate).then(
    (val) => {console.log(val);}
  );
  this.bar.delete().then(
    (val) => {console.log(val);}
  );

}

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to ConversationalTax!
        </Text>
        <Logo></Logo>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
