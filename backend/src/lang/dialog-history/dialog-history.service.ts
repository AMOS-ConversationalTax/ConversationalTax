import { Injectable } from '@nestjs/common';

// How far back should we store the history?
const MAX_HISTORY_COUNT = 3;

/**
 * A provider to store the dialog history of the user.
 * Since we are only implementing a prototype, this class stores everthing in memory.
 */
@Injectable()
export class DialogHistoryService {
    private historyStorage = new Map<string, UsersDialogHistory[]>();

    /**
     * Stores the history
     * @param u_id The user id
     * @param intent The current intent from the dialogflow's response
     * @param actionName The current action of the dialogflow's response
     */
    public storeHistory(u_id: string, intent: Intent, actionName?: string) {
        this.createUser(u_id);
        const usersHistory = this.historyStorage.get(u_id);

        usersHistory.push({
            intent,
            action: actionName,
        });

        this.removeOverflow(u_id);
    }

    /**
     * Retrieves the history of a user.
     * @param u_id The user id
     * @returns {UsersDialogHistory[]} An array containing the intents and actions.
     */
    public getHistory(u_id: string): UsersDialogHistory[] {
        if (!this.historyStorage.has(u_id)) {
            return [];
        }
        return this.historyStorage.get(u_id);
    }

    /**
     * Ensures only MAX_HISTORY_COUNT are stored.
     * @param u_id The user id
     */
    private removeOverflow(u_id: string) {
        if (this.historyStorage.get(u_id).length > MAX_HISTORY_COUNT) {
            this.historyStorage.get(u_id).pop();
        }
    }

    /**
     * Ensures the user exists in our map.
     * @param u_id The user id
     */
    private createUser(u_id: string) {
        if (!this.historyStorage.has(u_id)) {
            this.historyStorage.set(u_id, []);
        }
    }
}
