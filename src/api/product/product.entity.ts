import { Exclude } from 'class-transformer';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @PrimaryGeneratedColumn('uuid')
    public category_id!: string;

    @Column({ type: 'varchar' })
    public name!: string;

    @Column({ type: 'varchar' })
    public image!: string;

    @Column({ type: 'varchar' })
    public description!: string;

    @PrimaryGeneratedColumn('uuid')
    public owner!: string;

    @Exclude()
    @CreateDateColumn()
    public created_at!: Date;

}