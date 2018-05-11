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
import { isUndefined } from 'util';

interface IProps {
}

// Custom recording options
export const RECORDING_OPTIONS_CUSTOM: Expo.Audio.RecordingOptions = {
    android: {
        extension: '.m4a',
        outputFormat: Expo.Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Expo.Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.m4a',
        outputFormat: Expo.Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
        audioQuality: Expo.Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

export default class Microphone extends Component<IProps> {

    // Private attributes:
    // Recording object
    private recordingObject: Audio.Recording;

    // Minimal recording time in ms
    // Min has to be above 300ms due to https://github.com/expo/expo/issues/1709
    private minRecordingTime: number = 500;

    // Main constructor of the Microphone button
    constructor(props: any) {
        super(props);

        // Recording object is generated on the fly
        this.recordingObject = null;

        // Save the initial states
        this.state = {
            haveRecordingPermissions: false,
            waitingForRecordActive: false,
            recordingActive: false,
            processingActive: false, 
        }

        // Ask for recording permissions for the first time
        this.askForPermissions();

    }

    // Rendering function of React Native
    public render() {
        if (this.state.waitingForRecordActive)
        {
            return (
                <View style={styles.view}>
                    <TouchableWithoutFeedback 
                        onPressIn={this.onPressIn} 
                        onPressOut={this.onPressOut}
                    >
                        <View style={styles.circle}>
                            <Ionicons name="md-mic" size={75} color="#000" />
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
                        <View style={styles.circle}>
                            <Ionicons name="md-mic" size={75} color="#7b322c" />
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
                        <View style={styles.circle}>
                            <Ionicons name="md-mic" size={75} color="#b0b0b0" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }
    }

    // Recording is in need of seperate permissions - This function asks for them
    @autobind
    private async askForPermissions()
    {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

        if(response.status === 'granted')
        {
            // Set the button active
            this.setState({
                haveRecordingPermissions: true,
                waitingForRecordActive: true,
            });
        }
    }

    // Handler for the PressIn Event on the Microphone button
    // Starts a new recording (if it is waitingForRecordActive)
    @autobind
    private async onPressIn() {
        // console.log('In');

        // Start the new recording
        await this.startANewRecording();
    }

    // Handler for the PressOut Event on the Microphone button
    // Stops the recording
    @autobind
    private async onPressOut() {
        // console.log(`Out`);

        // End the recording
        await this.endARecording();
    }

    // Start a new recording
    @autobind
    private async startANewRecording() {

        if(this.state.waitingForRecordActive)
        {
            // Set the button inactive and 
            this.setState({
                waitingForRecordActive: false,
                recordingActive: true,
            });

            // Create a new object
            let recording = new Audio.Recording();
                    
            // Expo Audio requires to prepare before recording audio
            await recording.prepareToRecordAsync(JSON.parse(JSON.stringify(RECORDING_OPTIONS_CUSTOM)));
            
            // Send status updates to recordingStatusUpdate()
            recording.setOnRecordingStatusUpdate();
            
            // Save object into class attributes
            this.recordingObject = recording;
            
            // Start recording audio
            await this.recordingObject.startAsync();
        } 

    }

    @autobind
    private async endARecording() {

        if(this.state.recordingActive && !this.state.processingActive)
        {
            // Set the processing active
            this.setState({
                processingActive: true,
            });

            // Get current status of the recording object
            var status = await this.recordingObject.getStatusAsync();

            // Control whether min recording time is reached
            if(status.durationMillis > this.minRecordingTime)
            {
                this.endARecordingHelper();
            } else {
                setTimeout(this.endARecordingHelper, this.minRecordingTime - status.durationMillis);
            }
        }

    }

    @autobind
    private async endARecordingHelper() {

        if(this.state.recordingActive && this.state.processingActive)
        {
            
            // End the recording
            await this.recordingObject.stopAndUnloadAsync();

            // Set the recording on inactive
            this.setState({
                recordingActive: false,
            });

            // We need the filepath to work with the recording
            var info = await FileSystem.getInfoAsync(this.recordingObject.getURI());
            var filepath = this.recordingObject.getURI();

            // Get the content of the recorded file
            var content = await FileSystem.readAsStringAsync(filepath);

            // Convert the String to Base64
            var base64 = await this.binaryStringToBase64(content);
            // console.log(base64);

            // Delete the recording object
            this.recordingObject.setOnRecordingStatusUpdate(null);
            this.recordingObject = null;

            // Set the processing on inactive and wait for new recording
            this.setState({
                processingActive: false,
                waitingForRecordActive: true
            });

        }

    }

    // Convert a string URI
    @autobind
    private async binaryStringToBase64(input: string) {
       
        // Create a new ArrayBuffer - 2 Bytes for each char
        var buffer = new ArrayBuffer(input.length * 2); 
        var bufferView = new Uint16Array(buffer);
        for (var i=0, strLen=input.length; i < strLen; i++) {
          bufferView[i] = input.charCodeAt(i);
        }

        // Use the native React Native function to convert the ArrayBuffer to Base64
        var binaryToBase64 = require('binaryToBase64');
        var output = binaryToBase64(buffer);

        return output;

    }

    // Handler for a status change at the recording
    @autobind
    private async recordingStatusUpdate()
    {
       
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
});