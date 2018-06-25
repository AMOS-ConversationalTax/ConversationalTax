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
     * @param {Date} currentDate The current date
     * @param {any} fuzzyDate The fuzzy date parameter
     * @returns {FuzzyDateReturn} The suiting name / date pair
     */
    public mapFuzzyDate(currentDate: Date, fuzzyDate: any): FuzzyDateReturn {

        // There FuzzyDates based on months
        if ( fuzzyDate.fields.hasOwnProperty('FuzzyDateMonth') ) {

            // If there is a modifier like 'Anfang', 'Mitte' or 'Ende' we want to use that
            if ( fuzzyDate.fields.hasOwnProperty('FuzzyDateModifier') ) {

                return this.mapFuzzyDateMonth(currentDate,
                                              fuzzyDate.fields.FuzzyDateMonth.stringValue,
                                              fuzzyDate.fields.FuzzyDateModifier.stringValue);

            } else {

                return this.mapFuzzyDateMonth(currentDate,
                                              fuzzyDate.fields.FuzzyDateMonth.stringValue);

            }

        } else if ( fuzzyDate.fields.hasOwnProperty('FuzzyDateSeason') ) {

            // If there is a modifier like 'Anfang', 'Mitte' or 'Ende' we want to use that
            if ( fuzzyDate.fields.hasOwnProperty('FuzzyDateModifier') ) {

                return this.mapFuzzyDateSeason(currentDate,
                                               fuzzyDate.fields.FuzzyDateSeason.stringValue,
                                               fuzzyDate.fields.FuzzyDateModifier.stringValue);

            } else {

                return this.mapFuzzyDateSeason(currentDate,
                                               fuzzyDate.fields.FuzzyDateSeason.stringValue);

            }

        }

        return undefined;

    }

    /**
     * Map a fuzzyDateMonth
     * @param {Date} currentDate The current date
     * @param {string} fuzzyDateMonth The basic month
     * @param {string} fuzzyDateModifier An optional modifier for the fuzzy date
     * @returns {FuzzyDateReturn} The suiting name / date pair
     */
    private mapFuzzyDateMonth(currentDate: Date, fuzzyDateMonth: string, fuzzyDateModifier?: string): FuzzyDateReturn {

        // Set the name of the fuzzy date
        let nameOfFuzzyDate: string = fuzzyDateMonth;

        if ( fuzzyDateModifier !== undefined ) {

            nameOfFuzzyDate = fuzzyDateModifier + ' ' + fuzzyDateMonth;

        }

        // Set the year of the date
        const year: number = (currentDate).getFullYear();

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
     * @param {Date} currentDate The current date
     * @param {string} fuzzyDateSeason The fuzzy date season
     * @param {string} fuzzyDateModifier An optional modifier for the fuzzy date
     * @returns {FuzzyDateReturn} The suiting name / date pair
     */
    private mapFuzzyDateSeason(currentDate: Date, fuzzyDateSeason: string, fuzzyDateModifier?: string): FuzzyDateReturn {

        // Set the name of the fuzzy date
        let nameOfFuzzyDate: string = fuzzyDateSeason;

        if ( fuzzyDateModifier !== undefined ) {

            nameOfFuzzyDate = fuzzyDateModifier + ' ' + fuzzyDateSeason;

        }

        // Set the year of the date
        const year: number = (currentDate).getFullYear();

        // Set the date and return the mapped fuzzy date
        // We take the meterological seasons as defined here:
        // http://www.aktuelle-sonne.de/html/jahreszeiten.html
        if ( fuzzyDateSeason === 'Frühjahr' ) {

            const beginDate = new Date(year, 2, 21);
            const endDate = new Date(year, 5, 21);

            // If there is no modifier we take the beginning of the fuzzy date
            if ( fuzzyDateModifier === undefined || fuzzyDateModifier === 'Anfang' ) {

                return {name: nameOfFuzzyDate,
                        date: beginDate};

            } else if ( fuzzyDateModifier === 'Mitte' ) {

                // As the days each month has may vary, we have to compute this one
                const oneDay: number = 1000 * 60 * 60 * 24;
                const dateDiff: number = endDate.getTime() - beginDate.getTime();
                const dateDiffInDays: number = Math.floor(dateDiff / oneDay);
                const halfDateDiffInDays: number = Math.floor(dateDiffInDays / 2);

                // Set the middleDate to the beginDate plus the rounded half of the dateDiff
                const middleDate: Date = new Date(beginDate.getTime() + halfDateDiffInDays * oneDay - (1000 * 60 * 60));

                return {name: nameOfFuzzyDate,
                        date: middleDate};

            // fuzzyDateModifier === 'Ende' - is used as collecting class, too
            } else {

                return {name: nameOfFuzzyDate,
                        date: endDate};

            }

        }

    }

}