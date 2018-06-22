import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, Animated, Easing } from 'react-native';
import Expo from 'expo';
import { Ionicons } from '@expo/vector-icons';
import global_styles from '../../../global_styles';

/**
 * A instance of Lottie for better animation
 * @type {any}
 */
const { Lottie } = (Expo as any).DangerZone;

/**
 * The property interface used in the class Circle
 * @interface IProps
 */
interface IProps {
    recording: boolean,
}

/**
 * The state interface used in the class Circle
 * @interface IState
 */
interface IState {
    progress: Animated.Value,
}

/**
 * The width of the used device
 * @type {number}
 */
const DEVICE_WIDTH = Dimensions.get('window').width;

/**
 * Implements the Recording icon and its animation used in Conversation
 */
export default class Circle extends Component<IProps, IState> {
    /**
     * A timer to set timeouts
     * @type {NodeJS.Timer}
     */
    private timer: NodeJS.Timer;

    /**
     * The current state of the circle
     * @type {IState}
     */
    state: IState = {
        progress: new Animated.Value(0),
    };

    /**
     * Handler for the compontentDidMount event
     */
    componentDidMount() {
        this.timer = setTimeout(() => { this.interval() }, 500);
    }

    /**
     * Handler for the compontentWillMount event
     */
    componentWillMount() {
        clearInterval(this.timer);
    }

    /**
     * Handler for the compontentWillReceiveProps event
     * @param {IProps} nextProps The next props to be displayed
     */
    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.recording !== this.props.recording) {
            clearInterval(this.timer);
            this.timer = setTimeout(() => { this.interval() }, 150);
        }
    }

    /**
     * Starts one run of the animation. Will call itself after a short timeout in order to achieve a loop.
     */
    private interval(): void {
        this.state.progress.setValue(0.25);
        let timeout = this.props.recording? 1300 : 3000;
        let duration = this.props.recording? 1300 : 2000;
        this.recordingAnimation(duration);
        this.timer = setTimeout(() => { this.interval() }, timeout);
    }

    /**
     * Performs the actual animation
     * @param {number} duration Speed/duration of the animation
     */
    private recordingAnimation(duration: number) {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
        }).start();
    }

    /**
     * Render the Circle component
     * @returns {JSX.Element} The markup element that is displayed
     */
    render(): JSX.Element {
        const iconColor = this.props.recording ? '#fff' : '#FF6C1A'
        const shadow = this.props.recording ? [global_styles.shadowBlur, {padding: 5}] : {};
        return (
            <View style={styles.container}>
                <View style={styles.absolutePos}>
                    <Lottie
                        source={require('../../../assets/circle.json')}
                        style={styles.animationContainer}
                        progress={this.state.progress}
                    />
                </View>

                <View style={styles.absolutePos}>
                    <View style={styles.childs}>
                        <Text style={shadow}>
                            <Ionicons name={'ios-mic'} size={75 / 400 * DEVICE_WIDTH} color={iconColor} />
                        </Text>
                        
                    </View>
                </View>
            </View>
        );
    }

}

/**
 * The circle scaling
 */
const circleScaling = 0.9;

/**
 * The container scaling
 */
const circleContainerScaling = 0.6;

/**
 * The styles that are used by the class Circle
 * @type {any}
 */
const styles = StyleSheet.create({
    animationContainer: {
        position: 'relative',
        left: -3,
        top: 2,
        height: circleScaling * DEVICE_WIDTH,
        width: circleScaling * DEVICE_WIDTH,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: circleContainerScaling * DEVICE_WIDTH,
        width: circleContainerScaling * DEVICE_WIDTH,
    },
    absolutePos: {
        position: 'absolute',
    },
    childs: {

    }
});
