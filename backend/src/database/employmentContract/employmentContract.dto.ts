import { IsString, Length, IsInt, Min, Max, Matches, IsDate, IsNumberString } from 'class-validator';

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
    readonly startDate_exact?: Date;

    @IsString()
    readonly startDate_string?: string;

    @IsDate()
    readonly endDate_exact?: Date;

    @IsString()
    readonly endDate_string?: string;
}