import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database.module';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import DBConfig from '../dbconfig';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        UserService,
        ...userProviders,
    ],
    exports: [
        UserService,
    ],
})
export class UserModule { }