import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("billing_time")
export class BillingTimeModel {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'user_id', type: "integer"})
    public userId: number;

    @Column({ name: 'project_id', type: "integer"})
    public projectId: number;

    @Column({ name: 'work_type_id', type: "integer"})
    public workTypeId: number;

    @Column("integer")
    public month: number;

    @Column("integer")
    public time: number;
}