import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { reminderProviders } from './reminder.providers';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        ReminderService,
        ...reminderProviders,
    ],
})
export class ReminderModule { }