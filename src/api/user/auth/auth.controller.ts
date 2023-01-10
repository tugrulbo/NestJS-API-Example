import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req, Get } from '@nestjs/common';
import { User } from '@/api/user/user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

    @Post('seed')
    private seed() {
        return this.service.seed();
    }

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    private register(@Body() body: RegisterDto): Promise<User | never> {
        return this.service.register(body);
    }

    @Post('login')
    private login(@Body() body: LoginDto): Promise<string | never> {
        return this.service.login(body);
    }

    @Post('refresh')
    @UseGuards(AuthGuard('jwt'))
    private refresh(@Req() { user }: Request): Promise<string | never> {
        return this.service.refresh(<User>user);
    }
}