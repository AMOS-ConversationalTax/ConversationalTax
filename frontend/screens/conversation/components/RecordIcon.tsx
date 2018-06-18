import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, Animated, Easing } from 'react-native';
import Expo from 'expo';
import { Ionicons } from '@expo/vector-icons';
import global_styles from '../../../global_styles';
const { Lottie } = (Expo as any).DangerZone;

interface IProps {
    recording: boolean,
}

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Circle extends Component<IProps> {
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

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.recording !== this.props.recording) {
            clearInterval(this.timer);
            this.timer = setTimeout(() => { this.interval() }, 150);
        }
    }

    private interval() {
        this.state.progress.setValue(0.25);
        let timeout = this.props.recording? 1300 : 3000;
        let duration = this.props.recording? 1300 : 2000;
        this.recordingAnimation(duration);
        this.timer = setTimeout(() => { this.interval() }, timeout);
    }

    private recordingAnimation(duration: number) {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
        }).start();
    }


    render() {
        const iconColor = this.props.recording ? '#fff' : '#FF6C1A'
        const shadow = this.props.recording ? [global_styles.shadowBlur, {padding: 5}] : {};
        return (
            <View style={styles.container}>
                <View style={styles.absolutePos}>
                    <Lottie
                        //ref={(animation: any) => { this.animation = animation; }}
                        source={require('../../../assets/circle.json')}
                        //loop={false}
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

const circleSacling = 0.9;
const circleContainerSacling = 0.6;
const styles = StyleSheet.create({
    animationContainer: {
        position: 'relative',
        left: -3,
        top: 2,
        height: circleSacling * DEVICE_WIDTH,
        width: circleSacling * DEVICE_WIDTH,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: circleContainerSacling * DEVICE_WIDTH,
        width: circleContainerSacling * DEVICE_WIDTH,
    },
    absolutePos: {
        position: 'absolute',
    },
    childs: {

    }
});
