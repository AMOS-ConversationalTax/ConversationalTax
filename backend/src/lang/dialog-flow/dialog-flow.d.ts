/*
This file contains some type definitions of DialogFlow.
It is not a complet set of types, but covers the most important ones.
All types are taken from the offical documentation.
*/

// Request interfaces

interface DetectIntentRequest {
    queryParams?: object, // object(QueryParameters)
    queryInput?: QueryInput,
    inputAudio?: string
}

// Response interfaces

interface DetectIntentResponse {
    responseId: string,
    queryResult: QueryResult,
    webhookStatus: object // object(Status)
}

// Base interfaces

interface QueryInput {
    audioConfig?: InputAudioConfig,
    text?: TextInput,
    event?: EventInput
}

interface InputAudioConfig {
  audioEncoding: any,// enum(AudioEncoding)
  sampleRateHertz: number,
  languageCode: string,
  phraseHints?: [string]
}

interface TextInput {
    text: string,
    languageCode: string
}

interface EventInput {
    name: string,
    parameters?: object,
    languageCode: string
}

interface QueryResult {
    queryText: string,
    languageCode: string,
    speechRecognitionConfidence: number,
    action: string,
    parameters: object, // TODO not typed?
    allRequiredParamsPresent: boolean,
    fulfillmentText: string,
    fulfillmentMessages: [object], // object(Message)
    webhookSource: string,
    webhookPayload: object,
    outputContexts: [Context],
    intent: Intent,
    intentDetectionConfidence: number,
    diagnosticInfo: object
}

interface Context {
    name: string,
    lifespanCount?: number,
    parameters?: object
}

interface Intent {
    name: string,
    displayName: string,
    webhookState: any, // enum(WebhookState)
    priority?: number,
    isFallback?: boolean,
    mlDisabled?: boolean,
    inputContextNames?: [string],
    events?: [string],
    trainingPhrases?: [object], // object(TrainingPhrase)
    action?: string,
    outputContexts?: [Context],
    resetContexts?: boolean,
    parameters?: [Parameter],
    messages?: [object], // object(Message)
    defaultResponsePlatforms?: [any], // enum(Platform)
    rootFollowupIntentName: string,
    parentFollowupIntentName: string,
    followupIntentInfo?: [object], // object(FollowupIntentInfo)
}

interface Parameter {
    name: string,
    displayName: string,
    value?: string,
    defaultValue?: string,
    entityTypeDisplayName?: string,
    mandatory?: boolean,
    prompts?: [string],
    isList?: boolean
}

// Additions

interface SessionEntity {
    value: string,
    synonyms: string[],
}