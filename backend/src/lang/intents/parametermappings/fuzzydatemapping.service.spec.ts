/// <reference types="jest" />
import { FuzzyDateMappingService } from './fuzzydatemapping.service';

describe('FuzzyDateMappingService', () => {

    let fuzzyDateMappingService: FuzzyDateMappingService;

    beforeEach(() => { 
        fuzzyDateMappingService = new FuzzyDateMappingService();
    })

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateMonth - Without a FuzzyDateModifier', () => {
        it('FuzzyDateMonth = Januar', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Januar',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,0,1,0,0,0,0),
                    'name': 'Januar'
                });

        });
        it('FuzzyDateMonth = Februar', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Februar',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,1,1,0,0,0,0),
                    'name': 'Februar'
                });

        });
        it('FuzzyDateMonth = März', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'März',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,1,0,0,0,0),
                    'name': 'März'
                });

        });
        it('FuzzyDateMonth = April', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'April',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,3,1,0,0,0,0),
                    'name': 'April'
                });

        });
        it('FuzzyDateMonth = Mai', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Mai',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,4,1,0,0,0,0),
                    'name': 'Mai'
                });

        });
        it('FuzzyDateMonth = Juni', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juni',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,1,0,0,0,0),
                    'name': 'Juni'
                });

        });
        it('FuzzyDateMonth = Juli', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juli',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,1,0,0,0,0),
                    'name': 'Juli'
                });

        });
        it('FuzzyDateMonth = August', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'August',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,7,1,0,0,0,0),
                    'name': 'August'
                });

        });
        it('FuzzyDateMonth = September', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'September',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,1,0,0,0,0),
                    'name': 'September'
                });

        });
        it('FuzzyDateMonth = Oktober', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Oktober',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,9,1,0,0,0,0),
                    'name': 'Oktober'
                });

        });
        it('FuzzyDateMonth = November', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'November',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,10,1,0,0,0,0),
                    'name': 'November'
                });

        });
        it('FuzzyDateMonth = Dezember', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Dezember',
                          kind: 'stringValue' }, 
                      FuzzyDateYear: 
                        { stringValue: '2018',
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

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Januar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,0,1,0,0,0,0),
                    'name': 'Anfang Januar'
                });

        });
        it('FuzzyDateMonth = Februar', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Februar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,1,1,0,0,0,0),
                    'name': 'Anfang Februar'
                });

        });
        it('FuzzyDateMonth = März', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'März',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,1,0,0,0,0),
                    'name': 'Anfang März'
                });

        });
        it('FuzzyDateMonth = April', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'April',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,3,1,0,0,0,0),
                    'name': 'Anfang April'
                });

        });
        it('FuzzyDateMonth = Mai', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Mai',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,4,1,0,0,0,0),
                    'name': 'Anfang Mai'
                });

        });
        it('FuzzyDateMonth = Juni', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juni',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,1,0,0,0,0),
                    'name': 'Anfang Juni'
                });

        });
        it('FuzzyDateMonth = Juli', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juli',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,1,0,0,0,0),
                    'name': 'Anfang Juli'
                });

        });
        it('FuzzyDateMonth = August', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'August',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,7,1,0,0,0,0),
                    'name': 'Anfang August'
                });

        });
        it('FuzzyDateMonth = September', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'September',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,1,0,0,0,0),
                    'name': 'Anfang September'
                });

        });
        it('FuzzyDateMonth = Oktober', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Oktober',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,9,1,0,0,0,0),
                    'name': 'Anfang Oktober'
                });

        });
        it('FuzzyDateMonth = November', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'November',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,10,1,0,0,0,0),
                    'name': 'Anfang November'
                });

        });
        it('FuzzyDateMonth = Dezember', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Dezember',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
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

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Januar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,0,15,0,0,0,0),
                    'name': 'Mitte Januar'
                });

        });
        it('FuzzyDateMonth = Februar', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Februar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,1,14,0,0,0,0),
                    'name': 'Mitte Februar'
                });

        });
        it('FuzzyDateMonth = März', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'März',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,15,0,0,0,0),
                    'name': 'Mitte März'
                });

        });
        it('FuzzyDateMonth = April', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'April',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,3,15,0,0,0,0),
                    'name': 'Mitte April'
                });

        });
        it('FuzzyDateMonth = Mai', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Mai',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,4,15,0,0,0,0),
                    'name': 'Mitte Mai'
                });

        });
        it('FuzzyDateMonth = Juni', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juni',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,15,0,0,0,0),
                    'name': 'Mitte Juni'
                });

        });
        it('FuzzyDateMonth = Juli', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juli',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,15,0,0,0,0),
                    'name': 'Mitte Juli'
                });

        });
        it('FuzzyDateMonth = August', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'August',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,7,15,0,0,0,0),
                    'name': 'Mitte August'
                });

        });
        it('FuzzyDateMonth = September', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'September',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,15,0,0,0,0),
                    'name': 'Mitte September'
                });

        });
        it('FuzzyDateMonth = Oktober', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Oktober',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,9,15,0,0,0,0),
                    'name': 'Mitte Oktober'
                });

        });
        it('FuzzyDateMonth = November', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'November',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,10,15,0,0,0,0),
                    'name': 'Mitte November'
                });

        });
        it('FuzzyDateMonth = Dezember', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Dezember',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
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

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Januar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,0,31,0,0,0,0),
                    'name': 'Ende Januar'
                });

        });
        it('FuzzyDateMonth = Februar', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Februar',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,1,28,0,0,0,0),
                    'name': 'Ende Februar'
                });

        });
        it('FuzzyDateMonth = März', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'März',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,31,0,0,0,0),
                    'name': 'Ende März'
                });

        });
        it('FuzzyDateMonth = April', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'April',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,3,30,0,0,0,0),
                    'name': 'Ende April'
                });

        });
        it('FuzzyDateMonth = Mai', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Mai',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,4,31,0,0,0,0),
                    'name': 'Ende Mai'
                });

        });
        it('FuzzyDateMonth = Juni', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juni',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,30,0,0,0,0),
                    'name': 'Ende Juni'
                });

        });
        it('FuzzyDateMonth = Juli', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Juli',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,31,0,0,0,0),
                    'name': 'Ende Juli'
                });

        });
        it('FuzzyDateMonth = August', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'August',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,7,31,0,0,0,0),
                    'name': 'Ende August'
                });

        });
        it('FuzzyDateMonth = September', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'September',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,30,0,0,0,0),
                    'name': 'Ende September'
                });

        });
        it('FuzzyDateMonth = Oktober', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Oktober',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,9,31,0,0,0,0),
                    'name': 'Ende Oktober'
                });

        });
        it('FuzzyDateMonth = November', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'November',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,10,30,0,0,0,0),
                    'name': 'Ende November'
                });

        });
        it('FuzzyDateMonth = Dezember', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateMonth: 
                        { stringValue: 'Dezember',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
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

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Frühjahr',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,21,0,0,0,0),
                    'name': 'Frühjahr'
                });

        });
        it('FuzzyDateSeason = Sommer', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Sommer',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,21,0,0,0,0),
                    'name': 'Sommer'
                });

        });
        it('FuzzyDateSeason = Herbst', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Herbst',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,23,0,0,0,0),
                    'name': 'Herbst'
                });

        });
        it('FuzzyDateSeason = Winter', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Winter',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,11,21,0,0,0,0),
                    'name': 'Winter'
                });

        });
        it('FuzzyDateSeason = Hochsommer', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Hochsommer',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,1,0,0,0,0),
                    'name': 'Hochsommer'
                });

        });
    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateSeason - FuzzyDateModifier = Anfang', () => {
        it('FuzzyDateSeason = Frühjahr', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Frühjahr',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,2,21,0,0,0,0),
                    'name': 'Anfang Frühjahr'
                });

        });
        it('FuzzyDateSeason = Sommer', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Sommer',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,21,0,0,0,0),
                    'name': 'Anfang Sommer'
                });

        });
        it('FuzzyDateSeason = Herbst', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Herbst',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,23,0,0,0,0),
                    'name': 'Anfang Herbst'
                });

        });
        it('FuzzyDateSeason = Winter', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Winter',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,11,21,0,0,0,0),
                    'name': 'Anfang Winter'
                });

        });
        it('FuzzyDateSeason = Hochsommer', async () => {

            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Hochsommer',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,1,0,0,0,0),
                    'name': 'Anfang Hochsommer'
                });

        });
    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateSeason - FuzzyDateModifier = Mitte', () => {
        it('FuzzyDateSeason = Frühjahr', async () => {
    
            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Frühjahr',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,4,5,0,0,0,0),
                    'name': 'Mitte Frühjahr'
                });
    
        });
        it('FuzzyDateSeason = Sommer', async () => {
    
            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Sommer',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,7,6,0,0,0,0),
                    'name': 'Mitte Sommer'
                });
    
        });
        it('FuzzyDateSeason = Herbst', async () => {
    
            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Herbst',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,10,5,0,0,0,0),
                    'name': 'Mitte Herbst'
                });
    
        });
        it('FuzzyDateSeason = Winter', async () => {
    
            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Winter',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2019,1,3,0,0,0,0),
                    'name': 'Mitte Winter'
                });
    
        });
        it('FuzzyDateSeason = Hochsommer', async () => {
    
            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Hochsommer',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,6,23,0,0,0,0),
                    'name': 'Mitte Hochsommer'
                });
    
        });
    });
  
    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateSeason - FuzzyDateModifier = Ende', () => {
        it('FuzzyDateSeason = Frühjahr', async () => {
    
            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Frühjahr',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,5,20,0,0,0),
                    'name': 'Ende Frühjahr'
                });
    
        });
        it('FuzzyDateSeason = Sommer', async () => {
    
            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Sommer',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,8,22,0,0,0),
                    'name': 'Ende Sommer'
                });
    
        });
        it('FuzzyDateSeason = Herbst', async () => {
    
            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Herbst',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,11,20,0,0,0),
                    'name': 'Ende Herbst'
                });
    
        });
        it('FuzzyDateSeason = Winter', async () => {
    
            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Winter',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2019,2,20,0,0,0),
                    'name': 'Ende Winter'
                });
    
        });
        it('FuzzyDateSeason = Hochsommer', async () => {
    
            // We always test in 2018
            // The year is coded in FuzzyDateYear
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateSeason: 
                        { stringValue: 'Hochsommer',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' },
                      FuzzyDateYear: 
                        { stringValue: '2018',
                          kind: 'stringValue' }
                    }
                // Compare it with the expected output 
                })).toEqual({
                    'date': new Date(2018,7,15,0,0,0),
                    'name': 'Ende Hochsommer'
                });
    
        });
    }); 

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateRelative - Without a FuzzyDateModifier', () => {
        it('FuzzyDateRelative = Nächste Woche', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächste Woche',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2018,0,7,0,0,0),
                    'name': 'Nächste Woche'
                });

        });
        it('FuzzyDateRelative = Nächster Monat', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächster Monat',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2018,1,1,0,0,0),
                    'name': 'Nächster Monat'
                });

        });
        it('FuzzyDateRelative = Nächster Monat - Special case: Next month is in next year', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächster Monat',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,11,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2019,0,1,0,0,0),
                    'name': 'Nächster Monat'
                });

        });
        it('FuzzyDateRelative = Nächstes Jahr', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächstes Jahr',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2019,0,1,0,0,0),
                    'name': 'Nächstes Jahr'
                });

        });
    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateRelative - FuzzyDateModifier = Anfang', () => {
        it('FuzzyDateRelative = Nächste Woche', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächste Woche',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2018,0,7,0,0,0),
                    'name': 'Anfang Nächste Woche'
                });

        });
        it('FuzzyDateRelative = Nächster Monat', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächster Monat',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2018,1,1,0,0,0),
                    'name': 'Anfang Nächster Monat'
                });

        });
        it('FuzzyDateRelative = Nächstes Jahr', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächstes Jahr',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Anfang',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2019,0,1,0,0,0),
                    'name': 'Anfang Nächstes Jahr'
                });

        });
    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateRelative - FuzzyDateModifier = Mitte', () => {
        it('FuzzyDateRelative = Nächste Woche', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächste Woche',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2018,0,10,0,0,0),
                    'name': 'Mitte Nächste Woche'
                });

        });
        it('FuzzyDateRelative = Nächster Monat', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächster Monat',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2018,1,15,0,0,0),
                    'name': 'Mitte Nächster Monat'
                });

        });
        it('FuzzyDateRelative = Nächstes Jahr', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächstes Jahr',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Mitte',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2019,6,1,0,0,0),
                    'name': 'Mitte Nächstes Jahr'
                });

        });
    });

    describe('mapFuzzyDate() - FuzzyDate is a FuzzyDateRelative - FuzzyDateModifier = Ende', () => {
        it('FuzzyDateRelative = Nächste Woche', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächste Woche',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2018,0,13,0,0,0),
                    'name': 'Ende Nächste Woche'
                });

        });
        it('FuzzyDateRelative = Nächster Monat', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächster Monat',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2018,1,31,0,0,0),
                    'name': 'Ende Nächster Monat'
                });

        });
        it('FuzzyDateRelative = Nächstes Jahr', async () => {

            // We always test in 2018
            expect(fuzzyDateMappingService.mapFuzzyDate(
                // Set the input FuzzyDate struct 
                { fields:
                    { FuzzyDateRelative: 
                        { stringValue: 'Nächstes Jahr',
                          kind: 'stringValue' },
                      FuzzyDateModifier: 
                        { stringValue: 'Ende',
                          kind: 'stringValue' }
                    }
                },
                // Set the currentDate to ensure repeatability of tests
                new Date (2018,0,1,0,0,0)
                // Compare it with the expected output 
                )).toEqual({
                    'date': new Date(2019,11,31,0,0,0),
                    'name': 'Ende Nächstes Jahr'
                });

        });
    });

});