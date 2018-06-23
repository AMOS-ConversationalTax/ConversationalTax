import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../shared/Logo';
import autobind from 'autobind-decorator';
import global_styles from '../../global_styles';
import { NavigationService } from '../../services/NavigationService';

/**
 * The property interface used in the class Start
 * @interface IProps
 */
interface IProps {
}

/**
 * Implements the start screen
 */
export default class Start extends Component<IProps> {

  /**
   * The rendering function for the start screen
   * @returns {JSX.Element} The markup element that is displayed
   */
  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={[styles.convText, global_styles.shadow]}>conversational</Text>
          <Text style={[styles.taxText, global_styles.shadow]}>Tax</Text>
        </View>
        <Logo style={styles.logo} scaling={0.9}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.goHome}>
            <View style={styles.textContainer}>
              <Text style={[global_styles.shadow, styles.text]}>
                Los geht's
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /**
   * Implements the functionality of the "home button"
   */
  @autobind
  private goHome() {
    NavigationService.navigate('Conversation');
  }

}

/**
 * The styles that are used by the class Start
 * @type {any}
 */
const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 70,
  },
  logoContainer: {
    position: 'absolute',
    top: 50,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    
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
