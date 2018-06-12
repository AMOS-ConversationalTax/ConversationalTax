/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { DatabaseModule } from '../database.module';
import { User } from './interfaces/user.interface';
import { userSchema } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import DBConfig from '../dbconfig';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {

    userService = new UserService(mongoose.model(DBConfig.USER_MODEL_PROVIDER, userSchema));

  });

  it('Create a user and find him again', async () => {

    const id = 'id1';

    // Create a user
    userService.create(id);

    // Find him again
    const user: User[] = await userService.findUser(id);

    // Array length should be exactly 1
    expect(user.length).toBe(1);
    expect(user[0]._id).toBe(id);

  })


});