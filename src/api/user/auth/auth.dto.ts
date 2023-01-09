import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {

    @IsString()
    @IsOptional()
    public readonly name?: string;

    @Trim()
    @IsEmail()
    public readonly email: string;

    @IsString()
    @MinLength(8)
    public readonly password: string;


}

export class LoginDto {
    @Trim()
    @IsEmail()
    public readonly email: string;

    @IsString()
    public readonly password: string;
}