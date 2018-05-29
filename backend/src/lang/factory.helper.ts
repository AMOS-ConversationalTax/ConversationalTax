import { EndDateWorker } from './action.enddate';
import { AbstractFactory } from './dialog-flow.factory';
import { ChangeNameWorker } from './action.changename';

export class FactoryHelper {

    private static ENDDATE_WORKER: EndDateWorker = new EndDateWorker();
    private static CHANGENAME_WORKER: ChangeNameWorker = new ChangeNameWorker();

    static getFactoy(action: string): AbstractFactory {
        let factory: AbstractFactory = null;
        switch (action) {
            case 'ENDDATE':
                factory = this.ENDDATE_WORKER;
                break;
            case 'CHANGENAME':
                factory = this.CHANGENAME_WORKER;
                break;
        }
        return factory;
    }
}