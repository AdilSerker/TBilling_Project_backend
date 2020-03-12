import { BillingTime } from './BillingTime';
import { Token } from 'typedi';

export type BillingTimeQueryParams = {
    userIds?: number[];
    projectIds?: number[];
    workTypeIds?: number[];
    months?: number[];
}

export interface IBillingTimeRepository {
    get(id: number): Promise<BillingTime>;
    getList(queryParams: BillingTimeQueryParams): Promise<BillingTime[]>;
    save(billingTime: BillingTime): Promise<BillingTime>;
    delete(id: number): Promise<void>;
}

