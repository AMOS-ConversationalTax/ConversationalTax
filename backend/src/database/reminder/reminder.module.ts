import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { reminderProviders } from './reminder.providers';
import { DatabaseModule } from '../database.module';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { reminderSchema } from './schemas/reminder.schema';
import DBConfig from '../dbconfig';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        ReminderService,
        ...reminderProviders,
    ],
    exports: [
        ReminderService,
    ],
})
export class ReminderModule { }