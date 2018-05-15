import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';
import autobind from 'autobind-decorator';
import Expo, { Audio, Permissions, FileSystem } from 'expo';
import * as fs from 'fs';
import RestConnection from '../../../services/RestConnection';


interface IProps {
}

/**
 * Custom recording settings
 */
export const RECORDING_OPTIONS_CUSTOM: Expo.Audio.RecordingOptions = {
    android: {
        extension: '.awb',
        outputFormat: Expo.Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB,
        audioEncoder: Expo.Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 128000,
    },
    ios: {
        extension: '.pcm',
        outputFormat: Expo.Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
        audioQuality: Expo.Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

/**
 * This class implements the Microphone button and its functionality
 * @class Microphone
 */
export default class Microphone extends Component<IProps> {

    /**
     * Save the initial states
     */
    state = {
        haveRecordingPermissions: false,
        waitingForRecordActive: false,
        recordingActive: false,
        processingActive: false,
    }

    /**
     * The recording object for Expo.io
     * @name Microphone#recordingObject
     * @type {Audio.Recording | null}
     */
    private recordingObject: Audio.Recording | null = null;

    /**
     * Minimal recording time in ms
     * Min has to be above 300ms due to https://github.com/expo/expo/issues/1709
     * @name Microphone#recordingObject
     * @type {Audio.Recording | null}
     */
    private minRecordingTime: number = 500;

    /**
     * Create a Microphone object
     * @param {IProps} props - The props of the parent object
     */
    constructor(props: IProps) {
        super(props);

        // Ask for recording permissions for the first time
        this.askForPermissions();
    }

    /**
     * Render the Microphone component
     */
    public render() {

        if (this.state.waitingForRecordActive) {

            return (
                <View style={styles.view}>
                    <TouchableWithoutFeedback
                        onPressIn={this.onPressIn}
                        onPressOut={this.onPressOut}
                    >
                        <View style={styles.circleBorderWaiting}>
                            <View style={styles.circle}>
                                <Ionicons name="md-mic" size={75} color="#000" />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );

        } else if (this.state.recordingActive) {

            return (
                <View style={styles.view}>
                    <TouchableWithoutFeedback
                        onPressIn={this.onPressIn}
                        onPressOut={this.onPressOut}
                    >
                        <View style={styles.circleBorderActive}>
                            <View style={styles.circle}>
                                <Ionicons name="md-mic" size={75} color="#000" />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );

        } else if (this.state.processingActive) {

            return (
                <View style={styles.view}>
                    <TouchableWithoutFeedback
                        disabled={true}
                    >
                        <View style={styles.circleBorderProcessing}>
                            <View style={styles.circle}>
                                <Ionicons name="md-mic" size={75} color="#000" />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );

        } else {

            return (
                <View style={styles.view}>
                    <TouchableWithoutFeedback
                        onPressIn={this.onPressIn}
                        onPressOut={this.onPressOut}
                    >
                        <View style={styles.circleBorderAlternative}>
                            <View style={styles.circle}>
                                <Ionicons name="md-mic" size={75} color="#000" />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );

        }
    }

    /**
     * Recording is in need of seperate permissions - This function asks for them
     */
    private async askForPermissions() {

        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

        if (response.status === 'granted') {

            // Set the button active
            this.setState({
                haveRecordingPermissions: true,
                waitingForRecordActive: true,
            });

        }

    }

    /**
     * Handler for the PressIn Event of the Microphone button
     */
    @autobind
    private async onPressIn() {

        // console.log('In');

        // Start the new recording
        this.startANewRecording();

    }

    /**
     * Handler for the PressOut Event of the Microphone button
     */
    @autobind
    private async onPressOut() {

        // console.log('Out');

        // End the recording
        if (this.state.recordingActive) {

            this.endARecording();

        } else {

            // There is some rare case there button is released before recording is active
            // In this case it is necessary to wait some ms
            setTimeout(this.onPressOut, 20);

        }

    }

    /**
     * Starts a new recording if no other recording is running or processing
     */
    private async startANewRecording() {

        if (this.state.waitingForRecordActive) {

            // Set the button on not waiting for record
            this.setState({
                waitingForRecordActive: false,
            });

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            });

            // Create a new object
            let recording: Audio.Recording = new Audio.Recording();

            // Expo Audio requires to prepare before recording audio
            await recording.prepareToRecordAsync(JSON.parse(JSON.stringify(RECORDING_OPTIONS_CUSTOM)));

            // Send status updates to recordingStatusUpdate()
            recording.setOnRecordingStatusUpdate();

            // Save object into class attributes
            this.recordingObject = recording;

            // Start recording audio
            await this.recordingObject.startAsync();

            this.setState({
                recordingActive: true,
            });

        }

    }

    /**
     * Ends a  recording if a recording is running
     */
    private async endARecording() {

        if (this.state.recordingActive && !this.state.processingActive) {

            // Set the processing active
            this.setState({
                processingActive: true,
            });

            if (this.recordingObject == null) {
                throw new Error('RecordingObj was unexpectedly null');
            }

            // Get current status of the recording object
            let status: any = await this.recordingObject.getStatusAsync();
            
            // Control whether min recording time is reached
            if (status.durationMillis > this.minRecordingTime) {

                this.endARecordingHelper();

            } else {

                setTimeout(this.endARecordingHelper, this.minRecordingTime - status.durationMillis);

            }

        }

    }

    /**
     * Helper function for endARecording() to enable the setTimeout functionality
     */
    @autobind
    private async endARecordingHelper() {

        if (this.state.recordingActive && this.state.processingActive) {

            if (this.recordingObject == null) {
                throw new Error('RecordingObj was unexpectedly null');
            }

            // End the recording
            await this.recordingObject.stopAndUnloadAsync();

            // Set the recording on inactive
            this.setState({
                recordingActive: false,
            });

            // We need the filepath to work with the recording
            let filepath = this.recordingObject.getURI();

            if (!filepath) {
                throw new Error('Could not get file path of audio recording');
            }

            // Upload the audio file
            let rest: RestConnection = new RestConnection();
            await rest.uploadAudioAsync(filepath);

            // Delete the recording object
            this.recordingObject.setOnRecordingStatusUpdate(() => {});
            this.recordingObject = null;

            // Set the processing on inactive and wait for new recording
            this.setState({
                processingActive: false,
                waitingForRecordActive: true
            });

        }

    }

}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    circle: {
        borderRadius: 75,
        width: 150,
        height: 150,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
    },
    circleBorderWaiting: {
        borderRadius: 78,
        width: 156,
        height: 156,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
    },
    circleBorderActive: {
        borderRadius: 78,
        width: 156,
        height: 156,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cde6ff',
    },
    circleBorderProcessing: {
        borderRadius: 78,
        width: 156,
        height: 156,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cde6ff',
    },
    circleBorderAlternative: {
        borderRadius: 78,
        width: 156,
        height: 156,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cde6ff',
    },
});