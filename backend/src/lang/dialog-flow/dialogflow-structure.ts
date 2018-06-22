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

/**
 * A array containing the basic informations about a bunch of intent (there should be an entry for every used intent)
 * @type {IntentInformation[]}
 */
export const DialogFlowStructure: IntentInformation[] = [
    {
        displayName: 'Arbeitsvertrag',
        name: 'projects/test-c7ec0/agent/intents/ae4cd4c7-67ea-41e3-b064-79b0a75505c5',
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
        name: 'projects/test-c7ec0/agent/intents/9694cec4-f8e8-478b-b9cc-fa1879b7a202',
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
        name: 'projects/test-c7ec0/agent/intents/b9e66fee-8758-4cf1-a532-62e462b4c4ee',
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