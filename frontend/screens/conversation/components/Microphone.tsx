import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import autobind from 'autobind-decorator';
import Expo, { Audio, Permissions, FileSystem } from 'expo';
import { isUndefined } from 'util';

interface IProps {
}

export default class Microphone extends Component<IProps> {

    // Private attributes
    private recording: Audio.Recording;

    constructor(props) {
        super(props);

        // No recoring attribute for now
        this.recording = null;
    }

    public render() {
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
    }

    private async onPressIn() {
        console.log(`In`);

        // Ask for permission to record audio
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

        // Custom audio settings for recording
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });

        // Clean up old objects
        if (this.recording !== null) {
            this.recording.setOnRecordingStatusUpdate(null);
            this.recording = null;
        }

        // Create a new object
        const recording = new Audio.Recording();
      
        // Expo Audio requires to prepare before recording audio
        await recording.prepareToRecordAsync(JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)));

        // Send status updates to recordingStatusUpdate()
        recording.setOnRecordingStatusUpdate(this.recordingStatusUpdate);

        // Save obeject into class attributes
        this.recording = recording;

        // Start recording audio
        await this.recording.startAsync();
    }

    private async onPressOut() {
        console.log(`Out`);

        // Stop the recording
        try {
            await this.recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing -- we are already unloaded.
        }         
    }

    private async recordingStatusUpdate() {
        // Get current status of the recording
        var status = await this.recording.getStatusAsync();

        if (status.isDoneRecording) {
            console.log('Fertig');
        }

        // Print the file path to the recording und other information
        var info = await FileSystem.getInfoAsync(this.recording.getURI());
        console.log(`Info: ${JSON.stringify(info)}`);

        // Custom settings for the output
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });

        // Create the final sound
        const { sound, state } = await this.recording.createNewLoadedSound(
            {
                isLooping: false,
                isMuted: false,
                volume: 1.0,
                rate: 1.0,
                shouldCorrectPitch: true,
            },
            true
        ); 
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
    }
});