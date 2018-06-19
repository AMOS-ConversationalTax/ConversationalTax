import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, Animated, Easing } from 'react-native';
import Expo from 'expo';
import { Ionicons } from '@expo/vector-icons';
const { Lottie } = (Expo as any).DangerZone;

interface IProps {
}

interface IState {
    progress: Animated.Value,
}

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class NotificationIcon extends Component<IProps, IState> {
    private timer: NodeJS.Timer;
    state = {
        progress: new Animated.Value(0),
    };

    componentDidMount() {
        this.timer = setTimeout(() => { this.interval() }, 500);
    }

    componentWillMount() {
        clearInterval(this.timer);
    }

    /**
     * Starts one run of the animation. Will call itself after a short timeout in order to achieve a loop.
     */
    private interval(): void {
        this.state.progress.setValue(0);
        this.recordingAnimation(2000);
        this.timer = setTimeout(() => { this.interval() }, 3000);
    }

    /**
     * Performs the actual animation
     * @param duration Speed/duration of the animation
     */
    private recordingAnimation(duration: number) {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
        }).start();
    }


    render() {
        return (
            <View style={{height: 35, width: 50, position: 'relative'}}>
                <Lottie
                    source={require('../assets/notification_white.json')}
                    style={styles.animationContainer}
                    progress={this.state.progress}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    animationContainer: {
        height: 300,
        width: 300,
        //backgroundColor: 'rgba(1,0,0,0.2)',
        position: 'absolute',
        top: 0,
        left: 0,
        transform: [{ translateX: -113 }, { translateY: -136 },]
    },
});
