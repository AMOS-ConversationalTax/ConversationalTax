import { EndDateParameterHandler } from './parameter.enddate';
import { EmploymentContractService } from 'database/employmentContract/employmentContract.service';
import { AbstractFactory } from './dialog-flow.factory';
import { ParameterHandler } from './parameter.abstract';

export class EndDateWorker extends AbstractFactory {

    public createParameterHandler(): ParameterHandler {
        return new EndDateParameterHandler(new EmploymentContractService());
    }
}