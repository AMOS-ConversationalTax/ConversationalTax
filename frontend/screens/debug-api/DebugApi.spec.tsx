import 'react-native';
import React from 'react';
import DebugApi from './DebugApi';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('DebugApi', () => {
  let mockObj: { navigate: jest.Mock<{}> }

  beforeEach(() => {
    mockObj = {
      navigate: jest.fn()
    };
  });

  it('renders correctly', () => {
    renderer.create(
      <DebugApi navigation={mockObj} />
    );
  });
});

