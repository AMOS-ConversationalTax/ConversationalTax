import 'react-native';
import React from 'react';
import Conversation from './Conversation';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Conversation', () => {
  let mockObj: { navigate: jest.Mock<{}> }

  beforeEach(() => {
    mockObj = {
      navigate: jest.fn()
    };
  });

  it('renders correctly', () => {
    renderer.create(
      <Conversation navigation={mockObj} />
    );
  });
});

