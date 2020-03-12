import { JsonController, Post, Body, Get, QueryParams } from "routing-controllers";

import { billingRepository } from './../../../infrastructure/repositories/BillingRepository';
import { IProjectRepository } from './../../../domain/project/IProjectRepository';
import { IBillingTimeRepository, BillingTimeQueryParams } from './../../../domain/billing/IBilliingTimeRepository';
import { BillingTime } from './../../../domain/billing/BillingTime';
import { BillingTimeForm } from './validation/BillingTimeForm';
import { NotFoundError } from "../../../components/http-error";
import { ProjectType } from "../../../domain/project/Project";

@JsonController('/api/time-billing')
export class TimeBillingController {
    protected billingRepository: IBillingTimeRepository = billingRepository;
    protected projectRepository: IProjectRepository;
    
    @Post('/')
    public async createTimeBilling(
        @Body() form: BillingTimeForm
    ): Promise<BillingTime> {
        const project = await this.projectRepository.get(form.projectId);

        if (!project) {
            throw new NotFoundError('project not found');
        }

        if (!project.getMembers().includes(form.userId)) {
            throw new Error('user is not a member of the project');
        }

        if (project.type === ProjectType.Commercial && !form.workTypeId) {
            throw new Error('for commerical projects field work_type is required');
        }

        const billing = new BillingTime(form);

        return this.billingRepository.save(billing);
    }

    @Get('/')
    public async getList(
        @QueryParams() params: BillingTimeQueryParams
    ): Promise<BillingTime[]> {
        return this.billingRepository.getList(params);
    }
}