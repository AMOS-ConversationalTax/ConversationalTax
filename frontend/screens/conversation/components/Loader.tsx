import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Expo from 'expo';
const { Lottie } = (Expo as any).DangerZone;

interface IProps {

}

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Loader extends Component<IProps> {
    private animation: any = null;

    componentDidMount() {
        this._playAnimation();
    }

    render() {
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

    _playAnimation = () => {
        this.animation.reset();
        this.animation.play();
    };
}

const styles = StyleSheet.create({
    animationContainer: {
        height: 17 / 40 * DEVICE_WIDTH,
        width: 17 / 40 * DEVICE_WIDTH,
    },
});
