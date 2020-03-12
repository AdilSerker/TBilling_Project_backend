import { JsonController, Param, Get, QueryParams, Post, Body } from "routing-controllers";
import Container, { Inject } from "typedi";

import { CreateProjectForm } from './validation/CreateProjectFrom';
import { Project } from './../../../domain/project/Project';
import { IProjectRepository, ProjectListQueryParams } from './../../../domain/project/IProjectRepository';
import { projectRepository } from './../../../infrastructure/repositories/ProjectRepository';

@JsonController('/api/project')
export class ProjectController {

    protected projectRepository: IProjectRepository = projectRepository;

    @Get('/:id')
    public getProject(@Param('id') id: number): Promise<Project> {

        return this.projectRepository.get(id);
    }

    @Get('/')
    public getList(
        @QueryParams() query: ProjectListQueryParams
    ): Promise<Project[]> {
        return this.projectRepository.getList(query);
    }

    @Post('/')
    public createProject(
        @Body() form: CreateProjectForm
    ): Promise<Project> {

        const { members, ...params } = form;

        const project = new Project(params, members);
        console.log('PR', this.projectRepository);
        return this.projectRepository.save(project);
    }

}