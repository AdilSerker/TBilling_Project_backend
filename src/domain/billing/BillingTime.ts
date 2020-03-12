export type BillintTimeCreateParams = {
    id?: number;
    userId: number;
    projectId: number;
    workTypeId: number;
    month: number;
    time: number;
}

export class BillingTime {
    public id?: number;
    public userId: number;
    public projectId: number;
    public workTypeId: number;
    public month: number;
    public time: number;

    constructor(params: BillintTimeCreateParams) {
        const {
            id,
            userId,
            projectId,
            workTypeId,
            month,
            time
        } = params;

        this.id = id;
        this.userId = userId;
        this.projectId = projectId;
        this.workTypeId = workTypeId;
        this.month = month;
        this.time = time;
    }
}