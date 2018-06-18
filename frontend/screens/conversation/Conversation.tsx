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

interface IProps {
}

export default class Conversation extends Component<IProps> {
  private readonly recordingService = new RecordingService();
  private readonly restClient = new RestConnection();
  private readonly speechService = new SpeechService();

  public render() {
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
