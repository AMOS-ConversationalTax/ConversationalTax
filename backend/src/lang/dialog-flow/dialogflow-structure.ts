import IntentConfig from "../intents/IntentConfig";

/**
 * An interface wrapping informations and context/help texts for an action
 */
export interface ActionInformation {
    /**
     * The name of the action
     * @type{string}
     */
    name: string;

    /**
     * The helpText for a action
     * @type{string}
     */
    helpText: string;
}

/**
 * An interface wrapping informations and context/help texts for an intent
 */
export interface IntentInformation {
    /**
     * The display name of the intent
     * @type {string}
     */
    displayName: string;

    /**
     * The name (=uri) of the intent
     * @type {string}
     */
    name: string;

    /**
     * The context text for the intent
     * @type {string}
     */
    contextText: string;

    /**
     * The help text for the intent
     * @type {string}
     */
    helpText: string;

    /**
     * The actions for the intent
     * @type {ActionInformation[]}
     */
    actions: ActionInformation[];
}

export enum DIALOGFLOW_INTENT_IDS {
    Fallback = '41d8bfa1-b463-4d15-a1ea-9491f5ee1a76', // Default Fallback Intent
    Help = 'e695c10c-0a85-4ede-a899-67f264ff5275', // Hilfe? - Fallback
    Context = '39611549-cad9-4152-9130-22ed7879e700', // Kontext? - Fallback

    // TODO There should only be one CreateContract:
    Contract_Create = 'ae4cd4c7-67ea-41e3-b064-79b0a75505c5', // Arbeitsvertrag
    Contract_CreateWithStartdate = 'b0159b15-0635-4d2e-a673-88cc10c03422', // Arbeitsvertrag mit Startdatum erstellen
    Contract = '0e232798-7c81-4731-9a47-078b3c91d6aa', // Vertragsabschluss

    Contract_ListAll = '92883a98-404c-4e9f-b385-a5a9108a4764', // Arbeitsvertrag - Alle auflisten
    Contract_Enddate = '9694cec4-f8e8-478b-b9cc-fa1879b7a202', // Arbeitsvertrag - Enddatum
    Contract_EnddateUnlimited = 'd1523cf3-bb4d-47cb-8fc4-bec3d669628e', // Arbeitsvertrag - Enddatum unbefristet
    Contract_Rename = '5ca04ab8-3856-4c1b-afd9-78052f35d929', // Arbeitsvertrag - Namensänderung
    Contract_Startdate = '99d07e41-0833-4e50-991e-5f49ba4e9bc4', // Arbeitsvertrag - Startdatum
}

/**
 * A array containing the basic informations about a bunch of intent (there should be an entry for every used intent)
 * @type {IntentInformation[]}
 */
export const DialogFlowStructure: IntentInformation[] = [
    {
        displayName: 'Arbeitsvertrag',
        name: IntentConfig.INTENT_PREFIX + DIALOGFLOW_INTENT_IDS.Contract_Create,
        contextText: 'Wir waren gerade dabei einen neuen Arbeitsvertrag anzulegen.',
        helpText: 'Für die Einkommensteuererklärung benötige ich Daten zu deinem Arbeitsvertrag.',
        actions: [
            {
                name: 'Default',
                helpText: 'TODO',
            },
            {
                name: 'VertragsName',
                helpText: 'Du musst den Arbeitnehmer benennen, damit ich den Vertrag später zuordnen kann.',
            },
        ],
    },
    {
        displayName: 'Arbeitsvertrag - Enddatum',
        name: IntentConfig.INTENT_PREFIX + DIALOGFLOW_INTENT_IDS.Contract_Enddate,
        contextText: 'Wir waren gerade dabei das Enddatum eines Arbeitsvertrags zuändern.',
        helpText: 'Falls dein Arbeitsvertrag ein Enddatum hat, benötige ich dieses für die Einkommensteuererklärung.',
        actions: [
            {
                name: 'Default',
                helpText: 'TODO',
            },
            {
                name: 'EndDate',
                helpText: 'Um das Enddatum zuändern, musst du uns mitteilen, wann der Vertrag ausläuft.',
            },
            {
                name: 'ContractName',
                helpText: 'Damit ich zuordnen kann um welchen Arbeitsvertrag es sich handelt, musst du diesen benennen.',
            },
        ],
    },
    {
        displayName: 'Arbeitsvertrag - Startdatum',
        name: IntentConfig.INTENT_PREFIX + DIALOGFLOW_INTENT_IDS.Contract_Startdate,
        contextText: 'Wir waren gerade dabei das Startdatum eines Arbeitsvertrags zuändern.',
        helpText: 'Falls dein Arbeitsvertrag ein Startdatum hat, benötige ich dieses für die Einkommensteuererklärung.',
        actions: [
            {
                name: 'Default',
                helpText: 'TODO',
            },
            {
                name: 'Startdatum',
                helpText: 'Um das Startdatum zuändern, musst du uns mitteilen, wann der Vertrag ausläuft.',
            },
            {
                name: 'EmploymentContract',
                helpText: 'Damit ich zuordnen kann um welchen Arbeitsvertrag es sich handelt, musst du diesen benennen.',
            },
        ],
    },
];