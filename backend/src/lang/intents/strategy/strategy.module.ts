import { Module } from '@nestjs/common';
import { IntentStrategy } from './strategy.intent';
import { FactoryModule } from '../factory/factory.module';

@Module({
    imports: [FactoryModule],
    providers: [IntentStrategy],
    exports: [IntentStrategy],
})
export class StrategyModule { }