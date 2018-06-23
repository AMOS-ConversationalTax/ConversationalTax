import 'react-native';
import { Button } from 'react-native';
import React from 'react';
import Start from './Start';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Start', () => {

  it('renders correctly', () => {
    renderer.create(
      <Start />
    );
  });
});