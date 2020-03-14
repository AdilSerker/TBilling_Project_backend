import { Token } from 'typedi';
import { Project } from "./Project";

export interface ProjectListQueryParams {
    
}

export interface IProjectRepository {
    get(id: number): Promise<Project>;
    getList(query: ProjectListQueryParams): Promise<Project[]>;
    save(user: Project): Promise<Project>;
    delete(id: number): Promise<void>;
}

