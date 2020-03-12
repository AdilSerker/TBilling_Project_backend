import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMember1582239213865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`
            create table member (
                user_id integer references "user"(id),
                project_id integer references project(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`
            drop table member;
        `);
    }

}
