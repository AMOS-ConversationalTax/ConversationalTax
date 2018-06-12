import 'react-native';
import React from 'react';
import ListItem from './ListItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('ListItem', () => {

  beforeEach(() => {
  });

  it('renders correctly', () => {
    renderer.create(
      <ListItem 
        query="Test"
        answer="Test"
        intent="Test"
        parameters={[]}
        timestamp={new Date()}
      />
    );
  });
});

