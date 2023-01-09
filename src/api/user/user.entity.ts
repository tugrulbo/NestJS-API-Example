import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserType {
    SUPERUSER = 'SuperUser',
    USER = 'User'
}


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', nullable: true })
    public name: string | null;

    @Column({ type: 'varchar' })
    public email!: string;

    @Exclude()
    @Column({ type: 'varchar' })
    public password!: string;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.USER
    })
    public user_type!: UserType;

}