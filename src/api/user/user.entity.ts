import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

export enum UserType {
    SUPERUSER = 'SuperUser',
    ADMIN = 'Admin',
    USER = 'User'
}


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

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

    @OneToMany(() => ProductEntity, productEntity => productEntity.owner)
    public product!: ProductEntity[]

}