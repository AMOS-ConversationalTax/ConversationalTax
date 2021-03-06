import 'react-native';
import React from 'react';
import Microphone from './Microphone';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import RecordingService from '../../../services/RecordingService';
import RestConnection from '../../../services/RestConnection';
import SpeechService from '../../../services/SpeechService';

describe('Microphone', () => {
  it('renders correctly', () => {
    const recordingService = new RecordingService();
    const restClient = new RestConnection();
    const speechService = new SpeechService();

    renderer.create(
      <Microphone
        recordingService={recordingService}
        restClient={restClient}
        speechService={speechService}
      />
    );
  });
});

