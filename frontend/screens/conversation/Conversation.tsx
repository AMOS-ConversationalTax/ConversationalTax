import React, { Component } from 'react';
import {
  View
} from 'react-native';
import globalStyles from '../../global_styles';
import Microphone from './components/Microphone';
import RecordingService from '../../services/RecordingService';
import RestConnection from '../../services/RestConnection';
import SpeechService from './../../services/SpeechService';
import Wrapper from '../../shared/Wrapper';

/**
 * The property interface used in the class Conversation
 * @interface IProps
 */
interface IProps {
}

/**
 * Implements the conversation view of the app
 */
export default class Conversation extends Component<IProps> {

  /**
   * A instance of the recordingService
   * @type {RecordingService}
   */
  private readonly recordingService: RecordingService = new RecordingService();

  /**
   * A instance of the RestClient
   * @type {RestClient}
   */
  private readonly restClient: RestConnection = new RestConnection();

  /**
   * A instance of the SpeechService
   * @type {SpeechService}
   */
  private readonly speechService: SpeechService = new SpeechService();

  /**
   * The rendering function for the conversation view
   * @returns {JSX.Element} The markup element that is displayed
   */
  public render(): JSX.Element {
    return (
      <Wrapper>
        <View style={globalStyles.content}>
          <Microphone 
            recordingService={this.recordingService}
            restClient={this.restClient}
            speechService={this.speechService}
          />
        </View>
      </Wrapper>
    );
  }
}
