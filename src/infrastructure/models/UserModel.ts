import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', type: 'varchar' })
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar' })
    lastName: string;

    @Column("varchar")
    login: string;

    @Column("varchar")
    password: string;

    @CreateDateColumn({ name: 'create_time', type: 'timestamp' })
    createTime: Date;

    @UpdateDateColumn({ name: 'update_time', type: 'timestamp' })
    updateTime: Date;
}