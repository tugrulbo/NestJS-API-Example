import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from '../guards/role.guard';
import { UserType } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
    @Inject(UserService)
    private readonly service: UserService;

    @Get('/products/:id')
    private findUserProducts(@Param('id') id: string) {
        return this.service.findUserProducts(id);
    }

    @Post('/usertype')
    @UseGuards(RoleGuard(UserType.SUPERUSER))
    private changeUserType(@Body() request: any) {
        return this.service.changeUserType(request);
    }
}
