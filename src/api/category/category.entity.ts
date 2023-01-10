import { Exclude } from 'class-transformer';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';


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

    @OneToMany(() => ProductEntity, productEntity => productEntity.category_id)
    public products: ProductEntity[];
}