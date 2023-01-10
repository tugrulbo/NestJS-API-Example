import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>;

    public all() {
        return this.repository.find();
    }

    public async findOne(categoryId: string) {
        const category = await this.repository.findOne({ where: { id: categoryId }, relations: ['products'] });

        if (!category)
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

        return category;

    }

    public add(request: CategoryDto) {
        const { name, description } = request

        const category = new CategoryEntity();
        category.name = name;
        category.description = description;

        return this.repository.save(category);
    }

    public async update(categoryId: string, request: CategoryDto) {
        const { name, description } = request;
        let category = await this.repository.findOne({ where: { id: categoryId } });

        if (!category)
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

        category.name = name;
        category.description = description;

        return this.repository.update(categoryId, category);
    }

    public async delete(categoryId: string) {
        const category = await this.repository.findOne({ where: { id: categoryId } });

        if (!category)
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);


        return this.repository.delete({ id: category.id });

    }

}
