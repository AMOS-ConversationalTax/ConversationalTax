import { IsString, Length, IsInt, Min, Max, Matches, IsDate } from 'class-validator';

export class AllIds {
    @IsInt()
    @Min(0)
    readonly user_id: number;

    @IsInt()
    @Min(0)
    readonly contract_id: number;
}

export class User_Id {
    @IsInt()
    @Min(0)
    readonly user_id: number;
}

export class Contract_Id {
    @IsInt()
    @Min(0)
    readonly contract_id: number;
}

export class UserEmploymentContract {
    @IsString()
    readonly name: string;
    
    @IsDate()
    readonly startDate_exact: Date;
    
    @IsString()
    readonly startDate_string: string;
    
    @IsDate()
    readonly endDate_exact: Date;
    
    @IsString()
    readonly endDate_string: string;
}