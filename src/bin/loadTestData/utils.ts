import { getRepository, getConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { readFileSync } from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';

import { JournalParam, AuthorParam } from './types';

export const jsonDataParser = async <T>(fileName: string): Promise<T[]> => {
    const filePath = path.join(__dirname, '../../../fixtures/', fileName);
    const data = await readFileSync(filePath);

    return JSON.parse(data.toString()) as T[];
}

export const journalSaver = async (journal: JournalParam): Promise<void> => {
    const { keywords, authors } = journal;

    // const journalModel = await getRepository(JournalModel).save(plainToClass(JournalModel, journal));

    // const authorModels: AuthorModel[] = await Promise.all(authors.map(item => authorSaver(item)));
    // const keywordModels: KeywordModel[] = await Promise.all(keywords.map(item => keywordSaver(item)));


    // await keywordReferenceSaver(journalModel.id, keywordModels.map(item => item.id));
    // await authorReferenceSaver(journalModel.id, authorModels.map(item => item.id));

}

export const keywordReferenceSaver = async (journalId: string, keywordIds: string[]): Promise<void> => {
    await Promise.all(keywordIds.map(id => {
        return getConnection().query(`insert into journal_keyword values ($1, $2);`, [id, journalId]);
    }));
}

export const authorReferenceSaver = async (journalId: string, authorIds: string[]): Promise<void> => {
    await Promise.all(authorIds.map(id => {
        return getConnection().query(`insert into journal_author values ($1, $2);`, [id, journalId]);
    }));
}

// export const keywordSaver = async (keyword: string): Promise<KeywordModel> => {
//     const keywordFromDb = await getRepository(KeywordModel).findOne({ where: { value: keyword } });
//     if (keywordFromDb) {
//         return keywordFromDb;
//     }

//     const keywordForSave = {
//         id: v4(),
//         value: keyword
//     }

//     return getRepository(KeywordModel).save(plainToClass(KeywordModel, keywordForSave));
// }

// export const authorSaver = async (author: AuthorParam): Promise<AuthorModel> => {
//     const authorFromDb = await getRepository(AuthorModel).findOne({ where: { author }});
//     if (authorFromDb) {
//         return authorFromDb;
//     }

//     return getRepository(AuthorModel).save(plainToClass(AuthorModel, {
//         id: v4(),
//         ...author
//     }));
// }
