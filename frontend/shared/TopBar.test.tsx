import 'react-native';
import React from 'react';
import TopBar from './TopBar';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('TopBar', () => {

  it('renders correctly', () => {
    renderer.create(
      <TopBar />
    );
  });
});

