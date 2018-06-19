/// <reference types="jest" />
import { DatabaseLangService } from './database-lang.service';
import { ConversationHistoryService } from '../database/conversationHistory/conversationHistory.service';
import { ConversationHistory } from '../database/conversationHistory/interfaces/conversationHistory.interface';
import { ConversationHistoryParameters} from '../database/conversationHistory/interfaces/conversationHistoryParameters.interface';
import { ConversationHistoryIntent } from '../database/conversationHistory/interfaces/conversationHistoryIntent.interface';
import { UserService } from '../database/user/user.service';
import { User } from '../database/user/interfaces/user.interface';

// Creates a mock of the classes and removes their implementation. Custom implementation is then added in beforeAll()
jest.mock('../database/conversationHistory/conversationHistory.service', () => jest.fn(() => {}) );
jest.mock('../database/user/user.service', () => jest.fn(() => {}) );

describe('DatabaseLangService', () => {
    let databaseLangService: DatabaseLangService;
    let conversationHistoryService: any;
    let userService: any;
    let conversationHistory: Array<ConversationHistory>;
    let user: any;

    beforeEach(() => {
        // Functions are mocked in beforeEach and not in beforeAll to reset the mock counters before each test
        conversationHistoryService = {
            create: jest.fn().mockImplementation((user_id: string,
                                                  query: string,
                                                  answer: string,
                                                  intent: ConversationHistoryIntent,
                                                  action: string,
                                                  parameters: Array<ConversationHistoryParameters>,
                                                  timestamp: Date) => {
                
                // The id is not important for our test of conversationHistory so we just use timestamp converted to a string
                const _id: string = timestamp.toString();                              
                
                // Insert the new conversationHistory entry                                   
                conversationHistory.push({ '_id': _id,
                                           'user_id': user_id,
                                           'query': query,
                                           'answer': answer,
                                           'intent': intent,
                                           'action': action,
                                           'parameters': parameters,
                                           'timestamp': timestamp });

                return _id;

            }),
            getConversationHistoryOfUserWithoutIntents: jest.fn().mockImplementation((user_id: string,
                                                                                      intent_names: Array<string>) => {

                return conversationHistory.filter(i => i.user_id === user_id)
                                          .filter(i => ! intent_names.includes(i.intent.name));

            }),
        };
        userService = {
            create: jest.fn().mockImplementation(( _id: string ) => {                        

                // Insert the new conversationHistory entry                                   
                user.push({ '_id': _id, });

                return true;

            }),
            exists: jest.fn().mockImplementation(( _id: string ) => {                        

                const searchedUser = user.filter(i => i._id === _id);

                return searchedUser.length === 1;

            }),
        };
        // Create a new DatabaseLangService
        databaseLangService = new DatabaseLangService(
            conversationHistoryService,
            userService
        );
        // (Re)set the conversationHistory
        conversationHistory = new Array<ConversationHistory>();
        // (Re)set the users
        user = new Array<User>();
    });

    describe('createConversationHistoryEntry()', () => {
        it('Insert a simple conversationHistory entry without parameters for user 1', async () => {

            const _id: string = 
                await databaseLangService.createConversationHistoryEntry('u1',
                                                                         { fields: {} },
                                                                         'This is a test',
                                                                         'I recognized a test',
                                                                         'projects/test/agent/intents/test',
                                                                         'Test',
                                                                         'unknown');

            // Expect userService.exists to be called one time
            expect(userService.exists).toHaveBeenCalledTimes(1);

            // Expect userService.create to be called one time
            expect(userService.create).toHaveBeenCalledTimes(1);
            
            // Expect user to include the new user
            const searchedUser = user.filter(i => i._id === 'u1');
            expect(searchedUser.length).toBe(1);

            // Expect conversationHistoryService.create to be called one time
            expect(conversationHistoryService.create).toHaveBeenCalledTimes(1);

            // Expect conversationHistory to include a suiting entry
            const suitingConversationHistoryEntry: Array<ConversationHistory> = 
                conversationHistory.filter(i => i.user_id === 'u1')
                                   .filter(i => i.query === 'This is a test')
                                   .filter(i => i.answer === 'I recognized a test')
                                   .filter(i => i.intent.name === 'projects/test/agent/intents/test' &&
                                                i.intent.displayName === 'Test')
                                   .filter(i => i.action === 'unknown');

            // If conversationHistory includes a suiting entry, the length is of suitingConversationHistoryEntry is 1
            expect(suitingConversationHistoryEntry.length).toBe(1);

            // Until now we did not test the correct values of parameters (has to be empty in this case)
            expect(suitingConversationHistoryEntry[0].parameters.length).toBe(0);

        });
        it('Insert a more complex conversationHistory entry with correct formated parameters for user 2', async () => {

            const _id: string = 
                await databaseLangService.createConversationHistoryEntry('u2',
                                                                         { fields:
                                                                            { Date:
                                                                                { stringValue: '2018-06-16T12:00:00+02:00',
                                                                                  kind: 'stringValue' }, 
                                                                            },
                                                                         },
                                                                         'This is a second test',
                                                                         'I recognized a second test',
                                                                         'projects/test/agent/intents/secondtest',
                                                                         'SecondTest',
                                                                         'unknown');
            
            // Expect userService.exists to be called one time
            expect(userService.exists).toHaveBeenCalledTimes(1);

            // Expect userService.create to be called one time
            expect(userService.create).toHaveBeenCalledTimes(1);
            
            // Expect user to include the new user
            const searchedUser = user.filter(i => i._id === 'u2');
            expect(searchedUser.length).toBe(1);

            // Expect conversationHistoryService.create to be called one time
            expect(conversationHistoryService.create).toHaveBeenCalledTimes(1);

            // Expect conversationHistory to include a suiting entry
            const suitingConversationHistoryEntry: Array<ConversationHistory> = 
                conversationHistory.filter(i => i.user_id === 'u2')
                                   .filter(i => i.query === 'This is a second test')
                                   .filter(i => i.answer === 'I recognized a second test')
                                   .filter(i => i.intent.name === 'projects/test/agent/intents/secondtest' &&
                                                i.intent.displayName === 'SecondTest')
                                   .filter(i => i.action === 'unknown');

            // If conversationHistory includes a suiting entry, the length is of suitingConversationHistoryEntry is 1
            expect(suitingConversationHistoryEntry.length).toBe(1);

            // Until now we did not test the correct values of parameters (has to be one in this case)
            expect(suitingConversationHistoryEntry[0].parameters.length).toBe(1);

            // Expect to be the parameter to be filled with the correct values
            expect(suitingConversationHistoryEntry[0].parameters[0].name).toBe('Date');
            expect(suitingConversationHistoryEntry[0].parameters[0].value).toBe('2018-06-16T12:00:00+02:00');

        });
        it('Insert a more complex conversationHistory entry with a not correct formated parameters for user 3', async () => {
            
            const _id: string = 
                await databaseLangService.createConversationHistoryEntry('u3',
                                                                         { fields:
                                                                            { Date:
                                                                                { stringValue: '2018-06-16T12:00:00+02:00',}, 
                                                                            },
                                                                         },
                                                                         'This is a third test',
                                                                         'I recognized a third test',
                                                                         'projects/test/agent/intents/thirdtest',
                                                                         'ThirdTest',
                                                                         'unknown');

            // Expect userService.exists to be called one time
            expect(userService.exists).toHaveBeenCalledTimes(1);

            // Expect userService.create to be called one time
            expect(userService.create).toHaveBeenCalledTimes(1);
            
            // Expect user to include the new user
            const searchedUser = user.filter(i => i._id === 'u3');
            expect(searchedUser.length).toBe(1);

            // Expect conversationHistoryService.create to be called one time
            expect(conversationHistoryService.create).toHaveBeenCalledTimes(1);

            // Expect conversationHistory to include a suiting entry
            const suitingConversationHistoryEntry: Array<ConversationHistory> = 
                conversationHistory.filter(i => i.user_id === 'u3')
                                   .filter(i => i.query === 'This is a third test')
                                   .filter(i => i.answer === 'I recognized a third test')
                                   .filter(i => i.intent.name === 'projects/test/agent/intents/thirdtest' &&
                                                i.intent.displayName === 'ThirdTest')
                                   .filter(i => i.action === 'unknown');

            // If conversationHistory includes a suiting entry, the length is of suitingConversationHistoryEntry is 1
            expect(suitingConversationHistoryEntry.length).toBe(1);

            // Until now we did not test the correct values of parameters 
            // As we sent a not valid parameter the length has to be zero
            expect(suitingConversationHistoryEntry[0].parameters.length).toBe(0);

        });
        it('Insert a more complex conversationHistory entry with a not correct formated parameters for user 4', async () => {
            
            const _id: string = 
                await databaseLangService.createConversationHistoryEntry('u4',
                                                                         {},
                                                                         'This is a fourth test',
                                                                         'I recognized a fourth test',
                                                                         'projects/test/agent/intents/fourthtest',
                                                                         'FourthTest',
                                                                         'unknown');

            // Expect userService.exists to be called one time
            expect(userService.exists).toHaveBeenCalledTimes(1);

            // Expect userService.create to be called one time
            expect(userService.create).toHaveBeenCalledTimes(1);
            
            // Expect user to include the new user
            const searchedUser = user.filter(i => i._id === 'u4');
            expect(searchedUser.length).toBe(1);

            // Expect conversationHistoryService.create to be called one time
            expect(conversationHistoryService.create).toHaveBeenCalledTimes(1);

            // Expect conversationHistory to include a suiting entry
            const suitingConversationHistoryEntry: Array<ConversationHistory> = 
                conversationHistory.filter(i => i.user_id === 'u4')
                                   .filter(i => i.query === 'This is a fourth test')
                                   .filter(i => i.answer === 'I recognized a fourth test')
                                   .filter(i => i.intent.name === 'projects/test/agent/intents/fourthtest' &&
                                                i.intent.displayName === 'FourthTest')
                                   .filter(i => i.action === 'unknown');

            // If conversationHistory includes a suiting entry, the length is of suitingConversationHistoryEntry is 1
            expect(suitingConversationHistoryEntry.length).toBe(1);

            // Until now we did not test the correct values of parameters 
            // As we sent a not valid parameter the length has to be zero
            expect(suitingConversationHistoryEntry[0].parameters.length).toBe(0);

        });
    });

    describe('getConversationHistoryOfUserWithoutIntents()', () => {
        it('Get the empty conversationHistory for user 1 - There are no conversationHistory entries for anyone', async () => {
           
            const receivedConversationHistory: Array<ConversationHistory> = 
                await databaseLangService.getConversationHistoryOfUserWithoutIntents('u1', []);

            // Expect conversationHistoryService.getConversationHistoryOfUserWithoutIntents to be called one time
            expect(conversationHistoryService.getConversationHistoryOfUserWithoutIntents).toHaveBeenCalledTimes(1);

            // Expect the receivedConversationHistory to be empty
            expect(receivedConversationHistory.length).toBe(0);

        });
        it('Get the empty conversationHistory for user 2 - There is a conversationHistory entry for user 1', async () => {
           
            // Insert the conversationHistory entry for user 1                           
            conversationHistory.push({ '_id': 'ch5',
                                       'user_id': 'u1',
                                       'query': 'This is a fifth test',
                                       'answer': 'I recognized a fifth test',
                                       'intent': { name: 'projects/test/agent/intents/fifthtest',
                                                   displayName: 'FifthTest'},
                                       'action': 'unknown',
                                       'parameters': [],
                                       'timestamp': new Date() });

            const receivedConversationHistory: Array<ConversationHistory> = 
                await databaseLangService.getConversationHistoryOfUserWithoutIntents('u2', []);

            // Expect conversationHistoryService.getConversationHistoryOfUserWithoutIntents to be called one time
            expect(conversationHistoryService.getConversationHistoryOfUserWithoutIntents).toHaveBeenCalledTimes(1);

            // Expect the receivedConversationHistory to be empty
            expect(receivedConversationHistory.length).toBe(0);

        });
        it('Get the none empty conversationHistory for user 3', async () => {
           
            // Insert the conversationHistory entry for user 1                           
            conversationHistory.push({ '_id': 'ch6',
                                       'user_id': 'u3',
                                       'query': 'This is a sixth test',
                                       'answer': 'I recognized a sixth test',
                                       'intent': { name: 'projects/test/agent/intents/sixthtest',
                                                   displayName: 'SixthTest'},
                                       'action': 'unknown',
                                       'parameters': [],
                                       'timestamp': new Date() });

            const receivedConversationHistory: Array<ConversationHistory> = 
                await databaseLangService.getConversationHistoryOfUserWithoutIntents('u3', []);

            // Expect conversationHistoryService.getConversationHistoryOfUserWithoutIntents to be called one time
            expect(conversationHistoryService.getConversationHistoryOfUserWithoutIntents).toHaveBeenCalledTimes(1);

            // Expect the receivedConversationHistory to be one
            expect(receivedConversationHistory.length).toBe(1);

             // Expect conversationHistory to include a suiting entry
             const suitingConversationHistoryEntry: Array<ConversationHistory> = 
                receivedConversationHistory.filter(i => i.user_id === 'u3')
                                           .filter(i => i.query === 'This is a sixth test')
                                           .filter(i => i.answer === 'I recognized a sixth test')
                                           .filter(i => i.intent.name === 'projects/test/agent/intents/sixthtest' &&
                                                        i.intent.displayName === 'SixthTest')
                                           .filter(i => i.action === 'unknown');

            // If receivedConversationHistory includes a suiting entry,
            // the length is of suitingConversationHistoryEntry is 1
            expect(suitingConversationHistoryEntry.length).toBe(1);

        });
    });

    describe('createConversationHistoryEntry() and getConversationHistoryOfUserWithoutIntents() combined', () => {
        it('Create one conversationHistory entry without parameters for user 1 and get it again', async () => {

            await databaseLangService.createConversationHistoryEntry('u1',
                                                                     { fields: {} },
                                                                     'This is a seventh test',
                                                                     'I recognized a seventh test',
                                                                     'projects/test/agent/intents/seventhtest',
                                                                     'SeventhTest',
                                                                     'unknown');

            // Expect userService.exists to be called one time
            expect(userService.exists).toHaveBeenCalledTimes(1);

            // Expect userService.create to be called one time
            expect(userService.create).toHaveBeenCalledTimes(1);
            
            // Expect user to include the new user
            const searchedUser = user.filter(i => i._id === 'u1');
            expect(searchedUser.length).toBe(1);

            // Expect conversationHistoryService.create to be called one time
            expect(conversationHistoryService.create).toHaveBeenCalledTimes(1);

            const receivedConversationHistory: Array<ConversationHistory> = 
            await databaseLangService.getConversationHistoryOfUserWithoutIntents('u1', []);

            // Expect conversationHistoryService.getConversationHistoryOfUserWithoutIntents to be called one time
            expect(conversationHistoryService.getConversationHistoryOfUserWithoutIntents).toHaveBeenCalledTimes(1);

            // Expect the receivedConversationHistory to be one
            expect(receivedConversationHistory.length).toBe(1);

            // Expect conversationHistory to include a suiting entry
            const suitingConversationHistoryEntry: Array<ConversationHistory> = 
                receivedConversationHistory.filter(i => i.user_id === 'u1')
                                           .filter(i => i.query === 'This is a seventh test')
                                           .filter(i => i.answer === 'I recognized a seventh test')
                                           .filter(i => i.intent.name === 'projects/test/agent/intents/seventhtest' &&
                                                        i.intent.displayName === 'SeventhTest')
                                           .filter(i => i.action === 'unknown');

            // If receivedConversationHistory includes a suiting entry,
            // the length is of suitingConversationHistoryEntry is 1
            expect(suitingConversationHistoryEntry.length).toBe(1);
            
            // Until now we did not test the correct values of parameters 
            expect(suitingConversationHistoryEntry[0].parameters.length).toBe(0);

        });
        it('Create one conversationHistory entry with parameters for user 2 and get it again', async () => {
           
            await databaseLangService.createConversationHistoryEntry('u2',
                                                                     { fields:
                                                                        { Date:
                                                                            { stringValue: '2018-06-16T12:00:00+02:00',
                                                                              kind: 'stringValue' }, 
                                                                        },
                                                                     },
                                                                     'This is a eigth test',
                                                                     'I recognized a eigth test',
                                                                     'projects/test/agent/intents/eigthtest',
                                                                     'EigthTest',
                                                                     'unknown');
            
            // Expect userService.exists to be called one time
            expect(userService.exists).toHaveBeenCalledTimes(1);

            // Expect userService.create to be called one time
            expect(userService.create).toHaveBeenCalledTimes(1);
            
            // Expect user to include the new user
            const searchedUser = user.filter(i => i._id === 'u2');
            expect(searchedUser.length).toBe(1);

            // Expect conversationHistoryService.create to be called one time
            expect(conversationHistoryService.create).toHaveBeenCalledTimes(1);

            const receivedConversationHistory: Array<ConversationHistory> = 
                await databaseLangService.getConversationHistoryOfUserWithoutIntents('u2', []);

            // Expect conversationHistoryService.getConversationHistoryOfUserWithoutIntents to be called one time
            expect(conversationHistoryService.getConversationHistoryOfUserWithoutIntents).toHaveBeenCalledTimes(1);

            // Expect the receivedConversationHistory to be one
            expect(receivedConversationHistory.length).toBe(1);

            // Expect conversationHistory to include a suiting entry
            const suitingConversationHistoryEntry: Array<ConversationHistory> = 
                receivedConversationHistory.filter(i => i.user_id === 'u2')
                                           .filter(i => i.query === 'This is a eigth test')
                                           .filter(i => i.answer === 'I recognized a eigth test')
                                           .filter(i => i.intent.name === 'projects/test/agent/intents/eigthtest' &&
                                                        i.intent.displayName === 'EigthTest')
                                           .filter(i => i.action === 'unknown');

            // If receivedConversationHistory includes a suiting entry,
            // the length is of suitingConversationHistoryEntry is 1
            expect(suitingConversationHistoryEntry.length).toBe(1);
            
            // Until now we did not test the correct values of parameters (has to be one in this case)
            expect(suitingConversationHistoryEntry[0].parameters.length).toBe(1);

            // Expect to be the parameter to be filled with the correct values
            expect(suitingConversationHistoryEntry[0].parameters[0].name).toBe('Date');
            expect(suitingConversationHistoryEntry[0].parameters[0].value).toBe('2018-06-16T12:00:00+02:00');

        });
        it('Create two conversationHistory entries for user 3 and get them again', async () => {
           
            await databaseLangService.createConversationHistoryEntry('u3',
                                                                     { fields: {} },
                                                                     'This is a ninth test',
                                                                     'I recognized a ninth test',
                                                                     'projects/test/agent/intents/ninthtest',
                                                                     'NinthTest',
                                                                     'unknown');

            await databaseLangService.createConversationHistoryEntry('u3',
                                                                     { fields:
                                                                        { Date:
                                                                            { stringValue: '2018-06-16T12:00:00+02:00',
                                                                              kind: 'stringValue' }, 
                                                                        },
                                                                     },
                                                                     'This is a tenth test',
                                                                     'I recognized a tenth test',
                                                                     'projects/test/agent/intents/tenthtest',
                                                                     'TenthTest',
                                                                     'unknown');
            
            // Expect userService.exists to be called two times
            expect(userService.exists).toHaveBeenCalledTimes(2);

            // Expect userService.create to be called one time
            expect(userService.create).toHaveBeenCalledTimes(1);
            
            // Expect user to include the new user
            const searchedUser = user.filter(i => i._id === 'u3');
            expect(searchedUser.length).toBe(1);

            // Expect conversationHistoryService.create to be called two times
            expect(conversationHistoryService.create).toHaveBeenCalledTimes(2);

            const receivedConversationHistory: Array<ConversationHistory> = 
                await databaseLangService.getConversationHistoryOfUserWithoutIntents('u3', []);

            // Expect conversationHistoryService.getConversationHistoryOfUserWithoutIntents to be called one time
            expect(conversationHistoryService.getConversationHistoryOfUserWithoutIntents).toHaveBeenCalledTimes(1);

            // Expect the receivedConversationHistory length to be two
            expect(receivedConversationHistory.length).toBe(2);

            // Expect conversationHistory to include a suiting entry for the ninth test
            const suitingConversationHistoryEntry: Array<ConversationHistory> = 
                receivedConversationHistory.filter(i => i.user_id === 'u3')
                                           .filter(i => i.query === 'This is a ninth test')
                                           .filter(i => i.answer === 'I recognized a ninth test')
                                           .filter(i => i.intent.name === 'projects/test/agent/intents/ninthtest' &&
                                                        i.intent.displayName === 'NinthTest')
                                           .filter(i => i.action === 'unknown');

            // If receivedConversationHistory includes a suiting entry,
            // the length is of suitingConversationHistoryEntry is 1
            expect(suitingConversationHistoryEntry.length).toBe(1);
            
            // Until now we did not test the correct values of parameters (has to be empty in this case)
            expect(suitingConversationHistoryEntry[0].parameters.length).toBe(0);

            /// Expect conversationHistory to include a suiting entry for the tenth test
            const suitingConversationHistoryEntry2: Array<ConversationHistory> = 
            receivedConversationHistory.filter(i => i.user_id === 'u3')
                                       .filter(i => i.query === 'This is a tenth test')
                                       .filter(i => i.answer === 'I recognized a tenth test')
                                       .filter(i => i.intent.name === 'projects/test/agent/intents/tenthtest' &&
                                                    i.intent.displayName === 'TenthTest')
                                       .filter(i => i.action === 'unknown');

            // If receivedConversationHistory includes a suiting entry,
            // the length is of suitingConversationHistoryEntry2 is 1
            expect(suitingConversationHistoryEntry2.length).toBe(1);
            
            // Until now we did not test the correct values of parameters (has to be one in this case)
            expect(suitingConversationHistoryEntry2[0].parameters.length).toBe(1);

            // Expect to be the parameter to be filled with the correct values
            expect(suitingConversationHistoryEntry2[0].parameters[0].name).toBe('Date');
            expect(suitingConversationHistoryEntry2[0].parameters[0].value).toBe('2018-06-16T12:00:00+02:00');

        });
        it('Create two conversationHistory entries for user 4 but exclude one on getting', async () => {
           
            await databaseLangService.createConversationHistoryEntry('u4',
                                                                     { fields: {} },
                                                                     'This is a eleventh test',
                                                                     'I recognized a eleventh test',
                                                                     'projects/test/agent/intents/eleventhtest',
                                                                     'EleventhTest',
                                                                     'unknown');

            await databaseLangService.createConversationHistoryEntry('u4',
                                                                     { fields:
                                                                        { Date:
                                                                            { stringValue: '2018-06-16T12:00:00+02:00',
                                                                              kind: 'stringValue' }, 
                                                                        },
                                                                     },
                                                                     'This is a twelfth test',
                                                                     'I recognized a twelfth test',
                                                                     'projects/test/agent/intents/twelfthtest',
                                                                     'TwelfthTest',
                                                                     'unknown');

            
            // Expect userService.exists to be called two times
            expect(userService.exists).toHaveBeenCalledTimes(2);

            // Expect userService.create to be called one time
            expect(userService.create).toHaveBeenCalledTimes(1);
            
            // Expect user to include the new user
            const searchedUser = user.filter(i => i._id === 'u4');
            expect(searchedUser.length).toBe(1);

            // Expect conversationHistoryService.create to be called two times
            expect(conversationHistoryService.create).toHaveBeenCalledTimes(2);

            const receivedConversationHistory: Array<ConversationHistory> = 
                await databaseLangService.getConversationHistoryOfUserWithoutIntents('u4', ['projects/test/agent/intents/twelfthtest']);

            // Expect conversationHistoryService.getConversationHistoryOfUserWithoutIntents to be called one time
            expect(conversationHistoryService.getConversationHistoryOfUserWithoutIntents).toHaveBeenCalledTimes(1);

            // Expect the receivedConversationHistory length to be one as the twelfth test is not longer included
            expect(receivedConversationHistory.length).toBe(1);

            // Expect conversationHistory to include a suiting entry for the eleventh test
            const suitingConversationHistoryEntry: Array<ConversationHistory> = 
                receivedConversationHistory.filter(i => i.user_id === 'u4')
                                           .filter(i => i.query === 'This is a eleventh test')
                                           .filter(i => i.answer === 'I recognized a eleventh test')
                                           .filter(i => i.intent.name === 'projects/test/agent/intents/eleventhtest' &&
                                                        i.intent.displayName === 'EleventhTest')
                                           .filter(i => i.action === 'unknown');

            // If receivedConversationHistory includes a suiting entry,
            // the length is of suitingConversationHistoryEntry is 1
            expect(suitingConversationHistoryEntry.length).toBe(1);
            
            // Until now we did not test the correct values of parameters (has to be empty in this case)
            expect(suitingConversationHistoryEntry[0].parameters.length).toBe(0);

            /// Expect conversationHistory to not include a suiting entry for the twelfth test
            const suitingConversationHistoryEntry2: Array<ConversationHistory> = 
            receivedConversationHistory.filter(i => i.user_id === 'u4')
                                       .filter(i => i.query === 'This is a twelfth test')
                                       .filter(i => i.answer === 'I recognized a twelfth test')
                                       .filter(i => i.intent.name === 'projects/test/agent/intents/twelfthtest' &&
                                                    i.intent.displayName === 'TwelfthTest')
                                       .filter(i => i.action === 'unknown');

            // If receivedConversationHistory includes no suiting entry,
            // the length is of suitingConversationHistoryEntry2 is 0
            expect(suitingConversationHistoryEntry2.length).toBe(0);
            
        });
        it('Create one conversationHistory entries with a nested parameter for user 5', async () => {

            await databaseLangService.createConversationHistoryEntry('u5',
                                                                     { fields:
                                                                        { Date:
                                                                            { structValue: { fields: 
                                                                                                { DateAsDate: 
                                                                                                    { stringValue:'2018-06-16T12:00:00+02:00',
                                                                                                      kind: 'stringValue', },
                                                                                            }, },
                                                                              kind: 'structValue' }, 
                                                                        },
                                                                     },
                                                                     'This is a thirteenth test',
                                                                     'I recognized a thirteenth test',
                                                                     'projects/test/agent/intents/thirteenthtest',
                                                                     'ThirteenthTest',
                                                                     'unknown');

            
            // Expect userService.exists to be called one times
            expect(userService.exists).toHaveBeenCalledTimes(1);

            // Expect userService.create to be called one time
            expect(userService.create).toHaveBeenCalledTimes(1);
            
            // Expect user to include the new user
            const searchedUser = user.filter(i => i._id === 'u5');
            expect(searchedUser.length).toBe(1);

            // Expect conversationHistoryService.create to be called two times
            expect(conversationHistoryService.create).toHaveBeenCalledTimes(1);

            const receivedConversationHistory: Array<ConversationHistory> = 
                await databaseLangService.getConversationHistoryOfUserWithoutIntents('u5', []);

            // Expect conversationHistoryService.getConversationHistoryOfUserWithoutIntents to be called one time
            expect(conversationHistoryService.getConversationHistoryOfUserWithoutIntents).toHaveBeenCalledTimes(1);

            // Expect the receivedConversationHistory length to be one as the thirteenth test is not longer included
            expect(receivedConversationHistory.length).toBe(1);

            // Expect conversationHistory to include a suiting entry for the thirteenth test
            const suitingConversationHistoryEntry: Array<ConversationHistory> = 
                receivedConversationHistory.filter(i => i.user_id === 'u5')
                                           .filter(i => i.query === 'This is a thirteenth test')
                                           .filter(i => i.answer === 'I recognized a thirteenth test')
                                           .filter(i => i.intent.name === 'projects/test/agent/intents/thirteenthtest' &&
                                                        i.intent.displayName === 'ThirteenthTest')
                                           .filter(i => i.action === 'unknown');

            // If receivedConversationHistory includes a suiting entry,
            // the length is of suitingConversationHistoryEntry is 1
            expect(suitingConversationHistoryEntry.length).toBe(1);
            
            // Until now we did not test the correct values of parameters (has to be one in this case)
            expect(suitingConversationHistoryEntry[0].parameters.length).toBe(1);

            // Expect to be the parameter to be filled with the correct values
            expect(suitingConversationHistoryEntry[0].parameters[0].name).toBe('DateAsDate');
            expect(suitingConversationHistoryEntry[0].parameters[0].value).toBe('2018-06-16T12:00:00+02:00');                                                         
            
        });
    });
});