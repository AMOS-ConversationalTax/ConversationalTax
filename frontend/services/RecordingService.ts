import { Permissions, Audio } from 'expo';

const RECORDING_OPTIONS_CUSTOM: Audio.RecordingOptions = {
    android: {
        extension: '.awb',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 128000,
    },
    ios: {
        extension: '.pcm',
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

/**
 * Minimal recording time in ms
 * Min has to be above 300ms due to https://github.com/expo/expo/issues/1709
 */
const MIN_RECORDING_TIME = 400;

export default class RecordingService {
    /**
     * The recording object for Expo.io
     * @name Microphone#recordingObject
     * @type {Audio.Recording | null}
     */
    private recordingObject: Audio.Recording | null = null;

    /**
     * Recording is in need of seperate permissions - This function asks for them
     */
    public async askForPermissions(): Promise<boolean> {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        return response.status === 'granted';
    }

    /**
    * Starts a new recording if no other recording is running or processing
    */
    public async startRecording() {
        if (this.recordingObject !== null) {
            const error = 'Cannot start Recording. Another recording is running.';
            console.error(error);
            throw new Error(error);
        }

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
    }

    /**
    * Ends a recording if a recording is running
    */
    public async stopRecording(): Promise<string> {
        if (this.recordingObject === null) {
            const error = 'Cannot stop Recording. No recording is running.';
            console.error(error);
            throw new Error(error);
        }

        // Get current status of the recording object
        let status: any = await this.recordingObject.getStatusAsync();

        // Control whether min recording time is reached
        if (status.durationMillis < MIN_RECORDING_TIME) {
            const sleepDuration = MIN_RECORDING_TIME - status.durationMillis;
            await new Promise(resolve => setTimeout(resolve, sleepDuration));
        } 

        return this.doStopRecording();
    }

    /**
    * Helper function for stopRecording() to enable the setTimeout functionality
    */
    private async doStopRecording(): Promise<string> {
        if (this.recordingObject === null) {
            const error = 'RecordingObject was unexpectedly null';
            console.error(error);
            throw new Error(error);
        }

        // End the recording
        await this.recordingObject.stopAndUnloadAsync();

        // We need the filepath to work with the recording
        const filepath = this.recordingObject.getURI();

        // Delete the recording object
        this.recordingObject.setOnRecordingStatusUpdate(() => { });
        this.recordingObject = null;

        if (!filepath) {
            const error = 'Could not get file path of audio recording';
            console.error(error);
            throw new Error(error);
        }

        return filepath;
    }
}