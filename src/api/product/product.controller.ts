import { DefaultActions } from '@/common/permissions/factory/permission.factory';
import { Permission } from '@/common/permissions/permission.decorator';
import { Controller, Delete, Get, Inject, Param, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductPermissionHandler, DeleteProductPermissionHandler, DeleteUserPermissionHandler, EditProductPermissionHandler, ReadProductPermissionHandler } from '@/common/permissions/permission';
import { ServicePermissions } from '@/common/permissions/service/permission/service-permission-list';
import { ServicePermissionGuard } from '@/common/permissions/permission.guard';
import { ProductDto } from './product.dto';
import { Body } from '@nestjs/common/decorators';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('product')
@UseGuards(AuthGuard(), ServicePermissionGuard(ServicePermissions.PRODUCTSERVICE))
export class ProductController {
    @Inject(ProductService)
    private readonly service: ProductService;

    @Get('/')
    @Permission(ReadProductPermissionHandler)
    @ApiBearerAuth()
    private all() {
        return this.service.all();
    }

    @Get('/:id')
    @Permission(ReadProductPermissionHandler)
    @ApiBearerAuth()
    private findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post('/')
    @Permission(CreateProductPermissionHandler)
    @ApiBearerAuth()
    private add(@Req() request, @Body() body: ProductDto) {
        const userId = request.user.id
        console.log(userId);

        body.owner = userId.toString();
        return this.service.add(body);
    }

    @Post('/:id')
    @Permission(EditProductPermissionHandler)
    @ApiBearerAuth()
    private update(@Param('id') id: string, @Req() request, @Body() body: ProductDto) {
        const userId = request.user.id
        console.log(userId);

        body.owner = userId.toString();
        return this.service.update(id, request, body);
    }

    @Delete('/:id')
    @Permission(DeleteProductPermissionHandler)
    @ApiBearerAuth()
    private delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

}

