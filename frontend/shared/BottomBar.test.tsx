import 'react-native';
import React from 'react';
import BottomBar from './BottomBar';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('BottomBar', () => {
  it('renders correctly', () => {
    renderer.create(
      <BottomBar />
    );
  });
});

