import 'react-native';
import React from 'react';
import ListItem from './ListItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('ListItem', () => {
  let mockObj: { navigate: jest.Mock<{}> }

  beforeEach(() => {
    mockObj = {
      navigate: jest.fn()
    };
  });

  it('renders correctly', () => {
    renderer.create(
      <ListItem 
        query=""
        answer=""
        intent=""
        parameters={[{name: "", value: ""}]}
        timestamp={new Date()}
      />
    );
  });
});

