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

export default class Microphone extends Component<IProps> {

    // Private attributes:
    // Recording object
    private recordingObject: Audio.Recording;

    // Minimal and maximal recording time in ms
    // Min has to be above 300ms due to https://github.com/expo/expo/issues/1709
    private minRecordingTime: number = 500;
    private maxRecordingTime: number = 600000;

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
                            <Ionicons name="md-mic" size={75} color="#ddd" />
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
        console.log('In');

        // Start the new recording
        await this.startANewRecording()
    }

    // Handler for the PressOut Event on the Microphone button
    // Stops the recording
    @autobind
    private async onPressOut() {
        console.log(`Out`);

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
            await recording.prepareToRecordAsync(JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)));
            
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

            var info = await FileSystem.getInfoAsync(this.recordingObject.getURI());
            console.log(`Info: ${JSON.stringify(info)}`);

            // Delete the recording object
            this.recordingObject.setOnRecordingStatusUpdate(null);
            this.recordingObject = null;

            // Set the processing and the recording inactive and wait for new recording
            this.setState({
                recordingActive: false,
                processingActive: false,
                waitingForRecordActive: true
            });

        }

    }

    // Handler for a status change at the recording
    @autobind
    private async recordingStatusUpdate()
    {
       
    }

    // Debugging function for status output
    @autobind
    private async statusOutput()
    {
        console.log(`Recording object null:`);
        console.log(this.recordingObject == null);
        // Recording might be to short to be started
        var status = await this.recordingObject.getStatusAsync();
        if(this.recordingObject != null)
        {
        console.log(`Status can record:`);
        console.log(status.canRecord);
        console.log(`Status is done recording:`);
        console.log(status.isDoneRecording);
        console.log(`Status is Recording:`);
        console.log(status.isRecording);
        console.log(`Status Duration Millis:`);
        console.log(status.durationMillis);
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
});