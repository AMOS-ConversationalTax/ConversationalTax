import 'react-native';
import React from 'react';
import Notifications from './Notifications';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Notifications', () => {
  let mockObj: { navigate: jest.Mock<{}> }

  beforeEach(() => {
    mockObj = {
      navigate: jest.fn()
    };
  });

  it('renders correctly', () => {
    renderer.create(
      <Notifications navigation={mockObj} />
    );
  });
});

