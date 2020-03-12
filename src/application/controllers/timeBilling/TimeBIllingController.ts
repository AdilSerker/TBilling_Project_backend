import { JsonController, Post, Body, Get, QueryParams, Put, OnUndefined, UseBefore, ForbiddenError, Param } from "routing-controllers";

import { billingRepository } from './../../../infrastructure/repositories/BillingRepository';
import { IProjectRepository } from './../../../domain/project/IProjectRepository';
import { IBillingTimeRepository, BillingTimeQueryParams } from './../../../domain/billing/IBilliingTimeRepository';
import { BillingTime } from './../../../domain/billing/BillingTime';
import { BillingTimeForm } from './validation/BillingTimeForm';
import { NotFoundError } from "../../../components/http-error";
import { ProjectType } from "../../../domain/project/Project";
import { CheckAuthorize } from "../../../components/middlewares/CheckAuthorize";
import { GetUserIdFromRequest } from "../../../components/decorators/GetUserIdFromRequest";
import { UpdateBillingItemForm } from "./validation/UpdateBillingItem";

@JsonController('/api/time-billing')
export class TimeBillingController {
    protected billingRepository: IBillingTimeRepository = billingRepository;
    protected projectRepository: IProjectRepository;
    
    @Post('/')
    @UseBefore(CheckAuthorize)
    public async createTimeBilling(
        @GetUserIdFromRequest() userId: number,
        @Body() form: BillingTimeForm
    ): Promise<BillingTime> {
        const project = await this.projectRepository.get(form.projectId);

        if (form.userId !== userId) {
            throw new ForbiddenError('ты не ты когда голоден');
        }

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

    @Put('/:id')
    @UseBefore(CheckAuthorize)
    @OnUndefined(204)
    public async updateBillingItem(
        @Param('id') id: number,
        @GetUserIdFromRequest() userId: number,
        @Body() { time }: UpdateBillingItemForm
    ): Promise<void> {
        const billing = await this.billingRepository.get(id);

        if (!billing) {
            throw new NotFoundError('billing time record with id ' + id + ' not found');
        }

        if (billing.getUserId() !== userId) {
            throw new ForbiddenError('ты не ты когда голоден');
        }

        billing.updateTime(time);

        await this.billingRepository.save(billing);

    }
}