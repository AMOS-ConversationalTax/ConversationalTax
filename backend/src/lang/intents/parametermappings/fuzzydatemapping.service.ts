/**
 * The return structure of any fuzzy date
 */
export interface FuzzyDateReturn {

    /**
     * The combined name of the fuzzy date
     * @type {string}
     */
    name: string;

    /**
     * The date the fuzzy date is mapped to
     * @type {Date}
     */
    date: Date;

}

/**
 * Class to generate real dates out of the most general fuzzy dates
 */
export class FuzzyDateMappingService {

    /**
     * Get a string and a computed date out of a fuzzy date parameter
     * If no fuzzyDateYear is given, the events are computed for the current year
     * @param {any} fuzzyDate The fuzzy date parameter
     * @returns {FuzzyDateReturn} The suiting name / date pair
     */
    public mapFuzzyDate(fuzzyDate: any): FuzzyDateReturn {

        // Check whether fuzzyDate is constructed correctly
        if ( ! ( fuzzyDate !== undefined && fuzzyDate.hasOwnProperty('fields') ) ) {

            throw new Error('Recognized a non valid fuzzyDate in mapFuzzyDate()');

        }

        // Get the current year
        let year: number = (new Date()).getFullYear();

        // Is a fuzzyDateYear given
        if ( fuzzyDate.fields.hasOwnProperty('FuzzyDateYear') ) {

            year = Number(fuzzyDate.fields.FuzzyDateYear.stringValue);

        }

        // There FuzzyDates based on months
        if ( fuzzyDate.fields.hasOwnProperty('FuzzyDateMonth') ) {

            // If there is a modifier like 'Anfang', 'Mitte' or 'Ende' we want to use that
            if ( fuzzyDate.fields.hasOwnProperty('FuzzyDateModifier') ) {

                return this.mapFuzzyDateMonth(year,
                                              fuzzyDate.fields.FuzzyDateMonth.stringValue,
                                              fuzzyDate.fields.FuzzyDateModifier.stringValue);

            } else {

                return this.mapFuzzyDateMonth(year,
                                              fuzzyDate.fields.FuzzyDateMonth.stringValue);

            }

        } else if ( fuzzyDate.fields.hasOwnProperty('FuzzyDateSeason') ) {

            // If there is a modifier like 'Anfang', 'Mitte' or 'Ende' we want to use that
            if ( fuzzyDate.fields.hasOwnProperty('FuzzyDateModifier') ) {

                return this.mapFuzzyDateSeason(year,
                                               fuzzyDate.fields.FuzzyDateSeason.stringValue,
                                               fuzzyDate.fields.FuzzyDateModifier.stringValue);

            } else {

                return this.mapFuzzyDateSeason(year,
                                               fuzzyDate.fields.FuzzyDateSeason.stringValue);

            }

        }

        return undefined;

    }

    /**
     * Map a fuzzyDateMonth
     * @param {Date} year The year the month is part of
     * @param {string} fuzzyDateMonth The basic month
     * @param {string} fuzzyDateModifier An optional modifier for the fuzzy date
     * @returns {FuzzyDateReturn} The suiting name / date pair
     */
    private mapFuzzyDateMonth(year: number, fuzzyDateMonth: string, fuzzyDateModifier?: string): FuzzyDateReturn {

        // Set the name of the fuzzy date
        let nameOfFuzzyDate: string = fuzzyDateMonth;

        if ( fuzzyDateModifier !== undefined ) {

            nameOfFuzzyDate = fuzzyDateModifier + ' ' + fuzzyDateMonth;

        }
        // Set the month - default is January
        let month: number = 0;

        switch ( fuzzyDateMonth ) {
            case 'Februar':
                month = 1;
                break;
            case 'März':
                month = 2;
                break;
            case 'April':
                month = 3;
                break;
            case 'Mai':
                month = 4;
                break;
            case 'Juni':
                month = 5;
                break;
            case 'Juli':
                month = 6;
                break;
            case 'August':
                month = 7;
                break;
            case 'September':
                month = 8;
                break;
            case 'Oktober':
                month = 9;
                break;
            case 'November':
                month = 10;
                break;
            case 'Dezember':
                month = 11;
                break;
        }

        // Set the day of the date - if no modifier is set we use the 1st
        // This is true for the modifier 'Anfang', too - So we will not check for it
        let day: number = 1;

        if ( fuzzyDateModifier === 'Mitte' || fuzzyDateModifier === 'Ende' ) {

            // Get the count of days in that month
            // We set day = 0, so we get the last day of the previous month
            // By adding 1 to the month we get the last day of the current month
            const daysInMonth: number = new Date(year, month + 1, 0).getDate();

            if ( fuzzyDateModifier === 'Mitte' ) {

                // The middle of the month is at the middle of the days in Month
                // To get a real day we have to round
                day = Math.floor(daysInMonth / 2);

            } else {

                // The end of the month is the count of days in that month

                day = daysInMonth;

            }

        }

        return {name: nameOfFuzzyDate,
                date: new Date(year, month, day)};

    }

    /**
     * Map a fuzzyDateSeason
     * @param {Date} year The year the season starts (!!!) in
     * @param {string} fuzzyDateSeason The fuzzy date season
     * @param {string} fuzzyDateModifier An optional modifier for the fuzzy date
     * @returns {FuzzyDateReturn} The suiting name / date pair
     */
    private mapFuzzyDateSeason(year: number, fuzzyDateSeason: string, fuzzyDateModifier?: string): FuzzyDateReturn {

        // Set the name of the fuzzy date
        let nameOfFuzzyDate: string = fuzzyDateSeason;

        if ( fuzzyDateModifier !== undefined ) {

            nameOfFuzzyDate = fuzzyDateModifier + ' ' + fuzzyDateSeason;

        }

        // Set the date and return the mapped fuzzy date
        // We take the meterological seasons as defined here:
        // http://www.aktuelle-sonne.de/html/jahreszeiten.html
        if ( fuzzyDateSeason === 'Frühjahr' ) {

            const beginDate = new Date(year, 2, 21);
            const endDate = new Date(year, 5, 20);

            // If there is no modifier we take the beginning of the fuzzy date
            if ( fuzzyDateModifier === undefined || fuzzyDateModifier === 'Anfang' ) {

                return {name: nameOfFuzzyDate,
                        date: beginDate};

            } else if ( fuzzyDateModifier === 'Mitte' ) {

                // As the days each month has may vary, we have to compute this one
                const dateDiff: number = endDate.getTime() - beginDate.getTime();

                // Set the middleDate to the beginDate plus the dateDiff
                const middleDateExact: Date = new Date(beginDate.getTime() + Math.floor(dateDiff / 2));

                // This middleDateExact is not always at change of day => Use only its year, month and day
                const middleDate: Date = new Date(middleDateExact.getFullYear(), middleDateExact.getMonth(), middleDateExact.getDate());

                return {name: nameOfFuzzyDate,
                        date: middleDate};

            // fuzzyDateModifier === 'Ende' - is used as collecting class, too
            } else {

                return {name: nameOfFuzzyDate,
                        date: endDate};

            }

        } else if ( fuzzyDateSeason === 'Sommer' ) {

            const beginDate = new Date(year, 5, 21);
            const endDate = new Date(year, 8, 22);

            // If there is no modifier we take the beginning of the fuzzy date
            if ( fuzzyDateModifier === undefined || fuzzyDateModifier === 'Anfang' ) {

                return {name: nameOfFuzzyDate,
                        date: beginDate};

            } else if ( fuzzyDateModifier === 'Mitte' ) {

                // As the days each month has may vary, we have to compute this one
                const dateDiff: number = endDate.getTime() - beginDate.getTime();

                // Set the middleDate to the beginDate plus the dateDiff
                const middleDateExact: Date = new Date(beginDate.getTime() + Math.floor(dateDiff / 2));

                // This middleDateExact is not always at change of day => Use only its year, month and day
                const middleDate: Date = new Date(middleDateExact.getFullYear(), middleDateExact.getMonth(), middleDateExact.getDate());

                return {name: nameOfFuzzyDate,
                        date: middleDate};

            // fuzzyDateModifier === 'Ende' - is used as collecting class, too
            } else {

                return {name: nameOfFuzzyDate,
                        date: endDate};

            }

        } else if ( fuzzyDateSeason === 'Herbst' ) {

            const beginDate = new Date(year, 8, 23);
            const endDate = new Date(year, 11, 20);

            // If there is no modifier we take the beginning of the fuzzy date
            if ( fuzzyDateModifier === undefined || fuzzyDateModifier === 'Anfang' ) {

                return {name: nameOfFuzzyDate,
                        date: beginDate};

            } else if ( fuzzyDateModifier === 'Mitte' ) {

                // As the days each month has may vary, we have to compute this one
                const dateDiff: number = endDate.getTime() - beginDate.getTime();

                // Set the middleDate to the beginDate plus the dateDiff
                const middleDateExact: Date = new Date(beginDate.getTime() + Math.floor(dateDiff / 2));

                // This middleDateExact is not always at change of day => Use only its year, month and day
                const middleDate: Date = new Date(middleDateExact.getFullYear(), middleDateExact.getMonth(), middleDateExact.getDate());

                return {name: nameOfFuzzyDate,
                        date: middleDate};

            // fuzzyDateModifier === 'Ende' - is used as collecting class, too
            } else {

                return {name: nameOfFuzzyDate,
                        date: endDate};

            }

        }  else if ( fuzzyDateSeason === 'Winter' ) {

            const beginDate = new Date(year, 11, 21);
            const endDate = new Date(year + 1, 2, 20);

            // If there is no modifier we take the beginning of the fuzzy date
            if ( fuzzyDateModifier === undefined || fuzzyDateModifier === 'Anfang' ) {

                return {name: nameOfFuzzyDate,
                        date: beginDate};

            } else if ( fuzzyDateModifier === 'Mitte' ) {

                // As the days each month has may vary, we have to compute this one
                const dateDiff: number = endDate.getTime() - beginDate.getTime();

                // Set the middleDate to the beginDate plus the dateDiff
                const middleDateExact: Date = new Date(beginDate.getTime() + Math.floor(dateDiff / 2));

                // This middleDateExact is not always at change of day => Use only its year, month and day
                const middleDate: Date = new Date(middleDateExact.getFullYear(), middleDateExact.getMonth(), middleDateExact.getDate());

                return {name: nameOfFuzzyDate,
                        date: middleDate};

            // fuzzyDateModifier === 'Ende' - is used as collecting class, too
            } else {

                return {name: nameOfFuzzyDate,
                        date: endDate};

            }

        } else if ( fuzzyDateSeason === 'Hochsommer' ) {

            // See https://www.wetter.com/wetterlexikon/hochsommer_aid_570f4f31cebfc0060e8b46de.html
            // for this one
            const beginDate = new Date(year, 6, 1);
            const endDate = new Date(year, 7, 15);

            // If there is no modifier we take the beginning of the fuzzy date
            if ( fuzzyDateModifier === undefined || fuzzyDateModifier === 'Anfang' ) {

                return {name: nameOfFuzzyDate,
                        date: beginDate};

            } else if ( fuzzyDateModifier === 'Mitte' ) {

                // As the days each month has may vary, we have to compute this one
                const dateDiff: number = endDate.getTime() - beginDate.getTime();

                // Set the middleDate to the beginDate plus the dateDiff
                const middleDateExact: Date = new Date(beginDate.getTime() + Math.floor(dateDiff / 2));

                // This middleDateExact is not always at change of day => Use only its year, month and day
                const middleDate: Date = new Date(middleDateExact.getFullYear(), middleDateExact.getMonth(), middleDateExact.getDate());

                return {name: nameOfFuzzyDate,
                        date: middleDate};

            // fuzzyDateModifier === 'Ende' - is used as collecting class, too
            } else {

                return {name: nameOfFuzzyDate,
                        date: endDate};

            }

        }

        // Fallback: Return current Date
        return {name: nameOfFuzzyDate,
                date: new Date()};

    }

}