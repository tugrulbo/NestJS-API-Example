import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from '../guards/role.guard';
import { UserType } from '../user/user.entity';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@UseGuards(AuthGuard())
@UseGuards(RoleGuard(UserType.SUPERUSER))
@Controller('category')
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
    private add(@Body() request: CategoryDto) {
        return this.service.add(request);
    }

    @Post('/:id')
    private update(@Param('id') categoryId: string, @Body() request: CategoryDto) {
        return this.service.update(categoryId, request);
    }


    @Delete('/:id')
    private delete(@Param('id') categoryId: string) {
        return this.service.delete(categoryId);
    }
}
