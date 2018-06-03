export interface ActionInformation {
    name: string;
    helpText: string;
}

export interface IntentInformation {
    displayName: string;
    name: string;
    contextText: string;
    helpText: string;
    actions: ActionInformation[];
}

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
                helpText: 'Damit ich zuordnen kann um welchen Arbeitsvertrag es sich handelt, musst du diesen bennen.',
            },
        ],
    },
];