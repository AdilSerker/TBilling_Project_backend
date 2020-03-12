import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBillingTime1582235846126 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`
            CREATE TABLE billing_time (
                id serial NOT NULL,
                user_id integer NOT NULL references "user"(id),
                project_id integer NOT NULL references project(id),
                work_type_id integer references work_type(id),
                month integer NOT NULL,
                time integer NOT NULL,
                CONSTRAINT billing_time_pkey PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`
            DROP TABLE billing_time;
        `);
    }

}
