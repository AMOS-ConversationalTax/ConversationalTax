import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

/**
 * The class that exports the database module
 */
@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }