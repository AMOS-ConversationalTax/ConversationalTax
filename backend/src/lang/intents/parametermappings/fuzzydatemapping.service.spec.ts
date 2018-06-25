/// <reference types="jest" />
import { FuzzyDateMappingService } from './fuzzydatemapping.service';

describe('FuzzyDateMappingService', () => {

    let fuzzyDateMappingService: FuzzyDateMappingService;

    beforeEach(() => { 
        fuzzyDateMappingService = new FuzzyDateMappingService();
    })

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateMonth - Without a FuzzyDateModifier', () => {
        it('FuzzyDateMonth = Januar', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Januar',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,0,1,0,0,0,0),
                    'name': 'Januar'
                });

        });
        it('FuzzyDateMonth = Februar', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Februar',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,1,1,0,0,0,0),
                    'name': 'Februar'
                });

        });
        it('FuzzyDateMonth = März', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'März',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,1,0,0,0,0),
                    'name': 'März'
                });

        });
        it('FuzzyDateMonth = April', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'April',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,3,1,0,0,0,0),
                    'name': 'April'
                });

        });
        it('FuzzyDateMonth = Mai', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Mai',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,4,1,0,0,0,0),
                    'name': 'Mai'
                });

        });
        it('FuzzyDateMonth = Juni', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juni',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,1,0,0,0,0),
                    'name': 'Juni'
                });

        });
        it('FuzzyDateMonth = Juli', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juli',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,1,0,0,0,0),
                    'name': 'Juli'
                });

        });
        it('FuzzyDateMonth = August', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'August',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,7,1,0,0,0,0),
                    'name': 'August'
                });

        });
        it('FuzzyDateMonth = September', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'September',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,1,0,0,0,0),
                    'name': 'September'
                });

        });
        it('FuzzyDateMonth = Oktober', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Oktober',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,9,1,0,0,0,0),
                    'name': 'Oktober'
                });

        });
        it('FuzzyDateMonth = November', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'November',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,10,1,0,0,0,0),
                    'name': 'November'
                });

        });
        it('FuzzyDateMonth = Dezember', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Dezember',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,11,1,0,0,0,0),
                    'name': 'Dezember'
                });

        });
    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateMonth - FuzzyDateModifier = Anfang', () => {
        it('FuzzyDateMonth = Januar', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Januar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,0,1,0,0,0,0),
                    'name': 'Anfang Januar'
                });

        });
        it('FuzzyDateMonth = Februar', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Februar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,1,1,0,0,0,0),
                    'name': 'Anfang Februar'
                });

        });
        it('FuzzyDateMonth = März', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'März',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,1,0,0,0,0),
                    'name': 'Anfang März'
                });

        });
        it('FuzzyDateMonth = April', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'April',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,3,1,0,0,0,0),
                    'name': 'Anfang April'
                });

        });
        it('FuzzyDateMonth = Mai', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Mai',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,4,1,0,0,0,0),
                    'name': 'Anfang Mai'
                });

        });
        it('FuzzyDateMonth = Juni', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juni',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,1,0,0,0,0),
                    'name': 'Anfang Juni'
                });

        });
        it('FuzzyDateMonth = Juli', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juli',
                          kind: 'stringValue' },
                    FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,1,0,0,0,0),
                    'name': 'Anfang Juli'
                });

        });
        it('FuzzyDateMonth = August', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'August',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,7,1,0,0,0,0),
                    'name': 'Anfang August'
                });

        });
        it('FuzzyDateMonth = September', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'September',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,1,0,0,0,0),
                    'name': 'Anfang September'
                });

        });
        it('FuzzyDateMonth = Oktober', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Oktober',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,9,1,0,0,0,0),
                    'name': 'Anfang Oktober'
                });

        });
        it('FuzzyDateMonth = November', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'November',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,10,1,0,0,0,0),
                    'name': 'Anfang November'
                });

        });
        it('FuzzyDateMonth = Dezember', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Dezember',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,11,1,0,0,0,0),
                    'name': 'Anfang Dezember'
                });

        });
    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateMonth - FuzzyDateModifier = Mitte', () => {
        it('FuzzyDateMonth = Januar', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Januar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,0,15,0,0,0,0),
                    'name': 'Mitte Januar'
                });

        });
        it('FuzzyDateMonth = Februar', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Februar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,1,14,0,0,0,0),
                    'name': 'Mitte Februar'
                });

        });
        it('FuzzyDateMonth = März', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'März',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,15,0,0,0,0),
                    'name': 'Mitte März'
                });

        });
        it('FuzzyDateMonth = April', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'April',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,3,15,0,0,0,0),
                    'name': 'Mitte April'
                });

        });
        it('FuzzyDateMonth = Mai', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Mai',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,4,15,0,0,0,0),
                    'name': 'Mitte Mai'
                });

        });
        it('FuzzyDateMonth = Juni', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juni',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,15,0,0,0,0),
                    'name': 'Mitte Juni'
                });

        });
        it('FuzzyDateMonth = Juli', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juli',
                          kind: 'stringValue' },
                    FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,15,0,0,0,0),
                    'name': 'Mitte Juli'
                });

        });
        it('FuzzyDateMonth = August', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'August',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,7,15,0,0,0,0),
                    'name': 'Mitte August'
                });

        });
        it('FuzzyDateMonth = September', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'September',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,15,0,0,0,0),
                    'name': 'Mitte September'
                });

        });
        it('FuzzyDateMonth = Oktober', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Oktober',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,9,15,0,0,0,0),
                    'name': 'Mitte Oktober'
                });

        });
        it('FuzzyDateMonth = November', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'November',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,10,15,0,0,0,0),
                    'name': 'Mitte November'
                });

        });
        it('FuzzyDateMonth = Dezember', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Dezember',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,11,15,0,0,0,0),
                    'name': 'Mitte Dezember'
                });

        });
    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateMonth - FuzzyDateModifier = Ende', () => {
        it('FuzzyDateMonth = Januar', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Januar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,0,31,0,0,0,0),
                    'name': 'Ende Januar'
                });

        });
        it('FuzzyDateMonth = Februar', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Februar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,1,28,0,0,0,0),
                    'name': 'Ende Februar'
                });

        });
        it('FuzzyDateMonth = März', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'März',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,31,0,0,0,0),
                    'name': 'Ende März'
                });

        });
        it('FuzzyDateMonth = April', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'April',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,3,30,0,0,0,0),
                    'name': 'Ende April'
                });

        });
        it('FuzzyDateMonth = Mai', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Mai',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,4,31,0,0,0,0),
                    'name': 'Ende Mai'
                });

        });
        it('FuzzyDateMonth = Juni', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juni',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,30,0,0,0,0),
                    'name': 'Ende Juni'
                });

        });
        it('FuzzyDateMonth = Juli', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juli',
                          kind: 'stringValue' },
                    FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,31,0,0,0,0),
                    'name': 'Ende Juli'
                });

        });
        it('FuzzyDateMonth = August', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'August',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,7,31,0,0,0,0),
                    'name': 'Ende August'
                });

        });
        it('FuzzyDateMonth = September', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'September',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,30,0,0,0,0),
                    'name': 'Ende September'
                });

        });
        it('FuzzyDateMonth = Oktober', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Oktober',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,9,31,0,0,0,0),
                    'name': 'Ende Oktober'
                });

        });
        it('FuzzyDateMonth = November', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'November',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,10,30,0,0,0,0),
                    'name': 'Ende November'
                });

        });
        it('FuzzyDateMonth = Dezember', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Dezember',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,11,31,0,0,0,0),
                    'name': 'Ende Dezember'
                });

        });
    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateSeason - Without a FuzzyDateModifier', () => {

        it('FuzzyDateSeason = Frühjahr', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Frühjahr',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,21,0,0,0,0),
                    'name': 'Frühjahr'
                });

        });

    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateSeason - FuzzyDateModifier = Anfang', () => {

        it('FuzzyDateSeason = Frühjahr', async () => {

            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Frühjahr',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,21,0,0,0,0),
                    'name': 'Anfang Frühjahr'
                });

        });

    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateSeason - FuzzyDateModifier = Mitte', () => {

        it('FuzzyDateSeason = Frühjahr', async () => {
    
            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Frühjahr',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,4,5,0,0,0,0),
                    'name': 'Mitte Frühjahr'
                });
    
        });

    });
  
    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateSeason - FuzzyDateModifier = Ende', () => {

        it('FuzzyDateSeason = Frühjahr', async () => {
    
            // We use a hard coded 'currentDate' to ensure the possibility
            // of repetition of tests
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the 'currentDate' to 01.01.2018
                new Date(2018,0,1,0,0,0,0),
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Frühjahr',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018, 5, 21, 0, 0, 0),
                    'name': 'Ende Frühjahr'
                });
    
        });

    }); 

});