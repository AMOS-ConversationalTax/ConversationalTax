import { EmploymentContractService } from './../../database/employmentContract/employmentContract.service';
import { ParameterHandler } from './parameter/parameter.abstract';

export abstract class AbstractFactory {
    public abstract createParameterHandler(): ParameterHandler;
}