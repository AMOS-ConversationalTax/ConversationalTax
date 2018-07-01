import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import autobind from 'autobind-decorator';
import RestConnection from '../../../services/RestConnection';
import RecordingService from '../../../services/RecordingService';
import SpeechService from '../../../services/SpeechService';
import global_styles from '../../../global_styles';
import Loader from './Loader';
import RecordIcon from './RecordIcon';
import { NavigationService } from '../../../services/NavigationService';

/**
 * The property interface used in the class Microphone
 * @interface IProps
 */
interface IProps {
    recordingService: RecordingService,
    restClient: RestConnection,
    speechService: SpeechService,
}

/**
 * The state interface used in the class Microphone
 * @interface IState
 */
interface IState {
    currentState: RecordingState,
}

/**
 * A enum of allowed RecordingStates
 */
enum RecordingState {
    hasNoPermission,
    waitingToRecord,
    preparingToRecord,
    recordingActive,
    processingActive,
}

/**
 * This class implements the Microphone button and its functionality
 * @class Microphone
 */
export default class Microphone extends Component<IProps, IState> {
    /**
     * Save the initial states
     */
    state = {
        currentState: RecordingState.hasNoPermission,
    }

    /**
     * Ask for permission as soon as the component will be mounted. 
     */
    async componentDidMount() {
        const haveRecordingPermissions = await this.props.recordingService.askForPermissions();
        if (!haveRecordingPermissions) {
            return;
        }
        
        //If you got navigated via a notification. Send the text to the backend
        const initialText = NavigationService.getParam('text');
        if (typeof initialText === 'string') {
            this.setState({ currentState: RecordingState.processingActive });
            const responseText = await this.props.restClient.uploadTextAsync(initialText);
            this.props.speechService.speak(responseText.text);
            this.setState({ currentState: RecordingState.waitingToRecord });
        } else {
            this.setState({ currentState: RecordingState.waitingToRecord });
        }
    }

    /**
     * Render the Microphone component
     * @returns {JSX.Element} The markup element that is displayed
     */
    public render(): JSX.Element {
        // In case we don't have the recording permission
        let recordingButtonDisabled = true;
        let recordingIcon = <Ionicons name={'md-mic-off'} size={75} color="#000" />;
        let infoText = 'Recorder lädt';

        if (this.state.currentState == RecordingState.waitingToRecord) {
            recordingButtonDisabled = false;
            recordingIcon = <RecordIcon recording={false}/>;
            infoText = 'Mikrofon gedrückt halten\n für neue Anfrage';
        } else if (this.state.currentState == RecordingState.recordingActive || this.state.currentState == RecordingState.preparingToRecord ) {
            recordingButtonDisabled = false;
            recordingIcon = <RecordIcon recording={true}/>;
            infoText = 'Aufnahme läuft';
        } else if (this.state.currentState == RecordingState.processingActive) {
            recordingButtonDisabled = true;
            recordingIcon = <Loader />;
            infoText = 'Anfrage wird verarbeitet';
        } 

        return (
            <View style={styles.view}>
                <TouchableWithoutFeedback
                    onPressIn={this.onPressIn}
                    onPressOut={this.onPressOut}
                    disabled={recordingButtonDisabled}
                >
                    <View>
                        {recordingIcon}
                    </View>
                </TouchableWithoutFeedback>
                <Text style={[styles.infoText, global_styles.shadowLight]}>
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
        // Set the button on not waiting for record
        this.setState({ currentState: RecordingState.preparingToRecord });
        await this.props.recordingService.startRecording();
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

        //Read out the response
        this.props.speechService.speak(responseText.text);

        // Set the button on not waiting for record
        this.setState({ currentState: RecordingState.waitingToRecord });
    }

}

/**
 * The styles that are used by the microphone
 * @type {any}
 */
const styles: any = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        flex: 1
    },
    infoText: {
        position: 'absolute',
        bottom: 0,
        fontSize: 18,
        textAlign: 'center',
        marginLeft: 50,
        marginRight: 50,
        color: '#fff'
    },
});