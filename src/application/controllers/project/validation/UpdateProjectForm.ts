import { ProjectType, ProjectStatus } from '../../../../domain/project/Project';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProjectForm {
    @IsString()
    @IsOptional()
    public name: string;

    @IsNumber()
    @IsOptional()
    public plannedTime: number;

    @IsString()
    @IsOptional()
    public type: ProjectType;

    @IsString()
    @IsOptional()
    public status: ProjectStatus;

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
    public members: number[]
}