import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {

    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>;

    public async all() {
        return this.repository.find();
    }

    public async findOne(productId: string) {
        const product = await this.repository.findOne({ where: { id: productId } });

        if (!product)
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

        return product;

    }

    public add(request: ProductDto) {
        const { category_id, name, image, description } = request

        const product = new ProductEntity();

        product.category_id = category_id;
        product.name = name;
        product.image = image;
        product.description = description;

        return this.repository.save(product);
    }

    public async update(productId: string, request: ProductDto) {
        const { category_id, name, image, description } = request
        let product = await this.repository.findOne({ where: { id: productId } });

        if (!product)
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

        product.category_id = category_id;
        product.name = name;
        product.image = image;
        product.description = description;

        return this.repository.update({ id: productId }, product);
    }

    public async delete(id: string) {
        const product = await this.repository.findOne({ where: { id } });
        if (!product)
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

        return this.repository.delete({ id: id });
    }
}
