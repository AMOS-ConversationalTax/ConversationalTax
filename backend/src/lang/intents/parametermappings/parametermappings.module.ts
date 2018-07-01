import { Module } from '@nestjs/common';
import { FuzzyDateMappingService } from './fuzzydatemapping.service';

/**
 * Exports and bundles the ParameterMappingsBundle
 */
@Module({
    imports: [],
    providers: [FuzzyDateMappingService],
    exports: [FuzzyDateMappingService],
})
export class ParameterMappingsModule { }