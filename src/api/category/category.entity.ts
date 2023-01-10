import { Exclude } from 'class-transformer';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ type: 'varchar' })
    public name!: string;

    @Column({ type: 'varchar' })
    public description!: string;

    @Exclude()
    @CreateDateColumn()
    public created_at!: Date;
}