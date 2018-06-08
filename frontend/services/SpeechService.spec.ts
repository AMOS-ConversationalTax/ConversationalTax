import SpeechService from './SpeechService';
import Expo from 'expo';

jest.mock('expo', () => ({
    Speech: {
        stop: jest.fn(),
        isSpeakingAsync: jest.fn(),
        speak: jest.fn(),
    },
    Constants: {
        platform: {},
    }
}));

describe('RecordingService', () => {
    let speechService: SpeechService;

    beforeEach(() => {
        speechService = new SpeechService();
        jest.clearAllMocks();
    });

    describe('speak', () => {
        it('should forward the text to Expo', () => {
            const text = 'I am a dummy text.'
            speechService.speak(text);
            expect(Expo.Speech.speak.mock.calls[0][0]).toBe(text);
        });

        it('should abort current if already speaking', () => {
            const text = 'I am a dummy text.'
            speechService.speak(text, true);
            speechService.speak(text, true);
            expect(Expo.Speech.stop).toBeCalled();
        });
    });

});