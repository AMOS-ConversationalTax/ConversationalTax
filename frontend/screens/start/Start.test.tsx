import 'react-native';
import { Button } from 'react-native';
import React from 'react';
import Start from './Start';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Start', () => {
  let mockObj: { navigate: jest.Mock<{}> }

  beforeEach(() => {
    mockObj = {
      navigate: jest.fn()
    };
  });

  it('renders correctly', () => {
    renderer.create(
      <Start navigation={mockObj} />
    );
  });


  it('navigates to Home on Button press', () => {
    const testRenderer = renderer.create(
      <Start navigation={mockObj} />
    );

    const testInstance = testRenderer.root;
    const touchables = testInstance.findAllByType(Button);
    touchables.forEach(touchable => {
      touchable.props.onPress();
    });

    expect(mockObj.navigate.mock.calls.length).toBe(1);
    expect(mockObj.navigate.mock.calls[0][0]).toBe('Conversation');
  });
});