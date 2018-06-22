import { Speech, Audio, Constants } from 'expo';

/**
 * The text to speech service for reading answers of the backend out loud
 */
export default class SpeechService {

    /**
     * A boolean on the current situation of the Speech Service
     * @type {boolean}
     */
    private isSpeaking: boolean = false;

    /**
     * The sound object to be read
     * @type {Audio.Sound}
     */
    private soundObject: Audio.Sound;

    /**
     * The constructor of the SpeechService
     */
    constructor() {
        // Hack to reset audio playback to speakers instead of phone receiver on iOS
        if (Constants.platform.ios !== undefined) {
            this.soundObject = new Audio.Sound();
            this.soundObject.loadAsync(require('../assets/empty.wav'));
        }
    }

    /**
     * Transforms text into speech (audio). 
     * @param {string} text The text to be spoken
     * @param {boolean} abortCurrent In case another text is read, should it be aborted?
     */
    public async speak(text: string, abortCurrent: boolean = true) {
        if (abortCurrent) {
            this.abortSpeaking();
        } 

        // Hack to reset audio playback to speakers instead of phone receiver on iOS
        if (Constants.platform.ios !== undefined) {
            try {
                await this.soundObject.playAsync();
                await this.soundObject.stopAsync();
            } catch { }
        }

        this.doSpeak(text);
    }

    /**
     * Abort the current speaking
     */
    private abortSpeaking(): void {
        if (this.isSpeaking) {
            Speech.stop();
        }
    }

    /**
     * Start a new speaking
     * @param {string} text The text to be read
     */
    private doSpeak(text: string) {
        this.isSpeaking = true;
        Speech.speak(text, { 
            language: 'de-DE' ,
            onDone: () => {this.isSpeaking = false},
            onStopped: () => {this.isSpeaking = false}
        });
    }
}