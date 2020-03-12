import { IsNumber } from 'class-validator';
export class UpdateBillingItemForm {

    @IsNumber()
    public time: number;
}