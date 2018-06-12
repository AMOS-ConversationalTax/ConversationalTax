import { CreateStartDateParameterHandler } from './parameter/parameter.createstartdate';
import { EmploymentContractService } from './../../database/employmentContract/employmentContract.service';
import { AbstractFactory } from './factory.abstract';
import { ParameterHandler } from './parameter/parameter.abstract';

export class CreateStartDateWorker extends AbstractFactory {

    public createParameterHandler(): ParameterHandler {
        return new CreateStartDateParameterHandler(new EmploymentContractService());
    }
}