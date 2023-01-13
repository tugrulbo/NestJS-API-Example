import { DefaultActions } from '@/common/permissions/factory/permission.factory';
import { Permission } from '@/common/permissions/permission.decorator';
import { Controller, Delete, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { PermissionGuard } from '@/common/permissions/permission.guard';

@Controller('product')
@UseGuards(AuthGuard(), PermissionGuard)
export class ProductController {
    @Inject(ProductService)
    private readonly service: ProductService;

    @Get('/')
    @Permission({ action: DefaultActions.read, subject: ProductEntity })
    private all() {
        return this.service.all();
    }

    @Get('/:id')
    @Permission({ action: DefaultActions.read, subject: ProductEntity })
    private findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post('/')
    @Permission({ action: DefaultActions.create, subject: ProductEntity })
    private add(@Req() request: any) {
        return this.service.add(request);
    }

    @Post('/:id')
    @Permission({ action: DefaultActions.update, subject: ProductEntity })
    private update(@Param('id') id: string, @Req() request: any) {
        return this.service.update(id, request);
    }

    @Delete('/:id')
    @Permission({ action: DefaultActions.delete, subject: ProductEntity })
    private delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

}
