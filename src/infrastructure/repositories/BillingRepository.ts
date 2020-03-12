import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { Service } from "typedi";

import { BillingTime } from './../../domain/billing/BillingTime';

import { BillingTimeModel } from './../models/BillingTimeModel';
import {
    IBillingTimeRepository,
    BillingTimeQueryParams
} from '../../domain/billing/IBilliingTimeRepository';

export class BillingTimeRepository implements IBillingTimeRepository {
    public async get(id: number): Promise<BillingTime> {
        const billing = await getRepository(BillingTimeModel).findOne(id);

        return this.createInstance(billing);
    }

    public async getList(query: BillingTimeQueryParams) : Promise<BillingTime[]> {
        const queryBuilder = getRepository(BillingTimeModel).createQueryBuilder();

        if (query.projectIds && query.projectIds.length) {
            queryBuilder.andWhere('project_id in (:...projectIds)', { projectIds: query.projectIds })
        }

        if (query.userIds && query.userIds.length) {
            queryBuilder.andWhere('user_id in (:...userIds)', { userIds: query.userIds })
        }

        if (query.workTypeIds && query.workTypeIds.length) {
            queryBuilder.andWhere('work_type_id in (:...workTypeIds)', { workTypeIds: query.workTypeIds })
        }

        if (query.months && query.months.length) {
            queryBuilder.andWhere('month in (:...months)', { months: query.months })
        }

        const billingTimes = await queryBuilder.getMany();

        return billingTimes.map(this.createInstance);
    }

    public async save(billing: BillingTime): Promise<BillingTime> {
        return getRepository(BillingTimeModel).save(plainToClass(BillingTimeModel, billing));
    }

    public async delete(id: number): Promise<void> {
        await getRepository(BillingTimeModel).delete(id);
    }

    private createInstance(billing: BillingTimeModel): BillingTime {
        return new BillingTime(billing);
    }
}

export const billingRepository = new BillingTimeRepository();