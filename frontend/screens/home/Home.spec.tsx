import 'react-native';
import React from 'react';
import Home from './Home';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Home', () => {
  let mockObj: { navigate: jest.Mock<{}> }

  beforeEach(() => {
    mockObj = {
      navigate: jest.fn()
    };
  });

  it('renders correctly', () => {
    renderer.create(
      <Home navigation={mockObj} />
    );
  });
});

