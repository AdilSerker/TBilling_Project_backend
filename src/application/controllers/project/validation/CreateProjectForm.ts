import { ProjectType } from '../../../../domain/project/Project';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProjectForm {
    @IsString()
    public name: string;

    @IsNumber()
    public authorId: number;

    @IsNumber()
    public plannedTime: number;

    @IsString()
    public type: ProjectType;

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
    public members: number[]
}