import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Name of the user',
        type: String
    })
    public readonly name?: string;

    @Trim()
    @IsEmail()
    @ApiProperty({
        description: 'Email of the user',
        type: String
    })
    public readonly email: string;

    @IsString()
    @MinLength(8)
    @ApiProperty({
        description: 'Password of the user',
        type: String,
        minimum: 8
    })
    public readonly password: string;

}

export class LoginDto {
    @Trim()
    @IsEmail()
    @ApiProperty({
        description: 'Email of the user',
        type: String
    })
    public readonly email: string;

    @IsString()
    @ApiProperty({
        description: 'Password of the user',
        type: String,
        minimum: 8
    })
    public readonly password: string;
}