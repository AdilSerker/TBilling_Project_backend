import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProject1582232498313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`
            CREATE TABLE project (
                id serial NOT NULL,
                name varchar(255) NOT NULL,
                author_id integer NOT NULL,
                type varchar(255),
                planned_time integer,
                status varchar(255) NOT NULL,
                create_time timestamp with time zone DEFAULT now() NOT NULL,
                update_time timestamp with time zone DEFAULT now() NOT NULL,
                CONSTRAINT project_pkey PRIMARY KEY (id),
                CONSTRAINT "project_author_id_fkey"
                    FOREIGN KEY (author_id)
                    REFERENCES "user"(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(`
            DROP TABLE project;
        `);
    }

}
