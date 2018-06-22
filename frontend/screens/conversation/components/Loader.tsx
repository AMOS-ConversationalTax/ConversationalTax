import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Expo from 'expo';

/**
 * A instance of Lottie for better animation
 * @type {any}
 */
const { Lottie }: any = (Expo as any).DangerZone;

/**
 * The property interface used in the class Loader
 * @interface IProps
 */
interface IProps {

}

/**
 * The width of the used device
 * @type {number}
 */
const DEVICE_WIDTH = Dimensions.get('window').width;

/**
 * Implements the Loading animation used in Conversation
 */
export default class Loader extends Component<IProps> {
    /**
     * Containing the animation object
     * @type {any}
     */
    private animation: any = null;

    /**
     * Handler for the compontentDidMount event
     */
    componentDidMount() {
        this._playAnimation();
    }

    /**
     * The rendering function for loading animation
     * @returns {JSX.Element} The markup element that is displayed
     */
    render(): JSX.Element {
        return (
            <View style={styles.animationContainer}>
                <Lottie
                    ref={(animation: any) => {this.animation = animation;}}
                    source={require('../../../assets/loader_ring.json')}
                    speed={0.75}
                />
            </View>
        );
    }

    /**
     * The function that has to be called to start playing the animation
     */
    _playAnimation = () => {
        this.animation.reset();
        this.animation.play();
    };
}

/**
 * The styles that are used by the loading animation
 * @type {any}
 */
const styles: any = StyleSheet.create({
    animationContainer: {
        height: 17 / 40 * DEVICE_WIDTH,
        width: 17 / 40 * DEVICE_WIDTH,
    },
});
