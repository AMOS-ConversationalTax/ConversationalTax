import 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import TopBar from './TopBar';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('TopBar', () => {
  let mockObj: { navigate: jest.Mock<{}> }

  beforeEach(() => {
    mockObj = {
      navigate: jest.fn()
    };
  });

  it('renders correctly', () => {
    renderer.create(
      <TopBar navigation={mockObj} />
    );
  });

  it('opens Drawer on menu press', () => {
    const testRenderer = renderer.create(
      <TopBar navigation={mockObj} />
    );

    const testInstance = testRenderer.root;
    const touchables = testInstance.findAllByType(TouchableWithoutFeedback);
    touchables[0].props.onPress();

    expect(mockObj.navigate.mock.calls.length).toBe(1);
    expect(mockObj.navigate.mock.calls[0][0]).toBe('DrawerOpen');
  });

  it('navigates to Notifications on bell press', () => {
    const testRenderer = renderer.create(
      <TopBar navigation={mockObj} />
    );

    const testInstance = testRenderer.root;
    const touchables = testInstance.findAllByType(TouchableWithoutFeedback);
    touchables[1].props.onPress();

    expect(mockObj.navigate.mock.calls.length).toBe(1);
    expect(mockObj.navigate.mock.calls[0][0]).toBe('Notifications');
  });
});

