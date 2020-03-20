import { getRepository, getConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { readFileSync } from 'fs';
import * as path from 'path';

export const jsonDataParser = async <T>(fileName: string): Promise<T[]> => {
    const filePath = path.join(__dirname, '../../../fixtures/', fileName);
    const data = await readFileSync(filePath);

    return JSON.parse(data.toString()) as T[];
}
