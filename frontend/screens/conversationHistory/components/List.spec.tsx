import 'react-native';
import React from 'react';
import List from './List';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('List', () => {
  let mockObj: { navigate: jest.Mock<{}> }

  beforeEach(() => {
    mockObj = {
      navigate: jest.fn()
    };
  });

  it('renders correctly', () => {
    renderer.create(
      <List
        data={[]}
      />
    );
  });
});

