import { IsString, Length, IsInt, Min, Max, Matches, IsDate, IsNumberString, IsOptional } from 'class-validator';

export class AllIds {
    @Matches(/[0-9]+/)
    readonly user_id: string;

    @Matches(/[0-9]+/)
    readonly id: string;
}

export class UserId {
    @Matches(/[0-9]+/)
    readonly user_id: string;
}

export class ContractId {
    @Matches(/[0-9]+/)
    readonly id: string;
}

export class UserEmploymentContract {
    @IsString()
    readonly name: string;

    @IsDate()
    @IsOptional()
    readonly startDate_exact?: Date;

    @IsString()
    @IsOptional()
    readonly startDate_string?: string;

    @IsDate()
    @IsOptional()
    readonly endDate_exact?: Date;

    @IsString()
    @IsOptional()
    readonly endDate_string?: string;
}