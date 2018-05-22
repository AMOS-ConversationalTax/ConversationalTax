import { Controller, Get, Post, Param, Put, Body } from '@nestjs/common';
import { EmploymentContractService } from './employmentContract.service';
import {AllIds, UserId, ContractId, UserEmploymentContract} from './employmentContract.dto';

@Controller('db/employmentContract')
export class EmploymentContractController {
    constructor(private readonly employmentContractService: EmploymentContractService) {}

    // TODO this is a skeleton
    // TODO implementation needed
    @Get(':user_id/:id')
    async findOne(@Param() params: AllIds) {
        return 'get (user_id, id) returns:' + params.user_id + ', ' + params.id;
    }

    // TODO implementation needed
    @Get(':user_id')
    async findAll(@Param() params: UserId) {
        return 'get all employment contracts of user ' + params.user_id + '.';
    }

    // TODO implementation needed
    @Post(':user_id')
    async create(@Param() params: UserId, @Body() createdEmploymentContract: UserEmploymentContract) {
        return 'employment contract for user ' + params.user_id + ' created!';
    }

    // TODO implementation needed
    @Put(':user_id/:id')
    async update(@Param() params: AllIds, @Body() updatedEmploymentContract: UserEmploymentContract) {
        return 'employment contract ' + params.user_id + ' of user ' +  params.id + ' updated!';
    }
}