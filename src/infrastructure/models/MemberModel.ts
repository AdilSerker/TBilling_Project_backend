import { Entity, PrimaryColumn } from 'typeorm';

@Entity('member')
export class MemberModel {

    @PrimaryColumn({ name: 'user_id', type: 'integer' })
    public userId: number;

    @PrimaryColumn({ name: 'project_id', type: 'integer' })
    public projectId: number; 

}