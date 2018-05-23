namespace DBConfig {

    /**
     * The main database provider
     * @name DBConfig#DB_PROVIDER
     * @type {string}
     */
    export const DB_PROVIDER: string = 'DbConnectionToken';

    /**
     * The main provider of the user model (= name of the user "table")
     * @name DBConfig#USER_MODEL_PROVIDER
     * @type {string}
     */
    export const USER_MODEL_PROVIDER: string = 'User';

    /**
     * The main provider of the employmentContract model
     * (= name of the employmentContract "table")
     * @name DBConfig#EMPLOYMENTCONTRACT_MODEL_PROVIDER
     * @type {string}
     */
    export const EMPLOYMENTCONTRACT_MODEL_PROVIDER: string = 'EmploymentContract';

    /**
     * The main provider of the reminder model (= name of the reminder "table")
     * @name DBConfig#REMINDER_MODEL_PROVIDER
     * @type {string}
     */
    export const REMINDER_MODEL_PROVIDER: string = 'Reminder';

}

export default DBConfig;