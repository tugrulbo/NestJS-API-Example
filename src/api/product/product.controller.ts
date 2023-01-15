import { DefaultActions } from '@/common/permissions/factory/permission.factory';
import { Permission } from '@/common/permissions/permission.decorator';
import { Controller, Delete, Get, Inject, Param, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductPermissionHandler, DeleteProductPermissionHandler, DeleteUserPermissionHandler, EditProductPermissionHandler, ReadProductPermissionHandler } from '@/common/permissions/permission';
import { ServicePermissions } from '@/common/permissions/service/permission/service-permission-list';
import { ServicePermissionGuard } from '@/common/permissions/permission.guard';

@Controller('product')
@UseGuards(AuthGuard(), ServicePermissionGuard(ServicePermissions.PRODUCTSERVICE))
export class ProductController {
    @Inject(ProductService)
    private readonly service: ProductService;

    @Get('/')
    @Permission(ReadProductPermissionHandler)
    private all() {
        return this.service.all();
    }

    @Get('/:id')
    @Permission(ReadProductPermissionHandler)
    private findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post('/')
    @Permission(CreateProductPermissionHandler)
    private add(@Req() request: any) {
        return this.service.add(request);
    }

    @Post('/:id')
    @Permission(EditProductPermissionHandler)
    private update(@Param('id') id: string, @Req() request: any) {
        return this.service.update(id, request);
    }

    @Delete('/:id')
    @Permission(DeleteProductPermissionHandler)
    private delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

}

