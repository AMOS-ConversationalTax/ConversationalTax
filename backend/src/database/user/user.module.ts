import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import DBConfig from '../dbconfig';

@Module({
    imports: [DatabaseModule,
              MongooseModule.forFeature([{ name: DBConfig.USER_MODEL_PROVIDER,
                                           schema: userSchema }])],
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