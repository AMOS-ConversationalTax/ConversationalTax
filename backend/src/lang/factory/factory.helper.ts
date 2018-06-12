import { EndDateWorker } from './factory.enddate';
import { AbstractFactory } from './factory.abstract';
import { CreateStartDateWorker } from './factory.createstartdate';

export class FactoryHelper {

    private static ENDDATE_WORKER: EndDateWorker = new EndDateWorker();
    private static CREATESTARTDATE_WORKER: CreateStartDateWorker = new CreateStartDateWorker();

    static getFactoy(action: string): AbstractFactory {
        let factory: AbstractFactory = null;
        switch (action) {
            case 'ENDDATE':
                factory = this.ENDDATE_WORKER;
                break;
            case 'CREATE_STARTDATE':
                factory = this.CREATESTARTDATE_WORKER;
                break;
        }
        return factory;
    }
}