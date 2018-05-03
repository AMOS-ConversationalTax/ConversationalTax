import 'react-native';
import React from 'react';
import Logo from './Logo';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Logo', () => {
  it('renders correctly', () => {
    renderer.create(
      <Logo />
    );
  });
});

