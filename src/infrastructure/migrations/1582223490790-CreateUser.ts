import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1582223490790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`
            CREATE TABLE "user" (
                id serial NOT NULL,
                first_name varchar(255) NOT NULL,
                last_name varchar(255) NOT NULL,
                login varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                create_time timestamp with time zone DEFAULT now() NOT NULL,
                update_time timestamp with time zone DEFAULT now() NOT NULL,
                CONSTRAINT user_pkey PRIMARY KEY (id)
            );
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`drop table "user"`)
    }

}
