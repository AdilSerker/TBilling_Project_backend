import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateWorkType1582235661851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`
            CREATE TABLE work_type (
                id serial NOT NULL,
                name varchar(255) NOT NULL,
                CONSTRAINT work_type_pkey PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`
            DROP TABLE work_type;
        `);
    }

}
