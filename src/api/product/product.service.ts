import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserType } from '../user/user.entity';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {

    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>;

    public async all() {
        return this.repository.find({ relations: ['owner'] });
    }

    public async findOne(productId: string) {
        let product = await this.repository.findOne({ where: { id: productId }, relations: ['owner'] });

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

    public async update(productId: string, request: any, body: ProductDto,) {
        const { category_id, name, image, description } = body
        let product = await this.repository.findOne({ where: { id: productId }, relations: ['owner'] });

        if (!product)
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);


        if (request.user.user_type == UserType.USER) {
            if (product.owner['id'] == request.user.id) {
                product.category_id = category_id;
                product.name = name;
                product.image = image;
                product.description = description;
                return this.repository.save(product);
            } else {
                throw new HttpException('You cant update', HttpStatus.NOT_ACCEPTABLE);
            }

        }

        if (request.user.user_type == UserType.SUPERUSER) {
            product.category_id = category_id;
            product.name = name;
            product.image = image;
            product.description = description;
            return this.repository.save(product);
        }


    }

    public async delete(id: string) {
        const product = await this.repository.findOne({ where: { id } });
        if (!product)
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

        return this.repository.delete({ id: id });
    }
}
