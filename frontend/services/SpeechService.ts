import { Speech, Audio, Constants } from 'expo';

export default class SpeechService {
    private isSpeaking = false;
    private soundObject: Audio.Sound;

    constructor() {
        // Hack to reset audio playback to speakers instead of phone receiver on iOS
        if (Constants.platform.ios !== undefined) {
            this.soundObject = new Audio.Sound();
            this.soundObject.loadAsync(require('../assets/empty.wav'));
        }
    }

    /**
     * Transforms text into speech (audio). 
     * @param text The text to be spoken
     * @param abortCurrent In case another text is read, should it be aborted?
     */
    public async speak(text: string, abortCurrent = true) {
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

    private abortSpeaking(): void {
        if (this.isSpeaking) {
            Speech.stop();
        }
    }

    private doSpeak(text: string) {
        this.isSpeaking = true;
        Speech.speak(text, { 
            language: 'de-DE' ,
            onDone: () => {this.isSpeaking = false},
            onStopped: () => {this.isSpeaking = false}
        });
    }
}