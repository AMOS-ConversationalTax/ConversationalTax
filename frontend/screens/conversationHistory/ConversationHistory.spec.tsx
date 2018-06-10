import 'react-native';
import React from 'react';
import ConversationHistory from './ConversationHistory';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('ConversationHistory', () => {
  let mockObj: { navigate: jest.Mock<{}> }

  beforeEach(() => {
    mockObj = {
      navigate: jest.fn()
    };
  });

  it('renders correctly', () => {
    renderer.create(
      <ConversationHistory navigation={mockObj} />
    );
  });
});

