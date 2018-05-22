import { Controller, Get, Post, Param, Put, Body } from '@nestjs/common';
import { EmploymentContractService } from './employmentContract.service';
import {EmploymentContract} from './interfaces/employmentContract.interface';

@Controller('db/employmentContract')
export class EmploymentContractController {
    constructor(private readonly employmentContractService: EmploymentContractService) {}

    // TODO this is a skeleton
    // TODO implementation needed
    @Get(':user_id/:id')
    async findOne(@Param('user_id') user_id, @Param('id') id) {
        return 'get (user_id, id) returns:' + user_id + ', ' + id;
    }

    // TODO implementation needed
    @Get(':user_id')
    async findAll(@Param('user_id') user_id) {
        return 'get all employment contracts of user ' + user_id + '.';
    }

    // TODO implementation needed
    @Post(':user_id')
    async create(@Body() createdEmploymentContract) {
        return 'employment contract created!';
    }

    // TODO implementation needed
    @Put(':user_id/:id')
    async update(@Param('user_id') user_id, @Param('id') id, @Body() updatedEmploymentContract) {
        return 'employment contract ' +  id + ' of user ' + user_id + ' updated!';
    }
}