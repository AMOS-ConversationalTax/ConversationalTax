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
     * Get a string and a computed date out of a fuzzy date object
     * @param {Date} currentDate The current date
     * @param {any} fuzzyDate The fuzzy date object
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

            // If not we set the fuzzy date to the beginning of the month
            } else {

                return this.mapFuzzyDateMonth(currentDate,
                                              fuzzyDate.fields.FuzzyDateMonth.stringValue);

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

        if (fuzzyDateModifier !== undefined) {

            nameOfFuzzyDate = fuzzyDateModifier + ' ' + fuzzyDateMonth;

        }

        // Set the year of the date
        const year: number = (currentDate).getFullYear();

        // Set the month - default is January
        let month: number = 1;

        switch (fuzzyDateMonth) {
            case 'Februar':
                month = 2;
                break;
            case 'März':
                month = 3;
                break;
            case 'April':
                month = 4;
                break;
            case 'Mai':
                month = 5;
                break;
            case 'Juni':
                month = 6;
                break;
            case 'Juli':
                month = 7;
                break;
            case 'August':
                month = 8;
                break;
            case 'September':
                month = 9;
                break;
            case 'Oktober':
                month = 10;
                break;
            case 'November':
                month = 11;
                break;
            case 'Dezember':
                month = 12;
                break;
        }

        // Set the day of the date - if no modifier is set we use the 1st
        // This is true for the modifier 'Anfang', too - So we will not check for it
        let day: number = 1;

        if (fuzzyDateModifier === 'Mitte' || fuzzyDateModifier === 'Ende') {

            // Get the count of days in that month
            const daysInMonth: number = new Date(year, month, 0).getDate();

            if (fuzzyDateModifier === 'Mitte') {

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

}