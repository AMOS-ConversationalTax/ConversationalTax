import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        UserService,
        ...userProviders,
    ],
})
export class UserModule { }