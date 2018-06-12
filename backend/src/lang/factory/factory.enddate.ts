import { EndDateParameterHandler } from './parameter/parameter.enddate';
import { EmploymentContractService } from './../../database/employmentContract/employmentContract.service';
import { AbstractFactory } from './factory.abstract';
import { ParameterHandler } from './parameter/parameter.abstract';

export class EndDateWorker extends AbstractFactory {

    public createParameterHandler(): ParameterHandler {
        return new EndDateParameterHandler(new EmploymentContractService());
    }
}