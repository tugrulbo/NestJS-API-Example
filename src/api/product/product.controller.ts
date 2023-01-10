import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    @Inject(ProductService)
    private readonly service: ProductService;

    @Get('/')
    private all() {
        return this.service.all();
    }

    @Get('/:id')
    private findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post('/')
    private add(@Body() request: ProductDto) {
        return this.service.add(request);
    }

    @Post('/:id')
    private update(@Param('id') id: string, @Body() request: ProductDto) {
        return this.service.update(id, request);
    }

    @Delete('/:id')
    private delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

}
