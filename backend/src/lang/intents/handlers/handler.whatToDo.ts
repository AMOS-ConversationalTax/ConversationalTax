import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { EmploymentContractService } from '../../../database/employmentContract/employmentContract.service';
import { EmploymentContract } from 'database/employmentContract/interfaces/employmentContract.interface';

/**
 * Contains information which contracts are missing some information
 */
interface MissingContractInput {
    /**
     * Which contracts are missing the startDate?
     * @type {string[]}
     */
    startDate: string[];

    /**
     * Which contracts are missing the endDate?
     * @type {string[]}
     */
    endDate: string[];
}

/**
 * Class to handle a specific Intent
 */
@Injectable()
export class WhatToDoIntentHandler extends IntentHandler{
    private readonly noContractText = 'Wir können damit anfangen deinen Arbeitsvertrag zu hinterlegen.';
    private readonly allFullfilt = 'Für den Moment haben wir alle benötigten Daten erfasst.' +
        'Wenn du noch einen weiteren Arbeitsvertrag hast, können wir diesen anlegen.';

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param {IIntentData} intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText | undefined>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {
        const contracts = await this.employmentContractService.findEmploymentContractsOfUser(intentData.user);

        if (contracts.length === 0) {
            return { text: this.noContractText };
        }

        const missingInput = this.analyseContracts(contracts);
        const missingStartDates = missingInput.startDate.length;
        const missingEndDates = missingInput.endDate.length;

        if (missingStartDates === 0 && missingEndDates === 0) {
            return {
                text: this.allFullfilt,
            };
        }

        const phrasedContractsStart = this.phraseContracts(missingInput.startDate);
        const phrasedContractsEnd = this.phraseContracts(missingInput.endDate);
        let text = '';

        // Multiple Startdates or no enddates missing
        if (missingStartDates > 1 || (missingStartDates === 1 && missingEndDates === 0)) {
            text = `Du könntest für ${phrasedContractsStart} noch das Startdatum angeben.`;
        }
        // One Start and any number of Enddates missing
        else if (missingStartDates === 1 && missingEndDates > 1) {
            text = `Du könntest für ${phrasedContractsStart} noch das Startdatum oder für ${phrasedContractsEnd} das Enddatum angeben.`;
        }
        // Only Enddates missing
        else if (missingEndDates > 0) {
            text = `Du könntest für ${phrasedContractsEnd} noch das Enddatum angeben.`;
        }

        return {text};
    }

    /**
     * Goes through all contracts and checks whether all fields are set.
     * @param {EmploymentContract[]} contracts The user's contracts
     * @returns {MissingContractInput} The missing information
     */
    private analyseContracts(contracts: EmploymentContract[]): MissingContractInput {
        const missingInput: MissingContractInput = { startDate: [], endDate: [] };
        contracts.forEach(contract => {
            if (contract.startDate_exact === undefined && contract.startDate_string === undefined) {
                missingInput.startDate.push(contract.name);
            } else if (contract.endDate_exact === undefined && contract.endDate_string === undefined) {
                missingInput.endDate.push(contract.name);
            }
        });
        return missingInput;
    }

    /**
     * Natural Language Generation for contract names
     * @param {string[]} contractNames An array of contract names
     * @returns {string} The phrased contractNames
     */
    private phraseContracts(contractNames: string[]): string {
        if (contractNames.length === 0) {
            return '';
        } else if (contractNames.length === 1) {
            return `deinen Arbeitsvertrag ${contractNames[0]}`;
        } else {
            let output = '';
            for (let i = 0; i < contractNames.length - 1; i++) {
                output += `${contractNames[i]}, `;
            }
            return 'deine Arbeitsverträge ' + output.substr(0, output.length - 2) + ` und ${contractNames[contractNames.length - 1]}`;
        }
    }
}