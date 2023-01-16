import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryDto {

    @ApiProperty({
        description: 'The name of the category'
    })
    @IsString()
    public readonly name: string;

    @ApiProperty({
        description: 'The description of the category'
    })
    @IsString()
    public readonly description: string;

}