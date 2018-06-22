import { Module } from '@nestjs/common';
import { IntentStrategy } from './strategy.intent';
import { FactoryModule } from '../factory/factory.module';

/**
 * Exports and bundles the StrategyPattern
 */
@Module({
    imports: [FactoryModule],
    providers: [IntentStrategy],
    exports: [IntentStrategy],
})
export class StrategyModule { }