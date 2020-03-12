export enum ProjectType {
    Commercial = 'commercial',
    Uncommercial = 'uncommercial'
}

export enum ProjectStatus {
    InProgress = 'in_progress',
    Closed = 'closed'
}

export interface CreateParams {
    id?: number;
    name: string;
    authorId: number;
    plannedTime: number;
    type: ProjectType;
    status?: ProjectStatus;
    createTime?: Date;
}

export interface UpdateParams {
    name?: string;
    plannedTime?: number;
    type?: ProjectType;
}

export class Project {
    public id?: number;
    public name: string;
    public authorId: number;
    public plannedTime: number;
    public type: ProjectType;
    public status: ProjectStatus;
    public createTime?: Date;
    
    protected members: number[];
    
    constructor(params: CreateParams, members: number[] = []) {
        const { id, name, authorId, plannedTime, type, status, createTime} = params;

        this.id = id;
        this.name = name;
        this.authorId = authorId;
        this.plannedTime = plannedTime;
        this.type = type;
        this.status = status || ProjectStatus.InProgress;
        this.createTime = createTime;
    
        this.members = members;
    }

    public getMembers() {
        return this.members;
    }

    public updateMembers(newMemberList: number[] = []): void {
        if (newMemberList.length) {
            this.members = newMemberList;
        }  
    }

    public getScheme() {
        return {
            id: this.id,
            name: this.name,
            authorId: this.authorId,
            members: this.members,
            plannedTime: this.plannedTime,
            type: this.type,
            status: this.status,
            createTime: this.createTime
        }
    }

    public updateProfile({ name, plannedTime, type }: UpdateParams) {
        this.name = name || this.name;
        this.plannedTime = plannedTime || this.plannedTime;
        this.type = type || this.type;
    }

    public changeStatus(status: ProjectStatus) {
        this.status = status;
    }
}