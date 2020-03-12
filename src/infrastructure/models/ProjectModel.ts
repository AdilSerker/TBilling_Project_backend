import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ProjectType, ProjectStatus } from './../../domain/project/Project';

@Entity('project')
export class ProjectModel {
    @PrimaryGeneratedColumn()    
    id: number;

    @Column('varchar')
    name: string;

    @Column({ name: 'author_id', type: 'integer' })
    authorId: number;

    @Column({ name: 'planned_time', type: 'integer' })
    plannedTime: number;

    @Column('varchar')
    type: ProjectType;

    @Column('varchar')
    status: ProjectStatus;

    @Column({ name: 'create_time', type: 'timestamp' })
    createTime: Date;
}