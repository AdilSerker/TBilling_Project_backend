import { plainToClass } from 'class-transformer';
import { getRepository, In } from 'typeorm';

import { Project } from '../../domain/project/Project';
import { IProjectRepository, ProjectListQueryParams } from '../../domain/project/IProjectRepository';
import { ProjectModel } from '../models/ProjectModel';
import { MemberModel } from '../models/MemberModel';

export class ProjectRepository implements IProjectRepository {
    public async get(id: number): Promise<Project> {
        const project = await getRepository(ProjectModel).findOne(id);

        const projectMembers = await getRepository(MemberModel).find({ projectId: id });

        const members = projectMembers.map(item => item.userId);

        return this.createInstance(project, members);
    }

    public async getList(query: ProjectListQueryParams) : Promise<Project[]> {
        const {  } = query;

        const projects = await getRepository(ProjectModel).find(query);

        const projectIds = projects.map(item => item.id);

        const projectsMembers = await getRepository(MemberModel).find({ projectId: In(projectIds) });

        return projects.map(item => {
            const members: number[] = [];
            
            for (const member of projectsMembers) {
                if (member.projectId === item.id) {
                    members.push(member.userId);
                }
            }

            return this.createInstance(item, members);
        });
    }

    public async save(project: Project): Promise<Project> {
        const projectModel = await getRepository(ProjectModel).save(plainToClass(ProjectModel, project.getScheme()));

        await getRepository(MemberModel)
            .query('delete from member where project_id = $1', [ projectModel.id ]);

        await Promise.all(project.getMembers().map(userId => {
            return getRepository(MemberModel).save({
                projectId: projectModel.id,
                userId
            });
        }));

        return this.createInstance(projectModel, project.getMembers());
    }

    public async delete(id: number): Promise<void> {
        await getRepository(ProjectModel).delete(id);
    }

    private createInstance(project: ProjectModel, members?: number[]): Project {
        return new Project(project, members);
    }
}

export const projectRepository = new ProjectRepository();
