import { Body, Controller, Delete, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from '../guards/role.guard';
import { UserType } from '../user/user.entity';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthGuard())
export class ProductController {
    @Inject(ProductService)
    private readonly service: ProductService;

    @Get('/')
    private all() {
        return this.service.all();
    }

    @UseGuards(RoleGuard(UserType.SUPERUSER))
    @Get('/:id')
    private findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post('/')
    private add(@Req() request: any) {
        return this.service.add(request);
    }

    @Post('/:id')
    private update(@Param('id') id: string, @Req() request: any) {
        return this.service.update(id, request);
    }

    @UseGuards(RoleGuard(UserType.SUPERUSER))
    @Delete('/:id')
    private delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

}
