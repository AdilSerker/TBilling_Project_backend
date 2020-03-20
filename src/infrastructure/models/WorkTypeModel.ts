import { Entity, PrimaryColumn } from 'typeorm';

@Entity('work_type')
export class WorkTypeModel {

    @PrimaryColumn('integer')
    public id: number;

    @PrimaryColumn('varchar')
    public name: string; 

}