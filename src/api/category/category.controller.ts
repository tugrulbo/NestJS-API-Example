import { CreateCategoryPermissionHandler, EditCategoryPermissionHandler } from '@/common/permissions/permission';
import { Permission } from '@/common/permissions/permission.decorator';
import { ServicePermissionGuard } from '@/common/permissions/permission.guard';
import { ServicePermissions } from '@/common/permissions/service/permission/service-permission-list';
import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from '../guards/role.guard';
import { UserType } from '../user/user.entity';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';


@Controller('category')
@UseGuards(AuthGuard(), ServicePermissionGuard(ServicePermissions.CATEGORYSERVICE))
export class CategoryController {
    @Inject(CategoryService)
    private readonly service: CategoryService;

    @Get('/')
    private all() {
        return this.service.all();
    }


    @Get('/:id')
    private findOne(@Param('id') categoryId: string) {
        return this.service.findOne(categoryId);
    }

    @Post('/')
    @Permission(CreateCategoryPermissionHandler)
    private add(@Body() request: CategoryDto) {
        return this.service.add(request);
    }

    @Post('/:id')
    @Permission(EditCategoryPermissionHandler)
    private update(@Param('id') categoryId: string, @Body() request: CategoryDto) {
        return this.service.update(categoryId, request);
    }


    @Delete('/:id')
    private delete(@Param('id') categoryId: string) {
        return this.service.delete(categoryId);
    }
}
