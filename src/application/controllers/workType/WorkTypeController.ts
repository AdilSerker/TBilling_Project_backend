import { JsonController, Get } from 'routing-controllers';
import { getRepository } from 'typeorm';

import { WorkType } from '../../../types';
import { WorkTypeModel } from '../../../infrastructure/models/WorkTypeModel';

@JsonController('/api/work-type')
export class WorkTypeController {

    @Get('/')
    public async getWorkTypeList(): Promise<WorkType[]> {
        const workTypes = await getRepository(WorkTypeModel).find();
        return workTypes as WorkType[];
    }
}