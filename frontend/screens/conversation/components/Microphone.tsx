import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Text,
} from 'react-native';
import autobind from 'autobind-decorator';
import RestConnection from '../../../services/RestConnection';
import RecordingService from '../../../services/RecordingService';
import SpeechService from '../../../services/SpeechService';

interface IProps {
    recordingService: RecordingService,
    restClient: RestConnection,
    speechService: SpeechService,
}

enum RecordingState {
    hasNoPermission,
    waitingToRecord,
    recordingActive,
    processingActive,
}

/**
 * This class implements the Microphone button and its functionality
 * @class Microphone
 */
export default class Microphone extends Component<IProps> {

    /**
     * Save the initial states
     */
    state = {
        currentState: RecordingState.hasNoPermission,
    }

    /**
     * Ask for permission as soon as the component will be mounted. 
     */
    componentWillMount() {
        this.props.recordingService.askForPermissions().then(haveRecordingPermissions => {
            if (haveRecordingPermissions) {
                this.setState({ currentState: RecordingState.waitingToRecord });
            }
        })
    }

    /**
     * Render the Microphone component
     */
    public render() {
        // In case we don't have the recording permission
        let recordingButtonStyle = styles.circleBorderAlternative;
        let recordingButtonDisabled = true;
        let recordingIcon = 'md-mic-off';
        let infoText = 'Recorder lädt';

        if (this.state.currentState == RecordingState.waitingToRecord) {
            recordingButtonStyle = styles.circleBorderWaiting;
            recordingButtonDisabled = false;
            recordingIcon = 'md-mic';
            infoText = 'Mikrofon gedrückt halten für neue Anfrage';
        } else if (this.state.currentState == RecordingState.recordingActive) {
            recordingButtonStyle = styles.circleBorderActive;
            recordingButtonDisabled = false;
            recordingIcon = 'md-mic';
            infoText = 'Aufnahme läuft';
        } else if (this.state.currentState == RecordingState.processingActive) {
            recordingButtonStyle = styles.circleBorderProcessing;
            recordingButtonDisabled = true;
            recordingIcon = 'ios-cloud-upload';
            infoText = 'Aufnahme wird verarbeitet';
        } 

        return (
            <View style={styles.view}>
                <TouchableWithoutFeedback
                    onPressIn={this.onPressIn}
                    onPressOut={this.onPressOut}
                    disabled={recordingButtonDisabled}
                >
                    <View style={recordingButtonStyle}>
                        <View style={styles.circle}>
                            <Ionicons name={recordingIcon} size={75} color="#000" />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.infoText}>
                    {infoText}
                </Text>
            </View>
        );
    }

    /**
     * Handler for the PressIn Event of the Microphone button
     */
    @autobind
    private async onPressIn() {
        await this.props.recordingService.startRecording();
        // Set the button on not waiting for record
        this.setState({ currentState: RecordingState.recordingActive });
    }

    /**
     * Handler for the PressOut Event of the Microphone button
     */
    @autobind
    private onPressOut() {
        // End the recording
        if (this.state.currentState == RecordingState.recordingActive) {
            this.endRecording();
        } else {
            // There is some rare case there button is released before recording is active
            // In this case it is necessary to wait some ms
            setTimeout(this.onPressOut, 20);
        }
    }

    /**
     * Ends a recording if a recording is running
     */
    private async endRecording() {
        this.setState({ currentState: RecordingState.processingActive });
        const filepath = await this.props.recordingService.stopRecording();

        // Upload the audio file
        let responseText = await this.props.restClient.uploadAudioAsync(filepath);

        if (responseText.text.length < 2) {
            responseText.text = 'Ich konnte dich leider nicht verstehen.';
        }

        //Read out the response
        this.props.speechService.speak(responseText.text);

        // Set the button on not waiting for record
        this.setState({ currentState: RecordingState.waitingToRecord });
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
        backgroundColor: '#ccc',
    },
    infoText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 30,
        margin: 10,
    },
});