import RecordingService from './RecordingService';
import Expo from 'expo';

jest.mock('expo', () => ({
    Permissions: {
        askAsync: jest.fn().mockReturnValue(
            new Promise(function (resolve, reject) {
                resolve({ status: '' });
            })
        ),
    },
    Audio: {
        // Those const have to be defined. Otherwise RecordingService will throw an Error.
        RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB: 0,
        RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_WB: 0,
        RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM: 0,
        RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN: 0,
        INTERRUPTION_MODE_IOS_DO_NOT_MIX: 0,
        INTERRUPTION_MODE_ANDROID_DO_NOT_MIX: 0,
        setAudioModeAsync: jest.fn(),
        prepareToRecordAsync: jest.fn(),
        Recording: jest.fn(() => ({
            prepareToRecordAsync: jest.fn(),
            setOnRecordingStatusUpdate: jest.fn(),
            startAsync: jest.fn(),
            stopAndUnloadAsync: jest.fn(),
            getURI: jest.fn().mockReturnValue('sfdddfg'),
            getStatusAsync: jest.fn().mockReturnValue({ durationMillis: 0 }),
        }))
    }
}));

describe('RecordingService', () => {
    let recordingService: RecordingService;

    beforeEach(() => {
        recordingService = new RecordingService();
        jest.clearAllMocks();
    });

    describe('askForPermissions', () => {
        it('should ask for Permission', async () => {
            await recordingService.askForPermissions();

            expect(Expo.Permissions.askAsync).toHaveBeenCalled();
        });

        it('should return true on success', async () => {
            Expo.Permissions.askAsync = jest.fn().mockReturnValue(
                new Promise(function (resolve, reject) {
                    resolve({ status: 'granted' });
                })
            )

            const result = await recordingService.askForPermissions();
            expect(result).toBe(true);
        });

        it('should return true on success', async () => {
            Expo.Permissions.askAsync = jest.fn().mockReturnValue(
                new Promise(function (resolve, reject) {
                    resolve({ status: '' });
                })
            )

            const result = await recordingService.askForPermissions();
            expect(result).toBe(false);
        });
    });

    describe('startRecording', () => {
        it('should set recordingObj', async () => {
            await recordingService.startRecording();
            expect(recordingService.recordingObject).not.toBeNull();
        });

        it('should throw an Error if a Recording is already running', async () => {
            await recordingService.startRecording();
            return expect(recordingService.startRecording()).rejects.toThrow();
        });
    });

    describe('stopRecording', () => {
        it('should unset recordingObj', async () => {
            await recordingService.startRecording();
            await recordingService.stopRecording();
            expect(recordingService.recordingObject).toBeNull();
        });

        it('should throw an Error if no Recording is running', async () => {
            return expect(recordingService.stopRecording()).rejects.toThrow();
        });
    });



});