import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from '../guards/role.guard';
import { UserType } from '../user/user.entity';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@UseGuards(AuthGuard())
@Controller('category')
export class CategoryController {
    @Inject(CategoryService)
    private readonly service: CategoryService;

    @Get('/')
    @UseGuards(RoleGuard(UserType.SUPERUSER))
    private all() {
        return this.service.all();
    }


    @Get('/:id')
    private findOne(@Param('id') categoryId: string) {
        return this.service.findOne(categoryId);
    }

    @Post('/')
    @UseGuards(RoleGuard(UserType.SUPERUSER))
    private add(@Body() request: CategoryDto) {
        return this.service.add(request);
    }

    @Post('/:id')
    @UseGuards(RoleGuard(UserType.SUPERUSER))
    private update(@Param('id') categoryId: string, @Body() request: CategoryDto) {
        return this.service.update(categoryId, request);
    }


    @Delete('/:id')
    @UseGuards(RoleGuard(UserType.SUPERUSER))
    private delete(@Param('id') categoryId: string) {
        return this.service.delete(categoryId);
    }
}
