import { Body, Controller, Delete, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

    @UseGuards(AuthGuard())
    @Post('/')
    private add(@Req() request: any) {
        return this.service.add(request);
    }

    @UseGuards(AuthGuard())
    @Post('/:id')
    private update(@Param('id') id: string, @Req() request: any) {
        return this.service.update(id, request);
    }

    @UseGuards(AuthGuard())
    @Delete('/:id')
    private delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

}
