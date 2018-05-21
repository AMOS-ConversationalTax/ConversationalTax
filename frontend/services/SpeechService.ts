import { Speech } from 'expo';

export default class SpeechService {
    private isSpeaking = false;
    /**
     * Transforms text into speech (audio). 
     * @param text The text to be spoken
     * @param abortCurrent In case another text is read, should it be aborted?
     */
    public speak(text: string, abortCurrent = true) {
        if (abortCurrent) {
            this.abortSpeaking();            
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