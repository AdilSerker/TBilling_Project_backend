import { JsonController, Param, Get, QueryParams, Post, Body, Put, OnUndefined, NotFoundError } from "routing-controllers";
import Container, { Inject } from "typedi";

import { CreateProjectForm } from './validation/CreateProjectForm';
import { Project } from './../../../domain/project/Project';
import { IProjectRepository, ProjectListQueryParams } from './../../../domain/project/IProjectRepository';
import { projectRepository } from './../../../infrastructure/repositories/ProjectRepository';
import { UpdateProjectForm } from "./validation/UpdateProjectForm";

@JsonController('/api/project')
export class ProjectController {

    protected projectRepository: IProjectRepository = projectRepository;

    @Get('/:id')
    public async getProject(@Param('id') id: number): Promise<Project> {

        return this.projectRepository.get(id);
    }

    @Get('/')
    public async getList(
        @QueryParams() query: ProjectListQueryParams
    ): Promise<Project[]> {
        return this.projectRepository.getList(query);
    }

    @Post('/')
    public async createProject(
        @Body() form: CreateProjectForm
    ): Promise<Project> {

        const { members, ...params } = form;

        const project = new Project(params, members);
        return this.projectRepository.save(project);
    }

    @Put('/:id')
    @OnUndefined(204)
    public async updateProject(
        @Param('id') id: number,
        @Body() form: UpdateProjectForm
    ): Promise<void> {
        const project = await this.projectRepository.get(id);
        if (!project) {
            throw new NotFoundError('Project with id ' + id + ' not found');
        }

        const { members, ...data } = form;

        project.updateProfile(data);
        project.updateMembers(members);

        await this.projectRepository.save(project);
    }
}
