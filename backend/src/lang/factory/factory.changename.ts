import { ChangeNameParameterHandler } from './parameter/parameter.changename';
import { EmploymentContractService } from 'database/employmentContract/employmentContract.service';
import { AbstractFactory } from './factory.abstract';
import { ParameterHandler } from './parameter/parameter.abstract';

export class ChangeNameWorker extends AbstractFactory {

    public createParameterHandler(): ParameterHandler {
        return new ChangeNameParameterHandler(new EmploymentContractService());
    }
}