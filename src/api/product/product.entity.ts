import { Exclude } from 'class-transformer';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

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

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn()
    public owner: string;

    @Exclude()
    @CreateDateColumn()
    public created_at!: Date;

}