/// <reference types="jest" />
import { DialogHistoryService } from './dialog-history.service';

describe('DialogHistoryService', () => {
    let historyService: DialogHistoryService;
    const u_id = 'userID';

    beforeEach(() => {
        historyService = new DialogHistoryService();
    });

    it('should store and receive the history correctly', () => {
        const intent = {name: 'intentName', displayName: ''};
        historyService.storeHistory(u_id, intent, 'actionName');
        const history = historyService.getHistory(u_id);
        expect(history.length).toBe(1);
        expect(history[0].intent.name).toBe(intent.name);
        expect(history[0].action).toBe('actionName');
    });

    it('should store and receive multiple histories correctly', () => {
        const intent = {name: 'intentName', displayName: ''};
        const intent2 = {name: 'intentName2', displayName: ''};
        historyService.storeHistory(u_id, intent, 'actionName');
        historyService.storeHistory(u_id, intent2, 'actionName2');

        const history = historyService.getHistory(u_id);
        expect(history.length).toBe(2);

        expect(history[1].intent.name).toBe(intent.name);
        expect(history[1].action).toBe('actionName');

        expect(history[0].intent.name).toBe(intent2.name);
        expect(history[0].action).toBe('actionName2');
    });

});