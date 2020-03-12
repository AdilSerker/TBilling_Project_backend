export type BillintTimeCreateParams = {
    id?: number;
    userId: number;
    projectId: number;
    workTypeId: number;
    month: number;
    time: number;
}

export class BillingTime {
    public readonly id?: number;
    private userId: number;
    private projectId: number;
    private workTypeId: number;
    private month: number;
    private time: number;

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

    public getUserId() {
        return this.userId;
    }

    public serialize() {
        return {
            id: this.id,
            userId: this.userId,
            projectId: this.projectId,
            workTypeId: this.workTypeId,
            month: this.month,
            time: this.time
        }
    }

    public updateTime(time: number) {
        this.time = time;
    }
}