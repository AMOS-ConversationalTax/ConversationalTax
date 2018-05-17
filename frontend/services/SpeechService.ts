import { Speech } from 'expo';

export default class SpeechService {

    /**
     * Transforms text into speech (audio). 
     * @param text The text to be spoken
     * @param abortCurrent In case another text is read, should it be aborted?
     */
    public speak(text: string, abortCurrent = true) {
        if (abortCurrent) {
            this.abortSpeaking().then(() =>{
                this.doSpeak(text);
            });
            
        } else {
            this.doSpeak(text);
        }
    }

    private async abortSpeaking(): Promise<void> {
        if (await this.isSpeaking()) {
            Speech.stop();
        }
    }

    private async isSpeaking(): Promise<boolean> {
        return await Speech.isSpeakingAsync();
    }

    private doSpeak(text: string) {
        Speech.speak(text, { language: 'de-DE' });
    }
}