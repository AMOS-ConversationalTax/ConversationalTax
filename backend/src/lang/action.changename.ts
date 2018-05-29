import { ChangeNameParameterHandler } from './parameter.changename';
import { EmploymentContractService } from 'database/employmentContract/employmentContract.service';
import { AbstractFactory } from './dialog-flow.factory';
import { ParameterHandler } from './parameter.abstract';

export class ChangeNameWorker extends AbstractFactory {

    public createParameterHandler(): ParameterHandler {
        return new ChangeNameParameterHandler(new EmploymentContractService());
    }
}