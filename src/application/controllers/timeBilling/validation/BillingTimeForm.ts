import { IsNumber, IsOptional } from 'class-validator';
export class BillingTimeForm {
    @IsNumber()
    public userId: number;

    @IsNumber()
    public projectId: number;

    @IsNumber()
    @IsOptional()
    public workTypeId: number;

    @IsNumber()
    public month: number;

    @IsNumber()
    public time: number;
}